import { Button } from "@material-ui/core";

import useMessagesApi from "../../hooks/useMessagesApi";
import useMessagesState from "../../hooks/useMessagesState";

export default function IncommingMessagesToggle() {
  const messagesApi = useMessagesApi();
  const messagesState = useMessagesState();

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
      onClick={toggleIncommingMessages}
    >
      {messagesApi.stopped ? "Start" : "Stop"}
    </Button>
  );
}
