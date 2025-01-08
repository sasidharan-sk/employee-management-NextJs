"use client";

import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const FilterLayout = () => {
  return (
    <div
      className="flex items-center  gap-6  justify-center 
        sm:justify-center
        md:justify-start"
    >
      {/* Search Bar Container */}
      <div className="w-80 shadow-sm">
        <Input type="text" placeholder="Search" />
      </div>
      {/* Dropdown for filtering */}
      <div className="w-80">
        <Select>
          <SelectTrigger className="md:w-[200px] shadow-sm">
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
  );
};

export default FilterLayout;
