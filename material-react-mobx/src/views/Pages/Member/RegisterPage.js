import React from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import { Link } from "react-router-dom";
import InputAdornment from "@material-ui/core/InputAdornment";
import Checkbox from "@material-ui/core/Checkbox";
//import FormControlLabel from "@material-ui/core/FormControlLabel";
//import Icon from "@material-ui/core/Icon";
import Divider from '@material-ui/core/Divider';
// @material-ui/icons
//import Timeline from "@material-ui/icons/Timeline";
//import Code from "@material-ui/icons/Code";
//import Group from "@material-ui/icons/Group";
import Person from "@material-ui/icons/PersonOutlined";
import PhoneAndroid from "@material-ui/icons/PhoneAndroidOutlined";
import AccountBox from "@material-ui/icons/AccountBoxOutlined";
//import Face from "@material-ui/icons/FaceOutlined";
import Email from "@material-ui/icons/EmailOutlined";
import Lock from "@material-ui/icons/LockOutlined";
import LockOpen from "@material-ui/icons/LockOpenOutlined";
//import Visibility from "@material-ui/icons/VisibilityOutlined";
//import VisibilityOff from "@material-ui/icons/VisibilityOffOutlined";
// import LockOutline from "@material-ui/icons/LockOutline";
//import Check from "@material-ui/icons/Check";
import CardHeader from "components/Card/CardHeader.js";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomOutInput.js";
//import CustomInputNew from "components/CustomInput/CustomInputSendNum.js";
//import InfoArea from "components/InfoArea/InfoArea.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GoogleIcon from 'assets/img/sns/google.png';
import FaceIcon from 'assets/img/sns/face.png';
import KakaoIcon from 'assets/img/sns/kakao.png';
import NaverIcon from 'assets/img/sns/naver.png';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import HighlightOff from '@material-ui/icons/HighlightOff';
import CommentIcon from '@material-ui/icons/Comment';
import IconButton from '@material-ui/core/IconButton';
import FormHelperText from "@material-ui/core/FormHelperText";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
//import DialogTitle from '@material-ui/core/DialogTitle';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import CardFooter from "components/Card/CardFooter.js";
//page import
import Terms from 'views/Pages/TermsOfService.js';
import Privacy from 'views/Pages/PrivacyPolicy.js';

//import { useCookies  } from 'react-cookie';
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import axios from 'axios';
import dotenv from "dotenv";
//import queryString from 'query-string';
import { observer, inject } from 'mobx-react'; // 6.x
dotenv.config();

const useStyles = makeStyles(styles);


//export default function RegisterPage(props) {
const RegisterPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props}) => {	

   const classes = useStyles();
   const userStoreValue = userStore.user;
   //const userStoreValue = {'provider':'kakao','userid':'test00000001','accessToken':'test123123123123'};
   
   
   const [uid,setUid] = React.useState();
   const [idCheck,setIdCheck] = React.useState();
   const [password,setPassword] = React.useState();
   const [repassword,setRepassword] = React.useState();
   const [passwordCheck,setPasswordCheck] = React.useState();
   const [repasswordCheck,setRepasswordCheck] = React.useState();
   
   const [userName,setUserName] = React.useState("");
   const [phoneNum,setPhoneNum] = React.useState("");
   
   
   const [email,setEmail] = React.useState("");
   const [emailCheck,setEmailCheck] = React.useState();
	
   const [open, setOpen] = React.useState(false);
   const [agreeText, setAgreeText] = React.useState();
   
   const [serviceChecked,setServiceChecked] = React.useState(false);
   const [polChecked,setPolChecked] = React.useState(false);
   
   const [certifyStatus, setCertifyStatus] = React.useState(false);
   const [certifyCheck,setCertifyCheck] = React.useState();
   const [certifyMsg,setCertifyMsg] = React.useState("");
   
   const [submitStatus,setSubmitStatus] = React.useState("");
	
   //아아디 연동 부분
   const [mergeId,setMergeId] = React.useState();
   const [mergePw,setMergePw] = React.useState();
   
   const [open1, setOpen1] = React.useState(false);
   const [serviceText, setServiceText] = React.useState(""); //약관구분
   
   const kakaoUrl ="https://kauth.kakao.com/oauth/authorize?client_id="+process.env.REACT_APP_KAKAO_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/kakao/callback&response_type=code&state=12345";
   const googleUrl = "https://accounts.google.com/o/oauth2/v2/auth?client_id="+process.env.REACT_APP_GOOGLE_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/google/callback&response_type=code&scope=profile&state=12345";
   const facebookUrl = "https://www.facebook.com/v5.0/dialog/oauth?client_id="+process.env.REACT_APP_FACEBOOK_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/facebook/callback&response_type=code&state=12345"
   const naverUrl = "https://nid.naver.com/oauth2.0/authorize?client_id="+process.env.REACT_APP_NAVER_CLIENT_ID+"&redirect_uri=http://www.plismplus.com/auth/naver/callback&response_type=code&state=12345"
   
	//console.log(">>>uservalue:",userStore.user);

	React.useEffect(() => {
		  if(userStore.user) {
			  //setUserName(userStore.user.username);
			  setEmail(userStore.user.email);
		  }

		    return () => {
		      console.log('cleanup');
		     // window.removeEventListener("touchmove",handleTouchMove);
		    };
	}, []);
	
  function handleState (e) {
		 if(e ==="success") {
			 alert("회원가입에 성공하였습니다. 다시 로그인 하여 사용해주세요."); 
			 props.history.push("/landing");
		 } else if (e ==="401") {
			 alert("이미 등록된 아이디입니다."); 
		 } else {
			 alert(e);
		 }
	  }
  
  // 이메일 유효성 검사
  function verifyEmail(value) {
	    var emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	    if (emailRex.test(value)) {
	      return true;
	    }
	    return false;  
	  }
  
  // 비밀번호 유효성 검사 ( 영문,숫자 혼합 6~20)
  function verifyPassword(value) {
	  //var passwordRex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; ( 영문,숫자 혼합 6~20)
	  var passwordRex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //(숫자/대문자/소문자/특수문자를 모두 포함 8자~)
	  return !passwordRex.test(value)?false:true;
  }
  // 휴대폰 번호 유효성 검사 
  function verifyPhone(value) {
	  var phoneRex = /^01?([0-9]{9,11})$/;
	  return !phoneRex.test(value)?false:true;
  }
  
  function change(value, name) {

	  switch (name) {
      case "id":
    	  setUid(value);
    	  console.log("id:",value);
    	  if(value.toUpperCase() === "admin".toUpperCase()) {
    		  setIdCheck(true);
    		  return;
    	  }
    	  if(value !== "") {
	    	  axios ({
	    			url:'/auth/dupcheck',
	    			method:'POST',
	    			data: {id:value}
	    		}).then(res=>res.status === 200?setIdCheck(false):setIdCheck(true))
	    		.catch(err => {
	    			setIdCheck(true);
	    		});
    	  }
        break;
      case "password":
    	  setPassword(value);
    	  if (verifyPassword(value)) { 
    		  setPasswordCheck(false);
    	  } else {
    		  setPasswordCheck(true);
    	  }
    	  
    	  if (repassword ) {
    		  if(value === repassword) {
    			  setPasswordCheck(false);
    			  setRepasswordCheck(false);
    		  } else {
    			  setPasswordCheck(true);
    			  setRepasswordCheck(true);
    		  }
    	  }	  
    	break;
      case "passwordConform":
    	  setRepassword(value);
    	  if (value === password ) {
			  setRepasswordCheck(false);
    	  } else {
    		  setRepasswordCheck(true);
    	  }
    	break;
      case "name":
    	  setUserName(value); 
    	break;	
      case "email":
    	  setEmail(value);
    	  if (verifyEmail(value) ) {
    		  setEmailCheck(false);
    	  } else {
    		  setEmailCheck(true);
    	  }
    	break;   	
      default:
        break;
    }
	 
  }

  const submit_checked = () => {

	  //필수 값 체크 
	  
	 if(uid === undefined || uid === "") {
		 setIdCheck(true);
		 alert("아이디는 필수 입력 값입니다.");
		 return;	 
	 } else if (idCheck){
		 setIdCheck(true);
		 alert("아이디를 확인해 주세요.");
		 return;
	 }

	 if(password === undefined || password === "") {
		 setPasswordCheck(true);
		 alert("비밀번호는 필수 입력 값입니다.");
		 return;	
	 } else if (passwordCheck){
		 setPasswordCheck(true);
		 alert("올바른 비밀번호를 입력해주세요.");
		 return;
	 } else if (repassword === undefined || repassword === "") {
		 setRepasswordCheck(true);
		 alert("비밀번호 확인은 필수 입니다.");
		 return;

	 } else if (repasswordCheck){
		 setRepasswordCheck(true);
		 alert("비밀번호 확인은 필수 입니다.");
		 return;
	 }
	 	 
	 if(emailCheck) {
		 setEmailCheck("error");
		 alert("올바른 이메일 주소를 입력해주세요.");
		 return;
	 }
	 
	 if(!certifyStatus) {
		 setCertifyCheck(true);
		 alert("본인인증 은 필수 입니다.");
		 return;
	 }
	 
	 if(!serviceChecked) {
		  alert("이용약관 동의는 필수 입니다.");
		  return;
	  }
	  
	  if(!polChecked) {
		  alert("개인정보 처리 방침 동의는 필수 입니다.");
		  return;
	  }

	 if(!idCheck&&!passwordCheck&&!repasswordCheck&&certifyStatus) {
		 
	    if(userStoreValue) {
	    	setAgreeText("소셜 계정 과 연동 하여 PLISM PLUS 회원에 가입 하시겠습니까?");
	    } else {
	    	setAgreeText("PLISM PLUS 회원에 가입 하시겠습니까?");
	    }

	     setSubmitStatus("I");
		 setOpen(true);
	 }
	  
  }
  
  const onSubmit = () => {
	  setOpen(false);
	  if(userStoreValue) {
		  return axios ({
				url:'/auth/join',
				method:'POST',
				data: {provider:userStoreValue.provider,
					   id:uid,
					   password:password,
					   name:userName,
					   phone:phoneNum,
					   email:email,
					   kakaoid:userStoreValue.provider=='kakao'?userStoreValue.userid:'',
					   tokenkakao:userStoreValue.provider=='kakao'?userStoreValue.accessToken:'',
					   naverid:userStoreValue.provider=='naver'?userStoreValue.userid:'',
					   tokennaver:userStoreValue.provider=='naver'?userStoreValue.accessToken:'',
					   faceid:userStoreValue.provider=='facebook'?userStoreValue.userid:'',
					   tokenface:userStoreValue.provider=='facebook'?userStoreValue.accessToken:'',
					   googleid:userStoreValue.provider=='google'?userStoreValue.userid:'',
					   tokengoogle:userStoreValue.provider=='google'?userStoreValue.accessToken:'',
					   linkyn:'Y'}
			}).then(res=>{alert("소셜 계정 과 연동 하여 PLISM PLUS 가입되었습니다. 로그인 하여 서비스 사용이 가능합니다.");
						  userStore.setUser(res.data.user);
				          userStore.setToken(res.data.token);
						  props.history.push("/landing");
			}
			)
			.catch(err => {
				alert(err);
			});
	  } else {
		  return axios ({
				url:'/auth/join',
				method:'POST',
				data: {provider:'local',
					   id:uid,password:password,
					   name:userName,
					   phone:phoneNum,
					   email:email,
					   kakaoid:'',
					   tokenkakao:'',naverid:'',tokennaver:'',faceid:'',tokenface:'',googleid:'',tokengoogle:'',linkyn:'N'}
			}).then(res=>{alert("PLISM PLUS 서비스에 가입되었습니다. 로그인 하여 서비스 사용이 가능합니다.");
						  props.history.push("/landing");
			}
			)
			.catch(err => {
				alert(err);
			});
	  }
  }
  
  function PaperComponent(props) {
	  return (
			  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'}>
			  	<Paper {...props} />
			  </Draggable>
			  );
  }


  
  const handleClose = () => {
	  setOpen(false);
	  setOpen1(false);
  }
  
 
  
  const Serti =() => {

	  return axios ({
			url:'/auth/sertify',
			method:'POST',
			data: {}
		}).then(res=>{ 
			var form1 = document.form1;
			window.open("", "auth_popup", "width=430,height=640,scrollbar=yes");	
			form1.target = "auth_popup";
			form1.tc.value="kcb.oknm.online.safehscert.popup.cmd.P931_CertChoiceCmd";
			form1.action = "https://safe.ok-name.co.kr/CommonSvl";
			form1.method = "post";
			form1.cp_cd.value=res.data.CP_CD;
			form1.mdl_tkn.value=res.data.MDL_TKN;
			form1.submit();
			
		}
		)
		.catch(err => {
			alert(err);
		});
  }
  
  window.event_popup = function() {
	  if(document.kcbResultForm.RSLT_CD.value === "B000"){
		  setPhoneNum(document.kcbResultForm.TEL_NO.value);
		  setUserName(document.kcbResultForm.RSLT_NAME.value);
		  setCertifyCheck(false);
		  setCertifyStatus(true);
	  } else {
		  setCertifyCheck(true);
		  setCertifyStatus(false);
		  alert(document.kcbResultForm.RSLT_MSG.value);
		  setCertifyMsg("error: 사용자 본인 인증에 실패 하였습니다. 다시 시도해주세요.");
		  
	  }
  }
  
  const socialReady=() => {
	  alert("서비스 준비중입니다.");
  }
  
  const submit1 = () => {

	  if(mergeId === undefined || mergeId === "") {
		  alert("아이디 항목은 필수 입력값 입니다.");
		  return;
	  }
	  
	  if(mergePw === undefined|| mergePw === "") {
		  alert("비밀번호 항목은 필수 입력값 입니다.");
		  return;
	  }
	  setSubmitStatus("M");
	  setAgreeText("PLISM PLUS 계정과 연동 하시겠습니까?");
	  setOpen(true);
  }

  function DialogComponet(props) {
	  return (
			  
		<Dialog
			open={open}
		    onClose={handleClose}
		    PaperComponent={PaperComponent}
		    aria-labelledby="draggable-dialog-title"
		>
		<DialogContent>
			<DialogContentText>{props.text}</DialogContentText>
		</DialogContent>
		<DialogActions>
			<Button autoFocus size="sm" onClick={submitStatus === "M"?mergesubmit:onSubmit} color="info">네</Button>	
			<Button autoFocus size="sm" onClick={handleClose} color="info">아니오</Button>	
		</DialogActions>
		</Dialog>
	  );
  }
  
  const handleClickOpen = (event,name) => {
	  
	  if(name === "terms") {
		  setServiceText("T");
	  } else {
		  setServiceText("P");
	  }
	  setOpen1(true);
  }
  
  function DialogComponet1(props) {
	  return (
			  
		<Dialog
			open={open1}
		    onClose={handleClose}
		    PaperComponent={PaperComponent}
		    aria-labelledby="draggable-dialog-title"
		>
		<DialogContent>
			{serviceText === "T"?<Terms {...props} handleClose={handleClose} />:<Privacy {...props} handleClose={handleClose}/>}
		</DialogContent>
		</Dialog>
	  );
  }
  
  const mergesubmit = () => {

	  setOpen(false);
	  if(!userStoreValue) {
		  alert("[ERROR] SOCAIL INFO ERROR !!!");
	  } else {
		  return axios ({
				url:'/auth/join',
				method:'POST',
				//headers:{'Authorization':'Bearer '+this.props.store.token},
				data: {provider:'merge',
					   id : mergeId,
					   password : mergePw,
					   kakaoid:userStoreValue.provider=='kakao'?userStoreValue.userid:'',
					   tokenkakao:userStoreValue.provider=='kakao'?userStoreValue.accessToken:'',
					   naverid:userStoreValue.provider=='naver'?userStoreValue.userid:'',
					   tokennaver:userStoreValue.provider=='naver'?userStoreValue.accessToken:'',
					   faceid:userStoreValue.provider=='facebook'?userStoreValue.userid:'',
					   tokenface:userStoreValue.provider=='facebook'?userStoreValue.accessToken:'',
					   googleid:userStoreValue.provider=='google'?userStoreValue.userid:'',
					   tokengoogle:userStoreValue.provider=='google'?userStoreValue.accessToken:'', 
					   linkyn:'Y'	   
					   }
			}).then(res=>{alert("PLISM PLUS 계정과 연동이 되었습니다.");
			 				userStore.setUser(res.data.user);
	         				userStore.setToken(res.data.token);
						  props.history.push("/landing");
			})
			.catch(err => {
				alert(err);
			});
	  }
  }

  return (
    <div className={classes.container}>
    	<form name="form1">
    	<input type="hidden" name="tc" />	
    	<input type="hidden" name="cp_cd" />	
    	<input type="hidden" name="mdl_tkn" />	
    	<input type="hidden" name="target_id"/>	
    	</form>
    	<form name="kcbResultForm" method="post">
    		<input type="hidden" name="RSLT_CD"/>
    	    <input type="hidden" name="RSLT_MSG"/>
    	    <input type="hidden" name="TEL_NO"/>
    	    <input type="hidden" name="RSLT_NAME"/>
    	</form>  		
    <GridContainer justify="center">
        <GridItem xs={12} sm={8} md={userStoreValue?8:6}>
          <Card className={classes.cardSignup} style={{margin:'0',paddingTop:'10px',paddingBottom:'0'}}>
          
          <CardHeader className={`${classes.cardHeader} ${classes.textCenter}`} color="info">
          <HighlightOff onClick={()=> props.history.push("/landing")} style={{color:'white',top:'2',right:'2',position:'absolute'}}/>
          {userStoreValue?
          <h3 className={classes.cardTitle} style={{marginBottom:'0'}}><font color="white">해당 계정으로 가입된 이력이 존재하지 않습니다.</font></h3>
          :<h3 className={classes.cardTitle} style={{marginBottom:'0'}}><font color="white">회원가입</font></h3>}
          </CardHeader>
            <CardBody style={{paddingTop:'10px',paddingBottom:'15px'}}>
            {userStoreValue?<div><p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}><font size="3" color="green">{userStoreValue.provider} 계정으로 인증하였습니다.</font></p>
            <Divider /></div>:
	            <GridItem xs={12} style={{textAlignLast:'center'}}>			
					<Button
					 // style={{backgroundColor:'white',borderRadius:'30px',borderStyle:'solid',borderColor:'#ffe812',color:'#6f6e6e',placeContent:'initial',margin:'3px',height:'48px',paddingLeft:'10px'}}
			          //justIcon
			          color="transparent"
			          className={classes.iconButtons}
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
		            <p style={{marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}>SNS로 가입하고 간편하게 로그인하세요.</p>
		            <Divider />
		        </GridItem>}
	            <GridContainer style={{paddingLeft:'10px',paddingRight:'10px'}}>
	            	<GridItem xs={12} sm={12} md={userStoreValue?7:12}>
	            	<GridItem xs={12} sm={12}>
	            		{userStoreValue?<p style={{marginTop:'10px',marginBottom:'0',fontWeight:'bold',textAlignLast:'center'}}>몇가지 입력후 회원가입이 가능합니다.</p>:null}
		        	<CustomInput
			            labelText={
			              <span>
			              <font size="2">아이디</font><small>(required)</small>
			              </span>
			            }
			            id="id"
			            helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN 아이디는 사용금지 아이디 입니다.":idCheck&&uid !== ""?"이미 등록된 아이디 입니다.":" "}
			            formControlProps={{
			              fullWidth: true, variant:'outlined',size:'small', error:idCheck,style:{marginTop:'15px'}
			            }}
			            inputProps={{
			            	onBlur: event => change(event.target.value, "id"),
			              endAdornment: (
			                <InputAdornment
			                  position="end"
			                  className={classes.inputAdornment}
			                  style={{ marginRight:'4px'}}
			                >
			                  <AccountBox className={classes.inputAdornmentIcon} />
			                </InputAdornment>
			              ),
			              labelWidth:110
			            }}   
		          	/>
		        </GridItem>
		        <GridItem xs={12} sm={12}>
			        <CustomInput
		            labelText={
		              <span>
		              <font size="2">비밀번호</font><small>(required)</small>
		              </span>
		            }
		            id="password"
		            labelProps={{style:{top:'0'}}}
		            formControlProps={{
		              fullWidth: true, variant:'outlined',size:'small', error:passwordCheck,style:{marginTop:'3px'}
		            }}
		            helperText="8자 이상의 숫자/대문자/소문자/특수문자를 포함해야 합니다."
		            inputProps={{
		              onChange: event => change(event.target.value, "password"),
		              endAdornment: (
		                <InputAdornment
		                  position="end"
		                  className={classes.inputAdornment}
		                  style={{ marginRight:'4px'}}
		                >{!passwordCheck?
		                  <Lock className={classes.inputAdornmentIcon} />:
		                  <LockOpen className={classes.inputAdornmentIcon} />}
		                </InputAdornment>
		              ),
		              type: "password",
		              autoComplete: "off",
		              labelWidth:130
		            }}
		          />
		          <CustomInput
		            labelText={
		              <span>
		              	<font size="2">비밀번호 확인</font> <small>(required)</small>
		              </span>
		            }
		            id="passwordConform"
		            labelProps={{style:{top:'0'}}}
		            formControlProps={{
		              fullWidth: true,variant:'outlined',size:'small', error:repasswordCheck,style:{marginTop:'3px'}
		            }}
		          	helperText={repasswordCheck?"비밀번호가 일치하지 않습니다.":" "}
		            inputProps={{
		              onBlur: event => change(event.target.value, "passwordConform"),
		              endAdornment: (
		                <InputAdornment
		                  position="end"
		                  className={classes.inputAdornment}
		                  style={{ marginRight:'4px'}}
		                >{!repasswordCheck?<Lock className={classes.inputAdornmentIcon} />:
		                  <LockOpen className={classes.inputAdornmentIcon} />}
		                </InputAdornment>
		              ),
		              type: "password",
		              autoComplete: "off",
		              labelWidth:160
		            }}
		          /> 
		        </GridItem>
		            <GridItem xs={12} sm={12}>
				      <CustomInput
			            success={emailCheck === "success"}
			            error={emailCheck === "error"}
			            labelText={
			              <span>
			              	<font size="2">이메일</font>
			              </span>
			            }
			            id="email"
			            formControlProps={{
			              fullWidth: true,variant:'outlined',size:'small', error:emailCheck,style:{marginTop:'3px'}
			            }}
				      	helperText={emailCheck?"이메일 형식이 잘못되었습니다.":" "}
			            inputProps={{
			              onChange: event => change(event.target.value, "email"),
			              endAdornment: (
			                <InputAdornment
			                  position="end"
			                  className={classes.inputAdornment}
			                  style={{ marginRight:'4px'}}
			                >
			                  <Email className={classes.inputAdornmentIcon} />
			                </InputAdornment>
			              ),
			              value:email,
			              labelWidth:50
			            }}
			          />
			      </GridItem>
		           {certifyStatus==false?
		          <GridItem xs={12} sm={12} md={12} style={{textAlignLast:'center'}}>
		          	<Button color="info" onClick={Serti} fullWidth style={{width:'285px',marginBottom:'15px'}}>본인인증</Button>
			        {certifyMsg?<FormHelperText id="certifyStatus" style={{color:'red',marginTop:'0'}}>{certifyMsg}</FormHelperText>:null}
		          </GridItem>
		          :
				  <GridItem xs={12} sm={12}>
		            <CustomInput
			            labelText={
			              <span>이름</span>
			            }
			            id="userName"
			            formControlProps={{
			              fullWidth: true,variant:'outlined',size:'small', style:{marginTop:'3px',marginBottom:'10px'}
			            }}
			            inputProps={{
			              onChange: event => change(event.target.value, "name"),
			              endAdornment: (
			                <InputAdornment
			                  position="end"
			                  className={classes.inputAdornment}
			                  style={{ marginRight:'4px'}}
			                >
			                  <Person className={classes.inputAdornmentIcon} />
			                </InputAdornment>
			              ),
			              disabled:true,
			              value:userName,
			              labelWidth:35
			            }}
			          />
			          <CustomInput
			            labelText={
			              <span>
			              	<font size="2">휴대폰 번호</font>
			              </span>
			            }
			            id="phoneNum"
			            formControlProps={{
			              fullWidth: true,variant:'outlined',size:'small', error:repasswordCheck,style:{marginTop:'13px',marginBottom:'10px'}
			            }}
			            helperText={<font color="green">본인 인증에 성공하였습니다.</font>}
			            inputProps={{
			              onChange: event => change(event.target.value, "name"),
			              endAdornment: (
			                <InputAdornment
			                  position="end"
			                  className={classes.inputAdornment}
			                  style={{ marginRight:'4px'}}
			                >
			                	<PhoneAndroid className={classes.inputAdornmentIcon} />
			                </InputAdornment>
			              ),
			              disabled:true,
			              labelWidth:75,
			              value:phoneNum
			            }}
		              
			          />
		          </GridItem>}
	      <GridItem xs={12} style={{marginBottom:'10px'}}>
	      <p style={{marginBottom:'0',marginTop:'5px',fontWeight:'bold'}}>서비스 이용 약관</p>
		     <Divider style={{marginTop:'1px',marginBottom:'1px'}}/>
		     <List style={{paddingLeft:'15px',paddingTop:'0',paddingBottom:'0'}}>
	         <ListItem dense button style={{padding:"0"}}>
	         	<ListItemIcon style={{minWidth:"0"}}>
	         		<Checkbox color="default" edge="start" checked={serviceChecked} onChange={() => setServiceChecked(!serviceChecked)} 
	         		disableRipple />
	         	</ListItemIcon>
	         	<ListItemText primary={"이용약관에 동의 합니다. (필수)"}/>
	         	<ListItemSecondaryAction>

	         		<IconButton edge="end" style={{padding:"0"}}  onClick={event => handleClickOpen(event,'terms')}>
	         			<CommentIcon />
	         		</IconButton>

	         	</ListItemSecondaryAction>
	         	</ListItem>
	         	</List>
	         	<p style={{marginBottom:'0',fontWeight:'bold'}}>개인정보처리방침</p>
	         	<Divider style={{marginTop:'1px',marginBottom:'1px'}}/>
	         	<List style={{paddingLeft:'15px',paddingTop:'0',paddingBottom:'0'}}>
	         	<ListItem dense button style={{padding:"0"}}>
	         	<ListItemIcon style={{minWidth:"0"}}>
	         		<Checkbox color="default" edge="start" checked={polChecked} onChange={() => setPolChecked(!polChecked)}  
	         		disableRipple />
	         	</ListItemIcon>
	         	<ListItemText primary={"개인정보 처리방침에 동의 합니다.(필수)"} />
	         	<ListItemSecondaryAction>
	         		<IconButton edge="end" style={{padding:"0"}} onClick={event => handleClickOpen(event,'privacy')}>
	         			<CommentIcon />
	         		</IconButton>
	         	</ListItemSecondaryAction>
	         	</ListItem>
	         </List>
	         </GridItem>
	         <GridItem xs={12} sm={12} style={{textAlignLast:'center'}}>
	         	<Button color="info" onClick={submit_checked} fullWidth style={{width:'285px'}}>신규가입</Button>
	         </GridItem>
					    
					</GridItem>
				{userStoreValue?
	            <GridItem xs={12} sm={12} md={5}>
		            <div style={{textAlignLast:'center',paddingLeft:'20px',paddingRight:'20px',paddingTop:'80px',fontWeight:'bold'}}>
				     	<p>기존 ID가 있으시다면,<br/> 소셜계정을 연동하실 수 있습니다.</p><br/>
				     	<div style={{marginBottom:'10px'}}>
				     		<TextField id="merge_id" label={<font size="2">아이디</font>} onChange={event => setMergeId(event.target.value)} variant="outlined" size="small" fullWidth />
				     	</div>
				        <div style={{marginBottom:'5px'}}>
				         	<TextField id="merge_pw" label={<font size="2">비밀번호</font>} onChange={event => setMergePw(event.target.value)} variant="outlined" size="small" type="password" fullWidth />
				        </div>
		         
				        <CardFooter className={classes.justifyContentCenter} style={{marginLeft:'0px',marginRight:'0px',paddingTop:'5px'}}>
				        	<Button  color="info"  onClick={submit1} fullWidth>연동하기</Button>
				        </CardFooter>

			     </div> 
	            </GridItem>:null}
	            </GridContainer>
	 
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
      <DialogComponet text={agreeText} />
      <DialogComponet1 {...props}/>
    </div>
  );
}

))

export default RegisterPage;
