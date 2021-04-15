import React from "react";

const Card = ({ children, className }) => {
  return (
    <div
      className={`p-9 shadow-md rounded-3xl bg-white ${
        className ? className : ""
      }`}
    >
      {children}
    </div>
  );
};

export { Card };
