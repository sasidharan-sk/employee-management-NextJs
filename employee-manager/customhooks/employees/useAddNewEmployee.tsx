import AddNewEmployee from "@/services/employee/add-new-employee";
import { AddEmployeeRequest } from "@/types/employee/add-employee-request";
import { Employee } from "@/types/employee/get-employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllEmployeeQueryKey } from "./useFetchAllEmployees";
import { ApiError } from "@/types/errors/common-errors";

export default function useAddNewEmployee() {
  const queryClient = useQueryClient();
  return useMutation<Employee, ApiError, AddEmployeeRequest>({
    mutationFn: (body) => AddNewEmployee(body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getAllEmployeeQueryKey] });
    },
  });
}
