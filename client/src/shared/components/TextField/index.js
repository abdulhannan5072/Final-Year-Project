import React from 'react';
import TextField from '@material-ui/core/TextField';


export default function InputField(props) {
  return (
        <TextField
          {...props}
          variant="outlined"
          size="small"
          InputLabelProps={{
            //shrink: true,
          }}
        />
  );
}

