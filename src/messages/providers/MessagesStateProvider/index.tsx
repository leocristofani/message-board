import {
  useState,
  useEffect,
  useContext,
  createContext,
  ReactNode,
} from "react";

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

const MessagesStateContext = createContext(defaultValue);

interface MessagesStateProviderProps {
  children: ReactNode;
}

export interface MessagesByPriority {
  [priority: number]: Message[];
  latest: {
    [priority: number]: Message;
  };
}

export function MessagesStateProvider(props: MessagesStateProviderProps) {
  const [messages, setMessages] = useState<MessagesByPriority>({ latest: {} });

  const get = (priority: MessagePriority) => messages[priority] || [];

  const getLatest = (priority: MessagePriority) => messages.latest[priority];

  const add = (message: Message) => {
    setMessages((prevMessages) => {
      const nextMessages = { ...prevMessages };

      if (!nextMessages[message.priority]) {
        nextMessages[message.priority] = [];
      }

      nextMessages[message.priority].push(message);
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

export function useMessagesState() {
  return useContext(MessagesStateContext);
}

export function useLatestMessage(priority: MessagePriority) {
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
