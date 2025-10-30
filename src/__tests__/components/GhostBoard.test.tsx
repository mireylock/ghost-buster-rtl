import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { GhostBoard } from "../../components/GhostBoard";

jest.useFakeTimers();

describe("GhostBoard", () => {
  beforeEach(() => {
    jest.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("renders a 3x3 board", () => {
    render(<GhostBoard />);
    const buttons = screen.getAllByRole("button");
    expect(buttons).toHaveLength(9);
    buttons.forEach((btn) => expect(btn).toHaveTextContent("❓"));
  });

  it("shows game over if clicks empty button", async () => {
    render(<GhostBoard />);
    const emptyButton = screen.getAllByText("❓")[0];
    userEvent.click(emptyButton);
    expect(window.alert).toHaveBeenCalledWith("Not a ghost! Game over");
  });

  it("increments +1 score when ghost is busted", async () => {
    render(<GhostBoard />);
    jest.advanceTimersByTime(1500);
    const ghostButton = await screen.findByText("👻");
    userEvent.click(ghostButton);
    expect(screen.getByText("Ghosts busted: 1")).toBeInTheDocument();

    jest.advanceTimersByTime(1500);
    const ghostButton2 = await screen.findByText("👻");
    userEvent.click(ghostButton2);
    expect(screen.getByText("Ghosts busted: 2")).toBeInTheDocument();
  });
});
