"use client";
import { useFetchAllEmployees } from "@/customhooks/employees/useFetchAllEmployees";
import { Employee } from "@/types/employee/get-employee";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { CustomMenuDropDown } from "../common/CustomMenuDropDown";
import React, { useMemo, useState } from "react";
import { CustomAlertDialog } from "../common/CustomAlertDialog";
import { toast } from "react-toastify";
import useDeleteEmployee from "@/customhooks/employees/useDeleteEmployee";
import ImageUpload from "../common/ImageUpload";
import { ArrowDown, ArrowUp } from "lucide-react";
import { DataTablePagination } from "../common/DataTablePagination";

type TanstackTableProps = {
  searchQuery: string;
  filterColumn: string;
};

export default function TanstackTable({
  searchQuery,
  filterColumn,
}: TanstackTableProps) {
  const [sorting, setSorting] = useState({
    sortOn: "firstName",
    sortBy: "asc",
  });
  const [pagination, setPagination] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const { data, isPending, error } = useFetchAllEmployees({
    filterOn: filterColumn,
    filterQuery: searchQuery,
    sortOn: sorting.sortOn,
    sortBy: sorting.sortBy,
    pageNumber: pagination.pageNumber,
    pageSize: pagination.pageSize,
  });
  const totalCount = data?.totalCount;
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
        "resizable=yes,top=200,left=150,width=1000,height=560"
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

  const handleSorting = (sortKey: string) => {
    setSorting((prev) => ({
      sortOn: sortKey,
      sortBy: prev.sortOn === sortKey && prev.sortBy === "asc" ? "desc" : "asc",
    }));
  };

  const handlePagination = (pageNumber: number, pageSize: number) => {
    setPagination({
      ...pagination,
      pageNumber: pageNumber,
      pageSize: pageSize,
    });
  };
  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        accessorFn: (_, row) => row + 1,
        id: "#",
        header: () => <span>#</span>,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "profileImgUrl",
        header: () => <span>Profile Image</span>,
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
      },
      {
        accessorKey: "firstName",
        header: ({ column }) => (
          <span className="flex items-center">
            First Name
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "lastName",
        header: ({ column }) => (
          <span className="flex items-center">
            Last Name
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "gender",
        header: ({ column }) => (
          <span className="flex items-center">
            Gender
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "dateOfBirth",
        header: ({ column }) => (
          <span className="flex items-center">
            Date of Birth
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <span className="flex items-center">
            Email
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) => (
          <a href={`mailto:${info.getValue()}`} className="text-blue-500">
            {info.getValue() as string}
          </a>
        ),
      },
      {
        accessorKey: "phone",
        header: ({ column }) => (
          <span className="flex items-center">
            Phone
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) => info.renderValue(),
      },
      {
        accessorKey: "hireDate",
        header: ({ column }) => (
          <span className="flex items-center">
            Hire Date
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "departmentName",
        header: ({ column }) => (
          <span className="flex items-center">
            Department
            <span
              onClick={() => handleSorting(column.id)}
              className="ml-1 cursor-pointer"
            >
              {sorting.sortOn === column.id ? (
                sorting.sortBy === "asc" ? (
                  <ArrowUp size={20} strokeWidth={3} />
                ) : (
                  <ArrowDown size={20} strokeWidth={3} />
                )
              ) : (
                <ArrowUp size={20} strokeWidth={1.5} />
              )}
            </span>
          </span>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "actions",
        header: "",
        cell: ({ row }) => {
          const { empId, firstName } = row.original;
          return (
            <div className="relative">
              <CustomMenuDropDown
                menuOptions={menuOptions}
                onMenuClick={(option: string) =>
                  handleMenuClick(option, empId, firstName)
                }
              />
            </div>
          );
        },
      },
    ],
    [handleMenuClick, sorting.sortBy, sorting.sortOn]
  );

  const table = useReactTable<Employee>({
    data: data?.employees || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
    manualPagination: true,
    state: {
      pagination: {
        pageIndex: pagination.pageNumber - 1, // Adjust for 0-indexed pages
        pageSize: pagination.pageSize,
      },
    },
  });

  if (isPending)
    return (
      <div className="text-lg mx-auto text-blue-500 text-center p-10">
        Loading...
      </div>
    );

  if (error)
    return (
      <div className="text-center text-red-500 text-lg">
        An error has occurred: {error.message}
      </div>
    );

  return (
    <div className="flex justify-center items-center bg-gray-50 w-full ">
      <div className="w-full overflow-auto rounded-lg shadow-md bg-white">
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
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row, rowIndex) => (
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
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length}
                  className="px-6 py-6 border-y border-gray-200 text-gray-700 text-center"
                >
                  No records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex flex-col gap-2.5">
          <DataTablePagination
            table={table}
            onPageChange={(pageNumber, pageSize) =>
              handlePagination(pageNumber, pageSize)
            }
            totalCount={totalCount}
          />
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
