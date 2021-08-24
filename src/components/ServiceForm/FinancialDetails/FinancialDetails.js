import React from "react";
import { Grid, TextField, Typography, Divider } from "@material-ui/core";

import NumberFormat from "react-number-format";
import CurrencyInput from "../../Common/CurrencyInput";

const createFinancialDetails = () =>
  function FinancialDetails({
    service_items_price = "",
    service_price = "",
    discount_price = "",
    observations = "",
    odometer_reading = "",
    updateServicesValuesOnBlur,
    updateServiceValuesOnChange,
    updateObservationOnBlur,
    updateValueOnBlur,
  }) {
    const totalPrice =
      service_items_price + (service_price || 0) - (discount_price || 0);

    const handleBlur = () => {
      updateServicesValuesOnBlur({
        service_price,
        discount_price,
      });
    };

    return (
      <div className="flex-col w-full">
        <div className="flex w-full">
          {/* payment */}
          <div className="flex-col w-1/2">
            <div className="flex-col">
              <Grid container item alignItems="center">
                <Typography variant="body1">Quilometragem</Typography>
              </Grid>
              <TextField
                onChange={e =>
                  updateServiceValuesOnChange("odometer_reading")(
                    e.target.value
                  )
                }
                onBlur={e =>
                  updateValueOnBlur({
                    key: "odometer_reading",
                    value: e.target.value,
                  })
                }
                value={odometer_reading}
                size="small"
                variant="outlined"
                fullWidth
              />
            </div>
            <div className="mt-4">
              <PricesView
                servicePrice={service_price}
                setServicePrice={updateServiceValuesOnChange("service_price")}
                discountPrice={discount_price}
                setDiscountPrice={updateServiceValuesOnChange("discount_price")}
                itemsPrice={service_items_price}
                handleBlur={handleBlur}
              />
            </div>
          </div>
          <div className="mx-10">
            <Divider orientation="vertical" />
          </div>
          <div className="flex items-center justify-center w-1/2">
            <div className="flex-col">
              <Typography variant="h4">Total</Typography>
              <Typography variant="h3">
                <NumberFormat
                  value={totalPrice}
                  displayType="text"
                  prefix="R$"
                  thousandSeparator="."
                  decimalSeparator=","
                  decimalScale={2}
                  fixedDecimalScale={2}
                />
              </Typography>
            </div>
          </div>
        </div>
        <div className="flex mt-6">
          <TextField
            onChange={e =>
              updateServiceValuesOnChange("observations")(e.target.value)
            }
            onBlur={e => updateObservationOnBlur(e.target.value)}
            value={observations}
            label="Observações"
            size="small"
            rows="5"
            variant="outlined"
            multiline
            fullWidth
          />
        </div>
      </div>
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
        onChange={e => setServicePrice(e.target.value)}
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
        onChange={e => setDiscountPrice(e.target.value)}
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
