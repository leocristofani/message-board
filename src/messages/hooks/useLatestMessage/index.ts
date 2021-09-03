import { useEffect, useState } from "react";

import useMessagesState from "../useMessagesState";
import { Message, MessagePriority } from "../../types";

export default function useLatestMessage(priority: MessagePriority) {
  const messagesState = useMessagesState();
  const [message, setMessage] = useState<Message | null>();

  useEffect(() => {
    setMessage((prevMessage) => {
      const latestMessage = messagesState.getLatest(priority);

      if (latestMessage && latestMessage !== prevMessage) {
        return latestMessage;
      }

      return prevMessage;
    });
  }, [priority, messagesState]);

  return message;
}
