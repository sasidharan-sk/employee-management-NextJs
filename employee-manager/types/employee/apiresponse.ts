import { Employee } from "./get-employee";

export type EmployeeApiResponse = {
  totalCount: number;
  employees: Employee[];
};
