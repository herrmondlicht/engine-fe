import React from "react";

const CARD_VARIANTS = {
  NORMAL: "p-4 md:p-9",
  SMALL: "p-1 md:p-3",
};

const Card = ({ children, className, variant = CARD_VARIANTS.NORMAL }) => (
  <div
    className={`${variant} shadow-md rounded-3xl bg-white ${className || ""}`}
  >
    {children}
  </div>
);

export { Card, CARD_VARIANTS };
