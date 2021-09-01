import { useEffect } from "react";
import { Container } from "@material-ui/core";

import { useMessagesApi } from "../../providers/MessagesApiProvider";
import { useMessagesState } from "../../providers/MessagesStateProvider";

import LatestErrorMessageSnackbar from "../LatestErrorMessageSnackbar";
import MessagesControls from "../MessagesControls";
import MessageTable from "../MessagesTable";

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
      <LatestErrorMessageSnackbar />
      <Container maxWidth="lg">
        <MessagesControls />
        <MessageTable />
      </Container>
    </>
  );
}
