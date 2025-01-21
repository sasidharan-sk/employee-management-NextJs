import { API_BASE_URL, ENDPOINTS } from "@/config/apiconfig";
import { GetAllEmployees } from "@/services/employee/get-all-employees";
import { EmployeeApiResponse } from "@/types/employee/apiresponse";
import { FilterAndSortEmployee } from "@/types/employee/get-employee";
import { useQuery } from "@tanstack/react-query";

export const getAllEmployeeQueryKey = `${API_BASE_URL}${ENDPOINTS.GET_EMPLOYEES_V2}`;
export function useFetchAllEmployees(params: FilterAndSortEmployee) {
  return useQuery<EmployeeApiResponse>({
    queryKey: [getAllEmployeeQueryKey, params],
    queryFn: () => GetAllEmployees(params),
  });
}
