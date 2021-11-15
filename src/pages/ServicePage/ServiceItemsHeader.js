import React from "react";
import { Text } from "ui-fragments";

const ServiceItemsHeader = () => (
  <>
    <div className="flex-1">
      <Text>Descrição</Text>
    </div>
    <div
      className="flex gap-2 flex-grow md:flex-grow-0"
      style={{ flexBasis: "400px" }}
    >
      <div className="flex-1">
        <Text>Preço Unit.</Text>
      </div>
      <div className="w-16">
        <Text>Qtd.</Text>
      </div>
      <div className="flex-1 mr-12">
        <Text>Preço Total</Text>
      </div>
    </div>
  </>
);

export { ServiceItemsHeader };
