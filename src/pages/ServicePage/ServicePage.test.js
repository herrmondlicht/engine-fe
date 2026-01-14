import React from "react";
import useSWR from "swr";
import { act, screen, waitFor } from "@testing-library/react";

import { renderWithProviders } from "test-utils/renderWithProviders";
import ServicePage from "./ServicePage";

const mockShowErrorNotification = jest.fn();

jest.mock("hooks", () => {
  const actual = jest.requireActual("hooks");
  return {
    ...actual,
    useNotification: () => ({
      showErrorNotification: (...args) => mockShowErrorNotification(...args),
    }),
  };
});

jest.mock("components", () => ({
  CustomerDetails: ({ customerCarId }) => (
    <div>CustomerDetails {customerCarId}</div>
  ),
  PageTitle: ({ title, description }) => (
    <div>
      <div>{title}</div>
      <div>{description}</div>
    </div>
  ),
  FinancialDetails: () => <div>FinancialDetails</div>,
}));

jest.mock("./ServiceItemsContainer", () => ({
  ServiceItemsContainer: () => <div>ServiceItemsContainer</div>,
}));

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
  mockShowErrorNotification.mockReset();
});

describe("ServicePage", () => {
  it("renders content when service data is available", () => {
    useSWR.mockReturnValue({
      data: { data: { id: 10, customer_car_id: 55 } },
      isValidating: false,
      error: undefined,
      mutate: jest.fn(),
    });

    renderWithProviders(<ServicePage />, {
      route: "/services/10",
      path: "/services/:serviceId",
    });

    expect(screen.getByText("CustomerDetails 55")).toBeInTheDocument();
    expect(screen.getByText("FinancialDetails")).toBeInTheDocument();
    expect(screen.getByText("ServiceItemsContainer")).toBeInTheDocument();
  });

  it("shows loader when data is missing", () => {
    useSWR.mockReturnValue({
      data: undefined,
      isValidating: true,
      error: undefined,
      mutate: jest.fn(),
    });

    renderWithProviders(<ServicePage />, {
      route: "/services/10",
      path: "/services/:serviceId",
    });

    expect(screen.getAllByTestId("ScreenLoader_loader").length).toBeGreaterThan(
      0
    );
  });

  it("shows error notification on fetch error", async () => {
    let lastOnError;
    useSWR.mockImplementation((_, __, options) => {
      lastOnError = options?.onError;
      return { data: undefined, isValidating: false, error: new Error("fail") };
    });

    renderWithProviders(<ServicePage />, {
      route: "/services/10",
      path: "/services/:serviceId",
    });

    act(() => {
      lastOnError?.(new Error("fail"));
    });

    await waitFor(() => expect(mockShowErrorNotification).toHaveBeenCalled());
  });
});
