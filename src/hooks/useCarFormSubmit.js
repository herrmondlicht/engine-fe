import { useCallback } from "react";

import { NOTIFICATION_DURATION, NOTIFICATION_TYPES } from "context";
import { useNotification } from "./useNotification";
import {
  convertFormKeyToAPI,
  engineAPI,
  fixPayloadKeys,
  getHTTPMethod,
  ERROR_CODES,
} from "utils";

export const createCarFormSubmit =
  ({
    api,
    showNotification,
    showErrorNotification,
    customerCarData,
    cars,
    customers,
    setCustomerCarData,
    onSubmitAction,
  }) =>
  async data => {
    const sendNewCarForm = async ({ model, make, manufactureYear, fuel }) => {
      try {
        const payload = {
          ...(cars ? cars : {}),
          model,
          make,
          manufactureYear,
          fuel,
        };
        const response = await api.cars.post({
          data: fixPayloadKeys(payload, {
            fieldTranslator: convertFormKeyToAPI,
          }),
        });
        return response?.data;
      } catch (error) {
        showErrorNotification({
          id: "carAddedError",
          title: "Opa algo deu errado!",
          message: "Veículo não adicionado. Revise os dados e tente novamente",
        });
        return {};
      }
    };

    const sendNewCustomerCarForm = async ({ color, licensePlate, car_id }) => {
      const method = getHTTPMethod(customerCarData?.id);
      try {
        const payload = {
          ...(customerCarData ? customerCarData : {}),
          color,
          licensePlate,
          car_id,
          customer_id: customers.id,
        };
        const response = await api.customer_cars[method]({
          urlExtension: customerCarData?.id,
          data: fixPayloadKeys(payload, {
            fieldTranslator: convertFormKeyToAPI,
          }),
        });
        showNotification({
          id: "carAdded",
          duration: NOTIFICATION_DURATION.SHORT,
          title: customerCarData
            ? "Veículo atualizado!"
            : "Veículo adicionado!",
          type: customerCarData
            ? NOTIFICATION_TYPES.INFO
            : NOTIFICATION_TYPES.SUCCESS,
        });
        setCustomerCarData(response?.data);
        return response?.data;
      } catch (error) {
        if (error.code === ERROR_CODES.DUP00001) {
          showErrorNotification({
            id: "carAddedError",
            title: "Veículo já cadastrado",
            message: "Revise os dados e tente novamente",
          });
          return {};
        }
        showErrorNotification({
          id: "carAddedError",
          title: "Opa algo deu errado!",
          message: "Veículo não adicionado. Revise os dados e tente novamente",
        });
        return {};
      }
    };

    const { id } = await sendNewCarForm(data);
    if (!id) {
      return;
    }
    const dataToSubmit = {
      ...data,
      car_id: id,
    };
    const { id: customerCarId } = await sendNewCustomerCarForm(dataToSubmit);
    if (customerCarId && onSubmitAction) {
      onSubmitAction({
        ...dataToSubmit,
        id: customerCarId,
      });
    }
  };

export const useCarFormSubmit = ({
  customerCarData,
  cars,
  customers,
  setCustomerCarData,
  onSubmitAction,
}) => {
  const { showNotification, showErrorNotification } = useNotification();

  return useCallback(
    async data =>
      createCarFormSubmit({
        api: engineAPI,
        showNotification,
        showErrorNotification,
        customerCarData,
        cars,
        customers,
        setCustomerCarData,
        onSubmitAction,
      })(data),
    [
      customerCarData,
      cars,
      customers,
      onSubmitAction,
      setCustomerCarData,
      showErrorNotification,
      showNotification,
    ]
  );
};
