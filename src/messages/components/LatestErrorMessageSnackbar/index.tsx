import { useState } from "react";
import { IconButton, Snackbar } from "@material-ui/core";

import { Message, MessagePriority } from "../../types";
import { useLatestMessage } from "../../providers/MessagesStateProvider";

export default function LatestErrorMessageSnackbar() {
  const [errorMessage, setErrorMessage] = useState<Message | null>(null);

  const resetErrorMessage = () => {
    setErrorMessage(null);
  };

  useLatestMessage({
    onMessage: setErrorMessage,
    priority: MessagePriority.Error,
  });

  return (
    <Snackbar
      message={errorMessage?.message}
      open={!!errorMessage}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={
        <IconButton
          size="small"
          color="inherit"
          onClick={resetErrorMessage}
          aria-label="Close message"
        >
          &times;
        </IconButton>
      }
      onClose={resetErrorMessage}
      autoHideDuration={2000}
    />
  );
}
