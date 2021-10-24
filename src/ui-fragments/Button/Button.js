import React, { useMemo } from "react";
import propTypes from "prop-types";
import Loader from "react-loader-spinner";
import CheckCircleIcon from "@heroicons/react/solid/CheckCircleIcon";
import XCircleIcon from "@heroicons/react/solid/XCircleIcon";
import { theme } from "twtheme";
import { Link } from "react-router-dom";

export const BUTTON_VARIANTS = {
  GHOST: "ghost",
  PRIMARY: "primary",
  SUCCESS: "success",
  ERROR: "error",
  HOLLOW: "hollow",
};

export const BUTTON_SIZES = {
  SMALL: "small",
  BIG: "big",
};

export const BUTTON_COMPONENT = {
  BUTTON: "button",
  LINK: "a",
};

const Button = (
  {
    onClick,
    children,
    variant = "primary",
    size,
    fw,
    disabled,
    showLoader,
    as = BUTTON_COMPONENT.BUTTON,
    href,
    showVariantIcon,
  },
  ref
) => {
  const sizeClasses = useMemo(() => {
    switch (size) {
      case BUTTON_SIZES.SMALL:
        return ["p-2", "px-4", "text-sm"].join(" ");
      case BUTTON_SIZES.BIG:
        return ["p-4", "px-6", "text-lg"].join(" ");
      default:
        return ["p-3", "px-5", "text-md"].join(" ");
    }
  }, [size]);

  const variantClasses = useMemo(() => {
    const variantColor = `${variant}-0`;
    switch (variant) {
      case BUTTON_VARIANTS.GHOST:
        return ["text-primary-0"];
      case BUTTON_VARIANTS.HOLLOW:
        return [
          "bg-transparent",
          "ring-2",
          "ring-primary-0",
          "text-primary-0",
          "hover:text-white",
          "hover:bg-primary-0",
        ].join(" ");
      case BUTTON_VARIANTS.PRIMARY:
      case BUTTON_VARIANTS.SUCCESS:
      case BUTTON_VARIANTS.ERROR:
        return [
          `bg-${variantColor}`,
          `focus:ring-${variantColor}`,
          `hover:bg-${variant}-1`,
          "focus:ring-2",
          "focus:border-transparent",
          "border-2",
          "text-white",
        ].join(" ");
    }
  }, [variant]);

  return (
    <>
      {as === BUTTON_COMPONENT.BUTTON && (
        <button
          disabled={disabled}
          ref={ref}
          onClick={onClick || undefined}
          className={`${sizeClasses} ${variantClasses} ${
            fw ? "w-full" : ""
          } rounded-full font-semibold transition duration-300`}
        >
          <ButtonContent
            showLoader={showLoader}
            variant={variant}
            showVariantIcon={showVariantIcon}
          >
            {children}
          </ButtonContent>
        </button>
      )}
      {as === BUTTON_COMPONENT.LINK && (
        <Link
          disabled={disabled}
          ref={ref}
          to={href}
          className={`${sizeClasses} ${variantClasses} ${
            fw ? "w-full" : ""
          } rounded-full text-white font-semibold cursor-pointer transition duration-300`}
        >
          <ButtonContent showLoader={showLoader} variant={variant}>
            {children}
          </ButtonContent>
        </Link>
      )}
    </>
  );
};

const ButtonContent = ({
  children,
  showLoader,
  variant,
  showVariantIcon = true,
}) => {
  const variantIcon = useMemo(() => {
    const sizeClasses = "h-7 w-7";
    if (!showVariantIcon) {
      return null;
    }
    switch (variant) {
      case "success":
        return <CheckCircleIcon className={sizeClasses} />;
      case "error":
        return <XCircleIcon className={sizeClasses} />;
      default:
        return null;
    }
  }, [showVariantIcon, variant]);
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
          color={
            variant === BUTTON_VARIANTS.GHOST
              ? theme.colors.primary[0]
              : theme.colors.white
          }
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
  showVariantIcon: propTypes.bool,
};
export { ButtonFR as Button };
