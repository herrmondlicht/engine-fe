import { render, screen, waitFor } from "@testing-library/react";
import { stub, assert } from "sinon";
import { Notification } from "./Notification";
jest.useFakeTimers();

describe("Notification", () => {
  it("Renders an Notification with title and message", () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";

    render(<Notification duration={5000} message={MESSAGE} title={TITLE} />);
    jest.advanceTimersByTime(1000);
    expect(screen.getByText(MESSAGE));
    expect(screen.getByText(TITLE));
  });

  it("Renders a Notification with a removal button", () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";

    render(
      <Notification
        duration={5000}
        isRemovable
        message={MESSAGE}
        title={TITLE}
      />
    );
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("Executes custom onCloseFunction when button is clicked", async () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";
    const onCloseActionStub = stub();

    render(
      <Notification
        duration={5000}
        isRemovable
        onCloseAction={onCloseActionStub}
        message={MESSAGE}
        title={TITLE}
      />
    );
    jest.advanceTimersByTime(1000);
    screen.getByRole("button").click();

    jest.runAllTimers();
    waitFor(() => assert.calledOnce(onCloseActionStub));
  });

  it("Executes custom onCloseFunction when timeout is reached", async () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";
    const onCloseActionStub = stub();

    render(
      <Notification
        duration={5000}
        isRemovable
        onCloseAction={onCloseActionStub}
        message={MESSAGE}
        title={TITLE}
      />
    );

    jest.runAllTimers();
    waitFor(() => assert.calledOnce(onCloseActionStub));
  });
});
