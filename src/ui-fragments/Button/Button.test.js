import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { assert, stub } from "sinon";

import { Button, BUTTON_COMPONENT } from "./Button";

describe("Button", () => {
  it("should render a Button", async () => {
    render(<Button>Text</Button>);
    expect(screen.getByRole("button")).toMatchSnapshot();
  });

  it("Renders the Button as link ", async () => {
    render(
      <BrowserRouter>
        <Button as={BUTTON_COMPONENT.LINK} href="/">
          Text
        </Button>
      </BrowserRouter>
    );
    expect(screen.getByRole("link")).toMatchSnapshot();
  });

  it("Renders a disabled button ", async () => {
    const onClickStub = stub();
    render(
      <Button onClick={onClickStub} disabled>
        Text
      </Button>
    );
    expect(screen.getByRole("button")).toBeDisabled();
    screen.getByRole("button").click();

    assert.notCalled(onClickStub);
  });

  it("Executes the onClick when clicked", async () => {
    const onClickStub = stub();
    render(<Button onClick={onClickStub}>Text</Button>);
    expect(screen.getByRole("button")).toBeEnabled();
    screen.getByRole("button").click();
    assert.calledOnce(onClickStub);
  });

  it("Renders a button when showLoader is active", async () => {
    render(<Button showLoader>Text</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
    expect(screen.getByRole("button")).toMatchSnapshot();
  });
});
