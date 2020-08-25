import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import InputAdornment from "@material-ui/core/InputAdornment";
//import Icon from "@material-ui/core/Icon";

import Checkbox from '@material-ui/core/Checkbox';
import { Link  } from "react-router-dom";
//import { Redirect } from 'react-router-dom';

// @material-ui/icons
//import Face from "@material-ui/icons/Face";
//import Email from "@material-ui/icons/Email";
import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
// import LockOutline from "@material-ui/icons/LockOutline";
import TextField from '@material-ui/core/TextField';
// core components
//import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import MaterialButton from "@material-ui/core/Button";
//import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CardHeader from "components/Card/CardHeader.js";
import CardFooter from "components/Card/CardFooter.js";
//import Grid from '@material-ui/core/Grid';
import dotenv from "dotenv";
import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import axios from 'axios';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { observer, inject } from 'mobx-react'; // 6.x
//import { useCookies  } from 'react-cookie';

dotenv.config();

const useStyles = makeStyles(styles);



// export default function LoginPage(props) {
const LoginPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
/*  const [cardAnimaton, setCardAnimation] = React.useState("cardHidden");
  const [cookies, setCookie] = useCookies(['name']);
  
  setTimeout(function() {
    setCardAnimation("");
  }, 700);*/
  const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345";
  const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/google/callback&response_type=code&scope=profile&state=12345";
  const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/facebook/callback&response_type=code&state=12345"
  const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id="+process.env.REACT_APP_NAVER_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/naver/callback&response_type=code&state=12345"
  const classes = useStyles();
  const [email,setEmail] = React.useState();
  const [password,setPassword] = React.useState();
  const [checked,setChecked] = React.useState();
  const [severity, setSeverity] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState("");
 // const { from } = location.state || { from: { pathname: "/" } };
  //console.log("login props:",props);
  
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}

  const submit = () => {

	   if(email !== undefined && password !== undefined) {
		   axios.post("/auth/login", {id : email, pw : password,})
		    .then(res => {
		        if (res.data.message) {
		        	alert(res.data.message);
		        } else {
		        	
		        	if(res.data.token) {
		        	/*	if(localStorage.getItem('plismplus')){
		        			localStorage.removeItem('plismplus');
		        		}
		        		localStorage.setItem('plismplus',res.data.token);*/
                userStore.setUser(res.data.user);
                userStore.setToken(res.data.token);
                props.onClose(res.data.user);
                

		        	}		        		
		        	 //props.history.push("/");  //alert(res.data.userid + " 占싸깍옙占쏙옙 占쏙옙占쏙옙");
		        }
           // else window.location.href ="/";
           //console.log("loginpage return value:",res);
           //props.isAuthenticated(true);
           
          // props.goBack();
		    })
		    .catch(err => {
            console.log(err);
            if (err.response.data.error) {
              alert(err.response.data.error);
            }
		    })
	   } else {
		   if(email === undefined) {
			   alertMessage('아이디는 필수 입력값 입니다.','error');
		   } else {
			   alertMessage('비밀번호는 필수 입력값 입니다.','error');
		   }
		   
	   }
    
  };
  const clean = () => {
	  userStore.setUser('');
	  userStore.setToken('');
  }
  
  const socialReady=() => {
	  alertMessage('서비스 준비중입니다.','info');
  }
  
  const onKeyDownEnter = (event) => {
	  if(event.key === 'Enter') {
		  submit();
		  return;
	  }
  }
  
  return (
    <div>
              <CardHeader style={{textAlignLast:'center'}}>
                <h4 className={classes.cardTitle} style={{fontWeight:'400'}}><font color="black" size="5">로그인</font></h4>
              </CardHeader>
              <CardBody style={{paddingLeft:'10px',paddingRight:'10px'}}>
              	<div style={{marginBottom:'10px'}}>
              		<TextField id="email" label={<font size="2">아이디</font>} onChange={event => setEmail(event.target.value)} variant="outlined" size="small" fullWidth />
                </div>
                <div style={{marginBottom:'5px'}}>
                	<TextField id="password" label={<font size="2">비밀번호</font>} onChange={event => setPassword(event.target.value)} onKeyPress={onKeyDownEnter} variant="outlined" size="small" type="password" fullWidth />
                </div>
				<div style={{textAlignLast:'start',marginBottom:'5px'}}>
	                <Checkbox
	                	checked={checked}
	              		onChange={event => setChecked(event.target.checked)}
	                	color="default"
	                	style={{padding:'0px'}}
	              />로그인 상태 유지
				</div>
                <CardFooter className={classes.justifyContentCenter} style={{marginLeft:'0px',marginRight:'0px',paddingTop:'5px'}}>
                      <Button  color="info" size="lg"  onClick={submit} fullWidth>로그인하기</Button>
				</CardFooter>
                <CardFooter className={classes.justifyContentCenter} style={{marginLeft:'0px',marginRight:'0px',marginBottom:'10px',paddingTop:'0px'}}>
                	<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'20px'}} >
                		<Link to="/authpage/register" onClick={clean} style={{color:'black',textDecoration:'underline'}} >회원가입</Link>
                    </MaterialButton>|
                	<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'20px'}} >
                    	<Link to="/authpage/findinfo?code=0"  style={{color:'black',textDecoration:'underline'}} {...props}>아이디찾기</Link>
                    </MaterialButton>|
                	<MaterialButton  size="small" style={{lineHeight:'initial',fontWeight:'blod',paddingLeft:'20px',paddingRight:'15px'}} >
                    	<Link to="/authpage/findinfo?code=1"  style={{color:'black',textDecoration:'underline'}} {...props}>비밀번호찾기</Link>
                    </MaterialButton>
                </CardFooter>

				<GridItem xs={12} style={{textAlignLast:'center'}}>
				<p style={{marginBottom:'0'}}>소셜계정으로 로그인하기</p>
				<Button
		          //justIcon
		          color="transparent"
		          className={classes.iconButtons}
		          //href="https://kauth.kakao.com/oauth/authorize?client_id=0b6d98316119442e856dd2ad7497df14&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345"
		           href={kakaoUrl} 
		          //onClick={e => this.handleKakao()}
		          style={{padding:'5px'}}
		        >
		        <img src={KakaoIcon} alt="kakaosns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		          //justIcon
		          color="transparent"
		          href={naverUrl}
		          className={classes.iconButtons}
		          //onClick={socialReady}
		        style={{padding:'5px'}}
		        >
		        <img src={NaverIcon} alt="naversns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		          //justIcon
		        color="transparent"
		        className={classes.iconButtons}
		        //href={facebookUrl}
		        onClick={socialReady}
		        style={{padding:'5px'}}
		        >
		        <img src={FaceIcon} alt="facesns" width="40" height="40"></img>
		        </Button>&nbsp;&nbsp;
		        <Button
		        //justIcon
		        color="transparent"
		        className={classes.iconButtons}
		        href={googleUrl}
		        style={{padding:'5px'}}
		      >
		        <img src={GoogleIcon} alt="googlesns" width="40" height="40"></img>
		      </Button>
              </GridItem>
              </CardBody>
       	   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
   		<Alert 
   			onClose={handleAlertClose}
   			severity={severity}>
   				{errMessage}
   		</Alert>
   	</Snackbar>
    </div>
  );
}
))

export default LoginPage;
