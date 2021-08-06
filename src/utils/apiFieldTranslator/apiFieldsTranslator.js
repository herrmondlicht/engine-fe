import { apiFieldsKey } from "./apiFieldsKeys";

const translateAPIFieldName = (
  fieldName,
  { fieldsToKey = apiFieldsKey } = {}
) => {
  const keyFound = Object.entries(fieldsToKey).reduce((found, [key, value]) => {
    if (key === fieldName) {
      return value;
    }
    if (value === fieldName) {
      return key;
    }
    return found;
  }, fieldName);

  return keyFound;
};

const fixPayloadKeys = (
  payload,
  { fieldTranslator = translateAPIFieldName, fieldsToKey = apiFieldsKey } = {}
) => {
  return Object.entries(payload).reduce((prev, [key, value]) => {
    return {
      ...prev,
      [fieldTranslator(key, { fieldsToKey })]: value,
    };
  }, {});
};

export { translateAPIFieldName, fixPayloadKeys };
