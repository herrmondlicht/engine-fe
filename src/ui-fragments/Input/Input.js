import React from "react";
import { Label } from "ui-fragments/Typography";
import { css } from "@emotion/css";

const inputBaseClass = [
  "p-4",
  "bg-gray-100",
  "placeholder-gray-400",
  "rounded-2xl",
  "text-gray-800",
  "focus:bg-white",
  "focus:ring-2",
  "focus:ring-primary-0",
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

const Input = React.forwardRef(
  ({ label, fw, placeholder, error, uppercase, ...props }, ref) => {
    const modifierClasses = [
      ...(fw ? ["w-full"] : []),
      ...(error ? [inputError] : []),
      ...(uppercase ? ["uppercase"] : []),
    ].join(" ");
    return (
      <div className="pb-6 relative">
        {label ? (
          <div className="mb-4 ml-1">
            <Label error={error}>{label}</Label>
          </div>
        ) : null}
        <input
          autoComplete="no"
          placeholder={placeholder}
          ref={ref}
          {...props}
          className={`${inputBaseClass} ${modifierClasses} ${placeholderClass}`}
        />
        {error && (
          <label className="absolute w-full bottom-0 left-0 font-medium ml-1 mt-1 text-sm text-error-0">
            {error}
          </label>
        )}
      </div>
    );
  }
);

export { Input };
