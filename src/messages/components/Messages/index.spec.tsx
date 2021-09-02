import faker from "faker";
import { screen, render } from "@testing-library/react";

import Messages from ".";
import { MessagePriority } from "../../types";

import { useMessagesApi } from "../../providers/MessagesApiProvider";
import {
  useLatestMessage,
  useMessagesState,
} from "../../providers/MessagesStateProvider";
jest.mock("../../providers/MessagesApiProvider");
jest.mock("../../providers/MessagesStateProvider");

function arrangeTest() {
  return render(<Messages />);
}

/**
 * Visual Integration Tests
 */
describe("<Messages />", () => {
  it("starts listening to incomming messages from the api", () => {
    const start = jest.fn();
    const add = jest.fn();

    (useMessagesApi as jest.Mock).mockReturnValue({ start });
    (useMessagesState as jest.Mock).mockReturnValue({ add, get: () => [] });

    arrangeTest();

    expect(start).toHaveBeenCalledTimes(1);
    expect(start).toHaveBeenCalledWith(add);
  });

  it("renders the latest error message", () => {
    const message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    (useMessagesApi as jest.Mock).mockReturnValue({ start: jest.fn() });
    (useMessagesState as jest.Mock).mockReturnValue({ get: () => [] });
    (useLatestMessage as jest.Mock).mockReturnValue(message);

    arrangeTest();

    expect(screen.getByText(message.message)).toBeInTheDocument();
  });

  it("renders the messages controls", () => {
    (useMessagesApi as jest.Mock).mockReturnValue({ start: jest.fn() });
    (useMessagesState as jest.Mock).mockReturnValue({ get: () => [] });

    arrangeTest();

    expect(screen.getByText("Stop")).toBeInTheDocument();
    expect(screen.getByText("Clear")).toBeInTheDocument();
  });

  it("renders the messages table", () => {
    const infoMessage = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    (useMessagesApi as jest.Mock).mockReturnValue({ start: jest.fn() });
    (useMessagesState as jest.Mock).mockReturnValue({
      get: (priority: MessagePriority) =>
        priority === MessagePriority.Info ? [infoMessage] : [],
    });

    arrangeTest();

    expect(
      screen.getByText("Error Type 1").parentElement?.textContent
    ).toContain("Count 0");

    expect(
      screen.getByText("Warn Type 2").parentElement?.textContent
    ).toContain("Count 0");

    expect(
      screen.getByText("Info Type 3").parentElement?.textContent
    ).toContain("Count 1");

    expect(screen.getByText(infoMessage.message)).toBeInTheDocument();
  });
});
