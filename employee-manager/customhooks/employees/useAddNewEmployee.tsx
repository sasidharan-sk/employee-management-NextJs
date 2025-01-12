import AddNewEmployee from "@/services/employee/add-new-employee";
import { AddEmployeeRequest } from "@/types/employee/add-employee-request";
import { Employee } from "@/types/employee/get-employee";
import { useMutation } from "@tanstack/react-query";

export default function useAddNewEmployee() {
  console.log("Add api hook is called");
  return useMutation<Employee, Error, AddEmployeeRequest>({
    mutationFn: (body) => AddNewEmployee(body),
  });
}
