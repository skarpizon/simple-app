import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

export default function Grouped({ width = 300, label, onChange, ...other }) {
  return (
    <Autocomplete
      onChange={(event, newValue) => onChange({ target: { value: newValue }})}
      style={{ width }}
      noOptionsText="Нет совпадений"
      {...other}
      renderInput={(params) => <TextField {...params} label={label} variant="outlined" />}
    />
  );
}