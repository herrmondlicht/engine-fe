import React, { useState } from "react";
import { Grid, TextField, Button, IconButton } from "@material-ui/core";
import { HiTrash as DeleteIcon } from "react-icons/hi";
import { makeStyles } from "@material-ui/core";

import CurrencyInput from "../../Common/CurrencyInput";

const useServiceItemsStyle = makeStyles((theme) => ({
  mb2: {
    marginBottom: theme.spacing(1),
  },
  px1: {
    paddingLeft: theme.spacing(1),
    paddingRight: theme.spacing(1),
  },
}));

const createServiceItemsView = () =>
  function ServiceItemsView({
    serviceItems = [],
    updateKeyValue,
    createNewServiceItem,
    deleteServiceItem,
  }) {
    const serviceItemsClasses = useServiceItemsStyle();
    return (
      <Grid
        alignItems="center"
        justify="center"
        container
        item
        xs={12}
        direction="column"
        className={serviceItemsClasses.mb2}
      >
        {serviceItems.map((item) => {
          return (
            <ServiceItem
              key={item.id}
              {...item}
              updateKeyValue={updateKeyValue}
              deleteServiceItem={deleteServiceItem}
            />
          );
        })}
        <Grid container item xs className={serviceItemsClasses.px1}>
          <Button
            variant="outlined"
            color="secondary"
            onClick={createNewServiceItem}
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
  quantity = "",
  unit_price = "",
  description = "",
  updateKeyValue,
  deleteServiceItem,
}) {
  const [price, setPrice] = useState(unit_price);
  const serviceItemsClasses = useServiceItemsStyle();

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
      className={serviceItemsClasses.mb2}
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
      <Grid item xs>
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
              updateKeyValue({ id, key: "unit_price", value: price })
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
            inputProps={{
              disabled: true,
            }}
          />
        </Grid>
      </Grid>
      <Grid
        style={{
          flexBasis: 0,
        }}
        item
        xs={12}
        sm={1}
      >
        <IconButton onClick={() => deleteServiceItem({ id })}>
          <DeleteIcon color="error" />
        </IconButton>
      </Grid>
      {/* <Grid item xs={12} sm={2}>
        <AutocompleteField
          id="serviceType"
          label="Tipo de Serviço"
          value={service_type_id}
          onChange={() => {}}
          options={[]}
        />
      </Grid> */}
    </Grid>
  );
}

export default createServiceItemsView();
