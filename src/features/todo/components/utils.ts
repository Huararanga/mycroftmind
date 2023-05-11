import { AppDispatch } from "../../../app/store";
import { findTodoById } from "../../../common/utils";
import { updateTodo } from "../redux/todoSlice";
import { TodoModel } from "../types";

export function updateFinished(
  id: string,
  items: TodoModel[],
  dispatch: AppDispatch
) {
  const foundItem = findTodoById(items, id);
  if (foundItem) {
    dispatch(
      updateTodo({
        id: foundItem.id,
        name: foundItem.name,
        finished: !foundItem.finished,
      })
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
      updateTodo({
        id: foundItem.id,
        name: newName,
        finished: foundItem.finished,
      })
    );
  }
}
