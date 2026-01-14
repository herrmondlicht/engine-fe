import React from "react";
import { render, screen } from "@testing-library/react";

import { ServiceItemsHeader } from "./ServiceItemsHeader";

describe("ServiceItemsHeader", () => {
  it("renders column labels", () => {
    render(<ServiceItemsHeader />);

    expect(screen.getByText("Descrição")).toBeInTheDocument();
    expect(screen.getByText("Preço Unit.")).toBeInTheDocument();
    expect(screen.getByText("Qtd.")).toBeInTheDocument();
    expect(screen.getByText("Preço Total")).toBeInTheDocument();
  });
});
