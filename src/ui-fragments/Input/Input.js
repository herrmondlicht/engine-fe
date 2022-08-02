import React, { forwardRef } from "react";
import { Label } from "ui-fragments/Typography";
import { css } from "@emotion/css";
import propTypes from "prop-types";

const inputBaseClass = [
  "p-4",
  "bg-gray-100",
  "placeholder-gray-400",
  "rounded-2xl",
  "text-gray-800",
  "focus:bg-white",
  "focus:ring-2",
  "focus:ring-primary-0",
  "resize-none",
].join(" ");

const inputError = ["bg-error-2", "ring-2", "ring-error-0"].join(" ");

const placeholderClass = css`
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    text-transform: none;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    text-transform: none;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    text-transform: none;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    text-transform: none;
  }
  ::placeholder {
    /* Recent browsers */
    text-transform: none;
  }
`;

const numberArrowClass = css`
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }
`;

const textAreaScrollClass = css`
  textarea::-webkit-scrollbar {
    width: 1em;
  }

  textarea::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  }

  textarea::-webkit-scrollbar-thumb {
    background-color: darkgrey;
    outline: 1px solid slategrey;
  }
`;

const Input = forwardRef(
  ({ label, fw, placeholder, error, uppercase, as, center, ...props }, ref) => {
    const modifierClasses = [
      ...(fw ? ["w-full"] : []),
      ...(error ? [inputError] : []),
      ...(uppercase ? ["uppercase"] : []),
      ...(center ? ["text-center"] : []),
    ].join(" ");
    return (
      <div className="flex flex-col">
        {label ? (
          <div className="mb-4 ml-1">
            <Label error={error}>{label}</Label>
          </div>
        ) : null}
        {as === "textarea" ? (
          <textarea
            autoComplete="no"
            placeholder={placeholder}
            ref={ref}
            {...props}
            className={`${inputBaseClass} ${modifierClasses} ${placeholderClass} ${textAreaScrollClass}`}
          />
        ) : (
          <input
            autoComplete="no"
            placeholder={placeholder}
            ref={ref}
            {...props}
            className={`${inputBaseClass} ${modifierClasses} ${placeholderClass} ${numberArrowClass}`}
          />
        )}
        {error && (
          <label className="font-medium ml-1 mt-1 text-sm text-error-0">
            {error}
          </label>
        )}
      </div>
    );
  }
);

Input.propTypes = {
  label: propTypes.string,
  fw: propTypes.bool,
  placeholder: propTypes.string,
  error: propTypes.string,
  uppercase: propTypes.bool,
};

Input.displayName = "Input";

export { Input };
