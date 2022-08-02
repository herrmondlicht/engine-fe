import { getDefaultFormValues } from "./useCustomForm";

describe("useCusomForms", () => {
  it("should return correct default values", () => {
    // given
    const preloadedData = {
      document_number: "123",
      other_value: "123",
    };
    const fields = {
      documentNumber: 1,
    };

    //when
    const defaultValues = getDefaultFormValues(preloadedData, fields);
    //then
    const expectedDefaultValues = {
      documentNumber: "123",
    };
    expect(defaultValues).toEqual(expectedDefaultValues);
  });
});
