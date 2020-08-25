import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import {TextField, Table, TableHead, TableRow, TableBody, TableCell, TableFooter, Tooltip, Paper, Grid, Icon} from '@material-ui/core';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/TablePaging.js";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import CardIcon from "components/Card/CardIcon.js";


const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding:'15px',
    width: '100%',
    height: '80vh',
    marginBottom: theme.spacing(2),
    overflow:'scroll'
  },gridContainer: {
    padding:'15px'
  }
}))



export default function UserList(props) {
  const classes = styles();
  const {store} = props;
  //const [carrierCode,setCarrierCode] = useState("");
  const [userno,setUserno] = useState("");
  const [Num,setNum] = useState(1);
  const [excelSchLogData,setExcelSchLogData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [openJoin,setOpenJoin] = useState(false);
  
  
  
  const onSubmit = (param) => {
            setNum(1);

            axios.post("/com/getUserData",{
                userno:userno,
                num:param
            },{headers:{'Authorization':'Bearer '+store.token}})
            .then(res => {setUserData(res.data);console.log(res.data)})
            .catch(err => {
                if(err.response.status === 403 || err.response.status === 401) {
                    setOpenJoin(true);
                }
            });
        

  }
  const onMore = (param) => {
    if(Num != userData[0].tot_page) {
        //page ++
        setNum(param);

        axios.post("/com/getUserData",{
            userno:userno,
            num:param
        },{headers:{'Authorization':'Bearer '+store.token}})
        .then(res => setUserData([...userData,...res.data]))
        .catch(err => {
            if(err.response.status === 403 || err.response.status === 401) {
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


  
  return (
    <div>
    <GridContainer className={classes.gridContainer}>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'54px'}}>content_copy</Icon>
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
							<Button color="info" onClick = {() => onSubmit(1)}  
							fullWidth>Search</Button>							
						</Grid>
		      		</Grid>
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
        <Paper className={classes.paper}>
              <Table>
                  <TableHead style={{padding:'5px'}}>
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
                                <TableRow key={element.user_no}>    
                                    <TableCell>{element.user_no}</TableCell>
                                    <TableCell>{element.user_type}</TableCell>
                                    <TableCell>{element.local_id}</TableCell>
                                    <TableCell>{element.user_email}</TableCell>
                                    <TableCell><Tooltip title={element.local_pw} arrow><span>{element.local_pw!=null?element.local_pw.slice(0,7)+'....':element.local_pw}</span></Tooltip></TableCell>
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
                        <TableCell style={{paddingLeft: '20px',paddingTop:'0',paddingBottom:'0'}} colSpan={34}>
                            <Button
                                color="info"
                                onClick={() => onMore(Num + 1)}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{userData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
              
	      	  
    </Paper>
    </div>
  );
}



