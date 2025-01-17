import { ENDPOINTS } from "@/config/apiconfig";
import { Employee } from "@/types/employee/get-employee";
import axiosInstance from "@/utils/axiosInstance";

export default async function DeleteEmployee(id: string): Promise<Employee> {
  const response = await axiosInstance.delete(
    `${ENDPOINTS.DELETE_EMPLOYEE}/${id}`
  );
  return response?.data;
}
