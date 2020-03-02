import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  Button,
} from "@material-ui/core";

import requests from "../../utils/apiRoutes/apiRoutes";
import AddCarFormView from "./AddCarFormView";
import AddCustomerCarFormView from "./AddCustomerCarFormView";
import useStyles from "./styles/FormStyleHook"



export const createAddCarFormContainer = () =>
  function AddCarFormContainer() {
    
    const [customerForm, setCustomerForm] = useState({
      id: null,
      documentNumber: "",
      fullName: "",
      address: ""
    })

    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")
    const classes = useStyles();

    async function fetchModelsFromMaker(maker) {
      const modelsList = await requests.cars.get()
      changeModelsList(modelsList.data.data);
    }

    async function addNewCar({ id, ...car }) {

      if (Object.values(car).indexOf("") !== -1) {
        setError("Todos os campos são obrigatórios!");
        return;
      }
      try {
        const { data } = await requests.cars.post({ data: car })
        setSuccess("Adicionado com sucesso")
        setCarForm(prev => ({
          ...prev,
          id: data.id
        }))
      } catch (error) {
        console.log(error)
        setError("Não foi possível adicionar o carro. Tente novamente")
      }
    }


    async function addCustomerCar() {
      const customerCar = {}
    }


    const setForm = (id, value) => prev => ({ ...prev, [id]: value })

    const changeCarFormForId = (id) => (e, value) =>
      setCarForm(setForm(id, value))

    const changeCustomerFormForId = (id) => (e, value) =>
      setCustomerCarForm(setForm(id, value))

    const changeCustomerCarFormForId = (id) => (e, value) =>
      setCustomerCarForm(setForm(id, value))


    useEffect(() => {
      fetchModelsFromMaker();
    }, [])

    if (success) {
      return <Button onClick={() => { setSuccess(null) }}>Ok!</Button>
    }

    return (
      <Paper variant="outlined" className={classes.paperContainer}>
        {modelsList.length === 0
          ? "carregando..."
          :
          <Grid container alignContent="center">
            <Grid
              container
              item
              sm={12}
              justify="center"
              className={classes.formWrapper}
            >
              <Typography variant="h4">Dados do veículo</Typography>
              <Grid
                container
                item
                sm={12}
                spacing={2}
                justify="center"
                direction="row"
                className={classes.formWrapper}
              >
                <Grid item sm={6} xs={12}>
                  <AddCarFormView
                    modelsList={modelsList}
                    form={carForm}
                    changeFormForId={changeCarFormForId} />
                </Grid>
                <Grid item sm={6} xs={12}>
                  <AddCustomerCarFormView
                    changeFormForId={changeCustomerCarFormForId}
                    form={customerCarForm}
                    setForm={setCustomerCarForm}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>}
      </Paper >
    );
  };






export default createAddCarFormContainer()