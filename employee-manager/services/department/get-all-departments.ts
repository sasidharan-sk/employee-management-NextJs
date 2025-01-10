import { ENDPOINTS } from "@/config/apiconfig";
import { ApiDepartmentResponse } from "@/types/department/get-department";
import axiosInstance from "@/utils/axiosInstance";

export default async function GetAllDepartment(): Promise<ApiDepartmentResponse[]> {
  const response = await axiosInstance.get(ENDPOINTS.GET_DEPARTMENTS);
  return response?.data;
}
