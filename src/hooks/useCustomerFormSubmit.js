import { useCallback } from "react";

import {
  AVAILABLE_FORMS,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
} from "context";
import { useCombinedForms } from "./useCombinedForms";
import { useNotification } from "./useNotification";
import {
  convertFormKeyToAPI,
  engineAPI,
  fixPayloadKeys,
  getHTTPMethod,
} from "utils";

export const createCustomerFormSubmit =
  ({ api, changeForm, showNotification, loadedCustomer }) =>
  async data => {
    const method = getHTTPMethod(loadedCustomer?.id);
    try {
      const { data: customerData } = await api.customers[method]({
        urlExtension: loadedCustomer?.id,
        data: fixPayloadKeys(data, { fieldTranslator: convertFormKeyToAPI }),
      });
      showNotification({
        id: "customerAdded",
        duration: NOTIFICATION_DURATION.SHORT,
        title: loadedCustomer?.id
          ? "Cliente atualizado!"
          : "Cliente adicionado!",
        type: loadedCustomer?.id
          ? NOTIFICATION_TYPES.INFO
          : NOTIFICATION_TYPES.SUCCESS,
      });
      changeForm(AVAILABLE_FORMS.CUSTOMER, customerData);
    } catch (error) {
      console.log(error);
      showNotification({
        id: "customerAddedError",
        duration: NOTIFICATION_DURATION.LONG,
        title: "Opa algo deu errado!",
        message:
          "Não foi possível adicionar o cliente. Revise os dados e tente novamente",
        type: NOTIFICATION_TYPES.ERROR,
      });
    }
  };

export const useCustomerFormSubmit = loadedCustomer => {
  const { showNotification } = useNotification();
  const { changeForm } = useCombinedForms();

  return useCallback(
    async data =>
      createCustomerFormSubmit({
        api: engineAPI,
        changeForm,
        showNotification,
        loadedCustomer,
      })(data),
    [changeForm, loadedCustomer, showNotification]
  );
};
