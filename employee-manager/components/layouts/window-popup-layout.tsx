"use client";
import { Button } from "../ui/button";
import { useCallback, useId } from "react";
import AddEmployeeForm from "../add-employee/add-employee-form";
import useFetchAllDepartments from "@/customhooks/departments/useFetchAllDepartments";
import { useSearchParams } from "next/navigation";
import useGetEmployeeById from "@/customhooks/employees/useGetEmployeeById";

const WindowPopupLayout = () => {
  const { data } = useFetchAllDepartments();
  const handleClosePopup = useCallback(() => {
    window.close();
  }, []);

  const searchParams = useSearchParams();
  const flag = searchParams.get("edit");
  const id = searchParams.get("id") || "";
  const addEmployeeFormId = useId();
  const { isLoading, error } = useGetEmployeeById(id);

  if (isLoading)
    return (
      <div className="text-lg mx-auto text-blue-500 text-center p-6">
        Loading...
      </div>
    );

  if (error) return "An error has occurred: " + error.message;
  return (
    <>
      <div className="flex flex-col p-6 gap-4">
        <div className="container mx-auto">
          <div className="flex flex-auto  items-center justify-end gap-4">
            <div>
              <Button
                id="add-employee-button"
                form={addEmployeeFormId}
                type="submit"
                className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                variant="outline"
              >
                {flag ? "Save" : "Add"}
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleClosePopup()}
                className="bg-white border-s-2 border-black border-opacity-10"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto bg-white shadow-2xl drop-shadow-2xl">
          <AddEmployeeForm formId={addEmployeeFormId} departments={data} />
        </div>
      </div>
    </>
  );
};

export default WindowPopupLayout;
