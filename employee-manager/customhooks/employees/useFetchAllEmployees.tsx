import { API_BASE_URL, ENDPOINTS } from "@/config/apiconfig";
import { GetAllEmployees } from "@/services/employee/get-all-employees";
import { EmployeeApiResponse } from "@/types/employee/apiresponse";
import { useQuery } from "@tanstack/react-query";

export function useFetchAllEmployees() {
  return useQuery<EmployeeApiResponse>({
    queryKey: [`${API_BASE_URL}${ENDPOINTS.GET_EMPLOYEES}`],
    queryFn: () => GetAllEmployees(),
  });
}
