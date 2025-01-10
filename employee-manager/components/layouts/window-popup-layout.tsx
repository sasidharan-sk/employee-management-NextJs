"use client";
import { ChildrenProp } from "@/types/commonConfig";
import { Button } from "../ui/button";
import { useCallback } from "react";
import { addEmployeeSchema } from "@/forms-schema/add-employee-schema";
import { z } from "zod";

const WindowPopupLayout: React.FC<ChildrenProp> = ({ children }) => {
  const handleClosePopup = useCallback(() => {
    window.close();
  }, []);

  return (
    <>
      <div className="flex flex-col p-6 gap-4">
        <div className="container mx-auto">
          <div className="flex flex-auto items-center justify-end gap-4">
            <div>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-600 hover:text-white"
                variant="outline"
              >
                Add
              </Button>
            </div>
            <div>
              <Button
                onClick={() => handleClosePopup()}
                className="bg-white border-s-2 border-black border-opacity-10"
                variant="outline"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto bg-white shadow-2xl drop-shadow-2xl">
          <>{children}</>
        </div>
      </div>
    </>
  );
};

export default WindowPopupLayout;
