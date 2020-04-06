import React, { useState, useEffect, useCallback } from "react";

import engineAPI from "../../utils/apiRoutes/apiRoutes";

import WholeFormView from "./WholeForm/WholeFormView";

export const createWholeFormContainer = ({ engineAPI }) =>
  function WholeFormContainer() {
    const [modelsList, changeModelsList] = useState([]);
    const [hasFilledForm, setHasFilledForm] = useState(false);
    const [carForm, setCarForm] = useState({
      id: null,
      model: "",
      make: "",
      year: "",
    });

    const [customerForm, setCustomerForm] = useState({
      id: null,
      documentNumber: "",
      fullName: "",
      address: "",
      email: "",
      phone: "",
    });

    const [customerCarForm, setCustomerCarForm] = useState({
      id: null,
      licensePlate: "",
      carId: null,
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
      if (!carForm.id) {
        const response = await engineAPI.cars.post({
          data: {
            model: carForm.model,
            make: carForm.make,
            manufacture_year: carForm.year,
          },
        });
        setCarForm((prevState) => ({
          ...prevState,
          id: response.data.data.id,
        }));
        return response.data.data;
      }
      return carForm;
    }

    async function insertNewCustomer() {
      if (!customerForm.id) {
        const response = await engineAPI.customers.post({
          data: {
            document_number: customerForm.documentNumber,
            fullname: customerForm.fullName,
            address: customerForm.address,
            email: customerForm.email,
            phone: customerForm.phone,
          },
        });
        setCustomerForm((prevState) => ({
          ...prevState,
          id: response.data.data.id,
        }));
        return response.data.data;
      }
      return customerForm;
    }

    async function insertNewCustomerCar(carId, customerId) {
      if (!customerCarForm.id) {
        const response = await engineAPI.customers.post({
          urlExtension: `${customerId}/cars`,
          data: {
            license_plate: customerCarForm.licensePlate,
            car_id: carId,
            displacement: customerCarForm.displacement,
            color: customerCarForm.color,
          },
        });
        setCustomerCarForm((prevState) => ({
          ...prevState,
          id: response.data.data.id,
        }));
        return response.data.data;
      }
      return customerCarForm;
    }

    async function sendForm() {
      try {
        const { id: carId } = await insertNewCar();
        const { id: customerId } = await insertNewCustomer();
        await insertNewCustomerCar(carId, customerId);
        setError("");
        setHasFilledForm(true);
      } catch (e) {
        console.error(e);
        setError("Não foi possível adicionar os dados");
      }
    }

    const getChangeFormKeyToForm = (setForm) => (key) => (event) => {
      if (event.persist) event.persist();
      setForm((prev) => ({ ...prev, [key]: event?.target?.value }));
    };

    useEffect(() => {
      fetchModelsFromMaker();
    }, []);

    const changeCarFormForKey = useCallback(
      getChangeFormKeyToForm(setCarForm),
      [setCarForm]
    );
    const changeCustomerFormForKey = useCallback(
      getChangeFormKeyToForm(setCustomerForm),
      [setCustomerForm]
    );
    const changeCustomerCarFormForKey = useCallback(
      getChangeFormKeyToForm(setCustomerCarForm),
      [setCustomerCarForm]
    );

    return (
      <>
        <WholeFormView
          changeCarFormForKey={changeCarFormForKey}
          changeCustomerFormForKey={changeCustomerFormForKey}
          changeCustomerCarFormForKey={changeCustomerCarFormForKey}
          modelsList={modelsList}
          customerForm={customerForm}
          customerCarForm={customerCarForm}
          carForm={carForm}
          error={error}
          sendForm={sendForm}
        />
      </>
    );
  };

export default createWholeFormContainer({ engineAPI });
