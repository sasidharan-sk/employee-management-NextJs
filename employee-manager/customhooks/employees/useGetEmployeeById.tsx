import { useQuery } from "@tanstack/react-query";
import { getAllEmployeeQueryKey } from "./useFetchAllEmployees";
import GetAllEmployeeById from "@/services/employee/get-employee-by-id";
import { Employee } from "@/types/employee/get-employee";

export default function useGetEmployeeById(id: string) {
  return useQuery<Employee, Error>({
    queryKey: [getAllEmployeeQueryKey],
    queryFn: () => GetAllEmployeeById(id),
    enabled: !!id,
  });
}
