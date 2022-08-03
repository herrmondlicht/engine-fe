import React from "react";
import { Text } from "ui-fragments";

const ServiceItemsHeader = () => (
  <>
    <div className="flex-1">
      <Text>Descrição</Text>
    </div>
    <div className="flex gap-2 flex-1">
      <div className="flex-1">
        <Text>Preço Unit.</Text>
      </div>
      <div className="w-24">
        <Text>Qtd.</Text>
      </div>
      <div className="flex-1">
        <Text>Preço Total</Text>
      </div>
    </div>
  </>
);

export { ServiceItemsHeader };
