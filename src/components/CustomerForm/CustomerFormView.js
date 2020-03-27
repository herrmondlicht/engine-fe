
import React from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import useStyles from "../../hooks/FormStyleHook"

export const createCustomerFormView = () =>
  function CustomerFormView({ changeFormForKey, form }) {
    const classes = useStyles();

    function handleDocumentNumberChange(e) {
      e.persist()
      changeFormForKey("documentNumber")({ target: { value: e?.target?.value.replace(/\D/g, "") } })
    }

    return (
      <>
        <Grid sm={6} item className={classes.formItem}>
          <TextField
            onChange={handleDocumentNumberChange}
            value={form.documentNumber}
            size="small"
            label={"CPF (Número)"}
            variant="outlined"
            inputProps={
              { maxLength: "11" }
            }
            fullWidth />

        </Grid>
        <Grid sm={6} item className={classes.formItem}>
          <TextField
            onChange={changeFormForKey("fullName")}
            size="small"
            label={"Nome"}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid sm={12} item>
          <TextField
            onChange={changeFormForKey("address")}
            size="small"
            label={"Endereço"}
            variant="outlined"
            fullWidth />
        </Grid>
      </>
    )
  }


export default createCustomerFormView()