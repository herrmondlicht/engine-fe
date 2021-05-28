import { CustomerForm } from "components";
import { AVAILABLE_FORMS, useCombinedForms } from "hooks";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ScreenLoader } from "ui-fragments";
import { engineAPI } from "utils";

const RegisterForm = () => {
  const { changeForm, clear } = useCombinedForms();
  const [isLoading, setIsLoading] = useState(false);
  const { customer_car_id } = useParams();

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
        //show notification
      } finally {
        setIsLoading(false);
      }
    }
  }, [changeForm, customer_car_id]);

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
      <ScreenLoader isLoading={isLoading} radius>
        <CustomerForm />
      </ScreenLoader>
    </div>
  );
};

export default RegisterForm;
