import React from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { Button, Stack } from "@mui/material";

import { withAuthenticator } from "@aws-amplify/ui-react";

import { Todo } from './features/todo/components/Todo';

const App = ({ signOut }: { signOut?: () => void }) => {
  return (
    <Stack direction="column" alignItems="center" padding="1rem">
      <Button onClick={() => signOut && signOut()}>logout</Button>
      <Todo/>
    </Stack>
  );
};

export default withAuthenticator(App);
