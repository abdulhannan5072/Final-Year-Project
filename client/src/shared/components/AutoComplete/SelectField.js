// *https://www.registers.service.gov.uk/registers/country/use-the-api*
import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';



export default function SelectField(props) {

  const options = props.opt;
  console.log(options)
  return (
    <Autocomplete
      {...props}
      getOptionLabel={(option) => option.build}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label="Combo box" variant="outlined" />}
    />
  );
}