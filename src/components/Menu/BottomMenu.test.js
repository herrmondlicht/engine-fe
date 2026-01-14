import React from "react";
import { screen } from "@testing-library/react";

import { renderWithProviders } from "test-utils/renderWithProviders";
import BottomMenu from "./BottomMenu";

describe("BottomMenu", () => {
  it("renders navigation links", () => {
    renderWithProviders(<BottomMenu />);

    expect(screen.getByRole("link", { name: /Relatórios/i })).toHaveAttribute(
      "href",
      "/"
    );
    expect(
      screen.getByRole("link", { name: /Ordens de Serviço/i })
    ).toHaveAttribute("href", "/customers");
    expect(screen.getByRole("link", { name: /Câmera/i })).toHaveAttribute(
      "href",
      "/camera"
    );
  });
});
