import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";

const theme = createMuiTheme({
  palette: {
    primary: { main: "#8E24AA" },
    secondary: { main: "#7E57C2" },
  },
});
const useStyles = makeStyles(() => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
  },
  textfield: {
    width: "30ch",
  },
}));
export default function InputField(props) {
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <TextField
        color='primary'
        autoComplete='off'
        className={classes.textfield}
        {...props}
        margin="dense"
        variant="outlined"
      />
    </ThemeProvider>
  );
}
