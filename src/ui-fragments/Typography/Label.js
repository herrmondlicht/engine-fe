import React from "react";

const Label = ({ children, error, labelId }) => (
  <label
    id={labelId}
    className={`text-md ${error ? "text-error-0" : "text-gray-500"}`}
  >
    {children}
  </label>
);

export { Label };
