import React from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import AutocompleteField from "../Autocomplete/Autocomplete";

import useStyles from "./styles/FormStyleHook"

export const createAddCarFormView = () =>
  function AddCarFormView({ modelsList, changeFormForId, form }) {
    const classes = useStyles();

    const getUniqueEntries = ((obj, index, arr) => arr.indexOf(obj) === index)

    const onChangeYear = (e) => {
      const currValue = e.target.value
      if (currValue?.length <= 4)
        changeFormForId("year")(e, currValue)
    }

    const makesOptions = modelsList
      .map(car => car.make)
      .filter(getUniqueEntries)

    const modelsFilteredBySelectedMake = modelsList
      .filter(car => car.make === form.make)

    const modelsOptions = modelsFilteredBySelectedMake
      .map(car => car.model)
      .filter(getUniqueEntries)

    return (
      <>
        {/* form */}
        <Grid item className={classes.formItem}>
          <AutocompleteField
            id="make"
            label="Marca"
            onChange={changeFormForId("make")}
            options={makesOptions} />
        </Grid>
        <Grid item className={classes.formItem}>
          <AutocompleteField
            id="model"
            label="Modelo"
            onChange={changeFormForId("model")}
            options={modelsOptions} />
        </Grid>
        <Grid item className={classes.formItem}>
          <TextField
            label="Ano"
            id="year"
            variant="outlined"
            size="small"
            fullWidth
            type="number"
            value={form.year}
            onChange={onChangeYear}
          />
        </Grid>
      </>
    )
  }


export default createAddCarFormView()