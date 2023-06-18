export const getHTTPMethod = loadedData => (loadedData ? "patch" : "post");

export const getMonthName = month => {
  const date = new Date();
  date.setDate(1);
  date.setMonth(month - 1);
  return date.toLocaleString("pt-BR", { month: "long" }).toUpperCase();
};
