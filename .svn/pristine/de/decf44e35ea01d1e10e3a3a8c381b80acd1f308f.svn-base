import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
// core components
//import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CustomSelects(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    option,
    inputProps,
    labelProps,
    setValue,
    error,
    success
  } = props;

  const [value, setvalue] = React.useState(setValue);

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });

    const handleChange = event => {
   setvalue(event.target.value);
  };

  return (
    <FormControl variant="outlined" size="small" className={classes.formControl}
      {...formControlProps}
    >
        <InputLabel id = {id} {...labelProps} >{labelText}</InputLabel>
        <Select
          native
          id = {id}
          value={value}
          {...inputProps}
        >
        <option value=""></option>
        {option.map((prop,index) => {
                return (
                  <option key={prop+index} value={prop}>{prop}</option>
                );
              })}
        </Select>
    </FormControl>
  );
 
}

CustomSelects.propTypes = {
  labelText: PropTypes.node,
  //labelProps: PropTypes.object,
  id: PropTypes.string,
  formControlProps: PropTypes.object
};
