import { ChildrenProp } from "@/types/commonConfig";

export default function MainPopupLayout({ children }: ChildrenProp) {
  return (
    <>
      <main className="flex-grow-0 p-4 bg-[#f6f6f6e1]">{children}</main>
    </>
  );
}
