import { ChildrenProp } from "@/types/commonConfig";

export default function MainLayout({ children }: ChildrenProp) {
  return (
    <main className="flex-grow-0 p-6 overflow-hidden bg-[#f6f6f6e1] ">
      {children}
    </main>
  );
}
