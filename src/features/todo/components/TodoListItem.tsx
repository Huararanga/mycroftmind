import React from "react";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import { TodoEditInput } from "./TodoEditInput";

type TodoListItemProps = {
  id: string;
  name: string;
  finished: boolean;
  onFinishClick: (id: string) => void;
  onRemoveClick: (id: string) => void;
  onEditClick: (id: string, name: string) => void;
};

export const TodoListItem = ({
  id,
  name,
  finished,
  onFinishClick,
  onRemoveClick,
  onEditClick,
}: TodoListItemProps) => {
  return (
    <ListItem disablePadding>
      <ListItemIcon onClick={() => onFinishClick(id)}>
        <Checkbox checked={finished} tabIndex={-1} disableRipple />
      </ListItemIcon>
      <TodoEditInput
        name={name}
        onSubmit={(newName) => onEditClick(id, newName)}
      />
      <IconButton onClick={() => onRemoveClick(id)}>
        <DeleteIcon />
      </IconButton>
    </ListItem>
  );
};
