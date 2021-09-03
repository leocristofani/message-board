import { useContext } from "react";

import { MessagesStateContext } from "../../providers/MessagesStateProvider";

export default function useMessagesState() {
  return useContext(MessagesStateContext);
}
