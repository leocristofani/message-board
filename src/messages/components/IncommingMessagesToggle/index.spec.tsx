import { screen, render, fireEvent } from "@testing-library/react";

import IncommingMessagesToggle from ".";

import { useMessagesApi } from "../../providers/MessagesApiProvider";
jest.mock("../../providers/MessagesApiProvider");

function arrangeTest() {
  return render(<IncommingMessagesToggle />);
}

describe("<IncommingMessagesToggle />", () => {
  it("stops incomming messages", () => {
    const stop = jest.fn();

    (useMessagesApi as jest.Mock).mockReturnValue({
      stop,
      start: jest.fn(),
      stopped: false,
    });

    arrangeTest();

    fireEvent.click(screen.getByText("Stop"));

    expect(stop).toHaveBeenCalledTimes(1);
  });

  it("starts incomming messages", () => {
    const start = jest.fn();

    (useMessagesApi as jest.Mock).mockReturnValue({
      start,
      stop: jest.fn(),

      stopped: true,
    });

    arrangeTest();

    fireEvent.click(screen.getByText("Start"));

    expect(start).toHaveBeenCalledTimes(1);
  });
});
