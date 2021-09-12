import React, { useMemo } from "react";
import propTypes from "prop-types";
import Loader from "react-loader-spinner";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/solid";
import { theme } from "twtheme";

export const BUTTON_VARIANTS = {
  GHOST: "ghost",
  PRIMARY: "primary",
  SUCCESS: "success",
  ERROR: "error",
};

const Button = (
  { onClick, children, variant = "primary", size, fw, disabled, showLoader },
  ref
) => {
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
    const variantColor = `${variant}-0`;
    if (variant.startsWith("ghost")) {
      return [];
    }
    return [
      `bg-${variantColor}`,
      "focus:ring-2",
      "focus:border-transparent",
      "border-2",
      `focus:ring-${variantColor}`,
      `hover:bg-${variant}-1`,
      "transition duration-300",
    ].join(" ");
  }, [variant]);

  return (
    <button
      disabled={disabled}
      ref={ref}
      onClick={onClick || undefined}
      className={`${sizeClasses} ${variantClasses} ${
        fw ? "w-full" : ""
      } rounded-full text-white font-semibold`}
    >
      <ButtonContent showLoader={showLoader} variant={variant}>
        {children}
      </ButtonContent>
    </button>
  );
};

const ButtonContent = ({ children, showLoader, variant }) => {
  const variantIcon = useMemo(() => {
    const sizeClasses = "h-7 w-7";
    switch (variant) {
      case "success":
        return <CheckCircleIcon className={sizeClasses} />;
      case "error":
        return <XCircleIcon className={sizeClasses} />;
      default:
        return null;
    }
  }, [variant]);
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <div
        className={`transition duration-400 ${
          showLoader || variant === "success" ? "opacity-0" : "opacity-100"
        }`}
      >
        {children}
      </div>
      <div
        className={`absolute z-10 transition duration-400 ${
          showLoader ? "opacity-100" : "opacity-0"
        }`}
      >
        <Loader
          type="TailSpin"
          height={30}
          width={30}
          color={theme.colors.white}
        />
      </div>
      {!showLoader && (
        <div
          className={`absolute z-10 transition duration-400 ${
            variantIcon ? "opacity-100" : "opacity-0"
          }`}
        >
          {variantIcon}
        </div>
      )}
    </div>
  );
};

const ButtonFR = React.forwardRef(Button);

Button.propTypes = {
  children: propTypes.any,
  onClick: propTypes.func,
  variant: propTypes.string,
  size: propTypes.string,
  fw: propTypes.bool,
  showLoader: propTypes.bool,
  disabled: propTypes.bool,
};
export { ButtonFR as Button };
