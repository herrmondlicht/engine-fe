
import React from "react";
import {
  Grid,
  TextField,
} from "@material-ui/core";

import useStyles from "../../hooks/FormStyleHook"

export const createCustomerFormView = () =>
  function CustomerFormView({ changeFormForKey, form }) {
    const classes = useStyles();

    const handleDocumentNumberChangeForKey = (key) => function (e) {
      e.persist()
      changeFormForKey(key)({ target: { value: e?.target?.value.replace(/\D/g, "") } })
    }

    return (
      <>
        <Grid xs={12} sm={3} item className={classes.formItem}>
          <TextField
            onChange={handleDocumentNumberChangeForKey("documentNumber")}
            value={form.documentNumber}
            size="small"
            label={"CPF (Número)"}
            variant="outlined"
            inputProps={
              { maxLength: "11" }
            }
            fullWidth />
        </Grid>
        <Grid xs={12} sm={3} item className={classes.formItem}>
          <TextField
            onChange={handleDocumentNumberChangeForKey("phone")}
            value={form.phone}
            size="small"
            label={"Telefone (Número)"}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid xs={12} sm={6} item className={classes.formItem}>
          <TextField
            onChange={changeFormForKey("fullName")}
            size="small"
            label={"Nome"}
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid xs={12} sm={4} item className={classes.formItem}>
          <TextField
            onChange={changeFormForKey("email")}
            size="small"
            label={"E-mail"}
            type="email"
            variant="outlined"
            fullWidth />
        </Grid>
        <Grid xs={12} sm={8} item className={classes.formItem}>
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