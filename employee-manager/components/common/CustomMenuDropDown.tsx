"use client";

import * as React from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaEllipsisVertical } from "react-icons/fa6";

type CustomMenuDropDownProps = {
  menuOptions: string[];
  onMenuClick: (option: string) => void;
};

export function CustomMenuDropDown({
  menuOptions,
  onMenuClick,
}: CustomMenuDropDownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="bg-slate-100 p-2">
          <FaEllipsisVertical cursor={"pointer"} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuGroup>
          {menuOptions.map((option) => (
            <DropdownMenuRadioItem
              key={option}
              value={option}
              className="text-sm"
              onClick={() => onMenuClick(option)}
            >
              {option}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
