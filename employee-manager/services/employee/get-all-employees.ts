/* eslint-disable @typescript-eslint/no-unused-vars */
import { ENDPOINTS } from "@/config/apiconfig";
import { EmployeeApiResponse } from "@/types/employee/apiresponse";
import axiosInstance from "@/utils/axiosInstance";

export async function GetAllEmployees(
  filterOn?: string,
  filterQuery?: string,
  sortOn?: string,
  sortBy?: string,
  pageNumber?: number,
  pageSize?: number
): Promise<EmployeeApiResponse> {
  const params = new URLSearchParams();
  if (filterOn) params.append("filterOn", filterOn);
  if (filterQuery) params.append("filterQuery", filterQuery);
  if (sortOn) params.append("sortOn", sortOn);
  if (sortBy) params.append("sortBy", sortBy);
  if (pageNumber !== undefined)
    params.append("pageNumber", pageNumber.toString());
  if (pageSize !== undefined) params.append("pageSize", pageSize.toString());

  const response = await axiosInstance.get(
    `${ENDPOINTS.GET_EMPLOYEES}?${params.toString()}`
  );
  return response?.data;
}
