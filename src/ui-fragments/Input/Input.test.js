import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import { Input } from "./Input";
import userEvent from "@testing-library/user-event";

describe("Fragment/Input", () => {
  it("Renders the input", async () => {
    render(<Input />);
    expect(screen.getByRole("textbox")).toMatchSnapshot();
  });

  it("Renders the input as textarea", async () => {
    render(<Input as="textarea" />);
    expect(screen.getByRole("textbox")).toMatchSnapshot();
  });

  it("Renders the input with initial value", async () => {
    const INITIAL_VALUE = "Hey there!";
    render(<Input value={INITIAL_VALUE} onChange={e => e} />);
    expect(screen.getByRole("textbox")).toHaveValue(INITIAL_VALUE);
  });

  it("Changes the value of the input", async () => {
    const TYPE_MESSAGE = "How are you doing?";
    render(<Input />);
    const renderedInput = screen.getByRole("textbox");

    await userEvent.type(renderedInput, TYPE_MESSAGE);

    expect(renderedInput).toHaveValue(TYPE_MESSAGE);
  });

  it("Renders the label", async () => {
    const LABEL_TEXT = "How are you doing?";
    render(<Input label={LABEL_TEXT} />);
    expect(screen.getByText(LABEL_TEXT)).toBeDefined();
  });

  it("Show error indicators", async () => {
    const LABEL_TEXT = "How are you doing?";
    const ERROR_TEXT = "The computer needs you to be fine";
    render(<Input label={LABEL_TEXT} error={ERROR_TEXT} />);
    expect(screen.getByRole("textbox")).toMatchSnapshot();
    expect(screen.getByText(ERROR_TEXT)).toBeDefined();
  });
});
