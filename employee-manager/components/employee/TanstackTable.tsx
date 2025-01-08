"use client";
import { useFetchAllEmployees } from "@/customhooks/employees/useFetchAllEmployees";
import { Employee } from "@/types/employee/get-employee";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

export default function TanstackTable() {
  const { data, isPending, error } = useFetchAllEmployees();

  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor("empId", {
      header: "Employee ID",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("firstName", {
      header: "First Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("lastName", {
      header: "Last Name",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("gender", {
      header: "Gender",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dateOfBirth", {
      header: "Date of Birth",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("email", {
      header: "Email",
      cell: (info) => (
        <a href={`mailto:${info.getValue()}`}>{info.getValue()}</a>
      ),
    }),
    columnHelper.accessor("phone", {
      header: "Phone",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("hireDate", {
      header: "Hire Date",
      cell: (info) => new Date(info.getValue()).toLocaleDateString(),
    }),
    columnHelper.accessor("departmentName", {
      header: "Department",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable<Employee>({
    data: data?.employees || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isPending)
    return (
      <div className="text-lg mx-auto text-blue-500 text-center">
        Loading...
      </div>
    );

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex bg-gray-100 w-full">
      <div className="overflow-auto my-auto">
        <table className="border-collapse border border-gray-300">
          {/* Table Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-gray-200 border-b text-gray-800 uppercase"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-4 font-medium text-left border border-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="hover:bg-gray-100 border-b text-gray-700"
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-4 py-3 border border-gray-300"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
