import React from "react";

import { TextField } from "@material-ui/core";

import Autocomplete from "@material-ui/lab/Autocomplete";

const createAutocompleteField = () => function AutocompleteField({
  id,
  label,
  options,
  onChange,
  isNumeric,
  ...props
}) {
  function setOnChange(event, newValue) {
    if (newValue && newValue.inputValue) {
      onChange({ target: { value: newValue.inputValue } });

      return;
    }

    onChange({ target: { value: newValue } });
  }

  function filterOptions(options, params) {
    const filtered = options.filter((option) =>
      option.toLowerCase().includes(params.inputValue.toLowerCase()));
    if (params.inputValue !== "" && filtered.length === 0) {
      filtered.push(params.inputValue);
    }

    return filtered;
  }

  return (
    <Autocomplete
      id={id}
      options={options}
      blurOnSelect
      includeInputInList
      renderInput={(params) => (
        <TextField
          {...params}
          onChange={onChange}
          size="small"
          label={label}
          variant="outlined"
          fullWidth
          value={props.value}
        />
      )}
      onChange={setOnChange}
      filterOptions={filterOptions}
      inputValue={props.value}
      disableClearable
    />
  );
};

export default createAutocompleteField();
