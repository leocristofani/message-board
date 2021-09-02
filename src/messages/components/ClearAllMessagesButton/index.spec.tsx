import { fireEvent, render, screen } from "@testing-library/react";

import ClearAllMessagesButton from ".";

import { useMessagesState } from "../../providers/MessagesStateProvider";
jest.mock("../../providers/MessagesStateProvider");

function arrangeTest() {
  return render(<ClearAllMessagesButton />);
}

describe("<ClearAllMessagesButton />", () => {
  it("clears all messages", () => {
    const removeAll = jest.fn();

    (useMessagesState as jest.Mock).mockReturnValue({
      removeAll,
    });

    arrangeTest();

    fireEvent.click(screen.getByText("Clear"));

    expect(removeAll).toHaveBeenCalledTimes(1);
  });
});
