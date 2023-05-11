import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { Paper, Stack } from "@mui/material";

import { TodoListItem } from "./TodoListItem";
import { TodoAddInput } from "./TodoAddInput";
import { TodoBar } from "./TodoBar";

import { useTodoFinishedFilter } from "../hooks/useTodoFinishedFilter";
import { FinishedFilter } from "../types";

import {
  fetchTodos,
  addTodo,
  deleteTodo,
  selectItems,
  selectStatus,
} from "../redux/todoSlice";
import { updateFinished, updateName } from "./utils";

export function Todo() {
  const dispatch = useAppDispatch();

  const apiItems = useAppSelector(selectItems);
  const status = useAppSelector(selectStatus);

  const [filter, setFilter] = useState<FinishedFilter>("all");
  const filteredItems = useTodoFinishedFilter(apiItems, filter);

  useEffect(() => {
    dispatch(fetchTodos({}));
  }, [dispatch]);

  return (
    <>
      <Paper elevation={3} sx={{ width: "500px" }}>
        <Stack direction="column" spacing={1} paddingY="0.5rem">
          <TodoAddInput
            onSubmit={(inputText: string) => dispatch(addTodo(inputText))}
          />
          <TodoBar
            status={status}
            activeCount={apiItems.filter((item) => !item.finished).length}
            currentFilter={filter}
            onFilterSelect={setFilter}
          />
        </Stack>
        <Divider />
        <List sx={{ padding: "1rem", paddingBottom: "1.5rem" }}>
          {filteredItems.map(({ id, name, finished }) => (
            <TodoListItem
              key={id}
              id={id}
              name={name}
              finished={finished}
              onRemoveClick={(id: string) => dispatch(deleteTodo(id))}
              onFinishClick={(id: string) =>
                updateFinished(id, apiItems, dispatch)
              }
              onEditClick={(id: string, newName: string) =>
                updateName(id, newName, apiItems, dispatch)
              }
            />
          ))}
        </List>
      </Paper>
    </>
  );
}
