import AddEmployeeForm from "@/components/add-employee/add-employee-form";
import MainLayout from "@/components/layouts/main-layout";
import WindowPopupLayout from "@/components/layouts/window-popup-layout";

export default function AddEmployeePage() {
  return (
    <>
      <MainLayout>
        <WindowPopupLayout>
          <AddEmployeeForm />
        </WindowPopupLayout>
      </MainLayout>
    </>
  );
}
