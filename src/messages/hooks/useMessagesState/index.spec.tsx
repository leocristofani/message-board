import faker from "faker";
import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import { Message, MessagePriority } from "../../types";
import useMessagesState from ".";
import { MessagesStateProvider } from "../../providers/MessagesStateProvider";

function arrangeTest(initialMessages: Message[] = []) {
  return renderHook(() => useMessagesState(), {
    wrapper: (props: { children: ReactNode }) => (
      <MessagesStateProvider initialMessages={initialMessages}>
        {props.children}
      </MessagesStateProvider>
    ),
  });
}

describe("useMessagesState", () => {
  it("loads the initial messages", () => {
    const errorMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest([errorMessage, infoMessage]);

    expect(result.current.get(MessagePriority.Error)).toEqual([errorMessage]);
    expect(result.current.get(MessagePriority.Info)).toEqual([infoMessage]);
  });

  it("gets messages by priority", () => {
    const errorMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest([errorMessage, infoMessage]);

    expect(result.current.get(MessagePriority.Info)).toEqual([infoMessage]);
  });

  it("gets the latest priority message", () => {
    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest();

    act(() => {
      result.current.add(infoMessage);
    });

    expect(result.current.getLatest(MessagePriority.Info)).toEqual(infoMessage);
  });

  it("adds a message in the correct order", () => {
    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const infoMessage2: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest();

    act(() => {
      result.current.add(infoMessage);
      result.current.add(infoMessage2);
    });

    expect(result.current.get(MessagePriority.Info)).toEqual([
      infoMessage2,
      infoMessage,
    ]);
  });

  it("removes a message", () => {
    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest([infoMessage]);

    act(() => {
      result.current.remove(infoMessage);
    });

    expect(result.current.get(MessagePriority.Info)).toEqual([]);
  });

  it("removes all messages", () => {
    const errorMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    const infoMessage: Message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Info,
    };

    const { result } = arrangeTest([errorMessage, infoMessage]);

    act(() => {
      result.current.removeAll();
    });

    expect(result.current.get(MessagePriority.Error)).toEqual([]);
    expect(result.current.get(MessagePriority.Info)).toEqual([]);
  });
});
