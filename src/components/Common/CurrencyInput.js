import React from 'react'
import { TextField } from '@material-ui/core';
import NumberFormat from 'react-number-format';


const createCurrencyInput = () =>
  function CurrencyInput({ onChange, ...props }) {
    return (
      <NumberFormat
        size="small"
        variant="outlined"
        fullWidth
        getInputRef={props.inputRef}
        onValueChange={({ floatValue }) => {
          const value = floatValue !== undefined ? parseFloat(floatValue.toFixed(2)) : ""

          if (onChange)
            onChange({
              target: {
                value,
              },
            });
        }}
        customInput={TextField}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$"
        isNumericString={true}
        allowNegative={false}
        decimalScale={2}
        fixedDecimalScale={2}
        {...props}
      />
    )
  }


export default createCurrencyInput();