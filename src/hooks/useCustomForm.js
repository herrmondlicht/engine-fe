import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { convertFormKeyToAPI } from "utils";
import { useValidator } from "./useValidator";

const useCustomForm = ({ schema, preloadedData }) => {
  const formMethods = useForm();
  const { errors, validate } = useValidator(schema);

  useEffect(() => {
    if (preloadedData) {
      Object.keys(schema.fields).forEach((fieldKey) =>
        formMethods.setValue(
          fieldKey,
          preloadedData[convertFormKeyToAPI(fieldKey)]
        )
      );
    }
    return () => {
      formMethods.reset();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formMethods.reset, formMethods.setValue, preloadedData, schema.fields]);

  return {
    formMethods,
    validationMethods: { errors, validate },
  };
};

export { useCustomForm };
