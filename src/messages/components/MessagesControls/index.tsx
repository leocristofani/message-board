import { Box, Grid } from "@material-ui/core";

import ClearAllMessagesButton from "../ClearAllMessagesButton";
import IncommingMessagesToggle from "../IncommingMessagesToggle";

export default function MessagesControls() {
  return (
    <Box mt={2}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <IncommingMessagesToggle />
        </Grid>
        <Grid item>
          <ClearAllMessagesButton />
        </Grid>
      </Grid>
    </Box>
  );
}
