import React,{useEffect,useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardAvatar from "components/Card/CardAvatar.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Divider from '@material-ui/core/Divider';
// import avatar from "assets/img/faces/marc.jpg";
import klnet from "assets/img/logo.png";
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import Select from '@material-ui/core/Select';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import {userService} from 'views/Pages/Login/Service/Service.js';

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const useStyles = makeStyles(styles);

export default function UserProfile(props) {
	
//console.log("props:",props);
  const {store} = props;
  const classes = useStyles();
  const [svcType,setSvcType] = useState("E");
  const [insertDate,setInserDate] = useState("");
  const [userName,setUserName] = useState(""); // eslint-disable-line no-unused-vars
  const [userEmail,setUserEmail] = useState(""); // eslint-disable-line no-unused-vars
  const [userPhone,setUserPhone] = useState(""); // eslint-disable-line no-unused-vars
  const [loginDate,setLoginDate] = useState(""); // eslint-disable-line no-unused-vars
  const [socialUse,setSocialUse] = useState(false);
  const [linkStatus,setLinkStatus] = useState("연계 일자");
  const [socialLinkDate,setSocialLinkDate] = useState("");
  
  const [kakao,setKakao] = useState("");
  const [naver,setNaver] = useState("");
  const [facebook,setFacebook] = useState("");
  const [google,setGoogle] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [userNo, setUserNo] = useState("");
  const [userId, setUserId] = useState("");
  useEffect(() => {
	   // console.log('useEffect 호출....');
	    const token = userService.GetItem()?userService.GetItem().token:null;
	    if(token) {
		    axios.post("/com/getUserInfo",{},{headers:{'Authorization':'Bearer '+token}})
		    .then(res => {
		    	setSvcType(res.data[0].user_type);
		    	setInserDate(res.data[0].insert_date);
		    	setUserName(res.data[0].user_name?res.data[0].user_name:"");
		    	setUserPhone(res.data[0].user_phone?res.data[0].user_phone:"");
		    	setUserEmail(res.data[0].user_email?res.data[0].user_email:"");
		    	setSocialUse(res.data[0].social_link_yn === "Y"?true:false);
		    	setSocialLinkDate(res.data[0].social_link_date?res.data[0].social_link_date:"");
		    	setKakao(res.data[0].kakao_id?res.data[0].kakao_id:"");
		    	setNaver(res.data[0].naver_id?res.data[0].naver_id:"");
		    	setFacebook(res.data[0].face_id?res.data[0].face_id:"");
				setGoogle(res.data[0].google_id?res.data[0].google_id:"");
				setUserNo(res.data[0].user_no?res.data[0].user_no:"");
				setUserId(res.data[0].local_id?res.data[0].local_id:"");
				setApiKey(res.data[0].api_service_key?res.data[0].api_service_key:"");
		    })
		    //.then(res => console.log(">>>>>>>>>>>>>>>>>>>>>>>>",JSON.stringify(res.data[0])))
		    .catch(err => {
			    alert(err);
			    });
	    } else {
	    	props.history.push("/");
	    }
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);  //  ==> }, [pageData]); 
  
  function SelectBox() {
	  
	  return (
			    <FormControl  fullWidth style={{marginTop:'11px'}}>
			        <InputLabel id = "svctype">사용자구분</InputLabel>
			        <Select
			          native
			          id = "svctype"
			          value={svcType}
			          onChange={(event) => setSvcType(event.target.value)}
			        >
				        <option value="S">선사</option>
				        <option value="F">포워더</option>
				        <option value="O">화주</option>
				        <option value="A">관리자</option>
				        <option value="E">기타</option>
			        </Select>
			    </FormControl>
			  );
  }
  
  const handleLink=(event)=>{
	  if(socialUse) {
		  setSocialUse(false);
		  setLinkStatus("연계 해제 일자");
	  } else {
		  setSocialUse(true);
		  setLinkStatus("연계 일자"); 
	  }
  }
  const onCreateApikey = () => {
	const token = userService.GetItem()?userService.GetItem().token:null;
	if(token) {
		axios.post('/com/duplicateCheck',{user:{id:userId, no:userNo}},{headers:{'Authorization':'Bearer '+token}}).then(
			res => {
				if(res.data[0].api_service_key == null) {
					axios.post('/com/createApikey',{user:{id:userId, no:userNo, apiKey:apiKey}},{headers:{'Authorization':'Bearer '+token}}).then(
						res => {
							if(res.statusText === "OK") {
								setApiKey(res.data);
							}else {
								alert('키 생성중 오류가 발생했습니다.');
							}
						}
					)
				}else {
					alert('이미 등록된 키 정보가 있습니다. API KEY : '+res.data[0].api_service_key)
				}
			}
		)
	} else {
		props.openLogin();
	}
	

	
  }
  const onSubmit = () => {
	  alert("서비스 준비중입니다.");
  }
    
  return (
    <div>
      <GridContainer>
        <GridItem xs={12} sm={12} md={8}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>

            <GridContainer>
                <GridItem xs={12} sm={12} md={3}>
	                <SelectBox />
              </GridItem>
            <GridItem xs={12} sm={12} md={6}>
              <CustomInput
                labelText="가입일자"
                id="savedate"
                formControlProps={{
                  fullWidth: true,
                }}
               labelProps={{id:"savedate"}}
                inputProps={{
                    value:insertDate,
                    disabled: false,
                  }}
              />
            </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={5}>
                  <CustomInput
                    labelText="이름"
                    id="name"
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'7px'}
                    }}
                  	labelProps={{
	            		style:{top:'-10px'},
	            	}}
                    inputProps={{
                      value:userName,
                      onChange:({target:{value} }) => setUserName(value)
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="연락처"
                    id="phone"	
                    formControlProps={{
                      fullWidth: true,style:{paddingTop:'7px'}
                    }}
                  	labelProps={{
	            		style:{top:'-10px'},
	            	}}
                  	inputProps={{
                      value:userPhone,
                      onChange:({target:{value} }) => setUserPhone(value)
                    }}
                  />
                </GridItem>
                </GridContainer>
                <GridContainer>
	                <GridItem xs={12} sm={12} md={6}>
	                  <CustomInput
	                    labelText="Email address"
	                    id="email"
	                    formControlProps={{
	                      fullWidth: true,style:{paddingTop:'7px'}
		                }}
		                labelProps={{style:{top:'-10px'}}}
	                    inputProps={{value:userEmail,onChange:({target:{value} }) => setUserEmail(value)}}
	                  />
	                </GridItem>
                </GridContainer> 
				<GridContainer>
                	<GridItem xs={12} sm={2} md={2}>
						<span>API KEY : </span>
					</GridItem>
					<GridItem xs={12} sm={6} md={6}>
						<span>{apiKey}</span>
					</GridItem>
					<GridItem xs={12} sm={4} md={4}>
						{apiKey !== ""?null:
						<Button
							onClick={() => onCreateApikey()}
						>KEY 발급</Button>
						}
						
					</GridItem>
              	</GridContainer>
	            <GridContainer>
			         <GridItem xs={12} sm={12} md={4}>
			         	<div>
				        <Switch
				        	checked={socialUse}
				    		onChange={(event) => handleLink(event)}
				        	inputProps={{'aia-label':'checkbox'}}
				    	/>소셜연계여부
				    	</div>
			         </GridItem>
				        <GridItem xs={12} sm={8} md={8}>
				     	<CustomInput
			            	labelText={linkStatus}
			            	id="linkdate"
			            	labelProps={{
			            		style:{top:'-7px'},
			            	}}
			            	formControlProps={{
			            		style:{paddingTop:'10px'},
			            		disabled: true,
			            		fullWidth: true,
			            	}}
				     		inputProps={{value:socialLinkDate}}
						    />
				      </GridItem>
				</GridContainer>
				{socialUse && (kakao||naver||facebook||google)?
				<Card style={{paddingTop:'25px',marginTop:'0',paddingLeft:'10px',paddingRight:'10px',marginBottom:'0'}}>
				{kakao?
		        <GridContainer>
			        <GridItem xs={12} sm={12} md={4}>
				    	<CustomInput
				    		labelText="Social Name"
				    		id="kakao"
				    		formControlProps={{
			            	     style:{paddingTop:'0'},
			            	     fullWidth: true,
				    		}}
					    	labelProps={{
			            		style:{top:'-17px'},
			            	}}
				    		inputProps={{disabled: true,value:"KAKAO"}}
				    	/>
				     </GridItem>
					 <GridItem xs={12} sm={8} md={8}>
				     	<CustomInput
			            	labelText="KAKAO 접속 일자"
			            	id="socaildate"
			            	labelProps={{
				            	style:{top:'-17px'},
				            }}
			            	formControlProps={{
			            		style:{paddingTop:'0'},
			            		fullWidth: true,
			            	}}
				     	    inputProps={{disabled: true,value:kakao}}
						    />
				      </GridItem>
				 </GridContainer>:null}
				{naver?
				        <GridContainer>
					        <GridItem xs={12} sm={12} md={4}>
						    	<CustomInput
						    		labelText="Social Name"
						    		id="naver"
						    		formControlProps={{
					            	     style:{paddingTop:'0'},
					            	     fullWidth: true,
						    		}}
							    	labelProps={{
					            		style:{top:'-17px'},
					            	}}
						    		inputProps={{disabled: true,value:"NAVER"}}
						    	/>
						     </GridItem>
							 <GridItem xs={12} sm={8} md={8}>
						     	<CustomInput
					            	labelText="NAVER 접속 일자"
					            	id="socaildate2"
					            	labelProps={{
						            	style:{top:'-17px'},
						            }}
					            	formControlProps={{
					            		style:{paddingTop:'0'},
					            		fullWidth: true,
					            	}}
						     	    inputProps={{disabled: true,value:naver}}
								    />
						      </GridItem>
						 </GridContainer>:null}
				{facebook?
				        <GridContainer>
					        <GridItem xs={12} sm={12} md={4}>
						    	<CustomInput
						    		labelText="Social Name"
						    		id="facebook"
						    		formControlProps={{
					            	     style:{paddingTop:'0'},
					            	     fullWidth: true,
						    		}}
							    	labelProps={{
					            		style:{top:'-17px'},
					            	}}
						    		inputProps={{disabled: true,value:"FACEBOOK"}}
						    	/>
						     </GridItem>
							 <GridItem xs={12} sm={8} md={8}>
						     	<CustomInput
					            	labelText="FACEBOOK 접속 일자"
					            	id="socaildate3"
					            	labelProps={{
						            	style:{top:'-17px'},
						            }}
					            	formControlProps={{
					            		style:{paddingTop:'0'},
					            		fullWidth: true,
					            	}}
						     	    inputProps={{disabled: true,value:facebook}}
								    />
						      </GridItem>
						 </GridContainer>:null}
				{google?
				        <GridContainer>
					        <GridItem xs={12} sm={12} md={4}>
						    	<CustomInput
						    		labelText="Social Name"
						    		id="google"
						    		formControlProps={{
					            	     style:{paddingTop:'0'},
					            	     fullWidth: true,
						    		}}
							    	labelProps={{
					            		style:{top:'-17px'},
					            	}}
						    		inputProps={{disabled: true,value:"GOOGLE"}}
						    	/>
						     </GridItem>
							 <GridItem xs={12} sm={8} md={8}>
						     	<CustomInput
					            	labelText="GOOGLE 접속 일자"
					            	id="socaildate4"
					            	labelProps={{
						            	style:{top:'-17px'},
						            }}
					            	formControlProps={{
					            		style:{paddingTop:'0'},
					            		fullWidth: true,
					            	}}
						     	    inputProps={{disabled: true,value:google}}
								    />
						      </GridItem>
						 </GridContainer>:null}
				</Card>:null}
            </CardBody>
            <CardFooter>
              <Button color="primary" onClick={onSubmit}>Update Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={12} md={4}>
          <Card profile>
            <CardAvatar>
              <a href="#pablo" onClick={e => e.preventDefault()}>
                <img src={klnet} alt="..." />
              </a>
            </CardAvatar>
            <CardBody profile>
              <h6 className={classes.cardCategory}>CEO / CO-FOUNDER</h6>
              <h4 className={classes.cardTitle}>KL-NET</h4>
              <p className={classes.description}>
                Don{"'"}t be scared of the truth because we need to restart the
                human foundation in truth And I love you like Kanye loves Kanye
                I love Rick Owens’ bed design but the back is...
              </p>
              <Button color="primary" round>
                Follow
              </Button>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
