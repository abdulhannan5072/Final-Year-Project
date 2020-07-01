import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import {InputBase, NativeSelect} from '@material-ui/core';

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
    
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.action.disabledBackground,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 10px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);



export default function CustomizedSelects({label, items, ...props}) {
  // const [item, setitem] = React.useState('to do');
  // const handleChange = (event) => {
  //   setitem(event.target.value);
  // };

  let LabelDiv = "";
  if(label){
    LabelDiv = <InputLabel htmlFor="demo-customized-select-native">{label}</InputLabel>
  }

  return (
    <div>
      {LabelDiv}
        <NativeSelect
          {...props}
          
          input={<BootstrapInput {...props} />}
        >
            {/* <option label="None" value="" /> */}

            {items.map(option => (
                <option key={option.value} value={option.value}>
                {option.label}
                </option>
             ))}
        </NativeSelect>
      
    </div>
  );
}
