import React, { useState, useEffect } from "react";
import {
  Button,
} from "@material-ui/core";

import engineAPI from "../../utils/apiRoutes/apiRoutes";

import WholeFormView from './WholeFormview'
import CustomerDataCardView from "../CustomerDataCard/CustomerDataCardView";



export const createWholeFormContainer = () =>
  function WholeFormContainer() {
    const [modelsList, changeModelsList] = useState([]);
    const [hasFilledForm, setHasFilledForm] = useState(false)
    const [carForm, setCarForm] = useState({
      id: null,
      model: "",
      make: "",
      year: "",
    })

    const [customerForm, setCustomerForm] = useState({
      id: null,
      documentNumber: "",
      fullName: "",
      address: "",
      email: "",
      phone: "",
    })

    const [customerCarForm, setCustomerCarForm] = useState({
      id: null,
      licensePlate: "",
      carId: null,
      customerId: null,
      displacement: "",
      color: ""
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function fetchModelsFromMaker() {
      const modelsList = await engineAPI.cars.get()
      changeModelsList(modelsList.data.data);
    }

    async function insertNewCar() {
      if (!carForm.id) {
        const response = await engineAPI.cars.post({
          data: {
            model: carForm.model,
            make: carForm.make,
            manufacture_year: carForm.year
          }
        })
        setCarForm(prevState => ({ ...prevState, id: response.data.data.id }))
        return response.data.data;
      }
      return carForm
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
          }
        })
        setCustomerForm(prevState => ({ ...prevState, id: response.data.data.id }))
        return response.data.data
      }
      return customerForm
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
          }
        })
        setCustomerCarForm(prevState => ({ ...prevState, id: response.data.data.id }))
        return response.data.data
      }
      return customerCarForm
    }

    async function sendForm() {
      try {
        const { id: carId } = await insertNewCar()
        const { id: customerId } = await insertNewCustomer()
        await insertNewCustomerCar(carId, customerId)
        setError("")
        setHasFilledForm(true)
      }
      catch (e) {
        console.error(e)
        setError("Não foi possível adicionar os dados")
      }
    }


    const getChangeFormKeyToForm = (setForm) => (key) => (event) => {
      if (event.persist)
        event.persist()
      setForm(prev => ({ ...prev, [key]: event?.target?.value }))
    }


    useEffect(() => {
      fetchModelsFromMaker();
    }, [])

    if (success) {
      return <Button onClick={() => { setSuccess(null) }}>Ok!</Button>
    }

    return (
      <div>
        {
          !hasFilledForm && <WholeFormView
            changeCarFormForKey={getChangeFormKeyToForm(setCarForm)}
            changeCustomerFormForKey={getChangeFormKeyToForm(setCustomerForm)}
            changeCustomerCarFormForKey={getChangeFormKeyToForm(setCustomerCarForm)}
            formsData={{ modelsList, customerForm, customerCarForm, carForm }}
            error={error}
            sendForm={sendForm}
          />
        }
        {
          hasFilledForm && <CustomerDataCardView formsData={{ modelsList, customerForm, customerCarForm, carForm }} />
        }
      </div>
    );
  };


export default createWholeFormContainer()