import React from "react";
import axios from "axios";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "test-utils/renderWithProviders";
import RegisterForm from "./RegisterForm";

jest.mock("components", () => ({
  CustomerForm: () => <div data-testid="CustomerForm" />,
  CarForm: ({ onSubmitAction }) => (
    <div>
      <button onClick={() => onSubmitAction?.({ id: 123 })}>
        Mock CarForm Submit
      </button>
      <div data-testid="CarForm" />
    </div>
  ),
  AddServiceButton: ({ children, onServiceAdd }) => (
    <button onClick={() => onServiceAdd?.({ id: 999 })}>{children}</button>
  ),
}));

describe("RegisterForm", () => {
  it("loads data when customer car id is provided", async () => {
    axios.mockResolvedValueOnce({
      data: {
        data: {
          cars: { id: 10 },
          customer_cars: { id: 20 },
          customers: { id: 30 },
        },
      },
    });

    renderWithProviders(<RegisterForm />, {
      route: "/customer_car/20",
      path: "/customer_car/:customer_car_id",
    });

    await waitFor(() =>
      expect(screen.getByTestId("CarForm")).toBeInTheDocument()
    );
  });

  it("shows error notification when load fails", async () => {
    axios.mockRejectedValueOnce({ response: { data: { message: "boom" } } });

    renderWithProviders(<RegisterForm />, {
      route: "/customer_car/20",
      path: "/customer_car/:customer_car_id",
    });

    await waitFor(() =>
      expect(
        screen.getByText("Não foi possível carregar os dados desse cliente")
      ).toBeInTheDocument()
    );
  });

  it("opens modal after successful submit action", async () => {
    axios.mockResolvedValueOnce({
      data: {
        data: {
          cars: { id: 10 },
          customer_cars: { id: 20 },
          customers: { id: 30 },
        },
      },
    });

    renderWithProviders(<RegisterForm />, {
      route: "/customer_car/20",
      path: "/customer_car/:customer_car_id",
    });

    await waitFor(() =>
      expect(screen.getByTestId("CarForm")).toBeInTheDocument()
    );

    await userEvent.click(
      screen.getByRole("button", { name: "Mock CarForm Submit" })
    );

    await waitFor(() =>
      expect(screen.getByText("Cliente Adicionado")).toBeInTheDocument()
    );
  });
});
