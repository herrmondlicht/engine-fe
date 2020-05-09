import React, { useMemo } from "react";
import {
  Grid,
  TextField,
  Select,
  MenuItem,
  makeStyles,
  FormControl,
  InputLabel,
} from "@material-ui/core";

import AutocompleteField from "../../Common/Autocomplete";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 10,
  },
  selectLabel: {
    top: "-14px",
    left: "12px",
    background: "white",
    padding: "3px",
    "&.MuiInputLabel-shrink": {
      paddingTop: "6px",
      zIndex: 1,
    },
  },
}));

export const createAddCarFormView = () =>
  function AddCarFormView({ modelsList, changeFormForKey, form }) {
    const classes = useStyles();
    const getUniqueEntries = (obj, index, arr) => arr.indexOf(obj) === index;

    const onChangeYear = (e) => {
      e.persist();
      if (e.target.value?.length <= 4) changeFormForKey("year")(e);
    };

    const makesOptions = useMemo(
      () => modelsList.map((car) => car.make).filter(getUniqueEntries),
      [modelsList]
    );

    const modelsFilteredBySelectedMake = useMemo(
      () => modelsList.filter((car) => car.make === form.make),
      [modelsList, form.make]
    );

    const modelsOptions = useMemo(
      () =>
        modelsFilteredBySelectedMake
          .map((car) => car.model)
          .filter(getUniqueEntries),
      [modelsFilteredBySelectedMake]
    );

    return (
      <>
        {/* form */}
        <Grid item xs={12} sm={4}>
          <AutocompleteField
            id="make"
            label="Marca"
            onChange={changeFormForKey("make")}
            options={makesOptions}
            value={form.make}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <AutocompleteField
            id="model"
            label="Modelo"
            onChange={changeFormForKey("model")}
            options={modelsOptions}
            value={form.model}
          />
        </Grid>
        <Grid item xs={12} sm={3}>
          <FormControl fullWidth>
            <InputLabel id="fuel-select" className={classes.selectLabel}>
              Combustível
            </InputLabel>
            <Select
              labelId="fuel-select"
              variant="outlined"
              id="fuel"
              classes={{
                root: classes.root,
              }}
              onChange={changeFormForKey("fuel")}
              value={form.fuel.toLowerCase()}
              displayEmpty
            >
              <MenuItem value={"alcohool"}>Álcool</MenuItem>
              <MenuItem value={"gasoline"}>Gasolina</MenuItem>
              <MenuItem value={"flex"}>Flex</MenuItem>
              <MenuItem value={"gas"}>GNV</MenuItem>
              <MenuItem value={"diesel"}>Diesel</MenuItem>
              <MenuItem value={"hybrid"}>Híbrido</MenuItem>
              <MenuItem value={"electric"}>Elétrico</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={2}>
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
    );
  };

export default createAddCarFormView();
