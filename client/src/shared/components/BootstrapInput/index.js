import React from 'react';
import Aux from '../../../hoc/_Aux';
import {
    fade,
    withStyles,
    makeStyles
  } from '@material-ui/core/styles';

import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';



const Input = withStyles((theme) => ({
  
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: (props)=> props.bgc? theme.palette.action.hover  : '',
    border: (props)=> props.border? '1px solid #ced4da': '',
    fontWeight: 'bold',
    fontSize: 16,
    padding: '10px 12px',
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
      boxShadow: `${fade(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
      backgroundColor: theme.palette.common.white,  
      borderColor: theme.palette.primary.main,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.disabledBackground ,
      
    }
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

const BootstrapInput = ({ label, value, ...props}) => {

    const classes= useStyles();

      let LabelDiv = "";
      if(label){
        LabelDiv = <InputLabel shrink  htmlFor="{props.id}">{label}</InputLabel>
      }
    return(
        <Aux >
          <div className={classes.root} >
            {LabelDiv}
            <Input  defaultValue={value} id="{props.id}" {...props} />
          </div>
            
        </Aux>
    );
}
export default BootstrapInput;