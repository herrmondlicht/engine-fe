import * as yup from "yup";

yup.setLocale({
  mixed: {
    default: "Não é válido",
    required: "Campo obrigatório",
  },
});

export { yup };
