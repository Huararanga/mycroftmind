import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";

import { RootState } from "../../../app/store";
import { serializeGraphQLError } from "../../../common/utils";
import { listTodos } from "../../../graphql/queries";
import { TodoModel, ListTodos, TodoValues, TodoStatus, TodoBase } from "../types";
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
  updateTodo as updateTodoMutation,
} from "../../../graphql/mutations";

export interface TodoState {
  items: TodoModel[];
  status: TodoStatus;
}

const initialState: TodoState = {
  items: [],
  status: "idle",
};

export const fetchTodos = createAsyncThunk(
  "todo/fetchTodos",
  async (_a: any, { rejectWithValue }) => {
    const apiData = await API.graphql<GraphQLQuery<ListTodos>>({
      query: listTodos,
    });
    if (apiData.errors) {
      return rejectWithValue(serializeGraphQLError(apiData.errors));
    }
    return apiData.data?.listTodos.items ?? [];
  }
);

export const addTodo = createAsyncThunk(
  "todo/addTodo",
  async (name: string, { rejectWithValue, dispatch }) => {
    const data: TodoValues = {
      name,
      finished: false,
    };
    const apiData = await API.graphql<GraphQLQuery<{}>>({
      query: createTodoMutation,
      variables: { input: data },
    });
    if (apiData.errors) {
      return rejectWithValue(serializeGraphQLError(apiData.errors));
    }
    return dispatch(fetchTodos(null));
  }
);

export const deleteTodo = createAsyncThunk(
  "todo/deleteTodo",
  async (id: string, { rejectWithValue, dispatch }) => {
    const apiData = await API.graphql<GraphQLQuery<{}>>({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
    if (apiData.errors) {
      return rejectWithValue(serializeGraphQLError(apiData.errors));
    }
    return dispatch(fetchTodos(null));
  }
);

export const deleteTodoBatch = createAsyncThunk(
  "todo/deleteTodoBatch",
  async (ids: string[], { rejectWithValue, dispatch }) => {
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i];
      const apiData = await API.graphql<GraphQLQuery<{}>>({
        query: deleteTodoMutation,
        variables: { input: { id } },
      });
      if (apiData.errors) {
        return rejectWithValue(serializeGraphQLError(apiData.errors));
      }
    }
    return dispatch(fetchTodos(null));
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (update: TodoBase, { rejectWithValue, dispatch }) => {
    const apiData = await API.graphql<GraphQLQuery<{}>>({
      query: updateTodoMutation,
      variables: { input: update },
    });
    if (apiData.errors) {
      return rejectWithValue(serializeGraphQLError(apiData.errors));
    }
    return dispatch(fetchTodos(null));
  }
);

export const updateTodoBatch = createAsyncThunk(
  "todo/updateTodoBatch",
  async (
    updateItems: TodoBase[],
    { rejectWithValue, dispatch }
  ) => {
    for (let i = 0; i < updateItems.length; i++) {
      const update = updateItems[i];
      const apiData = await API.graphql<GraphQLQuery<{}>>({
        query: updateTodoMutation,
        variables: { input: update },
      });
      if (apiData.errors) {
        return rejectWithValue(serializeGraphQLError(apiData.errors));
      }
    }
    return dispatch(fetchTodos(null));
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetchTodos
      .addCase(fetchTodos.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state) => {
        state.status = "failed";
      });
      [addTodo, deleteTodo, deleteTodoBatch, updateTodo, updateTodoBatch].forEach((thunk) => {
        builder.addCase(thunk.pending, (state) => {
          state.status = "loading";
        })
        builder.addCase(thunk.fulfilled, (state) => {
          state.status = "idle";
        })
        builder.addCase(thunk.rejected, (state) => {
          state.status = "failed";
        })
      })
  },
});

export const selectItems = (state: RootState) => state.todo.items;
export const selectStatus = (state: RootState) => state.todo.status;

export default todoSlice.reducer;
