import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks";
import { Paper, Stack, Divider, List } from "@mui/material";

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
import { updateFinished, updateName, deleteFinished, finishAll } from "./utils";
import { TodoBatchOperationBar } from "./TodoBatchOperationBar";

export function Todo() {
  const dispatch = useAppDispatch();

  const apiItems = useAppSelector(selectItems);
  const status = useAppSelector(selectStatus);

  const [filter, setFilter] = useState<FinishedFilter>("all");
  const visibleItems = useTodoFinishedFilter(apiItems, filter);

  const deleteFinishedCallBack = apiItems.filter((item) => item.finished).length
    ? () => deleteFinished(apiItems, dispatch)
    : undefined;

  const finishAllCallBack = visibleItems.filter((item) => !item.finished).length
    ? () => finishAll(visibleItems, dispatch)
    : undefined;

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
        <TodoBatchOperationBar
          finishAllCallBack={finishAllCallBack}
          deleteFinishedCallBack={deleteFinishedCallBack}
        />
        {(finishAllCallBack || deleteFinishedCallBack) ? <Divider /> : null}

        <List sx={{ padding: "1rem", paddingBottom: "1.5rem" }}>
          {visibleItems.map(({ id, name, finished }) => (
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
