import { Grid } from "@material-ui/core";

import { MessagePriority } from "../../types";
import MessagesColumn from "../MessagesColumn";
import { useMessagesState } from "../../providers/MessagesStateProvider";

export default function MessageTable() {
  const messagesState = useMessagesState();

  return (
    <Grid container spacing={2}>
      {[MessagePriority.Error, MessagePriority.Warn, MessagePriority.Info].map(
        (priority) => (
          <MessagesColumn
            key={priority}
            priority={priority}
            messages={messagesState.get(priority)}
          />
        )
      )}
    </Grid>
  );
}
