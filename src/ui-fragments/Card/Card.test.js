import { render, screen } from "@testing-library/react";
import { Card } from "./Card";

describe("Card", () => {
  it("Renders a card and its children", () => {
    render(
      <Card>
        <div>test</div>
        <div>test2</div>
      </Card>
    );

    expect(screen.getByText("test"));
    expect(screen.getByText("test2"));
  });

  it("Renders a card even when VARIANT is wrong", () => {
    render(
      <Card variant="CARNE_COM_BATATA">
        <div>test</div>
        <div>test2</div>
      </Card>
    );

    expect(screen.getByText("test"));
    expect(screen.getByText("test2"));
  });
});
