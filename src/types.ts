export type Todo = {
  name: string;
  finished: boolean;
};

export type TodoModel = {
    id: number;
    createdAt: number;
    updatedAt: number;
  } & Todo;

export type ListTodos = {
  listTodos: {
    items: TodoModel[];
  };
};
