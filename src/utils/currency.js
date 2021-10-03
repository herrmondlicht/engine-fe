const NOT_DIGIT = /\D/g;

export const toBRL = value => {
  if (isNaN(value)) {
    return "-";
  }
  return Number(value.toString()).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const fromBRL = value => {
  if (value === undefined || value === null) {
    return "-";
  }
  return fixDecimalPoint(value.toString());
};

export const handleCurrencyFieldChange = value => {
  const fixedValue = fixDecimalPoint(value.toString()).split("");
  if (fixedValue[0] === ".") {
    fixedValue.splice(0, 0, "0");
  }
  if (fixedValue[0] === "0" && fixedValue.length > 4) {
    fixedValue.shift();
  }
  return toBRL(fixedValue.join(""));
};

export const sanitizeNumber = value => value?.replace(NOT_DIGIT, "");

const fixDecimalPoint = value => {
  if (!value) {
    return "0.00";
  }
  const sanitizedValueRaw = sanitizeNumber(value.toString());
  const valueRawArray = sanitizedValueRaw.split("");
  valueRawArray.splice(-2, 0, ".");
  const valueWithDecimalPoint = valueRawArray.join("");

  return valueWithDecimalPoint;
};
