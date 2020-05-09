import React, { useState } from "react";
import { Grid, TextField, Button, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import AutocompleteField from "../../Common/Autocomplete";
import CurrencyInput from "../../Common/CurrencyInput";

const useServiceItemsStyle = makeStyles((theme) => ({
  serviceItemsList: {
    marginBottom: theme.spacing(2),
  },
}));

const createServiceItemsView = () =>
  function ServiceItemsView({ serviceItems = [], updateKeyValue }) {
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
        {serviceItems.map((item) => {
          return (
            <ServiceItem
              key={item.id}
              {...item}
              updateKeyValue={updateKeyValue}
            />
          );
        })}
        <Grid container item xs={12}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => updateKeyValue({ field: "quantity", value: "" })}
            disableElevation
            fullWidth
          >
            Adicionar Novo item
          </Button>
        </Grid>
      </Grid>
    );
  };

function ServiceItem({
  id,
  service_type_id = null,
  quantity = "",
  unit_price = "",
  description = "",
  updateKeyValue,
}) {
  const [price, setPrice] = useState(unit_price);
  const handleOnBlur = (key) => (e) =>
    updateKeyValue({ id, key, value: e.target.value });

  const priceChange = (e) => {
    setPrice(e.target.value);
  };

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
          defaultValue={quantity}
          onBlur={handleOnBlur("quantity")}
          fullWidth
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          size="small"
          label={"Descrição"}
          variant="outlined"
          defaultValue={description}
          onBlur={handleOnBlur("description")}
          fullWidth
        />
      </Grid>
      <Grid container item xs={12} sm={3} spacing={2}>
        <Grid item xs={6}>
          <CurrencyInput
            onChange={priceChange}
            onBlur={(e) =>
              handleOnBlur("unit_price")({ target: { value: price } })
            }
            label={"Preço Un."}
            value={price}
            fullWidth
          />
        </Grid>
        <Grid item xs={6}>
          <CurrencyInput
            defaultValue={0}
            value={price * quantity}
            label={"Preço Total"}
            disabled
          />
        </Grid>
      </Grid>
      <Grid item xs={12} sm={2}>
        <AutocompleteField
          id="serviceType"
          label="Tipo de Serviço"
          value={service_type_id}
          onChange={() => {}}
          options={[]}
        />
      </Grid>
    </Grid>
  );
}

export default createServiceItemsView();
