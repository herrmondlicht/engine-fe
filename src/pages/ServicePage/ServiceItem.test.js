import React from "react";
import { act, fireEvent, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { renderWithProviders } from "test-utils/renderWithProviders";
import { ServiceItem } from "./ServiceItem";

describe("ServiceItem", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("submits changes after debounce", () => {
    const onSubmitChanges = jest.fn();
    renderWithProviders(
      <ServiceItem
        serviceItem={{
          id: 1,
          description: "Filtro",
          quantity: 2,
          unit_price: 10,
        }}
        onSubmitChanges={onSubmitChanges}
        onDeleteItem={() => {}}
      />
    );

    const [descriptionInput] = screen.getAllByRole("textbox");
    fireEvent.change(descriptionInput, { target: { value: "Filtro novo" } });

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(onSubmitChanges).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        description: "Filtro novo",
      })
    );
  });

  it("calls delete action", async () => {
    const onDeleteItem = jest.fn();
    renderWithProviders(
      <ServiceItem
        serviceItem={{
          id: 5,
          description: "Peca",
          quantity: 1,
          unit_price: 10,
        }}
        onSubmitChanges={() => {}}
        onDeleteItem={onDeleteItem}
      />
    );

    await act(async () => {
      await userEvent.click(
        screen.getByText("Excluir", { selector: "button *" })
      );
    });

    expect(onDeleteItem).toHaveBeenCalledWith(5);
  });
});
