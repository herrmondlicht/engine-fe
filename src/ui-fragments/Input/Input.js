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

const Input = React.forwardRef(({ label, fw, placeholder }, ref) => {
  return (
    <div>
      {label ? (
        <div className="mb-4 ml-1">
          <Label>{label}</Label>
        </div>
      ) : null}
      <input
        autocomplete="no"
        className={`${inputBaseClass} ${fw ? "w-full" : ""}`}
        placeholder={placeholder}
        ref={ref}
      />
    </div>
  );
});

export { Input };
