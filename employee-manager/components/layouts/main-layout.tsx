import { ChildrenProp } from "@/types/commonConfig";

export default function MainLayout({ children }: ChildrenProp) {
  return (
    <main className="flex-grow-0 p-6 min-h-screen overflow-auto bg-[#f6f6f6e1]">
      {children}
    </main>
  );
}
