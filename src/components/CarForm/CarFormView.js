import React, { useMemo } from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import AutocompleteField from "../Common/Autocomplete";


export const createAddCarFormView = () =>
  function AddCarFormView({ modelsList, changeFormForKey, form }) {

    const getUniqueEntries = ((obj, index, arr) => arr.indexOf(obj) === index)

    const onChangeYear = (e) => {
      e.persist();
      if (e.target.value?.length <= 4)
        changeFormForKey("year")(e)
    }

    const makesOptions = useMemo(() => modelsList
      .map(car => car.make)
      .filter(getUniqueEntries), [modelsList])

    const modelsFilteredBySelectedMake = useMemo(() => modelsList
      .filter(car => car.make === form.make), [modelsList, form.make])

    const modelsOptions = useMemo(() => modelsFilteredBySelectedMake
      .map(car => car.model)
      .filter(getUniqueEntries), [modelsFilteredBySelectedMake])

    return (
      <>
        {/* form */}
        <Grid item xs={12} sm={4}>
          <AutocompleteField
            id="make"
            label="Marca"
            onChange={changeFormForKey("make")}
            options={makesOptions} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AutocompleteField
            id="model"
            label="Modelo"
            onChange={changeFormForKey("model")}
            options={modelsOptions} />
        </Grid>
        <Grid item xs={12} sm={4}>
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