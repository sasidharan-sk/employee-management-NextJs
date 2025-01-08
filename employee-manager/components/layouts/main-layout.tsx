import { ChildrenProp } from "@/config/commonConfig";

export default function MainLayout({ children }: ChildrenProp) {
  return (
    <main className="container p-6 mx-auto bg-background min-h-screen overflow-auto bg-[#f6f6f6]">
      {children}
    </main>
  );
}
