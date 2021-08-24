import React from "react";

const Card = ({ children, className }) => (
  <div className={`p-9 shadow-md rounded-3xl bg-white ${className || ""}`}>
    {children}
  </div>
);

export { Card };
