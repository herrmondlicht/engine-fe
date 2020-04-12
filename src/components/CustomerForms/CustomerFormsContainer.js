import React, { useState, useEffect } from "react";

import engineAPI from "../../utils/apiRoutes/apiRoutes";

import CustomerFormsView from "./CustomerFormsView";

const noop = () => {};

export const createCustomerFormsContainer = ({ engineAPI }) =>
  function CustomerFormsContainer({
    customerSubFormsIds = {},
    setIdForCustomerSubForm = noop,
  }) {
    const [modelsList, changeModelsList] = useState(null);
    const [isFormFilled, setIsFormFilled] = useState(false);
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
      displacement: "",
      color: "",
    });

    const [errorType, setErrorType] = useState("");

    async function fetchModelsFromMaker() {
      const modelsList = await engineAPI.cars.get();
      changeModelsList(modelsList.data.data);
    }

    const requestAPIForSubform = ({
      method,
      resource,
      subFormIdName,
    }) => async (requestOptions) => {
      const response = await engineAPI[resource][method](requestOptions);
      setIdForCustomerSubForm({ [subFormIdName]: response.data.data.id });
      return response.data.data;
    };

    const getResourcePostOrPutRequest = (subFormIdName, resource) => {
      const id = customerSubFormsIds[subFormIdName];
      if (!id) {
        return requestAPIForSubform({
          resource,
          method: "post",
          subFormIdName,
        });
      }

      return requestAPIForSubform({
        resource,
        method: "put",
        subFormIdName,
      });
    };

    async function insertNewCar() {
      try {
        const request = getResourcePostOrPutRequest("carFormId", "cars");
        const response = await request({
          data: {
            model: carForm.model,
            make: carForm.make,
            manufacture_year: carForm.year,
          },
        });
        return response;
      } catch (error) {
        setErrorType("CAR_FORM");
      }
    }

    async function insertNewCustomer() {
      try {
        const request = getResourcePostOrPutRequest("carFormId", "customers");
        const response = await request({
          data: {
            document_number: customerForm.documentNumber,
            fullname: customerForm.fullName,
            address: customerForm.address,
            email: customerForm.email,
            phone: customerForm.phone,
          },
        });
        return response;
      } catch (error) {
        setErrorType("CUSTOMER_FORM");
      }
    }

    async function insertNewCustomerCar(carId, customerId) {
      try {
        const request = getResourcePostOrPutRequest(
          "customerCarFormId",
          "customers"
        );
        const response = await request({
          urlExtension: `${customerId}/cars`,
          data: {
            license_plate: customerCarForm.licensePlate,
            car_id: carId,
            displacement: customerCarForm.displacement,
            color: customerCarForm.color,
          },
        });
        setErrorType("");
        setIsFormFilled(true);
        return response;
      } catch (error) {
        setErrorType("CUSTOMER_CAR_FORM");
      }
    }

    async function sendForm() {
      setIsLoading(true);
      const responseCar = await insertNewCar();
      const responseCustomer = await insertNewCustomer();
      if (responseCar?.id && responseCustomer?.id)
        await insertNewCustomerCar(responseCar.id, responseCustomer.id);
      setIsLoading(false);
    }

    const getChangeFormKeyToForm = (setForm) => (key) => (event) => {
      if (event.persist) event.persist();
      setForm((prev) => ({ ...prev, [key]: event?.target?.value }));
    };

    useEffect(() => {
      fetchModelsFromMaker();
    }, []);

    return (
      <CustomerFormsView
        changeCarFormForKey={getChangeFormKeyToForm(setCarForm)}
        changeCustomerFormForKey={getChangeFormKeyToForm(setCustomerForm)}
        changeCustomerCarFormForKey={getChangeFormKeyToForm(setCustomerCarForm)}
        modelsList={modelsList}
        customerForm={customerForm}
        customerCarForm={customerCarForm}
        carForm={carForm}
        errorType={errorType}
        sendForm={sendForm}
        isFormFilled={isFormFilled}
        isLoading={isLoading}
      />
    );
  };

export default createCustomerFormsContainer({ engineAPI });
