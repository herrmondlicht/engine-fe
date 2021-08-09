import React from "react";
import { Label } from "ui-fragments/Typography";

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

const inputError = ["bg-error-2 ring-2 ring-error-0"].join(" ");

const Input = React.forwardRef(
  ({ label, fw, placeholder, error, ...props }, ref) => {
    return (
      <div className="pb-6 relative">
        {label ? (
          <div className="mb-4 ml-1">
            <Label error={error}>{label}</Label>
          </div>
        ) : null}
        <input
          autoComplete="no"
          className={`${inputBaseClass} ${fw ? "w-full" : ""} ${
            error ? inputError : ""
          }`}
          placeholder={placeholder}
          ref={ref}
          {...props}
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
