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
import AddCustomerView from "./AddCustomerView";

//most of the logic below needs to be exported to redux
export const createAddCarFormContainer = () =>
  function AddCarFormContainer() {
    const [modelsList, changeModelsList] = useState([]);
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
      address: ""
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
    const classes = useStyles();

    async function fetchModelsFromMaker(maker) {
      const modelsList = await requests.cars.get()
      changeModelsList(modelsList.data.data);
    }

    async function addNewCar({ id, ...car }) {
      const carData = {
        make: car.make,
        model: car.model,
        manufacture_year: car.year
      }
      if (Object.values(car).indexOf("") !== -1) {
        setError("Todos os campos são obrigatórios!");
        return;
      }
      try {
        const { data } = await requests.cars.post({ data: carData })
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


    const setForm = (id, value) => prev => ({ ...prev, [id]: value })

    const changeCarFormForId = (id) => (e, value) =>
      setCarForm(setForm(id, value))

    const changeCustomerFormForId = (id) => (e, value) =>
      setCustomerForm(setForm(id, value))

    const changeCustomerCarFormForId = (id) => (e, value) =>
      setCustomerCarForm(setForm(id, value))


    useEffect(() => {
      fetchModelsFromMaker();
    }, [])

    if (success) {
      return <Button onClick={() => { setSuccess(null) }}>Ok!</Button>
    }

    return (
      <>
        <Paper variant="outlined" className={classes.paperContainer}>
          <Grid
            alignContent="center"
            justify="center"
            container
            item
            sm={12}
            direction="column"
            className={classes.formWrapper}
          >
            <Typography align="center" variant="h4">Dados do Cliente</Typography>
            <Grid
              container
              item
              sm={12}
              spacing={2}
              justify="center"
              direction="row"
            >
              <AddCustomerView
                changeFormForId={changeCustomerCarFormForId}
                form={customerForm}
                setForm={setCustomerForm}
              />
            </Grid>
          </Grid>
        </Paper >
        <Paper variant="outlined" className={classes.paperContainer}>
          {modelsList.length === 0
            ? "carregando..."
            :
            <Grid
              alignContent="center"
              justify="center"
              container
              item
              sm={12}
              direction="column"
              className={classes.formWrapper}
            >
              <Typography align="center" variant="h4">Dados do veículo</Typography>
              <Grid
                container
                item
                sm={12}
                spacing={2}
                justify="center"
                direction="row"
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
              <Grid
              container
              item
              className={classes.formWrapper}
              justify="flex-end">

              {error && <span style={{ margin: 10, color: "red" }}>{error}</span>}
              <Button
                onClick={() => addNewCar(carForm)}
                variant="contained"
                color="primary"
                type="submit"
              >
                Próximo
              </Button>
            </Grid>
            </Grid>}
        </Paper >
      </>
    );
  };






export default createAddCarFormContainer()