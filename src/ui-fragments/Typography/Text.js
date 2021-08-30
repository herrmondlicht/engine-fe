import PropTypes from "prop-types";
import React from "react";

export const TEXT_SIZES = {
  BIG: "text-lg",
  MEDIUM: "text-base",
  SMALL: "text-sm",
};

const Text = ({ children, size, color }) => {
  const sizeClass = TEXT_SIZES[size] || TEXT_SIZES.MEDIUM;
  const colorClass = color || "black";

  return <p className={`${sizeClass} ${colorClass}`}>{children}</p>;
};

Text.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
};

export { Text };
