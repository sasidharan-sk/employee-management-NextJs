"use client";
import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
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

import { useCallback, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

const FilterLayout = () => {
  const [searchVal, setSearchVal] = useState("");
  const [selectedColumn, setSelectedColumn] = useState("");
  const OnSearchValue = useCallback((e: string) => {
    setSearchVal(e);
  }, []);

  const SelectedColumnValue = useCallback((value: string) => {
    setSelectedColumn(value);
  }, []);

  const ToggleWindowPopup = useCallback(() => {
    window.open(
      "/popup/employees",
      "_blank",
      "resizable=yes,top=100,left=200,width=1000,height=700"
    );
  }, []);

  return (
    <div className="flex flex-wrap items-center justify-between gap-5 md:justify-between">
      <div className="flex items-center justify-start gap-6">
        {/* Search Bar Container */}
        <div>
          <Command className="rounded-lg border shadow-sm md:min-w-[30vw]">
            <CommandInput
              onValueChange={(e) => OnSearchValue(e)}
              placeholder="Type a command or search..."
            />
            {/* <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <Calendar />
                <span>Calendar</span>
              </CommandItem>
              <CommandItem>
                <Smile />
                <span>Search Emoji</span>
              </CommandItem>
              <CommandItem disabled>
                <Calculator />
                <span>Calculator</span>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <User />
                <span>Profile</span>
                <CommandShortcut>⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCard />
                <span>Billing</span>
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <Settings />
                <span>Settings</span>
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList> */}
          </Command>
        </div>
        {/* Dropdown for filtering */}
        <div>
          <Select onValueChange={(val) => SelectedColumnValue(val)}>
            <SelectTrigger className="md:w-[200px] shadow-sm h-11">
              <SelectValue placeholder="Select a column" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="firstName">First Name</SelectItem>
                <SelectItem value="lastName">Last Name</SelectItem>
                <SelectItem value="gender">Gender</SelectItem>
                <SelectItem value="email">Email</SelectItem>
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
