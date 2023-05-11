import { Button } from "@mui/material";
import { FinishedFilter } from "../types";

function getButtonVariant(
  currentFilter: FinishedFilter,
  buttonFilter: FinishedFilter
) {
  return currentFilter === buttonFilter ? "contained" : "outlined";
}

export type FilterButtonProps = {
  currentFilter: FinishedFilter;
  buttonFilter: FinishedFilter;
  label: string;
  onFilterSelect: (filter: FinishedFilter) => void;
};

export function FilterButton({
  currentFilter,
  buttonFilter,
  label,
  onFilterSelect,
}: FilterButtonProps) {
  return (
    <Button
      variant={getButtonVariant(currentFilter, buttonFilter)}
      onClick={() => onFilterSelect(buttonFilter)}
      size="small"
    >
      {label}
    </Button>
  );
}
