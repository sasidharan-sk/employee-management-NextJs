"use client";
import { useState } from "react";
import FilterLayout from "../common/FilterLayout";
import TanstackTable from "../employee/TanstackTable";
import { useFetchAllEmployees } from "@/customhooks/employees/useFetchAllEmployees";

export default function BodyCardLayout() {
  const { data } = useFetchAllEmployees({});
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterColumn, setFilterColumn] = useState<string>("");

  const handleSearch = (query: string, column: string) => {
    setSearchQuery(query);
    setFilterColumn(column);
  };

  const employees = data?.employees || [];

  return (
    <div className="flex flex-col p-4 bg-background shadow-2xl drop-shadow-lg gap-4 max-h-full overflow-hidden ">
      <FilterLayout
        onSearch={handleSearch}
        employees={employees} // Pass employees to FilterLayout
      />
      <TanstackTable searchQuery={searchQuery} filterColumn={filterColumn} />
    </div>
  );
}
