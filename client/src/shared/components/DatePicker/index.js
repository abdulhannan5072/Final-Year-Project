import React, { useState } from "react";
import {  KeyboardDatePicker } from "@material-ui/pickers";

function InlineDatePickerDemo(props) {
  const [selectedDate, handleDateChange] = useState(new Date());

  return (
      <KeyboardDatePicker
        autoOk
        // disableToolbar
        variant="inline"
        inputVariant="outlined"
        label="With keyboard"
        format="MM/dd/yyyy"
        value={selectedDate}
        InputAdornmentProps={{ position: "start" }}
        onChange={date => handleDateChange(date)}
      />
    
  );
}

export default InlineDatePickerDemo;