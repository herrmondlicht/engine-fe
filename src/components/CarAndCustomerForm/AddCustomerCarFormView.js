
import React from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import useStyles from "./styles/FormStyleHook"

export const createAddCustomerCarView = () =>
  function AddCustomerCarView({ changeFormForId, form, setForm }) {
    const classes = useStyles();

    function licenseKeyDown(e) {
      e.persist()
      const isBackspace = e.keyCode === 8;

      !isBackspace &&
        setForm(prev => {
          const licensePlate = applyLicensePlateMask(prev.licensePlate)
          return {
            ...prev,
            licensePlate
          }
        });
    }

    function applyLicensePlateMask(value) {
      if (value)
        return value.replace(/^.{3}(?!-)/g, `${value.toUpperCase()}-`)
      return ""
    }

    function licenseOnChange(e) {
      e.persist()
      setForm(prev => ({ ...prev, licensePlate: e?.target?.value.toUpperCase() }))
    }

    return (
      <>
        <Grid item className={classes.formItem}>
          <TextField
            onChange={licenseOnChange}
            onKeyDown={licenseKeyDown}
            value={form.licensePlate}
            size="small"
            label={"Placa"}
            variant="outlined"
            inputProps={
              { maxLength: "8" }
            }
            fullWidth />

        </Grid>
        <Grid item className={classes.formItem}>
          <TextField
            onChange={changeFormForId("color")}
            size="small"
            label={"Cor"}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid item className={classes.formItem}>
          <TextField
            onChange={changeFormForId("displacement")}
            size="small"
            label={"Cilindradas"}
            variant="outlined"
            fullWidth />
        </Grid>
      </>
    )
  }


export default createAddCustomerCarView()