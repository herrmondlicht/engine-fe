import React from "react";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "test-utils/renderWithProviders";
import { CustomerForm } from "./CustomerForm";

describe("CustomerForm", () => {
  it("shows validation error when name is missing", async () => {
    renderWithProviders(<CustomerForm loadedCustomer={null} />);

    await act(async () => {
      await userEvent.click(
        screen.getByRole("button", { name: /Registrar Cliente/i })
      );
    });

    await waitFor(() =>
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument()
    );
  });
});
