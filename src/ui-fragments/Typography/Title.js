import PropTypes from "prop-types";
import React from "react";

export const TITLE_SIZES = {
  HUGE: "text-5xl",
  BIG: "text-3xl",
  MEDIUM: "text-2xl",
};

const Title = ({ children, size, color }) => {
  const sizeClass = TITLE_SIZES[size] || TITLE_SIZES.MEDIUM;
  const colorClass = color || "black";

  return <p className={`${sizeClass} ${colorClass} font-bold`}>{children}</p>;
};

Title.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
};

export { Title };
