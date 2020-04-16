import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputAdornment from "@material-ui/core/InputAdornment";
import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
import { Redirect } from 'react-router-dom';

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Email from "@material-ui/icons/Email";
import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import MaterialButton from "@material-ui/core/Button";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
import Grid from '@material-ui/core/Grid';

import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import axios from 'axios';

const useStyles = makeStyles(styles);


export default function LoginPage(props) {
  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  setTimeout(function() {
    setCardAnimation("");
  }, 700);
  const classes = useStyles();
  const [email,setEmail] = React.useState();
  const [password,setPassword] = React.useState();
 // const { from } = location.state || { from: { pathname: "/" } };
  console.log("login props:",props);

  const submit = () => {
	   if(email != "" && password != "") {
		   axios.post("/auth/login", {id : email, pw : password,})
		    .then(res => {
		        if (res.data.message) alert(res.data.message);
		        else props.history.push("/"); //props.onClose(); //alert(res.data.userid + " �α��� ����");
           // else window.location.href ="/";
           console.log("loginpage return value:",res);
           //props.isAuthenticated(true);
           
          // props.goBack();
		    })
		    .catch(err => {
		        console.log(err);
		    })
	   } else {
		   if(email == "") {
			   alert("�α��� ���̵� �� �ʼ� �Է� ���Դϴ�.");
		   } else {
			   alert("�α��� �н������ �ʼ� �Է� ���Դϴ�.");
		   }
		   
	   }
    
  };
  return (
    <div className={classes.container}>
      <GridContainer justify="center">
        <GridItem xs={10} sm={5} md={4}>
          <form>
            <Card login className={classes[cardAnimaton]}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="rose"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
				<p className={classes.divider}>Welcome to Plism Plus.</p>
              </CardHeader>
              <CardBody>
                <CustomInput stype={{marginBottom:'0'}}
                  labelText="Email..."
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                    style:{marginBottom:'0'},
                  }}
                  inputProps={{
                	  onChange:({target:{value} }) => setEmail(value),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    )                   
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
					style:{marginBottom:'0px'}
                  }}
                  inputProps={{
                	  onChange:({target:{value} }) => setPassword(value),
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: "password",
                    autoComplete: "off"
                  }}
                />
				<div style={{textAlignLast:'end'}}>
					  <MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod'}} >
                         <font color="#3f51b5" style={{textDecoration:'underline'}}>Forgot password?</font>
                      </MaterialButton>
				</div>
                <CardFooter className={classes.justifyContentCenter} style={{margin:'0px',paddingTop:'0px'}}>
                      <Button  color="rose" size="lg" style={{paddingTop:'10px',paddingBottom:'10px'}} onClick={submit} >Let{"'"}s Go</Button>
				</CardFooter>
				<Divider style={{marginTop:'10px',marginBottom:'10px'}}/>
        <GridItem xs={12} >
              <Button
                style={{backgroundColor:'white', borderRadius:'10px',borderStyle:'solid',borderColor:'#ffe812',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'2px'}}
                href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://localhost:5000/auth/kakao/callback&response_type=code&state=12345"
                //target="_blank"
                fullWidth
              >&nbsp;&nbsp;<img src={KakaoIcon} alt="īī��SNS" width="40" height="40"></img>&nbsp;&nbsp;Kakao Login
              </Button>
              <Button
                style={{backgroundColor:'white', borderRadius:'10px',borderStyle:'solid',borderColor:'#1EC800',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'2px'}}
                fullWidth
                href="https://nid.naver.com/oauth2.0/authorize?client_id=5vSPppBEGLWEwMT8p9kZ&redirect_uri=http://localhost:5000/auth/naver/callback&response_type=code&state=12345"
                //target="_blank"
                >&nbsp;&nbsp;<img src={NaverIcon} alt="���̹�SNS" width="40" height="40"></img>&nbsp;&nbsp;Naver Login
               </Button>
               <Button
                  style={{backgroundColor:'white', borderRadius:'10px',borderStyle:'solid',borderColor:'#3b5998',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'2px'}}
                  href="https://www.facebook.com/v5.0/dialog/oauth?client_id=184064786168643&redirect_uri=http://localhost:5000/auth/facebook/callback&response_type=code&state=12345"
                  //target="_blank"
                  fullWidth
                >&nbsp;&nbsp;<img src={FaceIcon} alt="���̽���SNS" width="40" height="40"></img>&nbsp;&nbsp;FaceBook Login
                </Button>
              <Button
                style={{backgroundColor:'white',borderRadius:'10px', borderStyle:'solid',borderColor:'#db3236',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'2px'}}
                fullWidth
                href="https://accounts.google.com/o/oauth2/v2/auth?client_id=684197542136-kkba8s7e8a1l6pnqdio46vgdgkfkhsmn.apps.googleusercontent.com&redirect_uri=http://localhost:5000/auth/google/callback&response_type=code&scope=profile&state=12345"
                //target="_blank"
              >&nbsp;&nbsp;<img src={GoogleIcon} alt="����SNS" width="40" height="40"></img>&nbsp;&nbsp;Google Login
              </Button>
              </GridItem>
              </CardBody>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
