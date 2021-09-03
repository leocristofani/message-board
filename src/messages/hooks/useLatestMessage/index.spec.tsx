import faker from "faker";
import { ReactNode, useEffect } from "react";
import { renderHook } from "@testing-library/react-hooks";

import useLatestMessage from ".";
import { Message, MessagePriority } from "../../types";
import useMessagesState from "../useMessagesState";
import { MessagesStateProvider } from "../../providers/MessagesStateProvider";

function arrangeTest(priority: MessagePriority, latestMessage: Message) {
  return renderHook(
    () => {
      const messagesState = useMessagesState();

      /**
       * The useLatestMessage hook depends on new messages being added
       * to the MessagesStateProvider by the useMessagesState hook in
       * order to get a latest priority message.
       */
      useEffect(() => {
        messagesState.add(latestMessage);
      }, []); // eslint-disable-line react-hooks/exhaustive-deps

      return useLatestMessage(priority);
    },
    {
      wrapper: (props: { children: ReactNode }) => (
        <MessagesStateProvider>{props.children}</MessagesStateProvider>
      ),
    }
  );
}

describe("useLatestMessage", () => {
  it("returns the latest error message", () => {
    const errorMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    const { result } = arrangeTest(MessagePriority.Error, errorMessage);

    expect(result.current?.message).toEqual(errorMessage.message);
  });

  it("ignores other priority messages", () => {
    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest(MessagePriority.Error, infoMessage);

    expect(result.current).toEqual(undefined);
  });
});
