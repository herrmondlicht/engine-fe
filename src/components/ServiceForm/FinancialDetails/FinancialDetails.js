import React, { useState } from "react";
import { Grid, TextField, Typography, Divider } from "@material-ui/core";

import CurrencyInput from "../../Common/CurrencyInput";
import NumberFormat from "react-number-format";
import { makeStyles } from "@material-ui/core";

const useFinancialDetailsStyles = makeStyles(theme => ({
  totalPriceContainer: {
    width: "auto",
  },
}))

const createFinancialDetails = () => 
function FinancialDetails({ itemsPrice = 92.5 }) {
  const [servicePrice, setServicePrice] = useState();
  const [discountPrice, setDiscountPrice] = useState();
  const financialDetailsStyles = useFinancialDetailsStyles();
  const totalPrice = itemsPrice + (servicePrice || 0) - (discountPrice || 0);

  return (
    <>
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


export default createFinancialDetails()