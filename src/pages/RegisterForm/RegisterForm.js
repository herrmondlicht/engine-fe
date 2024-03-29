import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { CustomerForm, CarForm } from "components";
import {
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
  AVAILABLE_FORMS,
  CombinedFormsProvider,
} from "context";
import { useCombinedForms, useLoader, useNotification } from "hooks";
import { ScreenLoader } from "ui-fragments";
import { engineAPI } from "utils";

import { CreateServiceModal } from "./CreateServiceModal";

const RegisterForm = () => {
  const {
    setDefaultForms,
    clear,
    combinedForms: { customer_cars, customers, cars },
  } = useCombinedForms();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useLoader(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { customer_car_id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const onSubmitLastForm = useCallback(
    ({ id }) => {
      if (location.state?.redirect && customer_car_id) {
        history.push(location.state?.redirect);
      } else {
        history.replace(`/customer_car/${id}`);
        setIsModalOpen(true);
      }
    },
    [customer_car_id, history, location.state?.redirect]
  );

  const loadCustomerCarIfParam = useCallback(async () => {
    if (customer_car_id) {
      try {
        setIsLoading(true);
        const { data } = await engineAPI.customer_cars.get({
          urlExtension: `${customer_car_id}?include=cars,customers`,
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
    } else {
      clear();
    }
  }, [customer_car_id, setIsLoading, setDefaultForms, showNotification, clear]);

  useEffect(() => {
    loadCustomerCarIfParam();
  }, [loadCustomerCarIfParam]);

  useEffect(
    () => () => {
      clear();
    },
    [clear]
  );

  return (
    <div>
      <div className="mb-10">
        <ScreenLoader isLoading={isLoading} radius>
          <CustomerForm loadedCustomer={customers} />
        </ScreenLoader>
      </div>
      {customers?.id && (
        <div className="mb-10">
          <ScreenLoader isLoading={isLoading} radius>
            <CarForm
              loadedData={{ cars, customer_cars, customers }}
              onSubmitAction={onSubmitLastForm}
            />
          </ScreenLoader>
        </div>
      )}
      <CreateServiceModal
        isOpen={isModalOpen}
        handleClose={() => setIsModalOpen(false)}
        customerCarId={customer_cars?.id}
      />
    </div>
  );
};

const RegisterFormWithContext = () => (
  <CombinedFormsProvider value={{}}>
    <RegisterForm />
  </CombinedFormsProvider>
);

export default RegisterFormWithContext;
