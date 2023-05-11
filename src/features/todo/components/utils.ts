import { AppDispatch } from "../../../app/store";
import { findTodoById } from "../../../common/utils";
import { updateTodo, deleteTodoBatch, updateTodoBatch } from "../redux/todoSlice";
import { TodoModel } from "../types";

function invertFinished(item: TodoModel) {
  return {
    id: item.id,
    name: item.name,
    finished: !item.finished,
  }
}

function rename(item: TodoModel, newName: string) {
  return {
    id: item.id,
    name: newName,
    finished: item.finished,
  }
}

export function updateFinished(
  id: string,
  items: TodoModel[],
  dispatch: AppDispatch
) {
  const foundItem = findTodoById(items, id);
  if (foundItem) {
    dispatch(
      updateTodo(invertFinished(foundItem))
    );
  }
}

export function finishAll(
  items: TodoModel[],
  dispatch: AppDispatch
) {
  const unfinished = items
    .filter((item) => !item.finished)
    .map(invertFinished)
  if (unfinished.length) {
    dispatch(
      updateTodoBatch(unfinished)
    );
  }
}

export function updateName(
  id: string,
  newName: string,
  items: TodoModel[],
  dispatch: AppDispatch
) {
  const foundItem = findTodoById(items, id);
  if (foundItem && foundItem.name !== newName) {
    dispatch(
      updateTodo(rename(foundItem, newName))
    );
  }
}

export function deleteFinished(
  items: TodoModel[],
  dispatch: AppDispatch
) {
  const ids = items.filter((item) => item.finished).map((item) => item.id)
  if (ids.length) {
    dispatch(
      deleteTodoBatch(ids)
    );
  }
}
