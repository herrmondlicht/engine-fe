import React from "react";
import useSWR from "swr";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ServiceItemPriceContext } from "./ServiceItemPriceContext";
import { ServiceItemsContainer } from "./ServiceItemsContainer";

const mockPost = jest.fn();

jest.mock("utils", () => {
  const actual = jest.requireActual("utils");
  return {
    ...actual,
    engineAPI: {
      service_orders: {
        post: (...args) => mockPost(...args),
      },
    },
  };
});

jest.mock("swr", () => {
  const actual = jest.requireActual("swr");
  return {
    __esModule: true,
    default: jest.fn(),
    SWRConfig: actual.SWRConfig,
  };
});

jest.mock("./ServiceItem", () => ({
  ServiceItem: () => <div>Service Item</div>,
}));

const renderContainer = () =>
  renderWithProviders(
    <ServiceItemPriceContext.Provider
      value={{ itemsPrice: 0, updateItemsPrice: jest.fn() }}
    >
      <ServiceItemsContainer serviceId={10} />
    </ServiceItemPriceContext.Provider>,
    { route: "/services/10", path: "/services/:id" }
  );

describe("ServiceItemsContainer", () => {
  afterEach(() => {
    useSWR.mockReset();
    mockPost.mockReset();
  });

  it("shows no data message when list is empty", () => {
    useSWR.mockReturnValue({
      data: { data: [] },
      error: undefined,
      mutate: jest.fn(),
    });

    renderContainer();

    expect(
      screen.getByText("Hm... parece que nāo tem dados ainda")
    ).toBeInTheDocument();
  });

  it("renders header when items exist", () => {
    useSWR.mockReturnValue({
      data: { data: [{ id: 1, description: "Peca", unit_price: 10 }] },
      error: undefined,
      mutate: jest.fn(),
    });

    renderContainer();

    expect(screen.getByText("Preço Unit.")).toBeInTheDocument();
  });

  it("adds new item and calls mutate", async () => {
    const mutate = jest.fn();
    useSWR.mockReturnValue({
      data: { data: [] },
      error: undefined,
      mutate,
    });
    mockPost.mockResolvedValue({});

    renderContainer();

    await userEvent.click(screen.getByText("Adicionar Peça"));

    await waitFor(() => expect(mockPost).toHaveBeenCalled());
    expect(mutate).toHaveBeenCalled();
  });
});
