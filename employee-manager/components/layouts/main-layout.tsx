import { ChildrenProp } from "@/types/commonConfig";

export default function MainLayout({ children }: ChildrenProp) {
  return (
    <main className="flex-grow-0 p-6 bg-background min-h-screen overflow-auto bg-[#f6f6f6]">
      {children}
    </main>
  );
}
