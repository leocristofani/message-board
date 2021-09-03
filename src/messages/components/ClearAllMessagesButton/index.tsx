import { Button } from "@material-ui/core";

import useStyles from "./index.styles";
import useMessagesState from "../../hooks/useMessagesState";

export default function ClearAllMessagesButton() {
  const messagesState = useMessagesState();

  const styles = useStyles();

  return (
    <Button
      size="small"
      color="primary"
      variant="contained"
      className={styles.root}
      onClick={messagesState.removeAll}
    >
      Clear
    </Button>
  );
}
