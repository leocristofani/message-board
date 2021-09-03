import { useContext } from "react";

import { MessagesApiContext } from "../../providers/MessagesApiProvider";

export default function useMessagesApi() {
  return useContext(MessagesApiContext);
}
