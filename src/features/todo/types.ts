export type TodoId = {
  id: string;
};

export type TodoValues = {
  name: string;
  finished: boolean;
};

export type TodoBase = TodoId & TodoValues;

export type TodoModel = TodoBase & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

export type ListTodos = {
  listTodos: {
    items: TodoModel[];
  };
};

export type FinishedFilter = "all" | "finished" | "active";

export type TodoStatus = "idle" | "loading" | "failed";
