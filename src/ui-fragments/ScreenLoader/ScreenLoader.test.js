import { render, screen } from "@testing-library/react";
import { stub, assert } from "sinon";
import { ScreenLoader } from "./ScreenLoader";

describe("ScreenLoader", () => {
  it("Renders the component", () => {
    const testId = "child";

    render(
      <ScreenLoader>
        <div data-testid="child"></div>
      </ScreenLoader>
    );
    expect(screen.getByTestId(testId));
  });

  it("renders loader on top of children when isLoading is set", () => {
    render(
      <ScreenLoader isLoading>
        <button></button>
      </ScreenLoader>
    );

    expect(screen.getByTestId("ScreenLoader_loader")).toBeDefined();
  });
});
