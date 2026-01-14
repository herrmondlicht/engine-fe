import React from "react";
import { renderWithProviders } from "test-utils/renderWithProviders";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { DeleteServiceModal } from "./DeleteServiceModal";

const mockDelete = jest.fn();
const mockShowErrorNotification = jest.fn();
const mockSetIsLoading = jest.fn();

jest.mock("utils", () => {
  const actual = jest.requireActual("utils");
  return {
    ...actual,
    engineAPI: {
      service_orders: {
        delete: (...args) => mockDelete(...args),
      },
    },
  };
});

jest.mock("hooks", () => ({
  useNotification: () => ({
    showErrorNotification: (...args) => mockShowErrorNotification(...args),
  }),
  useLoader: () => [false, (...args) => mockSetIsLoading(...args)],
}));

describe("DeleteServiceModal", () => {
  beforeEach(() => {
    mockDelete.mockReset();
    mockShowErrorNotification.mockReset();
    mockSetIsLoading.mockReset();
  });

  it("calls delete and clears service id on success", async () => {
    mockDelete.mockResolvedValue({});
    const setServiceId = jest.fn();

    renderWithProviders(
      <DeleteServiceModal serviceId={12} setServiceId={setServiceId} />
    );

    await userEvent.click(
      screen.getByText("Excluir", { selector: "button *" })
    );

    await waitFor(() => expect(mockDelete).toHaveBeenCalled());
    expect(setServiceId).toHaveBeenCalledWith(null);
  });

  it("shows error notification on failure", async () => {
    mockDelete.mockRejectedValue(new Error("fail"));
    const setServiceId = jest.fn();

    renderWithProviders(
      <DeleteServiceModal serviceId={12} setServiceId={setServiceId} />
    );

    await userEvent.click(
      screen.getByText("Excluir", { selector: "button *" })
    );

    await waitFor(() => expect(mockShowErrorNotification).toHaveBeenCalled());
  });

  it("closes when cancel is clicked", async () => {
    const setServiceId = jest.fn();

    renderWithProviders(
      <DeleteServiceModal serviceId={12} setServiceId={setServiceId} />
    );

    await userEvent.click(
      screen.getByText("Cancelar", { selector: "button *" })
    );

    expect(setServiceId).toHaveBeenCalledWith(undefined);
  });
});
