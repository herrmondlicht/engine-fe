import React, { useMemo } from "react";
import propTypes from "prop-types";

const Button = React.forwardRef(({ onClick, children, variant, size }, ref) => {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case "small":
        return ["p-2", "px-4", "text-sm"].join(" ");
      case "big":
        return ["p-4", "px-6", "text-lg"].join(" ");
      default:
        return ["p-3", "px-5", "text-md"].join(" ");
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    const color = `${variant ? variant : "primary"}`;
    const variantColor = `${color}-0`;
    return [
      `bg-${variantColor}`,
      "focus:ring-2",
      "focus:border-transparent",
      "border-2",
      `focus:ring-${variantColor}`,
      `hover:bg-${color}-1`,
      "transition duration-300",
    ].join(" ");
  }, [variant]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${sizeClasses} ${variantClasses} rounded-full text-white font-semibold`}
    >
      {children}
    </button>
  );
});

Button.propTypes = {
  children: propTypes.any,
  onClick: propTypes.func,
  variant: propTypes.string,
  size: propTypes.string,
};
export { Button };
