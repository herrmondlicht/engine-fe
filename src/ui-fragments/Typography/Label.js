import React from "react";

const Label = ({ children, error }) => {
  return <label className={`text-sm ${error? "text-error-0" :"text-gray-500"}`}>{children}</label>;
};

export { Label };
