import { Employee } from "@/types/employee/get-employee";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllEmployeeQueryKey } from "./useFetchAllEmployees";
import { EditEmployeeRequest } from "@/types/employee/edit-employee-request";
import UpdateEmployee from "@/services/employee/update-employee";
import { ApiError } from "@/types/errors/common-errors";

export default function useUpdateExistingEmployee() {
  const queryClient = useQueryClient();
  return useMutation<
    Employee,
    ApiError,
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
