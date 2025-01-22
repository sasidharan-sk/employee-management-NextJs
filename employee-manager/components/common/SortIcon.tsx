import { ArrowDown, ArrowUp } from "lucide-react";

const SortIcon = ({
  columnId,
  sortBy,
  sortOn,
  onClick,
}: {
  columnId: string;
  sortBy: string;
  sortOn: string;
  onClick: () => void;
}) => {
  return (
    <span onClick={onClick} className="ml-1 cursor-pointer">
      {sortOn === columnId ? (
        sortBy === "asc" ? (
          <ArrowUp size={20} strokeWidth={3} />
        ) : (
          <ArrowDown size={20} strokeWidth={3} />
        )
      ) : (
        <ArrowUp size={20} strokeWidth={1.5} />
      )}
    </span>
  );
};

export default SortIcon;
