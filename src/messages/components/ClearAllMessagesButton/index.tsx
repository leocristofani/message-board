import { Button } from "@material-ui/core";

import useMessagesState from "../../hooks/useMessagesState";

export default function ClearAllMessagesButton() {
  const messagesState = useMessagesState();

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      onClick={messagesState.removeAll}
    >
      Clear
    </Button>
  );
}
