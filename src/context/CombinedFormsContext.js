import React, { useCallback, useEffect, useState } from "react";

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

const defaultContext = {
  combinedForms: defaultCombinedForms,
  changeForm: (formName, newObject) => {},
  clear: () => {},
};

const CombinedFormContext = React.createContext(defaultContext);
const { Provider } = CombinedFormContext;

const CombinedFormsProvider = ({ children }) => {
  const [forms, setForms] = useState(defaultCombinedForms);
  const changeForm = useCallback((key, value = {}) => {
    if (typeof value !== "object") {
      throw new Error(
        "Wrong value passed to Combine Forms. Expected an object"
      );
    }
    setForms((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  }, []);

  const clear = useCallback(() => {
    setForms(defaultCombinedForms);
  }, []);

  useEffect(() => clear(), [clear]);

  return (
    <Provider
      value={{
        combinedForms: forms,
        clear,
        changeForm,
      }}
    >
      {children}
    </Provider>
  );
};

export { CombinedFormsProvider, AVAILABLE_FORMS, CombinedFormContext };
