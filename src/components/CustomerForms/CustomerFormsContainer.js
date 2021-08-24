import React, { useState, useEffect, useCallback, useRef } from "react";

import { engineAPI } from "utils";

import CustomerFormsView from "./CustomerFormsView";

const noop = () => {};

export const createCustomerFormsContainer = ({ engineAPI }) =>
  function CustomerFormsContainer({
    customerSubFormsIds = {},
    setIdForCustomerSubForm = noop,
    afterSendAction = noop,
    hideSendButton,
  }) {
    const [modelsList, changeModelsList] = useState(null);
    const [isFormFilled, setIsFormFilled] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [carForm, setCarForm] = useState({
      model: "",
      make: "",
      year: "",
      fuel: "",
    });

    const customerFormRef = useRef(null);

    const [customerCarForm, setCustomerCarForm] = useState({
      licensePlate: "",
      displacement: "",
      color: "",
    });

    const [errorType, setErrorType] = useState("");

    const fetchModelsFromMaker = useCallback(async () => {
      const modelsList = await engineAPI.cars.get();
      changeModelsList(modelsList.data);
    }, []);

    const fetchClientData = useCallback(async () => {
      if (
        customerSubFormsIds.customerCarFormId &&
        !customerSubFormsIds.customerFormId
      ) {
        const {
          data: { customer_cars, customers, cars },
        } = await engineAPI.customer_cars.get({
          urlExtension: customerSubFormsIds.customerCarFormId,
          params: {
            include: "cars,customers",
          },
        });
        setCarForm({
          ...cars,
          year: cars.manufacture_year,
        });
        setCustomerCarForm({
          ...customer_cars,
          licensePlate: customer_cars.license_plate,
        });

        setIdForCustomerSubForm({
          customerFormId: customers.id,
        });
        setIsFormFilled(true);
      }
    }, [
      customerSubFormsIds.customerCarFormId,
      customerSubFormsIds.customerFormId,
      setIdForCustomerSubForm,
    ]);

    const requestAPIForSubform =
      ({ method, resource, subFormIdName, id }) =>
      async ({ data, urlExtension, ...requestOptions }) => {
        const urlExtensions = [];
        if (urlExtension) urlExtensions.push(urlExtension);
        if (id) urlExtensions.push(`${id}`);

        const response = await engineAPI[resource][method]({
          data,
          ...(urlExtensions.length
            ? { urlExtension: urlExtensions.join("/") }
            : {}),
          ...requestOptions,
        });
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
        method: "patch",
        subFormIdName,
        id,
      });
    };

    async function insertNewCar() {
      try {
        const request = requestAPIForSubform({
          resource: "cars",
          method: "post",
          subFormIdName: "carFormId",
        });
        const response = await request({
          data: {
            model: carForm.model,
            make: carForm.make,
            manufacture_year: carForm.year,
            fuel: carForm.fuel,
          },
        });
        return response;
      } catch (error) {
        setErrorType("CAR_FORM");
      }
    }

    async function insertNewCustomer() {
      try {
        const request = getResourcePostOrPutRequest(
          "customerFormId",
          "customers"
        );
        const response = await request({
          data: {
            document_number: customerFormRef.current.documentNumber,
            fullname: customerFormRef.current.fullName,
            address: customerFormRef.current.address,
            email: customerFormRef.current.email,
            phone: customerFormRef.current.phone,
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
            customer_id: customerId,
            displacement: customerCarForm.displacement,
            color: customerCarForm.color,
          },
        });
        setErrorType("");
        setIsFormFilled(true);
        return response;
      } catch (error) {
        console.log(error);
        setErrorType("CUSTOMER_CAR_FORM");
      }
    }

    async function sendForm() {
      setIsLoading(true);
      const responseCar = await insertNewCar();
      const responseCustomer = await insertNewCustomer();
      if (responseCar?.id && responseCustomer?.id) {
        const response = await insertNewCustomerCar(
          responseCar.id,
          responseCustomer.id
        );
        if (response?.id) {
          afterSendAction(response.id);
        }
      }
      setIsLoading(false);
    }

    const getChangeFormKeyToForm = setForm => key => event => {
      if (event.persist) event.persist();
      setForm(prev => ({ ...prev, [key]: event?.target?.value }));
    };

    useEffect(() => {
      fetchClientData();
    }, [fetchClientData]);

    useEffect(() => {
      fetchModelsFromMaker();
    }, [fetchModelsFromMaker]);

    useEffect(() => {
      if (Object.values(customerSubFormsIds).length === 3) {
        setIsFormFilled(true);
      }
    }, [customerSubFormsIds]);

    return (
      <CustomerFormsView
        changeCarFormForKey={getChangeFormKeyToForm(setCarForm)}
        changeCustomerCarFormForKey={getChangeFormKeyToForm(setCustomerCarForm)}
        modelsList={modelsList}
        customerFormRef={customerFormRef}
        customerCarForm={customerCarForm}
        carForm={carForm}
        errorType={errorType}
        sendForm={sendForm}
        isFormFilled={isFormFilled}
        isLoading={isLoading}
        hideSendButton={hideSendButton}
      />
    );
  };

export default createCustomerFormsContainer({ engineAPI });
