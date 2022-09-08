import React, { createContext, useState } from "react";

const ServiceItemPriceContext = createContext({
  itemsPrice: 0,
  updateItemsPrice: () => {},
});

const ServiceItemPriceProvider = ({ children }) => {
  const [itemsPrice, setItemsPrice] = useState();

  const updateItemsPrice = (items = []) => {
    const price = items.reduce((prevPrice, currentItem) => {
      return prevPrice + currentItem.unit_price * currentItem.quantity;
    }, 0);

    setItemsPrice(price);
  };

  return (
    <ServiceItemPriceContext.Provider value={{ itemsPrice, updateItemsPrice }}>
      {children}
    </ServiceItemPriceContext.Provider>
  );
};

export { ServiceItemPriceContext, ServiceItemPriceProvider };
