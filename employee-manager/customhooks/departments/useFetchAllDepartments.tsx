import { API_BASE_URL, ENDPOINTS } from "@/config/apiconfig";
import GetAllDepartment from "@/services/department/get-all-departments";
import { ApiDepartmentResponse } from "@/types/department/get-department";
import { useQuery } from "@tanstack/react-query";

export default function useFetchAllDepartments() {
  return useQuery<ApiDepartmentResponse[]>({
    queryKey: [`${API_BASE_URL}${ENDPOINTS.GET_DEPARTMENTS}`],
    queryFn: () => GetAllDepartment(),
  });
}
