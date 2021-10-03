import PropTypes from "prop-types";
import React from "react";

export const TITLE_SIZES = {
  HUGE_2x: "text-6xl",
  HUGE: "text-5xl",
  BIG: "text-3xl",
  MEDIUM: "text-2xl",
  SMALL: "text-lg",
};

export const TITLE_SPACING = {
  WIDE: "tracking-widest",
};

const Title = ({ children, size, color, spacing }) => {
  const sizeClass = size || TITLE_SIZES.MEDIUM;
  const colorClass = color || "black";

  return (
    <p className={`${sizeClass} ${colorClass} ${spacing} font-bold`}>
      {children}
    </p>
  );
};

Title.propTypes = {
  children: PropTypes.any,
  size: PropTypes.string,
  color: PropTypes.string,
};

export { Title };
