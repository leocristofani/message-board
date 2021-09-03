import faker from "faker";
import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import LatestPriorityMessageSnackbar, {
  LatestPriorityMessageSnackbarProps,
} from ".";
import { Message, MessagePriority } from "../../types";
import useLatestMessage from "../../hooks/useLatestMessage";
jest.mock("../../hooks/useLatestMessage");

const defaultProps: LatestPriorityMessageSnackbarProps = {
  priority: MessagePriority.Error,
};

function arrangeTest(props = defaultProps) {
  return render(<LatestPriorityMessageSnackbar {...props} />);
}

describe("<LatestPriorityMessageSnackbar />", () => {
  it("shows the latest priority message", () => {
    const priority = MessagePriority.Error;
    const props = { ...defaultProps, priority };

    const latestMessage: Message = {
      message: faker.lorem.sentence(),
      priority,
    };

    (useLatestMessage as jest.Mock).mockReturnValue(latestMessage);

    arrangeTest(props);

    expect(screen.getByText(latestMessage.message)).toBeInTheDocument();
  });

  it("hides the latest priority message", async () => {
    const priority = MessagePriority.Error;
    const props = { ...defaultProps, priority };

    const latestMessage: Message = {
      message: faker.lorem.sentence(),
      priority,
    };

    (useLatestMessage as jest.Mock).mockReturnValue(latestMessage);

    arrangeTest(props);

    fireEvent.click(screen.getByLabelText("Close message"));

    await waitForElementToBeRemoved(screen.getByText(latestMessage.message));
  });
});
