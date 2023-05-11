import React from "react";
import { Stack, Button, Box } from "@mui/material";

export type TodoBatchOperationBarProps = {
  finishAllCallBack?: () => void;
  deleteFinishedCallBack?: () => void;
};

export function TodoBatchOperationBar({
  finishAllCallBack,
  deleteFinishedCallBack,
}: TodoBatchOperationBarProps) {
  return finishAllCallBack || deleteFinishedCallBack ? (
    <Stack direction="row" paddingX="1rem">
      <Box marginRight="auto">
        {finishAllCallBack ? (
          <Button onClick={finishAllCallBack}>finish all</Button>
        ) : null}
      </Box>
      {deleteFinishedCallBack ? (
        <Button onClick={deleteFinishedCallBack}>delete finished</Button>
      ) : null}
    </Stack>
  ) : null;
}
