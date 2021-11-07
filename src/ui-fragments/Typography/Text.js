import PropTypes from "prop-types";
import React from "react";

export const TEXT_SIZES = {
  BIG: "text-lg",
  MEDIUM: "text-base",
  SMALL: "text-sm",
};

export const TEXT_ALIGN = {
  LEFT: "text-left",
  RIGHT: "text-right",
  CENTER: "text-center",
};

const Text = ({ children, size, color, align }) => {
  const sizeClass = TEXT_SIZES[size] || TEXT_SIZES.MEDIUM;
  const colorClass = color || "black";
  const alignment = align || "text-left";

  return (
    <p className={`${sizeClass} ${colorClass} ${alignment}`}>{children}</p>
  );
};

Text.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
};

export { Text };
