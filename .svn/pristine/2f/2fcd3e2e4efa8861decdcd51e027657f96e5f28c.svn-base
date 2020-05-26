import 'date-fns';
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
//import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  //KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";
import FormControl from "@material-ui/core/FormControl";

//const useStyles = makeStyles(styles);

export default function MaterialUIPickers(props) {


  //const classes = useStyles();
  // The first commit of Material-UI
  const {formControlProps,labelText,id,format,onChangeValue,setValue,inputVariant,margin,autoOk,variant,disabled} = props;

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
       <FormControl
      {...formControlProps}
    >
        <KeyboardDatePicker 
          //disableToolbar
          variant={variant}
          inputVariant={inputVariant}
          margin={margin}
          format={format}
          autoOk={autoOk}
          id={id}
          disabled={disabled}
          label={labelText}
          value={setValue}
          onChange={onChangeValue}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </FormControl>
    </MuiPickersUtilsProvider>
  );
}