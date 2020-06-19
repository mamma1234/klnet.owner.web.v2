import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/TablePaging.js";
import { Tooltip } from "@material-ui/core";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import Grid from '@material-ui/core/Grid';
import CustomTabs from "components/CustomTabs/CustomTabs2.js";
import ExcelSchLogTable from "components/Table/TablePaging.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "300",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
    },
    divStyle: {
      overflowX: "auto",
      overflowY: "scroll"
    }
};

const useStyles = makeStyles(styles);




export default function UserList(props) {

  const {store} = props;
  console.log(">>>>admin:",store);
  //const [carrierCode,setCarrierCode] = useState("");
  const [userno,setUserno] = useState("");
  const [Num,setNum] = useState(1);
  const [excelSchLogData,setExcelSchLogData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openJoin,setOpenJoin] = useState(false);
  
  
  
  const onSubmit = () => {
            setNum(1);

            axios.post("/com/getUserData",{
                userno:userno,
                num:Num
            },{headers:{'Authorization':'Bearer '+store.token}})
            .then(res => {setUserData(res.data);console.log(res.data)})
            .catch(err => {
                if(err.response.status == "403" || err.response.status == "401") {
                    setOpenJoin(true);
                }
            });
        

  }
  const onMore = () => {
    if(Num != userData[0].tot_page) {
        //page ++
        setNum(Num+1);

        axios.post("/com/getUserData",{
            userno:userno,
            num:Num
        },{headers:{'Authorization':'Bearer '+store.token}})
        .then(res => setUserData([...userData,...res.data]))
        .catch(err => {
            if(err.response.status == "403" || err.response.status == "401") {
                setOpenJoin(true);
            }
        });
    }

  }
  // const customData = (param) => {
	// 	setSearchCount(res.length);
	// 	let customData = [];
	// 	param.map((prop,index) => {
	// 		customData.push({
  //       user_no:prop.user_no,
  //       user_type:prop.user_type,
  //       user_id:prop.user_id,
  //       user_email:prop.user_email,
  //       user_pw:prop.user_pw,
  //       insert_date:prop.insert_date,
  //       user_phone:prop.user_phone,
  //       user_name:prop.user_name,
  //       svc_use_yn:prop.svc_use_yn,
  //       del_yn:prop.del_yn,
  //       social_name: prop.social_name,
  //       kakao_access_token:prop.kakao_access_token,
  //       svc_login_date:prop.svc_login_date,
  //       social_link_yn:prop.social_link_yn,
  //       social_link_date:prop.social_link_date,
  //       pwd_modify_date:prop.pwd_modify_date,
  //       pwd_fail_cnt:prop.pwd_fail_cnt,
  //       last_ip_addr:prop.last_ip_addr,
  //       pc_cnt:prop.pc_cnt,
  //       mobile_cnt:prop.mobile_cnt,
  //       user_company:prop.user_company,
  //       token_local:prop.token_local,
  //       local_login_date:prop.local_login_date,
  //       kakao_id:prop.kakao_id,
  //       token_kakao:prop.token_kakao,
  //       kakao_login_date:prop.kakao_login_date,
  //       naver_id:prop.naver_id,
  //       token_naver:prop.token_naver,
  //       naver_login_date:prop.naver_login_date,
  //       face_id:prop.face_id,
  //       token_face:prop.token_face,
  //       face_login_date:prop.face_login_date,
  //       google_id:prop.google_id,
  //       token_google:prop.token_google,
  //       google_login_date:prop.google_login_date,
  //       })
	// 	});
	// 	setUserData(customData);
  // }


  const classes = useStyles();
  
  return (
    <div className={classes.divStyle}>
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>User Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
			     		
						 <Grid item xs={12} md={3}>
						 <TextField id="userno" label="User no" onChange={event => setUserno(event.target.value)} value={userno} fullWidth />
						 </Grid>
						<Grid item xs={12} md={3} >
							<Button color="info" onClick = {onSubmit}  
							fullWidth>Search</Button>							
						</Grid>
		      		</Grid>
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12}>
      	<Card style={{marginBottom:'0px'}}>
      		<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
              <Table className={classes.table}>
                  <TableHead className={classes.table} style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>User no</TableCell>
                        <TableCell>User type</TableCell>
                        <TableCell>User id</TableCell>
                        <TableCell>User Email</TableCell>
                        <TableCell>User pw</TableCell>
                        <TableCell>Insert Date</TableCell>
                        <TableCell>User Phone</TableCell>
                        <TableCell>User Name</TableCell>
                        <TableCell>Svc Use yn</TableCell>
                        <TableCell>Del yn</TableCell>
                        <TableCell>Social name</TableCell>
                        <TableCell>kakao access token</TableCell>
                        <TableCell>svc login date</TableCell>
                        <TableCell>social link yn</TableCell>
                        <TableCell>social link date</TableCell>
                        <TableCell>pwd modify date</TableCell>
                        <TableCell>pwd fail cnt</TableCell>
                        <TableCell>last ip addr</TableCell>
                        <TableCell>pc cnt</TableCell>
                        <TableCell>mobile cnt</TableCell>
                        <TableCell>user company</TableCell>
                        <TableCell>token local</TableCell>
                        <TableCell>local login date</TableCell>
                        <TableCell>kakao id</TableCell>
                        <TableCell>token kakao</TableCell>
                        <TableCell>kakao login date</TableCell>
                        <TableCell>naver id</TableCell>
                        <TableCell>token naver</TableCell>
                        <TableCell>naver login date</TableCell>
                        <TableCell>face id</TableCell>
                        <TableCell>token face</TableCell>
                        <TableCell>face login date</TableCell>
                        <TableCell>google id</TableCell>
                        <TableCell>token google</TableCell>
                        <TableCell>google login date</TableCell>
                      </TableRow>               
                  </TableHead>

                  <TableBody>
                      {
                          userData.map((element,key) => {
                              return(
                                <TableRow>    
                                    <TableCell>{element.user_no}</TableCell>
                                    <TableCell>{element.user_type}</TableCell>
                                    <TableCell>{element.local_id}</TableCell>
                                    <TableCell>{element.user_email}</TableCell>
                              <TableCell><Tooltip title={element.user_pw} arrow><span>{element.user_pw!=null?element.user_pw.slice(0,7)+'....':element.user_pw}</span></Tooltip></TableCell>
                                    <TableCell>{element.insert_date}</TableCell>
                                    <TableCell>{element.user_phone}</TableCell>
                                    <TableCell>{element.user_name}</TableCell>
                                    <TableCell>{element.svc_use_yn}</TableCell>
                                    <TableCell>{element.del_yn}</TableCell>
                                    <TableCell>{element.social_name}</TableCell>
                                    <TableCell>{element.kakao_access_token}</TableCell>
                                    <TableCell>{element.svc_login_date}</TableCell>
                                    <TableCell>{element.social_link_yn}</TableCell>
                                    <TableCell>{element.social_link_date}</TableCell>
                                    <TableCell>{element.pwd_modify_date}</TableCell>
                                    <TableCell>{element.pwd_fail_cnt}</TableCell>
                                    <TableCell>{element.last_ip_addr}</TableCell>
                                    <TableCell>{element.pc_cnt}</TableCell>
                                    <TableCell>{element.mobile_cnt}</TableCell>
                                    <TableCell>{element.user_company}</TableCell>
                                    <TableCell>{element.token_local}</TableCell>
                                    <TableCell>{element.local_login_date}</TableCell>
                                    <TableCell>{element.kakao_id}</TableCell>
                                    <TableCell>{element.token_kakao}</TableCell>
                                    <TableCell>{element.kakao_login_date}</TableCell>
                                    <TableCell>{element.naver_id}</TableCell>
                                    <TableCell>{element.token_naver}</TableCell>
                                    <TableCell>{element.naver_login_date}</TableCell>
                                    <TableCell>{element.face_id}</TableCell>
                                    <TableCell>{element.token_face}</TableCell>
                                    <TableCell>{element.face_login_date}</TableCell>
                                    <TableCell>{element.google_id}</TableCell>
                                    <TableCell>{element.token_google}</TableCell>
                                    <TableCell>{element.google_login_date}</TableCell>

                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                       userData.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                            <Button
                                color="info"
                                onClick={onMore}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{userData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
              
	      	 </CardBody>
        </Card>
		</GridItem>     
    </GridContainer>
    </div>
  );
}



