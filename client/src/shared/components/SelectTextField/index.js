import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {TextField} from '../';
import MenuItem from '@material-ui/core/MenuItem';



const useStyles = makeStyles(theme => ({
  root: {
    '& .MuiTextField-root': {
      width: '30ch',
    },
  },
}));

export default function Select1(props) {
  const items = props.items;

  const classes = useStyles();
 
  return (
    // <form className={classes.root} noValidate autoComplete="off">
      <div className={classes.root}>
      <TextField
          select
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