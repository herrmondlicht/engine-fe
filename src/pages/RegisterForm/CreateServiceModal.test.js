import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { CreateServiceModal } from "./CreateServiceModal";

jest.mock("components", () => ({
  AddServiceButton: ({ children, onServiceAdd }) => (
    <button onClick={() => onServiceAdd?.({ id: 77 })}>{children}</button>
  ),
}));

describe("CreateServiceModal", () => {
  it("navigates after service creation", async () => {
    const history = createMemoryHistory();
    const handleClose = jest.fn();

    render(
      <Router history={history}>
        <CreateServiceModal
          isOpen
          handleClose={handleClose}
          customerCarId={55}
        />
      </Router>
    );

    await userEvent.click(screen.getByText(/Adicionar Também o Serviço/i));

    expect(history.location.pathname).toBe("/services/77");
  });

  it("calls handleClose when cancel is clicked", async () => {
    const history = createMemoryHistory();
    const handleClose = jest.fn();

    render(
      <Router history={history}>
        <CreateServiceModal
          isOpen
          handleClose={handleClose}
          customerCarId={55}
        />
      </Router>
    );

    await userEvent.click(screen.getByText("Cancelar"));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
