
import React from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import useStyles from "./styles/FormStyleHook"

export const createAddCustomerCarView = () =>
  function AddCustomerCarView({ changeFormForId, form, setForm }) {
    const classes = useStyles();

    /*
      documentNumber: "",
      fullName: "",
      address: ""

    */

    function handleDocumentNumberChange(e) {
      e.persist()
      setForm({ ...form, documentNumber: e?.target?.value.replace(/\D/g, "") })
    }

    return (
      <>
        <Grid sm={6} item className={classes.formItem} direction="row">
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
            onChange={changeFormForId("fullName")}
            size="small"
            label={"Nome"}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid sm={12} item>
          <TextField
            onChange={changeFormForId("address")}
            size="small"
            label={"Endereço"}
            variant="outlined"
            fullWidth />
        </Grid>
      </>
    )
  }


export default createAddCustomerCarView()