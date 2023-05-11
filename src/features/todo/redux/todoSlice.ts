import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API } from "aws-amplify";
import { GraphQLQuery } from "@aws-amplify/api";

import { RootState } from "../../../app/store";
import { serializeGraphQLError } from "../../../common/utils";
import { listTodos } from "../../../graphql/queries";
import { TodoModel, ListTodos, TodoValues, TodoId, TodoStatus } from "../types";
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
    const data = {
      id,
    };
    const apiData = await API.graphql<GraphQLQuery<{}>>({
      query: deleteTodoMutation,
      variables: { input: data },
    });
    if (apiData.errors) {
      return rejectWithValue(serializeGraphQLError(apiData.errors));
    }
    return dispatch(fetchTodos(null));
  }
);

export const updateTodo = createAsyncThunk(
  "todo/updateTodo",
  async (update: TodoValues & TodoId, { rejectWithValue, dispatch }) => {
    console.log('update')
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
      })
      // addTodo
      .addCase(addTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addTodo.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(addTodo.rejected, (state) => {
        state.status = "failed";
      })
      // deleteTodo
      .addCase(deleteTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(deleteTodo.rejected, (state) => {
        state.status = "failed";
      })
      // updateTodo
      .addCase(updateTodo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        state.status = "idle";
      })
      .addCase(updateTodo.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectItems = (state: RootState) => state.todo.items;
export const selectStatus = (state: RootState) => state.todo.status;

export default todoSlice.reducer;
