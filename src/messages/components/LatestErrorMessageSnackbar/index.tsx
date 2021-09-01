import { IconButton, Snackbar } from "@material-ui/core";

import { useCallback, useState } from "react";

export default function LatestErrorMessageSnackbar() {
  const [open, setOpen] = useState(true);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  return (
    <Snackbar
      message="Here's an error message :("
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
