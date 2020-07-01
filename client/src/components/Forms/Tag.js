import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      width: '25ch',
    },
  },
}));

export default function Select1(props) {
  const items = props.data;

  const classes = useStyles();
 
  return (
    // <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.root}>
      <TextField
          select
          size='small'
          variant="outlined"
          {...props}
          InputLabelProps={{
            shrink: true,
          }}
          
        >
          {items.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </div>
    // </form>
  );
}