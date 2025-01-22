"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  addEmployeeSchema,
  AddEmployeeSchema,
} from "@/forms-schema/add-employee-schema";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";
import { Popover, PopoverTrigger, PopoverContent } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { ApiDepartmentResponse } from "@/types/department/get-department";
import useAddNewEmployee from "@/customhooks/employees/useAddNewEmployee";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSearchParams } from "next/navigation";
import useGetEmployeeById from "@/customhooks/employees/useGetEmployeeById";
import useUpdateExistingEmployee from "@/customhooks/employees/useUpdateExistingEmployee";
import { z } from "zod";

type AddEmployeeFormProps = {
  formId: string;
  departments: ApiDepartmentResponse[] | undefined;
};
export default function AddEmployeeForm({
  formId,
  departments,
}: AddEmployeeFormProps) {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: new Date(),
    email: "",
    phone: "",
    hireDate: new Date(),
    departmentId: "",
  });
  const searchParams = useSearchParams();
  const editFlag = searchParams.get("edit");
  const id = searchParams.get("id") || "";
  const { data: existEmployeeData } = useGetEmployeeById(id);

  const addEmployeeForm = useForm<AddEmployeeSchema>({
    reValidateMode: "onChange",
    resolver: zodResolver(addEmployeeSchema),
    defaultValues: formValues,
    values: formValues,
  });

  const { mutate: mutateAdd } = useAddNewEmployee();
  const { mutate: mutateEdit } = useUpdateExistingEmployee();

  useEffect(() => {
    if (existEmployeeData != null && existEmployeeData != undefined) {
      addEmployeeForm.setValue("firstName", existEmployeeData?.firstName || "");
      addEmployeeForm.setValue("lastName", existEmployeeData?.lastName || "");
      addEmployeeForm.setValue("gender", existEmployeeData?.gender || "");
      addEmployeeForm.setValue(
        "dateOfBirth",
        new Date(existEmployeeData?.dateOfBirth) || new Date()
      );
      addEmployeeForm.setValue(
        "hireDate",
        new Date(existEmployeeData?.hireDate) || new Date()
      );
      addEmployeeForm.setValue("email", existEmployeeData?.email || "");
      addEmployeeForm.setValue("phone", existEmployeeData?.phone || "");
      addEmployeeForm.setValue(
        "departmentId",
        existEmployeeData?.departmentId || ""
      );
    }
  }, [addEmployeeForm, existEmployeeData]);

  function onSubmit(values: z.infer<typeof addEmployeeSchema>) {
    setFormValues({
      ...formValues,
      firstName: values.firstName,
      lastName: values.lastName,
      gender: values.gender,
      dateOfBirth: values.dateOfBirth,
      hireDate: values.hireDate,
      email: values.email,
      phone: values.phone,
      departmentId: values.departmentId,
    });

    if (editFlag) {
      mutateEdit(
        { id, body: values },
        {
          onSuccess: () => {
            if (window.opener) {
              const updateEvent = new Event("UpdateEmployeeEvent");
              window.opener.dispatchEvent(updateEvent);
            }

            toast.success("Employee updated successfully", {
              onClose: () => {
                window.close();
              },
            });
          },
          onError: (error) => {
            toast.error(`${error}`);
          },
        }
      );
    } else {
      mutateAdd(values, {
        onSuccess: () => {
          if (window.opener) {
            const addEvent = new Event("AddEmployeeEvent");
            window.opener.dispatchEvent(addEvent);
          }
          toast.success("Employee added successfully", {
            onClose: () => {
              window.close();
            },
          });
        },
        onError: (error) => {
          toast.error(`${error}`);
        },
      });
    }
  }
  return (
    <Form {...addEmployeeForm}>
      <form
        onSubmit={addEmployeeForm.handleSubmit(onSubmit)}
        className="space-y-8"
        id={formId}
      >
        <div className="grid grid-cols-1 gap-4 p-6 sm:grid sm:grid-cols-2 sm:gap-4 sm:p-8">
          {/* First Name */}
          <FormField
            control={addEmployeeForm.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name</FormLabel>
                <FormControl>
                  <Input className="w-10/12" placeholder="John" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={addEmployeeForm.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name</FormLabel>
                <FormControl>
                  <Input className="w-10/12" placeholder="Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender Dropdown */}
          <FormField
            control={addEmployeeForm.control}
            name="gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={editFlag ? existEmployeeData?.gender : field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-10/12">
                      <SelectValue placeholder="Select a gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Male">Male</SelectItem>
                    <SelectItem value="Female">Female</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Department ID Dropdown */}
          <FormField
            control={addEmployeeForm.control}
            name="departmentId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={
                    editFlag ? existEmployeeData?.departmentId : field.value
                  }
                >
                  <FormControl>
                    <SelectTrigger className="w-10/12">
                      <SelectValue placeholder="Select a department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent
                    className={
                      departments && departments.length > 0 ? "h-64" : ""
                    }
                  >
                    {departments && departments.length > 0 ? (
                      departments?.map(
                        (department: ApiDepartmentResponse, index: number) => (
                          <SelectItem
                            key={index}
                            value={department.departmentId}
                          >
                            {department.departmentName}
                          </SelectItem>
                        )
                      )
                    ) : (
                      <SelectItem value={"sdf"} disabled>
                        No records found
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={addEmployeeForm.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    className="w-10/12"
                    type="email"
                    placeholder="user@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Phone */}
          <FormField
            control={addEmployeeForm.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input
                    className="w-10/12"
                    type="number"
                    min={0}
                    placeholder="1234567890"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of Birth */}
          <FormField
            control={addEmployeeForm.control}
            name="dateOfBirth"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-10/12 pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Hire Date */}
          <FormField
            control={addEmployeeForm.control}
            name="hireDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Hire date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-10/12  pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </form>
    </Form>
  );
}
