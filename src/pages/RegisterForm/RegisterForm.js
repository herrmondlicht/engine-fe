import React from "react";
import { CustomerForm } from "components";
import { CarForm } from "components/CustomerForms/CarForm";
import {
  AVAILABLE_FORMS,
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
} from "context";
import { useCombinedForms, useLoader, useNotification } from "hooks";
import { useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ScreenLoader } from "ui-fragments";
import { engineAPI } from "utils";

const RegisterForm = () => {
  const {
    changeForm,
    clear,
    combinedForms: { customer_cars, customers, cars },
  } = useCombinedForms();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useLoader(false);
  const { customer_car_id } = useParams();
  const history = useHistory();

  const loadCustomerCarIfParam = useCallback(async () => {
    if (customer_car_id) {
      try {
        setIsLoading(true);
        const { data } = await engineAPI.customer_cars.get({
          urlExtension: `${customer_car_id}?include=cars,customers`,
        });
        changeForm(AVAILABLE_FORMS.CAR, data?.cars);
        changeForm(AVAILABLE_FORMS.CUSTOMER_CAR, data?.customer_cars);
        changeForm(AVAILABLE_FORMS.CUSTOMER, data?.customers);
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
  }, [customer_car_id, setIsLoading, changeForm, showNotification, clear]);

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
              onSubmitAction={({ id }) => history.push(`/customer_car/${id}`)}
            />
          </ScreenLoader>
        </div>
      )}
    </div>
  );
};

export default RegisterForm;
