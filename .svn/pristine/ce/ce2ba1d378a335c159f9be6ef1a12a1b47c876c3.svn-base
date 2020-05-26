import React from "react";
import PropTypes from "prop-types";
// @material-ui/icons
import Face from "@material-ui/icons/Face";
import RecordVoiceOver from "@material-ui/icons/RecordVoiceOver";
import Email from "@material-ui/icons/Email";
import Lock from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Radio from '@material-ui/core/Radio';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import PictureUpload from "components/CustomUpload/PictureUpload.js";
import CustomInput from "components/CustomInput/CustomInput_new.js";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Button from "components/CustomButtons/Button.js";

import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
import axios from 'axios';

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
      password: "",
      passwordState: "",
      passwordConform: "",
      passwordConformState: "",
      email: "",
      emailState: "",
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
  
  //function 비밀번호 유효성 검사 ( 영문,숫자 혼합 6~20)
  verifyPassword(value) {
	  var passwordRex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/;
	  return !passwordRex.test(value)?false:true;
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
      case "password":
    	  if (this.verifyPassword(event.target.value)) {
    		if(this.state.passwordConform) {
    			if (event.target.value === this.state.passwordConform) {
    				this.setState({ ["passwordConformState"]: "success" });
    			} else {
    				this.setState({ ["passwordConformState"]: "error" });
    			}
    		}
    		this.setState({ [stateName + "State"]: "success" });
          } else {
            this.setState({ [stateName + "State"]: "error" });
          }
    	  break; 
      case "passwordConform":
	        if (this.state.password===event.target.value) {
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
      this.state.passwordState === "success" &&
      this.state.passwordConformState === "success" &&
      this.state.emailState === "success"
    ) {
      return true;
    } else {

      if(this.state.email !=="" ) {
    	  if (this.state.emailState !== "success") {
  	    	alert("입력한 이메일 주소 형식이 잘못 되었습니다.");
  	        this.setState({ emailState: "error" });
  	      return false;
  	      } 
      } else {
    	  alert("이메일주소는 필수 입력값 입니다.");
    	  this.setState({ emailState: "error" });
    	  return false;
      }
      
      if (this.state.password !== "") {
    	  if (this.state.passwordState !== "success") {
  	        alert("영문,숫자를 혼합하여 6~12자 이내 입력해주세요.");
  	        this.setState({ passwordState: "error" });
  	      return false;
  	      }
      } else {
    	  alert("비밀번호는 필수 입력값 입니다.");
    	  this.setState({ passwordState: "error" });
    	  return false;
      }
      
      if (this.state.passwordConform !== "") {
    	  if (this.state.passwordConformState !== "success") { 
    	    alert("입력한 비밀번호가 일치 하지 않습니다.");
    	    this.setState({ passwordConformState: "error" });
    	    return false;
    	  }
      } else {
    	  alert("비밀번호 확인은 필수 입력값 입니다.");
    	  this.setState({ passwordConformState: "error" });
    	  return false;
      }
    }
  }
  
  handleKakao() {
	  alert("kakao");
	  
  	return axios ({
		url:'https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345',
		method:'GET',
		//headers:{'Authorization':'Bearer '+this.props.store.token},
	}).then(res=>alert(res.data))
	.catch(err => {
		alert(err);
	});
  	
  }

  render() {
    const { classes } = this.props;
    return (
      <GridContainer justify="center">
		
		<GridItem xs={12} sm={12} style={{textAlignLast:'center'}}>
        <Button
          //justIcon
          color="transparent"
          className={classes.iconButtons}
        href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345"
          //onClick={e => this.handleKakao()}
          style={{paddingLeft:'5px',paddingRight:'5px',paddingBottom:'5px'}}
        >
        <img src={KakaoIcon} alt="kakaosns" width="40" height="40"></img>
        </Button>&nbsp;&nbsp;
        <Button
          //justIcon
          color="transparent"
        	  href="https://nid.naver.com/oauth2.0/authorize?client_id=5VoB2_ZRwUMHKM0JPuUM&redirect_uri=http://www.plismplus.com/auth/naver/callback&response_type=code&state=12345"
          className={classes.iconButtons}
          //onClick={e => e.preventDefault()}
        style={{paddingLeft:'5px',paddingRight:'5px',paddingBottom:'5px'}}
        >
        <img src={NaverIcon} alt="naversns" width="40" height="40"></img>
        </Button>&nbsp;&nbsp;
        <Button
          //justIcon
          color="transparent"
          className={classes.iconButtons}
        href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://www.plismplus.com/auth/facebook/callback&response_type=code&state=12345"
          //onClick={e => e.preventDefault()}
        style={{paddingLeft:'5px',paddingRight:'5px',paddingBottom:'5px'}}
        >
        <img src={FaceIcon} alt="facesns" width="40" height="40"></img>
        </Button>&nbsp;&nbsp;
        <Button
        //justIcon
        color="transparent"
        className={classes.iconButtons}
        href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://www.plismplus.com/auth/google/callback&response_type=code&scope=profile&state=12345"
        //onClick={e => e.preventDefault()}
        style={{paddingLeft:'5px',paddingRight:'5px',paddingBottom:'5px'}}
      >
        <img src={GoogleIcon} alt="googlesns" width="40" height="40"></img>
      </Button>
      <h4 className={classes.cardTitle} style={{marginBottom:'0px',textAlignLast:'center'}}>- to social sign in -</h4>
      </GridItem>
      
        <GridItem xs={12} sm={12} md={12}>
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
        </GridItem>
          <GridItem xs={12} sm={12} md={12}>
          <CustomInput
            success={this.state.passwordState === "success"}
            error={this.state.passwordState === "error"}
            labelText={
              <span>
              PassWord <small>(required)</small>
              </span>
            }
            id="password"
            labelProps={{style:{top:'0'}}}
            formControlProps={{
              fullWidth: true,
              style:{marginBottom:'0',paddingTop:'17px'}
            }}
            helperText="6자 이상의 영문,숫자를 함께 입력해주세요."
            inputProps={{
              onChange: event => this.change(event, "password", "password"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Lock className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              type: "password",
              autoComplete: "off"
            }}
          />
          <CustomInput
            success={this.state.passwordConformState === "success"}
            error={this.state.passwordConformState === "error"}
            labelText={
              <span>
              PassWord Conform<small>(required)</small>
              </span>
            }
            id="passwordConform"
            labelProps={{style:{top:'0'}}}
            formControlProps={{
              fullWidth: true,
              style:{marginBottom:'0',paddingTop:'17px'}
            }}
          	helperText="비밀번호가 일치하지 않습니다."
            inputProps={{
              onChange: event => this.change(event, "passwordConform", "passwordConform"),
              endAdornment: (
                <InputAdornment
                  position="end"
                  className={classes.inputAdornment}
                >
                  <Visibility className={classes.inputAdornmentIcon} />
                </InputAdornment>
              ),
              type: "password",
              autoComplete: "off"
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
