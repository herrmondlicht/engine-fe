import { render, screen, waitFor, act } from "@testing-library/react";
import { stub, assert } from "sinon";
import { Alert } from "./Alert";
jest.useFakeTimers();

describe("Alert", () => {
  it("Renders an alert with title and message", () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";

    render(<Alert duration={5000} message={MESSAGE} title={TITLE} />);
    jest.advanceTimersByTime(1000);
    expect(screen.getByText(MESSAGE));
    expect(screen.getByText(TITLE));
  });

  it("Renders an alert with a removal button", () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";

    render(
      <Alert duration={5000} isRemovable message={MESSAGE} title={TITLE} />
    );
    expect(screen.getByRole("button")).toBeDefined();
  });

  it("Executes custom onCloseFunction when button is clicked", async () => {
    const MESSAGE = "No Vacation";
    const TITLE = "Vacation";
    const onCloseActionStub = stub();

    render(
      <Alert
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
      <Alert
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
