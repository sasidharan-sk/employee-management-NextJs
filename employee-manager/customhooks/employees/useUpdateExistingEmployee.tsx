import { Employee } from "@/types/employee/get-employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllEmployeeQueryKey } from "./useFetchAllEmployees";
import { EditEmployeeRequest } from "@/types/employee/edit-employee-request";
import UpdateEmployee from "@/services/employee/update-employee";

export default function useUpdateExistingEmployee() {
  const queryClient = useQueryClient();
  return useMutation<
    Employee,
    Error,
    { id: string; body: EditEmployeeRequest }
  >({
    mutationFn: ({ id, body }) => UpdateEmployee(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [getAllEmployeeQueryKey],
      });
    },
  });
}
