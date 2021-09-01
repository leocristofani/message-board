import { CssBaseline } from "@material-ui/core";

import AppThemeProvider from "./providers/AppThemeProvider";
import Messages from "../messages/components/Messages";
import { MessagesApiProvider } from "../messages/providers/MessagesApiProvider";
import { MessagesStateProvider } from "../messages/providers/MessagesStateProvider";

export default function App() {
  return (
    <>
      <CssBaseline />
      <AppThemeProvider>
        <MessagesApiProvider>
          <MessagesStateProvider>
            <Messages />
          </MessagesStateProvider>
        </MessagesApiProvider>
      </AppThemeProvider>
    </>
  );
}
