import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listTodos } from "./graphql/queries";
import {
  createTodo as createTodoMutation,
  deleteTodo as deleteTodoMutation,
} from "./graphql/mutations";
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { GraphQLQuery } from "@aws-amplify/api";

import { Todo, TodoModel, ListTodos } from "./types";
import { logError } from "./common/utils";

const App = ({ signOut }: { signOut?: () => void }) => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [error, setError] = useState<string>("");

  const handleApiError = (apiData: GraphQLResult) => {
    if (apiData.errors) {
      setError(apiData.errors.map((error) => error.message).join(";"));
      return true;
    }
    return false;
  };

  useEffect(() => {
    fetchTodos();
  },[]);

  async function fetchTodos() {
    console.log('fetch todos')
    try {
      const apiData = await API.graphql<GraphQLQuery<ListTodos>>({
        query: listTodos,
      });
      if (!handleApiError(apiData)) {
        const todosFromAPI = apiData.data?.listTodos.items;
        if (todosFromAPI) {
          setTodos(todosFromAPI);
        }
      }
    } catch (error) {
      logError(error);
    }
  }

  async function createTodo(name: string) {
    const data: Todo = {
      name,
      finished: false,
    };
    try {
      const apiData = await API.graphql<GraphQLQuery<{}>>({
        query: createTodoMutation,
        variables: { input: data },
      });
      if (!handleApiError(apiData)) {
        fetchTodos();
      }
    } catch (error) {
      logError(error);
    }
  }

  async function deleteNote({ id } : { id: TodoModel['id']}) {
    const newNotes = todos.filter((todo) => todo.id !== id);
    setTodos(newNotes);
    // by this way its not perfect sync with backend, but better user experience
    await API.graphql({
      query: deleteTodoMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={() => createTodo('test')}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {todos.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.finished}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
