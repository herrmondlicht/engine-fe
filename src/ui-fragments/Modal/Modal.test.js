import React from "react";
import { render, screen } from "@testing-library/react";

import { Modal } from "./Modal";

describe("Modal", () => {
  it("renders title and content when open", () => {
    render(
      <Modal isOpen handleClose={() => {}} title="Test Title">
        <div>Modal Content</div>
      </Modal>
    );

    expect(screen.getByText("Test Title")).toBeInTheDocument();
    expect(screen.getByText("Modal Content")).toBeInTheDocument();
  });

  it("does not render content when closed", () => {
    render(
      <Modal isOpen={false} handleClose={() => {}} title="Hidden">
        <div>Hidden Content</div>
      </Modal>
    );

    expect(screen.queryByText("Hidden Content")).toBeNull();
  });
});
