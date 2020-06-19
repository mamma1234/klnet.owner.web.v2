import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import Input from "@material-ui/core/OutlinedInput";
import Icon from "@material-ui/core/Icon";
import styles from "assets/jss/material-dashboard-pro-react/components/customInputStyle.js";

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
    white,
    inputRootCustomClasses,
    success,
    helperText
  } = props;

  const labelClasses = classNames({
    [" " + classes.labelRootError]: error,
    [" " + classes.labelRootSuccess]: success && !error
  });
  const underlineClasses = classNames({
    [classes.underlineError]: error,
    [classes.underlineSuccess]: success && !error,
    [classes.underline]: true,
    [classes.whiteUnderline]: white
  });
  const marginTop = classNames({
    [inputRootCustomClasses]: inputRootCustomClasses !== undefined
  });
  const inputClasses = classNames({
    [classes.input2]: true,
    [classes.whiteInput]: white
  });
  var formControlClasses;
  if (formControlProps !== undefined) {
    formControlClasses = classNames(
      formControlProps.className,
      classes.formControl
    );
  } else {
    formControlClasses = classes.formControl;
  }
  var helpTextClasses = classNames({
    [classes.labelRootError]: error,
    [classes.labelRootSuccess]: success && !error
  });
  
  const handleadd = () =>{
	  props.handleadd();
  }
  
  const handleRemove = () => {
	  props.handleremove();
  }
  
  return (
    <FormControl  {...formControlProps} >
        <InputLabel
          //className={classes.labelRoot + " " + labelClasses}
          htmlFor={id}
          {...labelProps}
        >
          {labelText}
        </InputLabel>
      <div style={{marginTop:'5px'}}><font>TODAY&nbsp;&nbsp;±&nbsp;&nbsp;</font>
      <Input
        classes={{
          input: inputClasses,
          root: marginTop,
          disabled: classes.disabled
        }}
        id={id}
        {...inputProps}    	
      />&nbsp;DAYS&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Icon style={{paddingTop:'2px',color:'#00acc1'}} onClick={handleRemove}>remove_circle</Icon>
      <Icon style={{paddingTop:'2px',color:'#00acc1'}} onClick={handleadd}>add_circle</Icon>
      </div>
    </FormControl>
  );
}

CustomInput.propTypes = {
  labelText: PropTypes.node,
  labelProps: PropTypes.object,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  formControlProps: PropTypes.object,
  inputRootCustomClasses: PropTypes.string,
  error: PropTypes.bool,
  success: PropTypes.bool,
  white: PropTypes.bool,
  helperText: PropTypes.node
};
