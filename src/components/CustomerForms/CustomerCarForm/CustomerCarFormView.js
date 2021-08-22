import React from "react";
import { Grid, TextField } from "@material-ui/core";

export const createAddCustomerCarView = () =>
  function AddCustomerCarView({ changeFormForKey, form }) {
    function licenseKeyDown(e) {
      e.persist();
      const isBackspace = e.keyCode === 8;
      if (!isBackspace) {
        e.target.value = applyLicensePlateMask(form.licensePlate);
        changeFormForKey("licensePlate")(e);
      }
    }

    function applyLicensePlateMask(value) {
      if (value) {
        return value.replace(
          /^.{3}(?!-)/g,
          `${value.toUpperCase().slice(0, 3)}-`,
        );
      }
      return "";
    }

    function licenseOnChange(e) {
      e.persist();
      e.target.value = e?.target?.value.toUpperCase();
      changeFormForKey("licensePlate")(e);
    }

    return (
      <>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={licenseOnChange}
            onKeyDown={licenseKeyDown}
            value={form.licensePlate}
            size="small"
            label="Placa"
            variant="outlined"
            inputProps={{ maxLength: "8" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={changeFormForKey("color")}
            size="small"
            label="Cor"
            variant="outlined"
            value={form.color}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <TextField
            onChange={changeFormForKey("displacement")}
            size="small"
            label="Cilindradas"
            inputProps={{ maxLength: "3" }}
            variant="outlined"
            value={form.displacement}
            fullWidth
          />
        </Grid>
      </>
    );
  };

export default createAddCustomerCarView();
