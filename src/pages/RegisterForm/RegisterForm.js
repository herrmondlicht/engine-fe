import React, { useCallback, useEffect, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

import { CustomerForm, CarForm, AddServiceButton } from "components";
import {
  NOTIFICATION_DURATION,
  NOTIFICATION_TYPES,
  AVAILABLE_FORMS,
  CombinedFormsProvider,
} from "context";
import { useCombinedForms, useLoader, useNotification } from "hooks";
import {
  Button,
  BUTTON_VARIANTS,
  Modal,
  ScreenLoader,
  Text,
} from "ui-fragments";
import { engineAPI } from "utils";

const RegisterForm = () => {
  const {
    changeForm,
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
      if (location.state?.redirect) {
        history.push(location.state?.redirect);
      } else {
        history.replace(`/customer_car/${id}`);
        setIsModalOpen(true);
      }
    },
    [history, location.state]
  );

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

const CreateServiceModal = ({ handleClose, customerCarId, isOpen }) => {
  const history = useHistory();
  return (
    <Modal isOpen={isOpen} handleClose={handleClose} title="Cliente Adicionado">
      <div>
        <div className="my-5">
          <Text>
            Você pode adicionar uma ordem de serviço para esse cliente
          </Text>
        </div>
        <div className="mt-4 flex gap-3 justify-end">
          <Button
            variant={BUTTON_VARIANTS.GHOST}
            onClick={handleClose}
            showVariantIcon={false}
          >
            Cancelar
          </Button>
          <AddServiceButton
            customerCarId={customerCarId}
            onServiceAdd={data =>
              history.push(`/services/${data.id}`, {
                redirect: `/customers/${customerCarId}`,
              })
            }
          >
            <Text>Adicionar Também o Serviço</Text>
          </AddServiceButton>
        </div>
      </div>
    </Modal>
  );
};

const RegisterFormWithContext = () => (
  <CombinedFormsProvider value={{}}>
    <RegisterForm />
  </CombinedFormsProvider>
);

export default RegisterFormWithContext;
