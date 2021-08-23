import {
    convertAPIkeyToForm,
    convertFormKeyToAPI,
    fixPayloadKeys,
} from "./apiFieldsTranslator";

describe("apiFieldsTranslator", () => {
    const fieldsToKey = {
        field1: "field_1",
        field2: "field_2",
        field3: "field_3",
        field4: "field_4",
    };

    it("should convert key to mapped api prop key", () => {
        Object.keys(fieldsToKey).forEach((key) => {
            const current = convertFormKeyToAPI(key, { fieldsToKey });
            const expected = fieldsToKey[key];
            expect(current).toBe(expected);
        });
    });

    it("should convert key to form key", () => {
        Object.entries(fieldsToKey).forEach(([key, value]) => {
            const current = convertAPIkeyToForm(value, { fieldsToKey });
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

    it("should convert form payload to API payload", () => {
        const payload = {
            field1: "foo",
            field4: "bar",
        };
        const expected = {
            field_1: "foo",
            field_4: "bar",
        };
        const actual = fixPayloadKeys(payload, {
            fieldsToKey,
            fieldTranslator: convertFormKeyToAPI,
        });
        expect(actual).toEqual(expected);
    });

    it("should convert response from API to form payload", () => {
        Object.entries(fieldsToKey).forEach(([key, value]) => {
            const current = convertAPIkeyToForm(value, { fieldsToKey });
            const expected = key;
            expect(current).toBe(expected);
        });
    });
});
