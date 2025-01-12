import { ENDPOINTS } from "@/config/apiconfig";
import { AddEmployeeRequest } from "@/types/employee/add-employee-request";
import { Employee } from "@/types/employee/get-employee";
import axiosInstance from "@/utils/axiosInstance";

export default async function AddNewEmployee(
  body: AddEmployeeRequest
): Promise<Employee> {
  const response = await axiosInstance.post(ENDPOINTS.ADD_EMPLOYEE, body);
  return response.data;
}
