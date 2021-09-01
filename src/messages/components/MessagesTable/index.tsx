import { Grid } from "@material-ui/core";

import { MessagePriority } from "../../types";
import MessagesColumn from "../MessagesColumn";

export default function MessageTable() {
  return (
    <Grid container spacing={2}>
      {[MessagePriority.Error, MessagePriority.Warn, MessagePriority.Info].map(
        (priority) => (
          <MessagesColumn
            key={priority}
            priority={priority}
            messages={[{ message: "Text goes here", priority }]}
          />
        )
      )}
    </Grid>
  );
}
