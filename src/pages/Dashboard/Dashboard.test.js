import React from "react";
import useSWR from "swr";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { act, screen, waitFor } from "@testing-library/react";
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
