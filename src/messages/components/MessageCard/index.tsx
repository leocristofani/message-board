import {
  Button,
  Card,
  CardActions,
  CardContent,
  Fade,
  Typography,
} from "@material-ui/core";

import useStyles from "./index.styles";

import { Message } from "../../types";
import { prioritySettingsMap } from "../../settings";
import useMessagesState from "../../hooks/useMessagesState";

export interface MessageCardProps {
  message: Message;
}

export default function MessageCard(props: MessageCardProps) {
  const messagesState = useMessagesState();
  const prioritySettings = prioritySettingsMap[props.message.priority];

  const styles = useStyles({ bgColor: prioritySettings.color });

  return (
    <Fade in>
      <Card className={styles.root}>
        <CardContent className={styles.content}>
          <Typography>{props.message.message}</Typography>
        </CardContent>
        <CardActions className={styles.actions}>
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
