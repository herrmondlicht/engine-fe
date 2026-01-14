import React from "react";
import axios from "axios";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { act, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ServiceItemPriceContext } from "pages/ServicePage/ServiceItemPriceContext";
import { toBRL } from "utils";
import FinancialDetails from "./FinancialDetails";

let mockPrint;
let mockShowNotification;
let mockShowErrorNotification;

jest.mock("hooks", () => {
  const actual = jest.requireActual("hooks");
  return {
    ...actual,
    useNotification: () => ({
      showNotification: (...args) => mockShowNotification(...args),
      showErrorNotification: (...args) => mockShowErrorNotification(...args),
    }),
    usePrintServiceOrder: () => ({
      print: (...args) => mockPrint(...args),
      isValidating: false,
    }),
  };
});

const renderFinancialDetails = ({ financialData, itemsPrice }) =>
  renderWithProviders(
    <ServiceItemPriceContext.Provider value={{ itemsPrice }}>
      <FinancialDetails
        financialData={financialData}
        updateServiceData={jest.fn()}
      />
    </ServiceItemPriceContext.Provider>
  );

describe("FinancialDetails", () => {
  beforeEach(() => {
    mockPrint = jest.fn();
    mockShowNotification = jest.fn();
    mockShowErrorNotification = jest.fn();
  });

  it("renders total based on items and service price", () => {
    renderFinancialDetails({
      financialData: {
        id: 1,
        service_price: 100,
        discount_price: 10,
      },
      itemsPrice: 50,
    });

    const expectedTotal = toBRL(140);
    const totalValues = screen.getAllByText((_, node) =>
      node?.textContent
        ?.replace(/\u00a0/g, " ")
        .includes(expectedTotal.replace(/\u00a0/g, " "))
    );

    expect(totalValues.length).toBeGreaterThan(0);
  });

  it("calls print action", async () => {
    renderFinancialDetails({
      financialData: {
        id: 1,
        service_price: 0,
        discount_price: 0,
      },
      itemsPrice: 0,
    });

    await userEvent.click(
      screen.getByText("Imprimir", { selector: "button *" })
    );

    expect(mockPrint).toHaveBeenCalledTimes(1);
  });

  it("submits updates and calls updateServiceData", async () => {
    const updateServiceData = jest.fn();
    axios.mockResolvedValueOnce({ data: {} });

    renderWithProviders(
      <ServiceItemPriceContext.Provider value={{ itemsPrice: 0 }}>
        <FinancialDetails
          financialData={{ id: 1, service_price: 10, discount_price: 0 }}
          updateServiceData={updateServiceData}
        />
      </ServiceItemPriceContext.Provider>
    );

    await act(async () => {
      await userEvent.click(
        screen.getByText("Salvar Alterações", { selector: "button *" })
      );
    });

    await waitFor(() => expect(axios).toHaveBeenCalled());
    expect(updateServiceData).toHaveBeenCalled();
  });
});
