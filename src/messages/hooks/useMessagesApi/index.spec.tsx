import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react-hooks";

import useMessagesApi from ".";
import { Message } from "../../types";
import { MessagesApiProvider } from "../../providers/MessagesApiProvider";

function arrangeTest(
  messageGenerator: (callback: (message: Message) => void) => () => void
) {
  return renderHook(() => useMessagesApi(), {
    wrapper: (props: { children: ReactNode }) => (
      <MessagesApiProvider generateMessages={messageGenerator}>
        {props.children}
      </MessagesApiProvider>
    ),
  });
}

describe("useMessagesApi", () => {
  it("starts listening for incomming messages", () => {
    const messageGenerator = jest.fn();
    const onMessage = jest.fn();

    const { result } = arrangeTest(messageGenerator);

    act(() => {
      result.current.start(onMessage);
    });

    expect(result.current.stopped).toEqual(false);
    expect(messageGenerator).toHaveBeenCalledTimes(1);
    expect(messageGenerator).toHaveBeenCalledWith(onMessage);
  });

  it("stops listening for incomming messages", () => {
    const unsubscribe = jest.fn();
    const messageGenerator = jest.fn().mockReturnValue(unsubscribe);
    const onMessage = jest.fn();

    const { result } = arrangeTest(messageGenerator);

    act(() => {
      result.current.start(onMessage);
      result.current.stop();
    });

    expect(result.current.stopped).toEqual(true);
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });
});
