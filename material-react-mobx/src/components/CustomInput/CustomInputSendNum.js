import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
// @material-ui/icons
import Clear from "@material-ui/icons/Clear";
import Check from "@material-ui/icons/Check";
// core components
import styles from "assets/jss/material-dashboard-react/components/customInputStyle.js";
import Button from "components/CustomButtons/Button.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles(styles);

export default function CustomInput(props) {
  const classes = useStyles();
  const {
    formControlProps,
    labelText,
    id,
    labelProps,
    inputProps,
    error,
    success,
    title,
    handleProps,
    helperText
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true
  });
  const marginTop = classNames({
    [classes.marginTop]: labelText === undefined
  });
  var helpTextClasses = classNames({
	    [classes.labelRootError]: error,
	    [classes.labelRootSuccess]: success && !error
	  });
  
  return (
    <FormControl
      {...formControlProps}
      className={formControlProps.className}
    >
      <GridContainer>
      	<GridItem xs={12} sm={12} md={8}>      
	        {labelText !== undefined ? (
	                <InputLabel
	                  className={classes.labelRoot + labelClasses}
	                  htmlFor={id}
	                  {...labelProps}   
	                >
	                  {labelText}
	                </InputLabel>
	              ) : null}
	      <Input
	        classes={{
	          root: marginTop,
	          disabled: classes.disabled,
	          underline: underlineClasses
	        }}
	        id={id}
	        {...inputProps}
	      /> 
	      </GridItem>
	      <GridItem xs={12} sm={12} md={4}>
	      	<Button  color="info" {...handleProps}> 본인인증 </Button>
	      </GridItem>
      </GridContainer>
      {helperText !== undefined ? (
  	        <FormHelperText id={id + "-text"} className={helpTextClasses}>
  	          {helperText}
  	        </FormHelperText>
  	      ) : null}
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  error: PropTypes.bool,
  success: PropTypes.bool
};
