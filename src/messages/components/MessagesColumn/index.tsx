import { Box, Grid, Typography } from "@material-ui/core";

import { prioritySettingsMap } from "../../settings";
import { Message, MessagePriority } from "../../types";
import MessageCard from "../MessageCard";

export interface MessageColumnProps {
  messages: Message[];
  priority: MessagePriority;
}

export default function MessagesColumn(props: MessageColumnProps) {
  const prioritySettings = prioritySettingsMap[props.priority];

  return (
    <Grid item sm={4}>
      <Box mb={2} mt={2}>
        <Typography variant="h6">{prioritySettings.label}</Typography>
        <Typography variant="caption">Count {props.messages.length}</Typography>
      </Box>
      <div>
        {props.messages.map((message, index) => (
          <MessageCard key={index} message={message} />
        ))}
      </div>
    </Grid>
  );
}
