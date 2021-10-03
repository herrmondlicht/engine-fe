const NOT_DIGIT = /\D/g;

export const toBRL = value => {
  if (isNaN(value)) {
    return "-";
  }
  return Number(value).toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const fromBRL = value => {
  if (value === undefined || value === null) {
    return "-";
  }
  return fixDecimalPoint(value);
};

export const handleCurrencyFieldChange = value => {
  const fixedValue = fixDecimalPoint(value).split("");
  if (fixedValue[0] === ".") {
    fixedValue.splice(0, 0, "0");
  }
  if (fixedValue[0] === "0" && fixedValue.length > 4) {
    fixedValue.shift();
  }
  return toBRL(fixedValue.join(""));
};

const fixDecimalPoint = value => {
  if (!value) {
    return "0.00";
  }
  const sanitizedValueRaw = value.toString().replace(NOT_DIGIT, "");
  const valueRawArray = sanitizedValueRaw.split("");
  valueRawArray.splice(-2, 0, ".");
  const valueWithDecimalPoint = valueRawArray.join("");

  return valueWithDecimalPoint;
};
