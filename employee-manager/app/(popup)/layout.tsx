import PopupHeader from "@/components/header/popup-header";
import { ChildrenProp } from "@/types/commonConfig";

export default function AddEmployeeMainLayout({ children }: ChildrenProp) {
  return (
    <>
      <PopupHeader />
      {children}
    </>
  );
}
