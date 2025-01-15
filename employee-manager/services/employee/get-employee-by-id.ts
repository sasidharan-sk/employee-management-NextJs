import { ENDPOINTS } from "@/config/apiconfig";
import { Employee } from "@/types/employee/get-employee";
import axiosInstance from "@/utils/axiosInstance";

export default async function GetAllEmployeeById(
  id: string
): Promise<Employee> {
  const response = await axiosInstance.get(`${ENDPOINTS.GET_EMPLOYEES}/${id}`);
  return response?.data;
}
