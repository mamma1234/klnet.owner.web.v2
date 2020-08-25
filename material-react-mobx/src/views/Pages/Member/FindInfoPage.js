import React from "react";
import {Table,
	    TableBody,
	    TableCell,
	    TableRow,
	    Divider,
	    Snackbar,
	    //Dialog,
	    //DialogActions,
	    //DialogContent,
	    //DialogContentText,
	    //Paper
	    TextField
	    } from "@material-ui/core";


// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import PhoneIphone from "@material-ui/icons/PhoneIphone";
import CardHeader from "components/Card/CardHeader.js";
import MuiAlert from '@material-ui/lab/Alert';
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomOutInput.js";

import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-pro-react/views/registerPageStyle";
import axios from 'axios';
import queryString from 'query-string';
import NavPills from "components/NavPills/NavPillsFind.js";
import {VerifiedUserOutlined,LockOpenOutlined} from '@material-ui/icons';

const useStyles = makeStyles(styles);



export default function FindInfoPage(props) {

   const query = queryString.parse(window.location.search);
	
   const classes = useStyles();
   console.log("query",query);
   const [activeTab, setActiveTab] = React.useState(parseInt(query.code));
   
   const [resetPage,setResetPage] = React.useState(null);
   
   
   const [uid,setUid] = React.useState("");
   const [uidErr,setUidErr] = React.useState("");
   const [userName,setUserName] = React.useState("");
   const [phoneNum,setPhoneNum] = React.useState("");
   const [phoneHelpText,setPhoneHelpText] = React.useState("*휴대폰번호는'-'제외 입력해주세요.");
   const [openSmsNum,setOpenSmsNum] = React.useState();
   const [buttonName, setbuttonName] = React.useState("인증번호 발송");
   const [uiDisable, setUiDisable] = React.useState(false);
   const [certifyKey, setCertifyKey] = React.useState("");
   const [passwordCheck,setPasswordCheck] = React.useState();
   const [repasswordCheck,setRepasswordCheck] = React.useState();

   const [userData,setUserData] = React.useState([]);

   
   const[idFindStatus,setIdFindStatus] = React.useState("");
   const[pwFindStatus,setPwFindStatus] = React.useState("");

   const [userErr,setUserErr] = React.useState();
   const [phoneErr,setPhoneErr] = React.useState();
   
   
   const [password,setPassword] = React.useState();
   const [repassword,setRepassword] = React.useState();
   
   const [remainTime,setRemainTime] = React.useState("420000");
   const [refreshTime, setRefreshTime] = React.useState("420000");

   const [severity, setSeverity] = React.useState("");
   const [alertOpen, setAlertOpen] = React.useState(false);
   const [errMessage, setErrmessage] = React.useState("");


 // 휴대폰 번호 유효성 검사 
  function verifyPhone(value) {
	  var phoneRex = /^01?([0-9]{9,11})$/;
	  return !phoneRex.test(value)?false:true;
  }
  
  function change(value, name) {

	  switch (name) {
      case "id":
    	 setUid(value);
    	 setUidErr(false);
        break;
      case "name":
    	  setUserName(value); 
    	  setUserErr(false);
    	break;	
      case "certify":
    	  setCertifyKey(value);
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
    	  if(value) {
	    	  if (value === password ) {
				  setRepasswordCheck(false);
	    	  } else {
	    		  setRepasswordCheck(true);
	    	  }
    	  }
    	break;
      case "phone":
    	  setPhoneNum(value);
    	  if(verifyPhone(value)){
    		  setPhoneErr(false);
    		  setPhoneHelpText("");
    	  } else {
    		  setPhoneErr(true);
    		  setPhoneHelpText("입력한 휴대폰번호 형식이 잘못되었습니다.");
    	  }
    	break;
      default:
        break;
    }
	 
  }

  // 비밀번호 유효성 검사 ( 영문,숫자 혼합 8~20)
  function verifyPassword(value) {
	  //var passwordRex = /^.*(?=.{6,20})(?=.*[0-9])(?=.*[a-zA-Z]).*$/; ( 영문,숫자 혼합 8~20)
	  var passwordRex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/; //(숫자/대문자/소문자/특수문자를 모두 포함 8자~)
	  return !passwordRex.test(value)?false:true;
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
			form1.flag = "ID";
			form1.cp_cd.value=res.data.CP_CD;
			form1.mdl_tkn.value=res.data.MDL_TKN;
			form1.submit();
			
		}
		)
		.catch(err => {
			alert(err);
		});
  }
  
  const SertiPw =() => {

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
			form1.flag = "PW";
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
		  if(document.form1.flag === "ID") {
			  certifyIdFindInfo(document.kcbResultForm.RSLT_NAME.value,document.kcbResultForm.TEL_NO.value);
		  } else {
			  certifyPwFindInfo(document.kcbResultForm.RSLT_NAME.value,document.kcbResultForm.TEL_NO.value);
		  }
	  } else {
		  alertMessage("[ERROR]사용자 본인 인증에 실패 하였습니다. 다시 시도해주세요.",'error');
		  
	  }
  }

  
  const sendSmsNum = () => {

	  axios ({
			url:'/auth/userfinder',
			method:'POST',
			data: {name:userName, phone:phoneNum, gb:"S"}
		}).then(res=>{
			setOpenSmsNum("success");
			setbuttonName("인증번호 재발송");
			setUiDisable(true);
			setUserData(res.data);

		}
		).then(setRemainTime("reset"))
		.catch(err => {
			if(err.response !== undefined) {
				setUserData([]);
				if(err.response.status === 500) {
					alertMessage("[ERROR]"+err.response.data,'error');
				} else if(err.response.status === 404) {
					alertMessage("[ERROR]입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.",'error');
				}
			}
		});
  }
  
  const checkSmsNum = (event,flag) => {
	  axios ({
			url:'/auth/userfinder',
			method:'POST',
			data: {name:userName, phone:phoneNum, certify:certifyKey, gb:"C"}
		}).then(res=>{
			if(flag === "ID") {
				setIdFindStatus("S");
			} else {
				setPwFindStatus("S");
			}
			setUserData(res.data);
		}
		)
		.catch(err => {
			if(err.response !== undefined) {
				setUserData([]);
				if(err.response.status === 500) {
					alertMessage("[ERROR]"+err.response.data,'error');
				} else if(err.response.status === 404) {
					alertMessage("[ERROR]입력된 일련번호 가 잘못되었습니다.다시 확인 후 진행해주세요.",'error');
				}
			}
		});
  }
  
  const certifyIdFindInfo = (name,hp) => {
			
			axios ({
				url:'/auth/userfinder',
				method:'POST',
				data: {name:userName, phone:phoneNum}
			}).then(res=>{
				setIdFindStatus("P");
				setUserData(res.data);
			}
			)
			.catch(err => {
				if(err.response !== undefined) {
					setUserData([]);
					if(err.response.status === 500) {
						alertMessage("[ERROR]"+err.response.data,'error');
					} else if(err.response.status === 404) {
						alertMessage("[ERROR]입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.",'error');
					}
				}
			});
	}  
  const certifyPwFindInfo = (name,hp) => {
		
		axios ({
			url:'/auth/userfinder',
			method:'POST',
			data: {name:userName, phone:phoneNum}
		}).then(res=>{
			setPwFindStatus("S");
			setUserData(res.data);
		}
		)
		.catch(err => {
			if(err.response !== undefined) {
				setUserData([]);
				if(err.response.status === 500) {
					alertMessage("[ERROR]"+err.response.data,'error');
				} else if(err.response.status === 404) {
					alertMessage("[ERROR]입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.",'error');
				}
			}
		});
}  

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

	const uiChange = (event,gb) => {
		if( gb === 0) {
			setIdFindStatus("I");
			setOpenSmsNum();
			setbuttonName("인증번호 발송");
		} else if (gb === 1) {
			setPwFindStatus("I");
			setOpenSmsNum();
			setbuttonName("인증번호 발송");
		} else {
			setIdFindStatus("V");
		}
	}

  const setStatData = (event) => {
	  
      console.log("reset");
      setUiDisable(false);
      setIdFindStatus("");
      setPwFindStatus("");
	  setResetPage(null);
	  setUserName("");
	  setPhoneNum("");
	  setUid("");
	  setRemainTime("420000");
	  setRefreshTime("420000");
  }

  const loginHandler = () => {
	  props.history.push("/landing");
  };
  
  const cancleHandler = () => {
	  props.history.push("/landing");
  }
  
  const updatePwHandler = () => {
	  if(password === undefined || password === "") {
			 setPasswordCheck(true);
			 alertMessage('비밀번호는 필수 입력 값입니다.','error');
			 return;	
		 } else if (passwordCheck){
			 setPasswordCheck(true);
			 alertMessage('올바른 비밀번호를 입력해주세요.','error');
			 return;
		 } else if (repassword === undefined || repassword === "") {
			 setRepasswordCheck(true);
			 alertMessage('비밀번호 확인은 필수 입니다.','error');
			 return;

		 } else if (repasswordCheck){
			 setRepasswordCheck(true);
			 alertMessage('비밀번호 확인은 필수 입니다.','error');
			 return;
		 }

	  axios ({
			url:'/auth/userupdate',
			method:'POST',
			data: {uno:userData[0].user_no ,pw:password }
		}).then(res=>{
			alertMessage("비밀번호가 변경 되었습니다. 로그인 후 사용 가능합니다.",'success');
			setTimeout(()=>{
	        	props.history.push('/landing');
            },2000);
		}
		)
		.catch(err => {
			if(err.response !== undefined) {
				if(err.response.status === 500) {
					alertMessage("[ERROR]"+err.response.data,'error');
				} else if(err.response.status === 404) {
					alertMessage("[ERROR]입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.",'error');
				}
			}
		});

	  
  }
  
  if(remainTime < 0) {

	  axios ({
			url:'/auth/userfinder',
			method:'POST',
			data: {name:userName, phone:phoneNum, gb:"R"}
		}).then(res=>{
			setOpenSmsNum("success");
			setbuttonName("인증번호 재발송");
			setUiDisable(true);
		}
		)
		.catch(err => {
			if(err.response !== undefined) {
				setUserData([]);
				if(err.response.status === 500) {
					alertMessage("[ERROR]"+err.response.data,'error');
				} else if(err.response.status === 404) {
					alertMessage("[ERROR]입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.",'error');
				}
			}
		});
	  
	}
  
  return (
    <div className={classes.container}>
    	<form name="form1">
    	<input type="hidden" name="tc" />
    	<input type="hidden" name="flag" />	
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
        <GridItem xs={12} sm={8} md={5}>
          <Card className={classes.cardSignup} style={{margin:'0',paddingTop:'0',paddingBottom:'0'}}>
            <CardBody style={{paddingTop:'0',paddingBottom:'15px'}}>
            <NavPills
            color="info"
            setStatData={event=>setStatData(event)}
            active={activeTab}
            tabs={[
              {
                tabButton: "ID 찾기",
                tabContent: (			
                		<div>
	      		          	{idFindStatus==="I"?
	      		          		<GridItem xs={12} style={{overflow:'hidden'}}>
			      		            <div style={{textAlignLast:'center'}}><PhoneIphone style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
			      		        	<div style={{textAlignLast:'center'}}>
		      		  				<font size="3" style={{fontWeight:'bold'}}>등록된 휴대폰 번호로 찾기</font><br/>
		      		  				<font size="2" style={{color:'silver'}}>가입 당시 입력한 휴대폰 번호로 인증번호를 발송합니다.</font></div>
		      		  			<GridContainer justify="center">
		      		  			<GridItem xs={11} >
					      		          <CustomInput
				    			            labelText={
				    			              <span>
				    			              <font size="2">이름</font><small>(required)</small>
				    			              </span>
				    			            }
				    			            id="name"
				    			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN 아이디는 사용금지 아이디 입니다.":idCheck&&uid !== ""?"이미 등록된 아이디 입니다.":" "}
				    			            formControlProps={{
				    			              fullWidth: true, variant:'outlined',size:'small', error:userErr,style:{marginTop:'15px'}
				    			            }}
				    			            inputProps={{
				    			              onChange: event => change(event.target.value, "name"),
				    			              disabled:uiDisable,
				    			              labelWidth:110
				    			            }}   
				    		          	/>
				    			            <GridContainer style={{flexWrap:'unset'}}>
							        		<GridItem xs={12} sm={12} md={8}>
								        		<CustomInput
										            labelText={
										              <span>
										              	<font size="2">휴대폰 번호</font>
										              </span>
										            }
								        			id="phoneNum"
								        			helperText={phoneHelpText}
										            formControlProps={{
										              fullWidth: true,variant:'outlined',size:'small',error:phoneErr, style:{marginTop:'13px',marginBottom:'10px'}
										            }}
										            inputProps={{
										              onChange: event => change(event.target.value, "phone"),
											          disabled:uiDisable,
										              labelWidth:75,
										              //value:phoneNum
										            }}
										         />
							        		</GridItem>
							        		<GridItem xs={12} sm={12} md={'auto'}>
							        			<Button color="info" onClick={sendSmsNum}  fullWidth style={{marginTop:'12px',paddingLeft:'10px',paddingRight:'10px'}}>{buttonName}</Button>
							        		</GridItem>
							        	</GridContainer>
							        	
									     {openSmsNum?
									     <div>
									     <CustomInput
				    			            labelText={
				    			              <span>
				    			              <font size="2">인증번호</font><small>(required)</small>
				    			              </span>
				    			            }
				    			            id="name"
				    			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN 아이디는 사용금지 아이디 입니다.":idCheck&&uid !== ""?"이미 등록된 아이디 입니다.":" "}
				    			            formControlProps={{
				    			              fullWidth: true, variant:'outlined',size:'small', error:userErr,style:{marginBottom:'10px'}
				    			            }}
				    			            inputProps={{
				    			              onChange: event => change(event.target.value, "certify"),
				    			              labelWidth:110
				    			            }}   
				    		          	/>
				    		          				<Clock deadline={refreshTime} setRemainTime={setRemainTime} remainTime={remainTime}/>

									     <div style={{textAlign:'center'}}>
									     	<Button color="info" onClick={event => checkSmsNum(event,"ID")} >확인</Button>
					   		          		<Button color="info" onClick={cancleHandler}>취소</Button>
									     </div>
									     </div>: 
									     <div style={{textAlign:'center'}}>
				   		          			<Button color="info" onClick={cancleHandler} >취소</Button>
				   		          		</div>}
									     </GridItem>
									     </GridContainer>
	      		          		</GridItem>
	      		          	 :idFindStatus==="S"?
	      		          			<GridItem xs={12}>
   		          			<Card style={{margin:'10px'}}>
   		          				<CardHeader style={{paddingTop:'0',paddingLeft:'3px',paddingBottom:'0'}}>
   		          					<h5 style={{fontSize:'1.05em',fontWeight:'bold',marginBottom:'0'}}> 아이디 찾기 결과</h5>
   		          				</CardHeader>
   		          				<CardBody >
		      		          			<Table style={{marginTop:'10px',marginBottom:'10px'}}>
					  		          		<TableBody>
					  		          	{userData.length>0?userData.map((data, key) => { 
		      		          				return ( 
							  		          		<TableRow>
									  		          	<TableCell><font color="red">[SMS인증]</font></TableCell>
							  		          			<TableCell style={{textAlignLast:'start'}}>{data.origin_local_id}</TableCell>
							  		          	        <TableCell style={{textAlignLast:'end'}}>{data.insert_date} 가입</TableCell>
							  		          		</TableRow>
		      		          			 );
		      		          			}):(<TableRow>
									  		          	<TableCell colSpan="3"><font color="red">입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.</font></TableCell>
							  		          		</TableRow>)}
				      		          		</TableBody>
				      		          	</Table>
   		          				</CardBody>
   		          			</Card> 
   		          		<Button color="info" onClick={loginHandler}  style={{marginTop:'10px',marginBottom:'15px'}}>로그인</Button>
		          		</GridItem> :idFindStatus==="P"?
	      		          		<GridItem xs={12}>
	      		          			<Card style={{margin:'10px'}}>
	      		          				<CardHeader style={{paddingTop:'0',paddingLeft:'3px',paddingBottom:'0'}}>
	      		          					<h5 style={{fontSize:'1.05em',fontWeight:'bold',marginBottom:'0'}}> 아이디 찾기 결과</h5>
	      		          				</CardHeader>
	      		          				<CardBody >
			      		          			<Table style={{marginTop:'10px',marginBottom:'10px'}}>
						  		          		<TableBody>
						  		          	{userData.length>0?userData.map((data, key) => { 
			      		          				return ( 
								  		          		<TableRow>
										  		          	<TableCell><font color="red">[본인인증]</font></TableCell>
								  		          			<TableCell style={{textAlignLast:'start'}}>{data.origin_local_id}</TableCell>
								  		          	        <TableCell style={{textAlignLast:'end'}}>{data.insert_date} 가입</TableCell>
								  		          		</TableRow>
			      		          			 );
			      		          			}):(<TableRow>
										  		          	<TableCell colSpan="3"><font color="red">입력된 회원정보가 존재하지 않습니다. 회원가입후 이용해주세요.</font></TableCell>
								  		          		</TableRow>)}
					      		          		</TableBody>
					      		          	</Table>
	      		          				</CardBody>
	      		          			</Card> 	
	  		          		</GridItem>		
	  		          		:		
	  		          	<div>
            		  			<div style={{textAlignLast:'center'}}><PhoneIphone style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
            		  			<div style={{textAlignLast:'center'}}>
            		  				<font size="3" style={{fontWeight:'bold'}}>등록된 휴대폰 번호로 찾기</font><br/><font size="2" style={{color:'silver'}}>가입 당시 입력한 휴대폰 번호로 인증번호를 발송합니다.</font></div>
            		  			<div style={{textAlignLast:'center'}}>
            		  				<Button color="info" onClick={event=> uiChange(event,0)}  style={{marginTop:'10px',marginBottom:'15px'}}>확인</Button>
            		  			</div>
            		  			<Divider />
   
        		  				<div style={{textAlignLast:'center'}}><VerifiedUserOutlined style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
        		  				<div style={{textAlignLast:'center'}}>
        		  					<font size="3" style={{fontWeight:'bold'}}>본인명의 휴대폰으로 인증</font><br/><font size="2" style={{color:'silver'}}>회원님의 명의로 등록된 휴대폰으로 가입여부 및 본인여부를 확인합니다.</font></div>
        		  				<div style={{textAlignLast:'center'}}>
        		  					<Button color="info" onClick={Serti}  style={{marginTop:'10px',marginBottom:'15px'}}>확인</Button>
        		  				</div>
        		
	                      </div>}
                      </div>
                )
              },
              {
                tabButton: "비밀번호 찾기",
                tabContent: (
                		<div>
                		{pwFindStatus==="I"?
	      		          		<GridItem xs={12} style={{overflow:'hidden'}}>
			      		            <div style={{textAlignLast:'center'}}><PhoneIphone style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
			      		        	<div style={{textAlignLast:'center'}}>
		      		  				<font size="3" style={{fontWeight:'bold'}}>등록된 휴대폰 번호로 찾기</font><br/><font size="2" style={{color:'silver'}}>가입 당시 입력한 휴대폰 번호로 인증번호를 발송합니다.</font></div>
		      		  			<GridContainer justify="center">
		      		  			<GridItem xs={11} >
					      		          <CustomInput
				    			            labelText={
				    			              <span>
				    			              <font size="2">이름</font><small>(required)</small>
				    			              </span>
				    			            }
				    			            id="name"
				    			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN 아이디는 사용금지 아이디 입니다.":idCheck&&uid !== ""?"이미 등록된 아이디 입니다.":" "}
				    			            formControlProps={{
				    			              fullWidth: true, variant:'outlined',size:'small', error:userErr,style:{marginTop:'15px'}
				    			            }}
				    			            inputProps={{
				    			              onChange: event => change(event.target.value, "name"),
				    			              disabled:uiDisable,
				    			              labelWidth:110
				    			            }}   
				    		          	/>
				    			            <GridContainer style={{flexWrap:'unset'}}>
							        		<GridItem xs={12} sm={12} md={8}>
								        		<CustomInput
										            labelText={
										              <span>
										              	<font size="2">휴대폰 번호</font>
										              </span>
										            }
								        			id="phoneNum"
								        			helperText={phoneHelpText}
										            formControlProps={{
										              fullWidth: true,variant:'outlined',size:'small',error:phoneErr, style:{marginTop:'13px',marginBottom:'10px'}
										            }}
										            inputProps={{
										              onChange: event => change(event.target.value, "phone"),
											          disabled:uiDisable,
										              labelWidth:75,
										              //value:phoneNum
										            }}
										         />
							        		</GridItem>
							        		<GridItem xs={12} sm={12} md={'auto'}>
							        			<Button color="info" onClick={sendSmsNum}  fullWidth style={{marginTop:'12px',paddingLeft:'10px',paddingRight:'10px'}}>{buttonName}</Button>
							        		</GridItem>
							        	</GridContainer>
									     {openSmsNum?
									     <div>
									     <CustomInput
				    			            labelText={
				    			              <span>
				    			              <font size="2">인증번호</font><small>(required)</small>
				    			              </span>
				    			            }
				    			            id="name"
				    			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN 아이디는 사용금지 아이디 입니다.":idCheck&&uid !== ""?"이미 등록된 아이디 입니다.":" "}
				    			            formControlProps={{
				    			              fullWidth: true, variant:'outlined',size:'small', error:userErr,style:{marginBottom:'10px'}
				    			            }}
				    			            inputProps={{
				    			              onChange: event => change(event.target.value, "certify"),
				    			              labelWidth:110
				    			            }}
				    		          	/>
				    		          	<Clock deadline={refreshTime} setRemainTime={setRemainTime} remainTime={remainTime}/>
									     <GridContainer justify="center">
									     	<Button color="info" onClick={event => checkSmsNum(event,"PW")} >확인</Button>
				   		          			<Button color="info" onClick={cancleHandler}>취소</Button>
									     </GridContainer>
									     </div>:<div style={{textAlign:'center'}}>
				   		          			<Button color="info" onClick={cancleHandler} >취소</Button>
				   		          		</div>}
									     </GridItem>
									     </GridContainer>
	      		          		</GridItem>
	      		          	 :pwFindStatus==="S"?
	      		          	<div>
	      		          		<div style={{textAlignLast:'center'}}><LockOpenOutlined style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
		      		        	<div style={{textAlignLast:'center'}}>
	      		  				<font size="3" style={{fontWeight:'bold'}}>신규 비밀번호를 입력해 주세요.</font><br/><font size="2" style={{color:'silver'}}>비밀번호는 영문,숫자,특수문자등 2종류 이상 문자를 조합하여<br/> 최소 8~15자 입력해주세요.</font></div>
	      		  			<GridItem xs={12} sm={12}>
	      		  				<CustomInput
		    			            labelText={
		    			              <span>
		    			              <font size="2">이름</font><small>(required)</small>
		    			              </span>
		    			            }
		    			            id="name"
		    			            //helperText={uid === undefined?" ":uid.toUpperCase() === "admin".toUpperCase()?"AMDIN 아이디는 사용금지 아이디 입니다.":idCheck&&uid !== ""?"이미 등록된 아이디 입니다.":" "}
		    			            formControlProps={{
		    			              fullWidth: true, variant:'outlined',size:'small', error:userErr,style:{marginTop:'15px',marginBottom:'15px'}
		    			            }}
		    			            inputProps={{
		    			              onChange: event => change(event.target.value, "name"),
		    			              disabled:true,
		    			              labelWidth:110,
		    			              value:userName
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
	     		              fullWidth: true, variant:'outlined',size:'small',error:passwordCheck, style:{marginTop:'3px'}
	     		            }}
	     		            helperText="8자 이상의 숫자/대문자/소문자/특수문자를 포함해야 합니다."
	     		            inputProps={{
	     		              onChange: event => change(event.target.value, "password"),
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
	     		              fullWidth: true,variant:'outlined',size:'small',error:repasswordCheck, style:{marginTop:'3px'}
	     		            }}
	     		          	helperText={repasswordCheck?"비밀번호가 일치하지 않습니다.":" "}
	     		            inputProps={{
	     		              onBlur: event => change(event.target.value, "passwordConform"),
	     		              type: "password",
	     		              autoComplete: "off",
	     		              labelWidth:160
	     		            }}
	     		          /> 
	     		        </GridItem>
		     			    <div style={{textAlign:'center'}}>
	   		          			<Button color="info" onClick={updatePwHandler} >변경</Button>
	   		          			<Button color="info" onClick={cancleHandler}  >취소</Button>
	   		          		</div>
		          		</div>	
	  		          		:
	  		          	<div>		
	    		  			<div style={{textAlignLast:'center'}}><PhoneIphone style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
	    		  			<div style={{textAlignLast:'center'}}>
	    		  				<font size="3" style={{fontWeight:'bold'}}>등록된 휴대폰 번호로 찾기</font><br/><font size="2" style={{color:'silver'}}>가입 당시 입력한 휴대폰 번호로 인증번호를 발송합니다.</font></div>
	    		  			<div style={{textAlignLast:'center'}}>
	    		  				<Button color="info" onClick={event=> uiChange(event,1)}  style={{marginTop:'10px',marginBottom:'15px'}}>확인</Button>
	    		  			</div>
	    		  			<Divider />
			  				<div style={{textAlignLast:'center'}}><VerifiedUserOutlined style={{marginTop:'20px',marginBottom:'10px',width:'64px',height:'64px'}}/></div>
			  				<div style={{textAlignLast:'center'}}>
			  					<font size="3" style={{fontWeight:'bold'}}>본인명의 휴대폰으로 인증</font><br/><font size="2" style={{color:'silver'}}>회원님의 명의로 등록된 휴대폰으로 가입여부 및 본인여부를 확인합니다.</font></div>
			  				<div style={{textAlignLast:'center'}}>
			  					<Button color="info" onClick={SertiPw}  style={{marginTop:'10px',marginBottom:'15px'}}>확인</Button>
			  				</div>
		  				</div>}
                  </div>
                )
              }
            ]}
          />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>

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

//))

//export default FindInfoPage;
	
						class Clock extends React.Component {
				    			            	  state = {
				    			            		minutes: 0,
				    			            		seconds: 0,
				    			            		initTime:this.props.deadline
				    			            	  };

				    			         /*   	componentWillMount() {
				    			            	  this.getTimeUntil(this.props.deadline);
				    			            	}*/
				    			            	componentDidMount() {
				    			            		this.timerID = setInterval(() => this.getTimeUntil(this.props.deadline), 1000);
				    			            	}

				    			            	componentWillUnmount() {
				    			                  clearInterval(this.timerID);
				    			            	}

				    			             /*	componentDidUpdate(prevProps) {
				    			             		console.log("|||------------>3");
				    			            		if(prevProps.deadline != this.props.deadline) {
				    			            			console.log("|||------------>3-1");
				    			            			this.setState({ initTime:this.props.deadline});
				    			            		}
				    			            	}*/

				    			            	leading0(num) {
				    			            	  return num < 10 ? "0" + num : num;
				    			            	}
				    			            	getTimeUntil(deadline) {
			
				    			            	  let time = this.state.initTime;
				    			            	  if(this.props.remainTime == "reset") {
				    			            		this.props.setRemainTime(0);
				    			            		time = this.props.deadline;
				    			            	  }

				    			            	  console.log("카운트다운!!!" + time);
				    			            	  
				    			            	  if (time < 0) {
				    			            		this.setState({ minutes: 0, seconds: 0 });
				    			            		if(this.props.deadline != 0) this.props.setRemainTime(-1000);
				    			            		this.setState({initTime:this.props.deadline});
				    			            		clearInterval(this.timerID);
				    			            	  } else {
				    			            		const seconds = Math.floor((time / 1000) % 60);
				    			            		const minutes = Math.floor((time / 1000 / 60) % 60);
				    			            		this.setState({ minutes, seconds, initTime:time - 1000});
				    			            		
				    			            	  }
				    			            	}
				    			            	render() {
				    			            	  return (
				    			            		  <div style={{color:'red'}}> 
				    			            			남은시간 : {this.leading0(this.state.minutes)}:{this.leading0(this.state.seconds)}
				    			            		  </div>
				    			            	  );
				    			            	}
				    			              }

class Timer extends React.Component {
	state = {
			  minutes:this.props.minSet,
			  seconds:0,
		};
	  
	componentDidMount() {
		  this.myInterval = setInterval(() => {
			  const {seconds,minutes} = this.state;
			  
		  if(seconds > 0) {
			  this.setState(({seconds}) => ({
				  seconds:seconds-1
				  }))
		   }
		  
		  if(seconds === 0 ) {
			  if(minutes === 0 ){
				  clearInterval(this.myInterval);
			   } else {
				   this.setState(({minutes}) => ({
					   minutes:minutes -1,
					   seconds:59
				    }))
			   }
		    }
		},1000)
	  }
	  
	  componetWillUnmount() {
		  clearInterval(this.myInterval);
	   }
	  
	  
	  
	  render() {
		  const {minutes, seconds } = this.state;
		  const {sendSmsNum } = this.props;
		  function reset() {
			  sendSmsNum();
		  }
		  
	  return (
		<div style={{margin:'0'}}>
			{minutes === 0 && seconds === 0 ?
					<h5>00:00{reset()}</h5>
			:<h5>{minutes}:{seconds < 10 ? `0${seconds}` : seconds} </h5>
			}
		</div>
	  )
	  }
}

