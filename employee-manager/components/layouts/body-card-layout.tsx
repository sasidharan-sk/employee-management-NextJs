import FilterLayout from "../common/FilterLayout";
import TanstackTable from "../employee/TanstackTable";

export default function BodyCardLayout() {
  return (
    <div className="flex flex-col p-4 bg-background shadow-2xl drop-shadow-2xl gap-4 min-h-screen">
      <FilterLayout />
      <TanstackTable />
    </div>
  );
}
