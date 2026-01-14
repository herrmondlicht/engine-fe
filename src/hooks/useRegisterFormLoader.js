import { useCallback } from "react";

import {
  AVAILABLE_FORMS,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
} from "context";
import { engineAPI } from "utils";
import { useCombinedForms } from "./useCombinedForms";
import { useLoader } from "./useLoader";
import { useNotification } from "./useNotification";

export const createRegisterFormLoader =
  ({ api, setDefaultForms, showNotification, clear, setIsLoading }) =>
  async customerCarId => {
    if (!customerCarId) {
      clear();
      return;
    }
    try {
      setIsLoading(true);
      const { data } = await api.customer_cars.get({
        urlExtension: `${customerCarId}?include=cars,customers`,
      });
      setDefaultForms({
        [AVAILABLE_FORMS.CAR]: data?.cars,
        [AVAILABLE_FORMS.CUSTOMER_CAR]: data?.customer_cars,
        [AVAILABLE_FORMS.CUSTOMER]: data?.customers,
      });
    } catch (e) {
      showNotification({
        id: "customerCarLoadError",
        duration: NOTIFICATION_DURATION.LONG,
        type: NOTIFICATION_TYPES.ERROR,
        title: "Opa, algo deu errado!",
        message: "Não foi possível carregar os dados desse cliente",
      });
    } finally {
      setIsLoading(false);
    }
  };

export const useRegisterFormLoader = customerCarId => {
  const { setDefaultForms, clear } = useCombinedForms();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useLoader(false);

  const loadCustomerCar = useCallback(
    () =>
      createRegisterFormLoader({
        api: engineAPI,
        setDefaultForms,
        showNotification,
        clear,
        setIsLoading,
      })(customerCarId),
    [clear, customerCarId, setDefaultForms, setIsLoading, showNotification]
  );

  return { isLoading, loadCustomerCar };
};
