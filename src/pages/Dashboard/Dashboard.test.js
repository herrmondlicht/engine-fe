import React from "react";
import useSWR from "swr";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { act, fireEvent, screen, waitFor } from "@testing-library/react";
import { toBRL } from "utils";

import Dashboard from "./Dashboard";

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

describe("Dashboard", () => {
  const currencyMatcher = value => {
    const normalizedValue = value.replace(/\u00a0/g, " ");
    return (_, node) =>
      node?.textContent?.replace(/\u00a0/g, " ").includes(normalizedValue);
  };

  it("shows loader when data is missing", () => {
    useSWR.mockReturnValue({ data: undefined, isValidating: false });

    renderWithProviders(<Dashboard />);

    expect(screen.getByTestId("ScreenLoader_loader")).toBeInTheDocument();
  });

  it("renders report cards when data is available", () => {
    useSWR.mockReturnValue({
      data: {
        data: [
          {
            month: 1,
            year: 2024,
            service_price: 1000,
            service_items_price: 200,
          },
        ],
      },
      isValidating: false,
    });

    renderWithProviders(<Dashboard />);

    expect(screen.getByText("Total M. Obra")).toBeInTheDocument();
    expect(screen.getByText("Total de Peças")).toBeInTheDocument();
    expect(
      screen.getByText(currencyMatcher(toBRL(1000)), { selector: "p" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(currencyMatcher(toBRL(200)), { selector: "p" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Evolução financeira: YTD" })
    ).toBeInTheDocument();
  });

  it("changes the financial chart period", () => {
    useSWR.mockReturnValue({
      data: {
        data: [
          {
            month: 1,
            year: 2024,
            service_price: 1000,
            service_items_price: 200,
          },
          {
            month: 2,
            year: 2024,
            service_price: 1200,
            service_items_price: 250,
          },
        ],
      },
      isValidating: false,
    });

    renderWithProviders(<Dashboard />);

    fireEvent.click(screen.getByRole("button", { name: "6 meses" }));

    expect(
      screen.getByRole("group", { name: "Evolução financeira: 6 meses" })
    ).toBeInTheDocument();
  });

  it("shows financial values when a chart point is hovered or tapped", () => {
    useSWR.mockReturnValue({
      data: {
        data: [
          {
            month: 1,
            year: 2024,
            service_price: 1000,
            service_items_price: 200,
          },
        ],
      },
      isValidating: false,
    });

    renderWithProviders(<Dashboard />);

    const chartPoint = screen.getByRole("button", {
      name: "Ver dados de JAN 2024",
    });
    fireEvent.touchStart(chartPoint);

    expect(screen.getByTestId("financial-chart-tooltip")).toHaveTextContent(
      "Mão de obra: R$ 1.000,00"
    );
    expect(screen.getByTestId("financial-chart-tooltip")).toHaveTextContent(
      "Peças: R$ 200,00"
    );
  });

  it("shows seasonality when the same months are available in two years", () => {
    useSWR.mockReturnValue({
      data: {
        data: [
          {
            month: 1,
            year: 2023,
            service_price: 1000,
            service_items_price: 100,
          },
          {
            month: 2,
            year: 2023,
            service_price: 1500,
            service_items_price: 100,
          },
          {
            month: 1,
            year: 2024,
            service_price: 1400,
            service_items_price: 100,
          },
          {
            month: 2,
            year: 2024,
            service_price: 900,
            service_items_price: 100,
          },
        ],
      },
      isValidating: false,
    });

    renderWithProviders(<Dashboard />);

    expect(screen.getByText("Meses que mais variaram")).toBeInTheDocument();
    expect(screen.getByText("3 melhores meses")).toBeInTheDocument();
    expect(screen.getByText("3 meses com queda")).toBeInTheDocument();
    expect(
      screen.getByText("Mão de obra em 2024 comparada a 2023.")
    ).toBeInTheDocument();
  });

  it("shows notification on fetch error", async () => {
    let lastOnError;
    useSWR.mockImplementation((_, __, options) => {
      lastOnError = options?.onError;
      return { data: undefined, isValidating: false };
    });

    renderWithProviders(<Dashboard />);

    act(() => {
      lastOnError?.(new Error("fail"));
    });

    await waitFor(() =>
      expect(
        screen.getByText("Opa! Não deu pra carregar o relatório dos serviços")
      ).toBeInTheDocument()
    );
  });
});
