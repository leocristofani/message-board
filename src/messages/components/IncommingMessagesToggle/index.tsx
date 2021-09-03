import { Button } from "@material-ui/core";

import useStyles from "./index.styles";
import useMessagesApi from "../../hooks/useMessagesApi";
import useMessagesState from "../../hooks/useMessagesState";

export default function IncommingMessagesToggle() {
  const messagesApi = useMessagesApi();
  const messagesState = useMessagesState();

  const styles = useStyles();

  const toggleIncommingMessages = () => {
    if (messagesApi.stopped) {
      messagesApi.start(messagesState.add);
    } else {
      messagesApi.stop();
    }
  };

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      className={styles.root}
      onClick={toggleIncommingMessages}
    >
      {messagesApi.stopped ? "Start" : "Stop"}
    </Button>
  );
}
