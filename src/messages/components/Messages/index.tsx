import { Container } from "@material-ui/core";

import LatestErrorMessageSnackbar from "../LatestErrorMessageSnackbar";
import MessagesControls from "../MessagesControls";
import MessageTable from "../MessagesTable";

export default function Messages() {
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
