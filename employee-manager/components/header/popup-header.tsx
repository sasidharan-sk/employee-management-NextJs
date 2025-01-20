"use client";
import { useSearchParams } from "next/navigation";

export default function PopupHeader() {
  const searchParams = useSearchParams();
  const editFlag = searchParams.get("edit");
  return (
    <>
      <header className="bg-blue-500 text-white shadow-md text-xl text-center p-3 top-0 sticky z-50">
        {editFlag ? "Edit employee form" : "Add employee form"}
      </header>
    </>
  );
}
