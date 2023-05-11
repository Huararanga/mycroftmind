import React, { useState } from "react";
import { TextField } from "@mui/material";

export type TodoEditInputProps = {
  name: string;
  onSubmit: (name: string) => void;
};

export const TodoEditInput = ({ name, onSubmit }: TodoEditInputProps) => {
  const [inputContent, setInputContent] = useState(name);

  return (
    <TextField
      defaultValue={inputContent}
      variant="standard"
      fullWidth
      onChange={(event) => setInputContent(event.target.value)}
      onKeyPress={(e) => {
        if (e.key === "Enter") {
          onSubmit(inputContent);
        }
      }}
      InputProps={{
        onBlur: () => {
          onSubmit(inputContent);
        },
      }}
    />
  );
};
