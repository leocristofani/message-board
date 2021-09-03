import { useEffect } from "react";
import { Container } from "@material-ui/core";

import MessageTable from "../MessagesTable";
import { MessagePriority } from "../../types";
import MessagesControls from "../MessagesControls";
import LatestPriorityMessageSnackbar from "../LatestPriorityMessageSnackbar";
import useMessagesApi from "../../hooks/useMessagesApi";
import useMessagesState from "../../hooks/useMessagesState";

export default function Messages() {
  const messagesApi = useMessagesApi();
  const messagesState = useMessagesState();

  /**
   * Start listening for incomming messages
   */
  useEffect(() => {
    messagesApi.start(messagesState.add);

    return messagesApi.stop;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <LatestPriorityMessageSnackbar priority={MessagePriority.Error} />
      <Container maxWidth="lg">
        <MessagesControls />
        <MessageTable />
      </Container>
    </>
  );
}
