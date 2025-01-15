import { ENDPOINTS } from "@/config/apiconfig";
import { EditEmployeeRequest } from "@/types/employee/edit-employee-request";
import { Employee } from "@/types/employee/get-employee";
import axiosInstance from "@/utils/axiosInstance";

export default async function UpdateEmployee(
  id: string,
  body: EditEmployeeRequest
): Promise<Employee> {
  const response = await axiosInstance.put(
    `${ENDPOINTS.UPDATE_EMPLOYEE}/${id}`,
    body
  );
  return response?.data;
}
