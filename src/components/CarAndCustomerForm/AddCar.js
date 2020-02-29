import React, { useState, useEffect } from "react";
import {
  Paper,
  Grid,
  Typography,
  makeStyles,
  Button
} from "@material-ui/core";

import requests from "../../utils/apiRoutes/apiRoutes";
import AutocompleteField from "../Autocomplete/Autocomplete";

const useStyles = makeStyles(theme => ({
  formWrapper: {
    padding: theme.spacing(2)
  },
  formItem: {
    marginTop: theme.spacing(2)
  }
}));

export const createAddCarFormContainer = () =>
  function AddCarFormContainer() {
    const [modelsList, changeModelsList] = useState([]);
    const [form, setForm] = useState({
      carModel: "",
      carMake: "",
      carYear: "",
    })
    const [error, setError] = useState("")
    const [success, setSuccess] = useState("")

    async function fetchModelsFromMaker(maker) {
      const modelsList = await requests.cars.get()
      changeModelsList(modelsList.data.data);
    }

    async function addNewCar() {
      const car = {
        model: form.carModel,
        make: form.carMake,
        manufacture_year: form.carYear
      }

      if (Object.values(car).indexOf("") !== -1) {
        setError("Todos os campos são obrigatórios!");
        return;
      }
      try {
        await requests.cars.post({ data: car })
        setSuccess("Adicionado com sucesso")
        setForm({})
      } catch (error) {
        console.log(error)
        setError("Não foi possível adicionar o carro. Tente novamente")
      }
    }

    useEffect(() => {
      fetchModelsFromMaker();
    }, [])

    if (success) {
      return <Button onClick={() => { setSuccess(null) }}>Ok!</Button>
    }

    if (modelsList.length === 0) {
      return "carregando...";
    }



    return (
      <Paper variant="outlined">
        <AddCarFormView
          modelsList={modelsList}
          setForm={setForm}
          addNewCar={addNewCar}
          form={form} />
        {error && <span>{error}</span>}
      </Paper>
    );
  };



function AddCarFormView({ modelsList, setForm, form, addNewCar }) {
  const classes = useStyles();

  const changeFormForId = (id) => (e, value) => {
    setForm(prev => ({ ...prev, [id]: value }))
  }

  const getUniqueEntries = ((obj, index, arr) => arr.indexOf(obj) === index)

  const makesOptions = modelsList
    .map(car => car.make)
    .filter(getUniqueEntries)

  const modelsFilteredBySelectedMake = modelsList
    .filter(car => car.make === form.carMake)

  const modelsOptions = modelsFilteredBySelectedMake
    .map(car => car.model)
    .filter(getUniqueEntries)

  const manufactureYearsOption = modelsFilteredBySelectedMake.map(car => String(car.manufacture_year))

  return (
    <Grid container alignContent="center">
      <Grid
        container
        item
        sm={12}
        justify="center"
        className={classes.formWrapper}
      >
        <Typography variant="h4">Adicionar novo veículo</Typography>
      </Grid>
      <Grid
        container
        item
        sm={12}
        direction="column"
        className={classes.formWrapper}
      >
        {/* form */}
        <Grid item className={classes.formItem}>
          <AutocompleteField
            id="carMake"
            label="Marca"
            onChange={changeFormForId("carMake")}
            options={makesOptions} />
        </Grid>
        <Grid item className={classes.formItem}>
          <AutocompleteField
            id="carModel"
            label="Modelo"
            onChange={changeFormForId("carModel")}
            options={modelsOptions} />
        </Grid>
        <Grid item className={classes.formItem}>
          <AutocompleteField
            id="carYear"
            label="Ano"
            onChange={changeFormForId("carYear")}
            options={manufactureYearsOption}
          />
        </Grid>
        <Grid item className={classes.formItem}>
          <Button
            onClick={addNewCar}
            variant="contained"
            color="primary"
            type="submit"
          >Próximo</Button>
        </Grid>
      </Grid>
    </Grid>
  )
}


export default createAddCarFormContainer()