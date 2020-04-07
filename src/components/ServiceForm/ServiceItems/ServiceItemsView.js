import React from "react";
import { Grid, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import AutocompleteField from "../../Common/Autocomplete";
import CurrencyInput from "../../Common/CurrencyInput";

const useServiceItemsStyle = makeStyles((theme) => ({
  serviceItemsList: {
    marginBottom: theme.spacing(2),
  },
}));

const createServiceItemsView = () =>
  function ServiceItemsView() {
    const serviceItemsClasses = useServiceItemsStyle();
    return (
      <Grid
        alignItems="center"
        justify="center"
        container
        item
        xs={12}
        spacing={2}
        direction="column"
        className={serviceItemsClasses.serviceItemsList}
      >
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
        <ServiceItem />
      </Grid>
    );
  };

function ServiceItem() {
  return (
    <Grid
      xs={12}
      spacing={2}
      container
      item
      alignItems="center"
      justify="center"
    >
      <Grid item xs={12} sm={1}>
        <TextField
          size="small"
          label={"Qtd."}
          variant="outlined"
          type="number"
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          size="small"
          label={"Descrição"}
          variant="outlined"
          fullWidth
        />
      </Grid>
      <Grid container item xs={12} sm={3} spacing={2}>
        <Grid item xs={6}>
          <CurrencyInput label={"Preço Un."} fullWidth />
        </Grid>
        <Grid item xs={6}>
          <CurrencyInput defaultValue={95.0} label={"Preço Total"} disabled />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={2}>
        <AutocompleteField
          id="serviceType"
          label="Tipo de Serviço"
          onChange={() => {}}
          options={[]}
        />
      </Grid>
    </Grid>
  );
}

export default createServiceItemsView();
