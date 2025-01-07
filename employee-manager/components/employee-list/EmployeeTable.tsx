"use client";
import { useFetchAllEmployees } from "@/customhooks/employees/useFetchAllEmployees";
import { Employee } from "@/types/employee/get-employee";

export default function EmployeeTable() {
  const { isPending, error, data } = useFetchAllEmployees();

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Email</th>
            <th>Department</th>
            <th>Phone</th>
            <th>Hire Date</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.employees.map((employee: Employee, index: number) => (
            <tr key={index}>
              <td></td>
              <td>{employee.empId}</td>
              <td>
                {employee.firstName} {employee.lastName}
              </td>
              <td>{employee.dateOfBirth}</td>
              <td>{employee.gender}</td>
              <td>{employee.email}</td>
              <td>{employee.departmentName}</td>
              <td>{employee.phone}</td>
              <td>{employee.hireDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
