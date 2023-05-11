import React, { useState } from "react";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";
import AddIcon from '@mui/icons-material/AddBox';

export type TodoAddInputProps = {
    onSubmit: (name: string) => void;
}

export const TodoAddInput = ({ onSubmit }: TodoAddInputProps) => {
    const [inputContent, setInputContent] = useState("");

    return (
      <Box sx={{ paddingX: '1rem' }}>
        <TextField
          label="What needs to be done?"
          variant="outlined"
          fullWidth
          onChange={(event) => setInputContent(event.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
                onSubmit(inputContent);
            }
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => onSubmit(inputContent)}
                >
                  <AddIcon fontSize="large"/>
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    )
}

