import { useState, useEffect } from "react";
import { TodoModel, FinishedFilter } from "../types";

export function useTodoFinishedFilter(
  items: TodoModel[],
  filter: FinishedFilter = "all"
) {
  const [filteredItems, setFilteredItems] = useState<TodoModel[]>(items);

  useEffect(() => {
    switch (filter) {
      case "finished":
        setFilteredItems(items.filter((item) => item.finished));
        break;
      case "active":
        setFilteredItems(items.filter((item) => !item.finished));
        break;
      case "all":
      default:
        setFilteredItems([...items]);
        break;
    }
  }, [items, filter]);

  return filteredItems;
}
