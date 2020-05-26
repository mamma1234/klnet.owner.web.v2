import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Radio from '@material-ui/core/Radio';
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";


const style = {
  infoText: {
    fontWeight: "300",
    margin: "10px 0 30px",
    textAlign: "center"
  },
  inputAdornmentIcon: {
    color: "#555"
  },
  inputAdornment: {
    position: "relative"
  }
};

class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: "",
      firstnameState: "",
      lastname: "",
      lastnameState: "",
      email: "",
      emailState: "",
      signGubun:"P"
    };
  }
  sendState() {
    return this.state;
  }
  // function that returns true if value is email, false otherwise
  verifyEmail(value) {
    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  }
  // function that verifies if a string has a given length or not
  verifyLength(value, length) {
    if (value.length >= length) {
      return true;
    }
    return false;
  }
  change(event, stateName, type, stateNameEqualTo) {
    switch (type) {
      case "email":
        if (this.verifyEmail(event.target.value)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      case "length":
        if (this.verifyLength(event.target.value, stateNameEqualTo)) {
          this.setState({ [stateName + "State"]: "success" });
        } else {
          this.setState({ [stateName + "State"]: "error" });
        }
        break;
      default:
        break;
    }
    this.setState({ [stateName]: event.target.value });
  }
  isValidated() {
    if (
      this.state.firstnameState === "success" &&
      this.state.lastnameState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {
      if (this.state.firstnameState !== "success") {
        this.setState({ firstnameState: "error" });
      }
      if (this.state.lastnameState !== "success") {
        this.setState({ lastnameState: "error" });
      }
      if (this.state.emailState !== "success") {
        this.setState({ emailState: "error" });
      }
    }
    return false;
  }
  
  handleRadioChange(event) {
	 console.log(">>>>",event.target.value);
	 this.setState({ signGubun: event.target.value});
  }
  
  const [signGubun,setSignGubun] =React.useState("P");
  
  render() {
    const { classes } = this.props;
    

    return (
      <GridContainer justify="center">
      	<GridItem xs={12} sm={12}>
      		<RadioGroup row aria-label="quiz" name="quiz" value={signGubun} onChange={handleRadioChange}>
      			<FormControlLabel value="P" control={<Radio />} label="개인회원" labelPlacement="end"/>
      			<FormControlLabel value="O" control={<Radio />} label="기업회원" labelPlacement="end"/>
      		</RadioGroup>	
      	</GridItem>
        <GridItem xs={12} sm={12}>
        <CustomInput
        success={this.state.emailState === "success"}
        error={this.state.emailState === "error"}
        labelText={
          <span>
            Email <small>(required)</small>
          </span>
        }
        id="email"
        formControlProps={{
          fullWidth: true
        }}
        inputProps={{
          onChange: event => this.change(event, "email", "email"),
          endAdornment: (
            <InputAdornment
              position="end"
              className={classes.inputAdornment}
            >
              <Email className={classes.inputAdornmentIcon} />
            </InputAdornment>
          )
        }}
      />
          <CustomInput
            labelText={
              <span>
                PassWord <small>(required)</small>
              </span>
            }
            id="password"
            formControlProps={{
              fullWidth: true
            }}
            inputProps={{
              onChange: event => this.change(event, "lastname", "length", 3),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <RecordVoiceOver className={classes.inputAdornmentIcon} />
                </InputAdornment>
              )
            }}
          />
          <CustomInput
          labelText={
            <span>
              PassWord Confirm<small>(required)</small>
            </span>
          }
          id="passwordConfirm"
          formControlProps={{
            fullWidth: true
          }}
          inputProps={{
            onChange: event => this.change(event, "lastname", "length", 3),
            endAdornment: (
              <InputAdornment
                position="end"
                className={classes.inputAdornment}
              >
                <RecordVoiceOver className={classes.inputAdornmentIcon} />
              </InputAdornment>
            )
          }}
        />
        </GridItem>
      </GridContainer>
    );
  }
}

Step1.propTypes = {
  classes: PropTypes.object
};

export default withStyles(style)(Step1);
