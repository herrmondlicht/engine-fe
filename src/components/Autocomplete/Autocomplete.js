import React from 'react'

import {
  TextField
} from "@material-ui/core";

import Autocomplete from '@material-ui/lab/Autocomplete';


const createAutocompleteField = () =>
  function AutocompleteField({ id, label, options, onChange, ...props }) {

    function setOnChange(event, newValue) {
      if (newValue && newValue.inputValue) {
        onchange(null, newValue.inputValue);

        return;
      }

      onChange(null, newValue);
    }

    function filterOptions(options, params) {
      const filtered = options.filter(option => option.toLowerCase().includes(params.inputValue.toLowerCase()))
      if (params.inputValue !== '') {
        filtered.push(params.inputValue);
      }

      return filtered;
    }

    return <Autocomplete
      id={id}
      options={options}
      blurOnSelect={true}
      includeInputInList
      renderInput={params => (
        <TextField {...params} onChange={onChange} size="small" label={label} variant="outlined" {...props} fullWidth />
      )}
      onChange={setOnChange}
      filterOptions={filterOptions}
    />
  }


export default createAutocompleteField();