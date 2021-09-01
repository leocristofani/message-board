import { useRef, useState, ReactNode, useContext, createContext } from "react";

import { Message } from "../../types";
import generateMockMessages from "../../mocks/MessagesApiMock";

type OnMessage = (message: Message) => void;

export interface MessagesApiContextValue {
  start: (onMessage: OnMessage) => void;
  stop: () => void;
  stopped: boolean;
}

const defaultValue: MessagesApiContextValue = {
  start: (_: OnMessage) => {},
  stop: () => {},
  stopped: true,
};

const MessagesApiContext = createContext(defaultValue);

interface MessagesApiProviderProps {
  children: ReactNode;
}

export function MessagesApiProvider(props: MessagesApiProviderProps) {
  const unsubscribe = useRef<() => void>();
  const [stopped, setStopped] = useState(true);

  const start = (onMessage: OnMessage) => {
    if (!stopped) {
      return;
    }

    setStopped(false);
    unsubscribe.current = generateMockMessages(onMessage);
  };

  const stop = () => {
    if (!unsubscribe.current) {
      return;
    }

    setStopped(true);
    unsubscribe.current();
  };

  return (
    <MessagesApiContext.Provider value={{ start, stop, stopped }}>
      {props.children}
    </MessagesApiContext.Provider>
  );
}

export function useMessagesApi() {
  return useContext(MessagesApiContext);
}
