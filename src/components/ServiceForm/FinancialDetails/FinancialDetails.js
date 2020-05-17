import React from "react";
import { Grid, TextField, Typography, Divider } from "@material-ui/core";

import CurrencyInput from "../../Common/CurrencyInput";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core";

const useFinancialDetailsStyles = makeStyles((theme) => ({
  totalPriceContainer: {
    width: "auto",
  },
}));

const createFinancialDetails = () =>
  function FinancialDetails({
    service_items_price = "",
    service_price = "",
    discount_price = "",
    observations = "",
    updateServicesValuesOnBlur,
    updateServiceValuesOnChange,
    updateObservationOnBlur,
  }) {
    const financialDetailsStyles = useFinancialDetailsStyles();
    const totalPrice =
      service_items_price + (service_price || 0) - (discount_price || 0);

    const handleBlur = () => {
      updateServicesValuesOnBlur({
        service_price,
        discount_price,
      });
    };

    return (
      <>
        <Grid container item xs={12} direction="row" spacing={4}>
          <Grid container item xs={12} sm={12} direction="row" spacing={4}>
            {/* payment */}
            <Grid container item xs={12} sm={6}>
              <PricesView
                servicePrice={service_price}
                setServicePrice={updateServiceValuesOnChange("service_price")}
                discountPrice={discount_price}
                setDiscountPrice={updateServiceValuesOnChange("discount_price")}
                itemsPrice={service_items_price}
                handleBlur={handleBlur}
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
                className={financialDetailsStyles.totalPriceContainer}
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
              onChange={(e) =>
                updateServiceValuesOnChange("observations")(e.target.value)
              }
              onBlur={(e) => updateObservationOnBlur(e.target.value)}
              value={observations}
              label="Observações"
              size="small"
              rows="5"
              variant="outlined"
              multiline
              fullWidth
            />
          </Grid>
        </Grid>
      </>
    );
  };

function PricesView({
  servicePrice,
  setServicePrice,
  discountPrice,
  setDiscountPrice,
  itemsPrice,
  handleBlur,
}) {
  return (
    <Grid container item direction="row" spacing={2}>
      <LabelAndPrice
        label="Valor do Serviço"
        onChange={(e) => setServicePrice(e.target.value)}
        price={servicePrice}
        onBlur={handleBlur}
        value={servicePrice}
      />
      <LabelAndPrice
        label="Valor de Peças"
        price={itemsPrice}
        inputProps={{
          disabled: true,
        }}
      />
      <LabelAndPrice
        onBlur={handleBlur}
        label="Desconto"
        price={discountPrice}
        onChange={(e) => setDiscountPrice(e.target.value)}
        value={discountPrice}
      />
    </Grid>
  );
}

function LabelAndPrice({ label, price, onChange = () => {}, ...props }) {
  return (
    <Grid container item spacing={1} direction="column">
      <Grid container item alignItems="center">
        <Typography variant="body1">{label}</Typography>
      </Grid>
      <Grid item>
        <CurrencyInput onChange={onChange} value={price} {...props} />
      </Grid>
    </Grid>
  );
}

export default createFinancialDetails();
