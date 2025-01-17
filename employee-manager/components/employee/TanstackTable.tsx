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
import { CustomMenuDropDown } from "../common/CustomMenuDropDown";
import { useState } from "react";
import { CustomAlertDialog } from "../common/CustomAlertDialog";
import { toast } from "react-toastify";
import useDeleteEmployee from "@/customhooks/employees/useDeleteEmployee";
import ImageUpload from "../common/ImageUpload";

export default function TanstackTable() {
  const { data, isPending, error } = useFetchAllEmployees();
  const { mutate: mutateDelete } = useDeleteEmployee();
  const menuOptions = ["Edit", "Delete"];
  const [editFlag, setEditFlag] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [deleteReq, setDeleteReq] = useState({
    employeeName: "",
    empId: "",
  });

  const handleMenuClick = (
    option: string,
    id: string,
    employeeName: string
  ) => {
    if (option === "Edit") {
      setEditFlag(true);
      window.open(
        `/popup/employees?edit=${editFlag}&id=${id}`,
        "_blank",
        "resizable=yes,top=100,left=200,width=1000,height=700"
      );
    } else if (option === "Delete") {
      setDeleteReq({
        ...deleteReq,
        employeeName: employeeName,
        empId: id,
      });
      setIsAlertOpen(true);
    }
  };

  const handleConfirmDelete = () => {
    mutateDelete(deleteReq.empId, {
      onSuccess: () => {
        toast.success("Employee deleted successfully");
      },
      onError: (error) => {
        toast.error(`${error}`);
      },
    });
    setIsAlertOpen(false);
  };

  const handleAlertClose = () => {
    setIsAlertOpen(false);
  };

  const columnHelper = createColumnHelper<Employee>();

  const columns = [
    columnHelper.accessor((_, row) => row + 1, {
      header: "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("profileImgUrl", {
      header: "profile Image",
      cell: (info) => {
        const id = info.row.original.empId || "";
        const url = info.row.original.profileImgUrl || "";
        const gender = info.row.original.gender;
        return (
          <ImageUpload
            key={`${info.row.id}-${id}`}
            empId={id}
            url={url}
            gender={gender}
          />
        );
      },
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
        <a
          href={`mailto:${info.getValue()}`}
          className="text-blue-500 underline"
        >
          {info.getValue()}
        </a>
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
    columnHelper.accessor("actions", {
      header: "",
      cell: ({ row }) => {
        const id = row.original.empId; // Unique identifier for the row
        const firstName = row.original.firstName;
        return (
          <div className="relative">
            <CustomMenuDropDown
              menuOptions={menuOptions}
              onMenuClick={(option: string) =>
                handleMenuClick(option, id, firstName)
              }
            />
          </div>
        );
      },
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
    <div className="flex justify-center items-center bg-gray-50 w-full ">
      <div className="overflow-auto rounded-lg shadow-md bg-white">
        <table className="w-full border-collapse border border-gray-200 text-sm">
          {/* Table Header */}
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="bg-blue-500 text-white text-left w-full"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-6 py-4 font-medium border-y border-gray-50 border-opacity-30"
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
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={
                  rowIndex % 2 === 0
                    ? "bg-gray-50 hover:bg-indigo-50"
                    : "bg-white hover:bg-indigo-50"
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="px-6 py-6 border-y border-gray-200 text-gray-700"
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center px-6 py-3 bg-gray-100">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
      {/* Alert Dialog */}
      {isAlertOpen && (
        <CustomAlertDialog
          content={
            <>
              Are you sure to delete <strong>{deleteReq.employeeName}</strong>?
            </>
          }
          isOpen={isAlertOpen}
          onConfirm={handleConfirmDelete}
          onClose={handleAlertClose}
        />
      )}
    </div>
  );
}
