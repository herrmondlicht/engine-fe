
import React from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import useStyles from "../../hooks/FormStyleHook"

export const createAddCustomerCarView = () =>
  function AddCustomerCarView({ changeFormForKey, form }) {
    const classes = useStyles();

    function licenseKeyDown(e) {
      e.persist()
      const isBackspace = e.keyCode === 8;

      !isBackspace &&
        changeFormForKey("licensePlate", true)(applyLicensePlateMask(form.licensePlate));
    }

    function applyLicensePlateMask(value) {
      if (value)
        return value.replace(/^.{3}(?!-)/g, `${value.toUpperCase()}-`)
      return ""
    }

    function licenseOnChange(e) {
      e.persist()
      changeFormForKey("licensePlate", true)(e?.target?.value.toUpperCase())
    }

    return (
      <>
        <Grid item xs={12} sm={4} className={classes.formItem}>
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
        <Grid item xs={12} sm={4} className={classes.formItem}>
          <TextField
            onChange={changeFormForKey("color")}
            size="small"
            label={"Cor"}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid item xs={12} sm={4} className={classes.formItem}>
          <TextField
            onChange={changeFormForKey("displacement")}
            size="small"
            label={"Cilindradas"}
            inputProps={
              { maxLength: "3" }
            }
            variant="outlined"
            fullWidth />
        </Grid>
      </>
    )
  }


export default createAddCustomerCarView()