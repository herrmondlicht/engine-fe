import { useForm } from "react-hook-form";
import { convertFormKeyToAPI } from "utils";
import { useValidator } from "../useValidator";

export const getDefaultFormValues = (preloadedData, fields = {}) => {
  if (preloadedData) {
    const defaultValues = Object.keys(fields).reduce(
      (defaultValues, currentKey) => ({
        ...defaultValues,
        [currentKey]: preloadedData[convertFormKeyToAPI(currentKey)],
      }),
      {}
    );

    return defaultValues;
  }
};

const useCustomForm = ({ schema, preloadedData }) => {
  const defaultValues = getDefaultFormValues(preloadedData, schema.fields);
  const formMethods = useForm({ defaultValues });
  const { errors, validate } = useValidator(schema);

  return {
    formMethods,
    validationMethods: { errors, validate },
  };
};

export { useCustomForm };
