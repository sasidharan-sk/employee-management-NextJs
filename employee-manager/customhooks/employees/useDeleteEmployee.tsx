import { Employee } from "@/types/employee/get-employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllEmployeeQueryKey } from "./useFetchAllEmployees";
import DeleteEmployee from "@/services/employee/delete-employee";

export default function useDeleteEmployee() {
  debugger;
  const queryClient = useQueryClient();
  return useMutation<Employee, Error, string>({
    mutationFn: (id) => DeleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [getAllEmployeeQueryKey] });
    },
  });
}
