import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { FinishedFilter, TodoStatus } from "../types";
import { FilterButton } from "./FilterButton";

export type TodoBarProps = {
  status: TodoStatus;
  activeCount: number;
  currentFilter: FinishedFilter;
  onFilterSelect: (filter: FinishedFilter) => void;
};

export function TodoBar({
  status,
  activeCount,
  currentFilter,
  onFilterSelect,
}: TodoBarProps) {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      paddingX='1rem'      
    >
      <Box>{`${activeCount} items left`}</Box>
      <Stack direction="row" spacing={1}>
        <FilterButton
          currentFilter={currentFilter}
          buttonFilter="all"
          label="All"
          onFilterSelect={onFilterSelect}
        />
        <FilterButton
          currentFilter={currentFilter}
          buttonFilter="finished"
          label="Finished"
          onFilterSelect={onFilterSelect}
        />
        <FilterButton
          currentFilter={currentFilter}
          buttonFilter="active"
          label="Active"
          onFilterSelect={onFilterSelect}
        />
      </Stack>
      <Box width="3rem" textAlign="end">{status}</Box>
    </Stack>
  );
}
