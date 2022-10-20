import {
  fromBRL,
  handleCurrencyFieldChange,
  sanitizeNumber,
  toBRL,
} from "../currency";

describe("Utils -> Currency", () => {
  describe("Converts number to BRL", () => {
    it("should return converted amount", () => {
      const AMOUNT = 340.2;
      //this \u{00A0} char is used by JS toLocaleString to not break the number
      const EXPECTED_RESULT = "R$\u{00A0}340,20";

      const ACTUAL = toBRL(AMOUNT);

      expect(ACTUAL).toEqual(EXPECTED_RESULT);
    });

    it.each(["-", {}, null, undefined])(
      "should return a dash if value is %s",
      WRONG_AMOUNT => {
        const EXPECTED_RESULT = "-";

        const ACTUAL = toBRL(WRONG_AMOUNT);

        expect(ACTUAL).toEqual(EXPECTED_RESULT);
      }
    );

    it.each(["0", []])("should return R$ 0,00 if value is %s", WRONG_AMOUNT => {
      const EXPECTED_RESULT = "R$\u{00A0}0,00";

      const ACTUAL = toBRL(WRONG_AMOUNT);

      expect(ACTUAL).toEqual(EXPECTED_RESULT);
    });
  });

  describe("Converts number from BRL", () => {
    it("should return converted amount", () => {
      const STR_AMOUNT = "R$ 340,20";
      const EXPECTED_RESULT = "340.20";

      const ACTUAL = fromBRL(STR_AMOUNT);

      expect(ACTUAL).toEqual(EXPECTED_RESULT);
    });

    it.each(["-", {}, null, undefined, []])(
      "should return a dash if value is %s",
      WRONG_AMOUNT => {
        const EXPECTED_RESULT = "-";

        const ACTUAL = fromBRL(WRONG_AMOUNT);

        expect(ACTUAL).toEqual(EXPECTED_RESULT);
      }
    );
  });

  describe("Handle currency field change", () => {
    it("should shift input numbers to fill from left of", () => {
      const CASES = [
        { amount: 0.5, expected: "0,05" },
        { amount: 5, expected: "0,50" },
        { amount: 52, expected: "0,52" },
        { amount: 525, expected: "5,25" },
        { amount: 5256, expected: "52,56" },
      ];

      CASES.forEach(({ expected, amount }) => {
        const EXPECTED_RESULT = `R$\u{00A0}${expected}`;

        const ACTUAL = handleCurrencyFieldChange(amount);

        expect(ACTUAL).toEqual(EXPECTED_RESULT);
      });
    });

    it.each(["-", {}, null, undefined, []])(
      "should return a dash if value is %s",
      WRONG_AMOUNT => {
        const EXPECTED_RESULT = "-";

        const ACTUAL = fromBRL(WRONG_AMOUNT);

        expect(ACTUAL).toEqual(EXPECTED_RESULT);
      }
    );
  });

  it("Sanitize -> should sanitize a number", () => {
    const EXPECTED_RESULT = "1922031233139013";
    const input = "1ab922.,03e123313s-9013]";

    const ACTUAL = sanitizeNumber(input);
    expect(ACTUAL).toEqual(EXPECTED_RESULT);
  });
});
