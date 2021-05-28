import React, { useCallback, useContext, useEffect } from "react";

const AVAILABLE_FORMS = {
  CUSTOMER: "customers",
  CAR: "cars",
  CUSTOMER_CAR: "customer_cars",
  SERVICE_ORDER: "service_orders",
};

const defaultCombinedForms = {
  customers: null,
  cars: null,
  customer_cars: null,
  service_orders: null,
};

const CombinedFormContext = React.createContext(defaultCombinedForms);
const { Provider } = CombinedFormContext;

export const useCombinedForms = () => {
  const context = useContext(CombinedFormContext);
  const changeForm = useCallback(
    (key, value = {}) => {
      if (typeof value !== "object") {
        throw new Error(
          "Wrong value passed to Combine Forms. Expected an object"
        );
      }
      context[key] = value;
    },
    [context]
  );

  const clear = useCallback(() => {
    context.customers = null;
    context.cars = null;
    context.customer_cars = null;
    context.service_orders = null;
  }, [context]);

  useEffect(() => clear(), [clear, context]);

  return {
    context,
    clear,
    changeForm,
  };
};

export { Provider as CombinedFormContextProvider, AVAILABLE_FORMS };
