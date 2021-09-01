import { CssBaseline } from "@material-ui/core";

import Messages from "../messages/components/Messages";
import AppThemeProvider from "./providers/AppThemeProvider";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppThemeProvider>
        <Messages />
      </AppThemeProvider>
    </>
  );
}
