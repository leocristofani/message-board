import { useEffect } from "react";
import { Container } from "@material-ui/core";

import MessageTable from "../MessagesTable";
import { MessagePriority } from "../../types";
import MessagesControls from "../MessagesControls";
import { useMessagesApi } from "../../providers/MessagesApiProvider";
import { useMessagesState } from "../../providers/MessagesStateProvider";
import LatestPriorityMessageSnackbar from "../LatestPriorityMessageSnackbar";

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
