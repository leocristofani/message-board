import { useEffect, useState } from "react";
import { IconButton, Snackbar } from "@material-ui/core";

import { MessagePriority } from "../../types";
import useLatestMessage from "../../hooks/useLatestMessage";

export interface LatestPriorityMessageSnackbarProps {
  priority: MessagePriority;
}

export default function LatestPriorityMessageSnackbar(
  props: LatestPriorityMessageSnackbarProps
) {
  const [open, setOpen] = useState(false);

  const onClose = () => setOpen(false);

  const latestMessage = useLatestMessage(props.priority);

  useEffect(() => {
    if (latestMessage) {
      setOpen(true);
    }
  }, [latestMessage]);

  return (
    <Snackbar
      message={latestMessage?.message}
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      action={
        <IconButton
          size="small"
          color="inherit"
          onClick={onClose}
          aria-label="Close message"
        >
          &times;
        </IconButton>
      }
      onClose={onClose}
      autoHideDuration={2000}
    />
  );
}
