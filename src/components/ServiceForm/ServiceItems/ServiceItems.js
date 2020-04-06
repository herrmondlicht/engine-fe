import React, { useState } from "react";
import { Grid, TextField, Typography, Divider, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

import useStyles from "../../../hooks/FormStyleHook";

import AutocompleteField from "../../Common/Autocomplete";
import CurrencyInput from "../../Common/CurrencyInput";
import PaperWithTitle from "../../Common/PaperWithTitle";
import NumberFormat from "react-number-format";

const createServiceItems = ({ engineAPI }) =>
  function ServiceItems() {
    return (
      <>
        <ServiceItemsList />
        <MoreDetails />
      </>
    );
  };

const useServiceItemsStyle = makeStyles((theme) => ({
  serviceItemsList: {
    marginBottom: theme.spacing(2),
  },
  totalPriceContainer: {
    width: "auto",
  },
}));

function ServiceItemsList() {
  const classes = useStyles();
  const serviceItemsClasses = useServiceItemsStyle();
  return (
    <PaperWithTitle title="Itens do Serviço">
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
    </PaperWithTitle>
  );
}

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

function MoreDetails({ itemsPrice = 92.5 }) {
  const [servicePrice, setServicePrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const serviceItemsStyleClasses = useServiceItemsStyle();
  const totalPrice = itemsPrice + (servicePrice || 0) - (discountPrice || 0);

  return (
    <PaperWithTitle title="Pagamento">
      <Grid container item xs={12} direction="row" spacing={4}>
        <Grid container item xs={12} sm={12} direction="row" spacing={4}>
          {/* payment */}
          <Grid container item xs={12} sm={6}>
            <PricesContainer
              servicePrice={servicePrice}
              setServicePrice={setServicePrice}
              discountPrice={discountPrice}
              setDiscountPrice={setDiscountPrice}
              itemsPrice={itemsPrice}
            />
          </Grid>
          <Grid>
            <Divider variant="fullWidth" orientation="vertical"></Divider>
          </Grid>
          <Grid
            item
            container
            alignItems="center"
            justify="center"
            xs={12}
            sm={6}
            spacing={2}
          >
            <Grid
              item
              container
              direction="column"
              className={serviceItemsStyleClasses.totalPriceContainer}
            >
              <Typography variant="h4">Total</Typography>
              <Typography variant="h3">
                <NumberFormat
                  value={totalPrice}
                  displayType={"text"}
                  prefix={"R$"}
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale={2}
                />
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item container xs={12}>
          <TextField
            label="Observações"
            size="small"
            rows="5"
            variant="outlined"
            multiline
            fullWidth
          />
        </Grid>
      </Grid>
    </PaperWithTitle>
  );
}

function PricesContainer({
  setServicePrice,
  setDiscountPrice,
  servicePrice,
  discountPrice,
  itemsPrice,
}) {
  return (
    <Grid container item direction="row" spacing={2}>
      <LabelAndPrice
        label="Valor do Serviço"
        onChange={(e) => setServicePrice(e.target.value)}
        price={servicePrice}
      />
      <LabelAndPrice label="Valor de Peças" price={itemsPrice} />
      <LabelAndPrice
        label="Desconto"
        price={discountPrice}
        onChange={(e) => setDiscountPrice(e.target.value)}
      />
    </Grid>
  );
}

function LabelAndPrice({ label, price, onChange = () => {} }) {
  return (
    <Grid container item spacing={1} direction="column">
      <Grid container item alignItems="center">
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item>
        <CurrencyInput onChange={onChange} value={price} />
      </Grid>
    </Grid>
  );
}

export default createServiceItems({});
