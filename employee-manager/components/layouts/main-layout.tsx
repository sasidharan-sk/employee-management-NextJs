import { ChildrenProp } from "@/types/commonConfig";

export default function MainLayout({ children }: ChildrenProp) {
  return (
    <main className="flex-grow-0 p-4 overflow-hidden bg-[#f6f6f6e1] max-h-full">
      {children}
    </main>
  );
}
