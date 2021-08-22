import { useCallback, useState } from "react";

export const useValidator = (validator) => {
  const [errors, setErrors] = useState({});
  const validate = useCallback(
    (object) => {
      try {
        validator.validateSync(object);
        setErrors({});
        return true;
      } catch (e) {
        setErrors({ [e.path]: e.errors[0] });
        return false;
      }
    },
    [validator],
  );

  return { validate, errors };
};
