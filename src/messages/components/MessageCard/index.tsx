import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  Typography,
} from "@material-ui/core";

import { Message } from "../../types";
import { prioritySettingsMap } from "../../settings";
import { useMessagesState } from "../../providers/MessagesStateProvider";

export interface MessageCardProps {
  message: Message;
}

export default function MessageCard(props: MessageCardProps) {
  const messagesState = useMessagesState();
  const prioritySettings = prioritySettingsMap[props.message.priority];

  return (
    <Fade in>
      <Card
        style={{ backgroundColor: prioritySettings.color, marginBottom: 16 }}
      >
        <CardContent>
          <Typography>{props.message.message}</Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => messagesState.remove(props.message)}
          >
            Clear
          </Button>
        </CardActions>
      </Card>
    </Fade>
  );
}
