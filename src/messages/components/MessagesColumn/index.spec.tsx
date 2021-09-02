import { screen, render } from "@testing-library/react";
import faker from "faker";

import { Message, MessagePriority } from "../../types";
import MessagesColumn, { MessageColumnProps } from ".";
import { prioritySettingsMap } from "../../settings";

const defaultProps: MessageColumnProps = {
  messages: [],
  priority: MessagePriority.Info,
};

function arrangeTest(props = defaultProps) {
  return render(<MessagesColumn {...props} />);
}

describe("<MessagesColumn />", () => {
  it("renders the correct title based on the given priority", () => {
    const priority = MessagePriority.Error;
    const props = {
      ...defaultProps,
      priority,
    };

    arrangeTest(props);

    expect(
      screen.getByText(prioritySettingsMap[priority].label)
    ).toBeInTheDocument();
  });

  it("renders the messages count", () => {
    const messages: Message[] = [
      { message: faker.lorem.sentence(), priority: MessagePriority.Info },
      { message: faker.lorem.sentence(), priority: MessagePriority.Info },
    ];
    const props = {
      ...defaultProps,
      messages,
    };

    arrangeTest(props);

    expect(screen.getByText(`Count ${messages.length}`)).toBeInTheDocument();
  });

  it("renders the given messages", () => {
    const messages: Message[] = [
      { message: faker.lorem.sentence(), priority: MessagePriority.Info },
      { message: faker.lorem.sentence(), priority: MessagePriority.Info },
    ];
    const props = {
      ...defaultProps,
      messages,
    };

    arrangeTest(props);

    expect(screen.getByText(messages[0].message)).toBeInTheDocument();
    expect(screen.getByText(messages[1].message)).toBeInTheDocument();
  });
});
