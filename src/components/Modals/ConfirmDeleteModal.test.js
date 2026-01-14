import React from "react";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ConfirmDeleteModal from "./ConfirmDeleteModal";

describe("ConfirmDeleteModal", () => {
  it("renders modal content and handles actions", async () => {
    const handleClose = jest.fn();
    const onConfirmationClick = jest.fn();

    renderWithProviders(
      <ConfirmDeleteModal
        handleClose={handleClose}
        isOpen
        onConfirmationClick={onConfirmationClick}
      />
    );

    expect(
      screen.getByText(
        "Tem certeza que quer excluir? Essa ação não poderá ser revertida"
      )
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByText("Cancelar", { selector: "button *" })
    );
    await userEvent.click(
      screen.getByText("Excluir", { selector: "button *" })
    );

    expect(handleClose).toHaveBeenCalledTimes(1);
    expect(onConfirmationClick).toHaveBeenCalledTimes(1);
  });

  it("shows loader on confirm when loading", () => {
    renderWithProviders(
      <ConfirmDeleteModal
        handleClose={() => {}}
        isOpen
        onConfirmationClick={() => {}}
        isLoading
      />
    );

    const confirmText = screen.getByText("Excluir", { selector: "button *" });
    expect(confirmText.closest("button")).toBeDisabled();
  });
});
