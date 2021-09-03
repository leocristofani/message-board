import { useState, createContext, ReactNode } from "react";

import { Message, MessagePriority } from "../../types";

interface MessagesStateContextValue {
  get: (priority: MessagePriority) => Message[];
  add: (message: Message) => void;
  remove: (message: Message) => void;
  removeAll: () => void;
  getLatest: (priority: MessagePriority) => Message | null;
}

const defaultValue: MessagesStateContextValue = {
  get: (_: MessagePriority) => [],
  add: (_: Message) => {},
  remove: (_: Message) => {},
  removeAll: () => {},
  getLatest: (_: MessagePriority) => null,
};

export const MessagesStateContext = createContext(defaultValue);

interface MessagesStateProviderProps {
  children: ReactNode;
  initialMessages?: Message[];
}

export interface MessagesByPriority {
  [priority: number]: Message[];
  latest: {
    [priority: number]: Message;
  };
}

export function MessagesStateProvider(props: MessagesStateProviderProps) {
  const [messages, setMessages] = useState<MessagesByPriority>(() =>
    loadInitialMessages(props.initialMessages || [])
  );

  const get = (priority: MessagePriority) => messages[priority] || [];

  const getLatest = (priority: MessagePriority) => messages.latest[priority];

  const add = (message: Message) => {
    setMessages((prevMessages) => {
      const nextMessages = { ...prevMessages };

      if (!nextMessages[message.priority]) {
        nextMessages[message.priority] = [];
      }

      nextMessages[message.priority].unshift(message);
      nextMessages.latest[message.priority] = message;

      return nextMessages;
    });
  };

  const remove = (message: Message) => {
    setMessages((prevMessages) => {
      const priorityMessages = [...prevMessages[message.priority]];

      if (!priorityMessages) {
        return prevMessages;
      }

      const messageIndex = priorityMessages.indexOf(message);

      priorityMessages.splice(messageIndex, 1);

      return { ...prevMessages, [message.priority]: priorityMessages };
    });
  };

  const removeAll = () => {
    setMessages({ latest: {} });
  };

  return (
    <MessagesStateContext.Provider
      value={{ get, add, remove, removeAll, getLatest }}
    >
      {props.children}
    </MessagesStateContext.Provider>
  );
}

/**
 * Helper function that transforms a message array into an object
 * that maps message priority to list of respective messages
 * or Message[] -> MessagesByPriority
 */
function loadInitialMessages(initialMessages: Message[]) {
  return initialMessages.reduce(
    (acc: MessagesByPriority, { message, priority }: Message) => {
      if (!acc[priority]) {
        acc[priority] = [];
      }
      acc[priority].unshift({ message, priority });

      return acc;
    },
    { latest: {} }
  );
}
