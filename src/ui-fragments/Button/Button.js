import React, { useMemo } from "react";
import propTypes from "prop-types";
import Loader from "react-loader-spinner";

const Button = React.forwardRef(
  ({ onClick, children, variant, size, fw, showLoader }, ref) => {
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
        onClick={onClick ? onClick : undefined}
        className={`${sizeClasses} ${variantClasses} ${
          fw ? "w-full" : ""
        } rounded-full text-white font-semibold relative`}
      >
        <div className={`transition duration-400 ${showLoader ? "opacity-0" : "opacity-100"}`}>
          {children}
        </div>
        <div
          className={`absolute z-10 w-full h-full flex justify-center items-center top-0 right-0 transition duration-400 ${
            showLoader ? "opacity-100" : "opacity-0"
          }`}
        >
          <Loader type="TailSpin" height={30} width={30} color="#FFF" />
        </div>
      </button>
    );
  }
);

Button.propTypes = {
  children: propTypes.any,
  onClick: propTypes.func,
  variant: propTypes.string,
  size: propTypes.string,
  fw: propTypes.bool,
  showLoader: propTypes.bool,
};
export { Button };
