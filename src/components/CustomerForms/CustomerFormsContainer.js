import React, { useState, useEffect } from "react";

import engineAPI from "../../utils/apiRoutes/apiRoutes";

import CustomerFormsView from "./CustomerFormsView";

const noop = () => {};

export const createCustomerFormsContainer = ({ engineAPI }) =>
  function CustomerFormsContainer({
    customerSubFormsIds = {},
    setIdForCustomerSubForm = noop,
  }) {
    const [modelsList, changeModelsList] = useState([]);
    const [isFormFilled, setIsFormFilled] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [carForm, setCarForm] = useState({
      model: "",
      make: "",
      year: "",
    });

    const [customerForm, setCustomerForm] = useState({
      documentNumber: "",
      fullName: "",
      address: "",
      email: "",
      phone: "",
    });

    const [customerCarForm, setCustomerCarForm] = useState({
      licensePlate: "",
      customerId: null,
      displacement: "",
      color: "",
    });

    const [error, setError] = useState("");

    async function fetchModelsFromMaker() {
      const modelsList = await engineAPI.cars.get();
      changeModelsList(modelsList.data.data);
    }

    async function insertNewCar() {
      if (!customerSubFormsIds.carFormId) {
        const response = await engineAPI.cars.post({
          data: {
            model: carForm.model,
            make: carForm.make,
            manufacture_year: carForm.year,
          },
        });
        setIdForCustomerSubForm({ carFormId: response.data.data.id });
        return response.data.data;
      }

      // todo: add logic to update car here
      return carForm;
    }

    async function insertNewCustomer() {
      try {
        if (!customerSubFormsIds.customerFormId) {
          const response = await engineAPI.customers.post({
            data: {
              document_number: customerForm.documentNumber,
              fullname: customerForm.fullName,
              address: customerForm.address,
              email: customerForm.email,
              phone: customerForm.phone,
            },
          });
          setIdForCustomerSubForm({ customerFormId: response.data.data.id });
          return response.data.data;
        }
        // todo: add logic to update car here
        return customerForm;
      } catch (error) {
        setError(
          "Não foi possível adicionar o carro. Verifique os dados e tente novamente"
        );
      }
    }

    async function insertNewCustomerCar(carId, customerId) {
      try {
        if (!customerSubFormsIds.customerCarFormId) {
          const response = await engineAPI.customers.post({
            urlExtension: `${customerId}/cars`,
            data: {
              license_plate: customerCarForm.licensePlate,
              car_id: carId,
              displacement: customerCarForm.displacement,
              color: customerCarForm.color,
            },
          });
          setIdForCustomerSubForm({ customerCarFormId: response.data.data.id });
          setError("");
          setIsFormFilled(true)
          return response.data.data;
        }
        // todo: add logic to update car here
        return customerCarForm;
      } catch (error) {
        setError(
          "Não foi possível adicionar o carro do cliente. Verifique os dados e tente novamente"
        );
      }
    }

    async function sendForm() {
      setIsLoading(true);
      const { id: carId } = await insertNewCar();
      const { id: customerId } = await insertNewCustomer();
      await insertNewCustomerCar(carId, customerId);
      setIsLoading(false)
    }

    const getChangeFormKeyToForm = (setForm) => (key) => (event) => {
      if (event.persist) event.persist();
      setForm((prev) => ({ ...prev, [key]: event?.target?.value }));
    };

    useEffect(() => {
      fetchModelsFromMaker();
    }, []);

    return (
      <>
        <CustomerFormsView
          changeCarFormForKey={getChangeFormKeyToForm(setCarForm)}
          changeCustomerFormForKey={getChangeFormKeyToForm(setCustomerForm)}
          changeCustomerCarFormForKey={getChangeFormKeyToForm(
            setCustomerCarForm
          )}
          modelsList={modelsList}
          customerForm={customerForm}
          customerCarForm={customerCarForm}
          carForm={carForm}
          error={error}
          sendForm={sendForm}
          isFormFilled={isFormFilled}
          isLoading={isLoading}
        />
      </>
    );
  };

export default createCustomerFormsContainer({ engineAPI });
