import { ChildrenProp } from "@/commonConfig";

export default function EmployeesLayout({ children }: ChildrenProp) {
  return (
    <>
      {children}
      <h1 className="text-center text-4xl">This is EmployeeLayout.tsx</h1>
    </>
  );
}
