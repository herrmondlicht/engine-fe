import { apiFieldsKey } from "./apiFieldsKeys";

const convertAPIkeyToForm = (
  fieldName,
  { fieldsToKey = apiFieldsKey } = {}
) => {
  const keyFound = Object.entries(fieldsToKey).reduce((found, [key, value]) => {
    if (value === fieldName) {
      return key;
    }
    return found;
  }, fieldName);

  return keyFound;
};

const convertFormKeyToAPI = (
  fieldName,
  { fieldsToKey = apiFieldsKey } = {}
) => {
  const valueFound = Object.entries(fieldsToKey).reduce(
    (found, [key, value]) => {
      if (key === fieldName) {
        return value;
      }
      return found;
    },
    fieldName
  );

  return valueFound;
};

const fixPayloadKeys = (
  payload,
  { fieldTranslator, fieldsToKey = apiFieldsKey } = {}
) => {
  if (!fieldTranslator) {
    throw new Error("Please specify a fieldTranslator");
  }
  return Object.entries(payload).reduce(
    (prev, [key, value]) => ({
      ...prev,
      [fieldTranslator(key, { fieldsToKey })]: value,
    }),
    {}
  );
};

export { convertFormKeyToAPI, convertAPIkeyToForm, fixPayloadKeys };
