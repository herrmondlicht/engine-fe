import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { CustomerForm, CarForm } from "components";
import { CombinedFormsProvider } from "context";
import { useCombinedForms, useRegisterFormLoader } from "hooks";
import { ScreenLoader } from "ui-fragments";

import { CreateServiceModal } from "./CreateServiceModal";

const RegisterForm = () => {
  const { customer_car_id } = useParams();
  const {
    clear,
    combinedForms: { customer_cars, customers, cars },
  } = useCombinedForms();
  const { isLoading, loadCustomerCar } = useRegisterFormLoader(customer_car_id);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  useEffect(() => {
    loadCustomerCar();
  }, [loadCustomerCar]);

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
