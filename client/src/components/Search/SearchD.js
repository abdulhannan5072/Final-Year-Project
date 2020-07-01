import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  
}));

export default function FreeSolo(props) {
  const classes = useStyles();

  return (
  
    
    
    <TextField
          label="Search"
          className={classes.textField}
          type="search"
          variant="outlined"
          size= 'small'
          {...props}
        />
    
    
            // {/* <div className={' ml-5 mt-3' } style={{ width: 200 }} >
            // <Autocomplete
            //   multiple
            //   id="size-small-outlined-multi"
            //   size="small"
            //   options={pType}
            //   getOptionLabel={option => option.title}
            //   defaultValue={[pType[0]]}
            //   renderInput={params => (
            //     <TextField {...params} variant="outlined" label="Type" placeholder="Favorites" />
            //   )}
            // />
            // </div> */}
    
    
  );
}
