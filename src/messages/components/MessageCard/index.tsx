import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@material-ui/core";

import { Message } from "../../types";
import { prioritySettingsMap } from "../../settings";

export interface MessageCardProps {
  message: Message;
}

export default function MessageCard(props: MessageCardProps) {
  const prioritySettings = prioritySettingsMap[props.message.priority];

  return (
    <Card style={{ backgroundColor: prioritySettings.color, marginBottom: 16 }}>
      <CardContent>
        <Typography>{props.message.message}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Clear</Button>
      </CardActions>
    </Card>
  );
}
