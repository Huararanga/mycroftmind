import React from "react";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { FinishedFilter, TodoStatus } from "../types";
import { FilterButton } from "./FilterButton";
import { Typography } from "@mui/material";
import CircleIcon from "@mui/icons-material/Circle";

function getStatusColor(status: TodoStatus) {
  switch (status) {
    case "loading":
      return "primary.main";
    case "failed":
      return "error.main";
    case "idle":
    default:
      return "success.main";
  }
}

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
      paddingX="1rem"
    >
      <Box>
        <Typography>{`${activeCount} items left`}</Typography>
      </Box>
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
      <CircleIcon fontSize="small" sx={{ color: getStatusColor(status) }} />
    </Stack>
  );
}
