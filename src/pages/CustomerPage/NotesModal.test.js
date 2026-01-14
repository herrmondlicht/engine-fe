import React from "react";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { NotesModal } from "./NotesModal";

describe("NotesModal", () => {
  it("renders when notes are present and closes on action", async () => {
    const setNote = jest.fn();

    renderWithProviders(<NotesModal notes="Alguma nota" setNote={setNote} />);

    expect(screen.getByText("Alguma nota")).toBeInTheDocument();

    await userEvent.click(screen.getByText("Fechar"));

    expect(setNote).toHaveBeenCalledWith(null);
  });
});
