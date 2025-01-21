"use client";
import { User } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../ui/command";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "@/customhooks/common/useDebounce";
import { Employee } from "@/types/employee/get-employee";
import useOnClickOutside from "@/customhooks/common/useOnClickOutside";

type SearchBarProps = {
  onSearch: (query: string, column: string) => void;
  employees: Employee[]; // Add the employee data type
};

const FilterLayout = ({ onSearch, employees }: SearchBarProps) => {
  const [searchVal, setSearchVal] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const [isCommandOpen, setIsCommanOpen] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  // Debounced search value
  const debouncedSearchVal = useDebounce(searchVal, 500);
  useOnClickOutside(commandRef, () => setIsCommanOpen(false));

  // Trigger search when debounced value changes
  useEffect(() => {
    onSearch(debouncedSearchVal, selectedColumn);
  }, [debouncedSearchVal, selectedColumn, onSearch]);

  const SelectedColumnValue = useCallback((value: string) => {
    setSelectedColumn(value);
  }, []);

  const ToggleWindowPopup = useCallback(() => {
    window.open(
      "/popup/employees",
      "_blank",
      "resizable=yes,top=200,left=150,width=1000,height=560"
    );
  }, []);

  const handleCommandItemClick = (value: string, column: string) => {
    setSelectedColumn(column);
    setSearchVal(value);
    onSearch(value, column); // Trigger search after setting filter
    setIsCommanOpen(false); // hide the command List suggestions
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-5 md:justify-between">
      <div className="flex items-center justify-start gap-6">
        {/* Search Bar Container */}
        <div ref={commandRef}>
          <Command className="rounded-lg border shadow-sm md:min-w-[30vw]">
            <CommandInput
              onFocus={() => setIsCommanOpen(true)}
              value={searchVal}
              onValueChange={(newValue) => setSearchVal(newValue)}
              placeholder="Search..."
            />
            {isCommandOpen && (
              <CommandList>
                {employees.length === 0 && (
                  <CommandEmpty className="shadow-2xl drop-shadow-xl md:min-w-[30vw]  absolute bg-white  z-50 max-h-20 text-center p-6">
                    No results found.
                  </CommandEmpty>
                )}
                {employees.length > 0 && (
                  <CommandGroup className="flex items-start  w-[30vw] justify-start absolute bg-white  z-50 max-h-40 overflow-auto scrollbar-thin  scrollbar-thumb-blue-500 scrollbar-track-gray-300 shadow-2xl drop-shadow-xl">
                    {/* Dynamically populate employee data */}
                    {employees.map((employee) => (
                      <CommandItem
                        key={employee.empId}
                        onSelect={() =>
                          handleCommandItemClick(
                            employee.firstName,
                            "firstName"
                          )
                        }
                      >
                        <User />
                        <span className="font-bold break-words">
                          {employee.firstName}
                        </span>
                        <span className="break-words">
                          ({employee.departmentName})
                        </span>

                        <CommandSeparator />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </CommandList>
            )}
          </Command>
        </div>

        {/* Dropdown for filtering */}
        <div>
          <Select
            value={selectedColumn}
            onValueChange={(val) => SelectedColumnValue(val)}
          >
            <SelectTrigger className="md:w-[200px] shadow-sm h-11">
              <SelectValue placeholder="Select a value" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="firstName">First Name</SelectItem>
                <SelectItem value="lastName">Last Name</SelectItem>
                <SelectItem value="gender">Gender</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="phone">Phone</SelectItem>
                <SelectItem value="departmentName">Department</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/* Add Employee button */}
      <div className="flex items-center justify-end">
        <Button
          onClick={() => ToggleWindowPopup()}
          className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
          variant="outline"
        >
          Add New Employee
        </Button>
      </div>
    </div>
  );
};

export default FilterLayout;
