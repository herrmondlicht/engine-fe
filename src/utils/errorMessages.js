export const getErrorMessage = (errorType) => {
  switch (errorType) {
  case "":
    return "";
  case "CAR_FORM":
    return "Não foi possível adicionar o carro. Verifique os dados e tente novamente";
  case "CUSTOMER_FORM":
    return "Não foi possível adicionar o cliente. Verifique os dados e tente novamente";
  case "CUSTOMER_CAR_FORM":
    return "Não foi possível adicionar o carro do cliente. Verifique os dados e tente novamente";
  default:
    return "Não foi possível completar a ação";
  }
};
