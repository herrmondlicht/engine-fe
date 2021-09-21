import React from "react";

const Label = ({ children, error }) => (
  <label className={`text-md ${error ? "text-error-0" : "text-gray-500"}`}>
    {children}
  </label>
);

export { Label };
