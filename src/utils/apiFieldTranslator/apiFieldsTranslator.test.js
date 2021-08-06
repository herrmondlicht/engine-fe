import { translateAPIFieldName, fixPayloadKeys } from "./apiFieldsTranslator";

describe("apiFieldsTranslator", () => {
  const fieldsToKey = {
    field1: "field_1",
    field2: "field_2",
    field3: "field_3",
    field4: "field_4",
  };

  it("should return the correspondent value for translation keys", () => {
    Object.keys(fieldsToKey).forEach((key) => {
      const current = translateAPIFieldName(key, { fieldsToKey });
      const expected = fieldsToKey[key];
      expect(current).toBe(expected);
    });
  });

  it("should return the correspondent key for translation value", () => {
    Object.entries(fieldsToKey).forEach(([key, value]) => {
      const current = translateAPIFieldName(value, { fieldsToKey });
      const expected = key;
      expect(current).toBe(expected);
    });
  });
});

describe("fixPayloadKeys", () => {
  const fieldsToKey = {
    field1: "field_1",
    field2: "field_2",
    field3: "field_3",
    field4: "field_4",
  };

  it("should fix the payload keys according to API correctly", () => {
    const payload = {
      field1: "foo",
      field4: "bar",
    };
    const expected = {
      field_1: "foo",
      field_4: "bar",
    };
    const actual = fixPayloadKeys(payload, { fieldsToKey });
    expect(actual).toEqual(expected);
  });

  it("should return the correspondent key for translation value", () => {
    Object.entries(fieldsToKey).forEach(([key, value]) => {
      const current = translateAPIFieldName(value, { fieldsToKey });
      const expected = key;
      expect(current).toBe(expected);
    });
  });
});
