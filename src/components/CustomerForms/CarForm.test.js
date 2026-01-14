import React from "react";
import axios from "axios";
import useSWR from "swr";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "test-utils/renderWithProviders";
import { ERROR_CODES } from "utils";
import { CarForm } from "./CarForm";

jest.mock("swr", () => {
  const actual = jest.requireActual("swr");
  return {
    __esModule: true,
    default: jest.fn(),
    SWRConfig: actual.SWRConfig,
  };
});

afterEach(() => {
  useSWR.mockReset();
});

const renderCarForm = props =>
  renderWithProviders(
    <CarForm
      loadedData={{
        cars: null,
        customer_cars: null,
        customers: { id: 1 },
        ...(props?.loadedData || {}),
      }}
      onSubmitAction={props?.onSubmitAction}
    />
  );

describe("CarForm", () => {
  it("shows validation error when required fields are missing", async () => {
    useSWR.mockReturnValue({ data: { data: [] }, isValidating: false });

    renderCarForm();

    await userEvent.click(
      screen.getByRole("button", { name: /Registrar Veículo/i })
    );

    await waitFor(() =>
      expect(screen.getByText("Campo obrigatório")).toBeInTheDocument()
    );
  });

  it("submits and calls onSubmitAction", async () => {
    const onSubmitAction = jest.fn();
    useSWR.mockReturnValue({ data: { data: [] }, isValidating: false });
    axios
      .mockResolvedValueOnce({ data: { data: { id: 10 } } })
      .mockResolvedValueOnce({ data: { data: { id: 20 } } });

    renderCarForm({ onSubmitAction });

    await userEvent.type(screen.getByLabelText("Placa"), "ABC1234");
    await userEvent.type(screen.getByLabelText("Marca"), "Ford");
    await userEvent.type(screen.getByLabelText("Modelo"), "Fiesta");
    await userEvent.type(screen.getByLabelText("Ano"), "2020");
    await userEvent.type(screen.getByLabelText("Combustível"), "Gasolina");

    await userEvent.click(
      screen.getByRole("button", { name: /Registrar Veículo/i })
    );

    await waitFor(() => expect(onSubmitAction).toHaveBeenCalled());
  });

  it("shows duplicate plate error notification", async () => {
    useSWR.mockReturnValue({ data: { data: [] }, isValidating: false });
    axios
      .mockResolvedValueOnce({ data: { data: { id: 10 } } })
      .mockRejectedValueOnce({
        response: { data: { code: ERROR_CODES.DUP00001 } },
      });

    renderCarForm();

    await userEvent.type(screen.getByLabelText("Placa"), "ABC1234");
    await userEvent.type(screen.getByLabelText("Marca"), "Ford");
    await userEvent.type(screen.getByLabelText("Modelo"), "Fiesta");
    await userEvent.type(screen.getByLabelText("Ano"), "2020");
    await userEvent.type(screen.getByLabelText("Combustível"), "Gasolina");

    await userEvent.click(
      screen.getByRole("button", { name: /Registrar Veículo/i })
    );

    await waitFor(() =>
      expect(screen.getByText("Veículo já cadastrado")).toBeInTheDocument()
    );
  });
});
