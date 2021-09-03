import faker from "faker";
import { screen, render, fireEvent } from "@testing-library/react";

import MessageCard, { MessageCardProps } from ".";
import { MessagePriority } from "../../types";
import useMessagesState from "../../hooks/useMessagesState";
jest.mock("../../hooks/useMessagesState");

const defaultProps: MessageCardProps = {
  message: {
    message: faker.lorem.sentence(),
    priority: MessagePriority.Warn,
  },
};

function arrangeTest(props = defaultProps) {
  return render(<MessageCard {...props} />);
}

describe("<MessageCard />", () => {
  it("shows the given message", () => {
    const message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    const props = { ...defaultProps, message };

    arrangeTest(props);

    expect(screen.getByText(message.message)).toBeInTheDocument();
  });

  it("clears the given message", () => {
    const message = {
      message: faker.lorem.sentence(),
      priority: MessagePriority.Error,
    };

    const remove = jest.fn();

    const props = { ...defaultProps, message };

    (useMessagesState as jest.Mock).mockReturnValue({
      remove,
    });

    arrangeTest(props);

    fireEvent.click(screen.getByText("Clear"));

    expect(remove).toHaveBeenCalledTimes(1);
    expect(remove).toHaveBeenCalledWith(message);
  });
});
