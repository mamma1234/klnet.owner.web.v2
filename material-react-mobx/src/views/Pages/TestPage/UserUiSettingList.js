import React,{ useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import {TextField,Snackbar} from '@material-ui/core';
import {Alert} from '@material-ui/lab';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import TableContainer from "@material-ui/core/TableContainer";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import Grid from '@material-ui/core/Grid';
import CustomTabs from "components/CustomTabs/CustomTabs2.js";
//import ImpTable from "components/Table/TablePaging.js";
//import ExpTable from "components/Table/TablePaging.js";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableFooter from "@material-ui/core/TableFooter";
import Assignment from "@material-ui/icons/Assignment";

import tablestyles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";

let numCnt =1;

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
	container: {
				maxHeight:590,
			}
};

const useStyles = makeStyles(styles);

const tableStyles = makeStyles(tablestyles);

export default function ScheduleList(props) {

  const {store} = props;

  //const [carrierCode,setCarrierCode] = useState("");
  const [uid,setUid] = useState("");
  const [tapNum,setTapNum] = useState(0);
  const [settingData,setSettingData] = useState([]);
  const [totCnt,setTotCnt] = useState(0);
  const [severity, setSeverity] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  //const [openJoin,setOpenJoin] = useState(false);
  
  
	function AlertComponent(props) {
		return <Alert elevation={6} variant="filled" {...props} />;
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
  
  const handleTapsClick = (e) => {
	  setTapNum(e);
	  if(uid) {
		  onSubmit(); 
	  }
  }
  
  const onSubmit = () => {
	  
	  if(store.token) { 
		  if(tapNum===0) {
			  numCnt=1;
			  axios.post("/com/getUserSettingSample",{id:uid,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
				.then(setSettingData([]))
			    .then(res => {console.log(res.data);setSettingData(res.data);})
			    .catch(err => {
					console.log("error");
					setTotCnt(0);
					alertMessage('조회된 데이터가 존재 하지 않습니다.','error');
					setSettingData([]);	
			    });

		  } else {	
			  numCnt=1;
		    /*  axios.post("/com/getExpFlowSample",{cntrNo:cntrNo,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
					.then(setExportData([]))
					.then(res => setExportData(res.data))
					.catch(err => {
						if(err.response.status === 403) {
					       	//setOpenJoin(true);
					    }
					});*/

		  }
	  }
  }
  
  const onSubmitAdd = () => {
	  
	  if(store.token) {
		  
			  if(tapNum===0) {
				  if(numCnt != settingData[0].tot_page) {
					  numCnt=numCnt+1; 
					  axios.post("/com/getUserSettingSample",{id:uid,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
					    .then(res => setSettingData([...settingData,...res.data]) )
					    .catch(err => {
					        if(err.response.status === 403) {
					        	//setOpenJoin(true);
					        }
					    });
				  }
		
			  } else {	
				 /* if(numCnt != exportData[0].tot_page) {
				  numCnt=numCnt+1; 			  
			      axios.post("/com/getExpFlowSample",{cntrNo:cntrNo,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
						.then(res => setExportData([...exportData,...res.data]))
						.catch(err => {
							if(err.response.status === 403) {
						       	//setOpenJoin(true);
						    }
						});
				  }*/
			  }
	
	  }
  }
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
  			<CardHeader color="info" icon style={{height:'10px'}}>
			<CardIcon color="info" style={{padding:'0'}}>
				<Assignment />
			</CardIcon>
			<h4 className={classes.cardTitleBlack}>Search To UI-Setting Info </h4>			
		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} sm={9} md={4}>
			     			<TextField id="userid" label="User ID." onChange={event => setUid(event.target.value)} value={uid} fullWidth />
			     		</Grid>	
			     		<Grid item xs={12} sm={9} md={6}></Grid>
						<Grid item xs={12} sm={12} md={2} >
							<Button color="info" onClick = {onSubmit}  
							fullWidth>Search</Button>							
						</Grid>
		      		</Grid>
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12}>
	      <CustomTabs headerColor="info"
	    	  handleTapsClick={handleTapsClick}
	          tabs={[
	          {
	              tabName: "Tracking"
	              //,tabIcon: Face
	              ,tabContent: (
	                  <TrackingTable
	                      tableHeaderColor="info"
	                      tableData={settingData}
	                      onClickHandle = {onSubmitAdd}
	                  	  tableRownum={numCnt}
	                  />
	              )
	          }          
	          ,{
	              tabName: "Demdet"
	              //,tabIcon: Face
	              ,tabContent: (
	                  <div>
	                  	<h5> 서비스 준비중입니다.</h5>
	                  </div>
	              )
	          }]}>     
      </CustomTabs>
		</GridItem>
		<Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
		<AlertComponent 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}
		</AlertComponent>
	</Snackbar>
    </GridContainer>
  );
}



function TrackingTable(props) {

	  const classes = tableStyles();
	  const classes2 = useStyles();
	  
	  const { tableData, tableHeaderColor, tableRownum } = props;

	  const handleAddFunction = () => {
	    props.onClickHandle();
	  }

	  return (
	    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
	    <TableContainer className={classes2.container} style={{overflow:'auto'}}>
	    	<Table stickyHeader className={classes.table}>
	          <TableHead style={{padding:'5px'}}>
	            <TableRow  style={{borderBottomStyle:'solid',borderBottomColor:'#00acc1'}}>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >USER_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >SERVICE_GB</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL<br/>POD</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >ETA<br/>ETD</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_ETA_YN<br/>NOTICE_ETA</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_ETD_YN<br/>NOTICE_ETD</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_DET_YN<br/>NOTICE_DET</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_DEM_YN<br/>NOTICE_DEM</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CUSTOM_YN<br/>INSPECT_YN</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_EMAIL_YN<br/>NOTICE_EMAIL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_PHONE_YN<br/>NOTICE_PHONE</TableCell>
	            </TableRow>
	          </TableHead>
	        <TableBody>
	           {
	              tableData.map((prop, key) => {
	                  return (
		          	            <TableRow key={key}>
			  	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.user_no}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.service_gb}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.pol}<br/>{prop.pod}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.eta}<br/>{prop.etd}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_eta_yn}<br/>{prop.notice_eta}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_etd_yn}<br/>{prop.notice_etd}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_det_yn}<br/>{prop.notice_det}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_dem_yn}<br/>{prop.notice_dem}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.manage_yn}<br/>{prop.inspect_yn}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_email_yn}<br/>{prop.notice_email}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_phone_yn}<br/>{prop.notice_phone}</TableCell>
					  	            </TableRow>     
	                  );
	                })
	           }
	           
	        </TableBody>
	        {(tableData.length >= 10 ?
	        <TableFooter >
	        	<TableRow  >
	        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
	        		<Button
					    color="info"
						onClick={handleAddFunction}
	        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
					>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData[0].TOT_PAGE}&nbsp;)</Button>
			    </TableCell>
	        	</TableRow>
	        </TableFooter>: null )}
	      </Table>
	      </TableContainer>
	    </div>
	  );
	}


function DemdetTable(props) {

	  const classes = tableStyles();
	  const classes2 = useStyles();
	  const { tableData, tableHeaderColor, tableRownum } = props;

	  const handleAddFunction = () => {
	    props.onClickHandle();
	  }

	  return (
			    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
			    <TableContainer className={classes2.container} style={{overflow:'auto'}}>
			    	<Table stickyHeader className={classes.table}>
			          <TableHead style={{padding:'5px'}}>
			            <TableRow  style={{borderBottomStyle:'solid',borderBottomColor:'#00acc1'}}>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >USER_NO</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >SERVICE_GB</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL<br/>POD</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >ETA<br/>ETD</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_ETA_YN<br/>NOTICE_ETA</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_ETD_YN<br/>NOTICE_ETD</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_DET_YN<br/>NOTICE_DET</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_DEM_YN<br/>NOTICE_DEM</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CUSTOM_YN<br/>INSPECT_YN</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_EMAIL_YN<br/>NOTICE_EMAIL</TableCell>
			                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >NOTICE_PHONE_YN<br/>NOTICE_PHONE</TableCell>
			            </TableRow>
			          </TableHead>
			        <TableBody>
			           {
			              tableData.map((prop, key) => {
			                  return (
			          	            <TableRow key={key}>
			  	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.USER_NO}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.setting_gb}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.pol}<br/>{prop.pod}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.eta}<br/>{prop.etd}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_eta_yn}<br/>{prop.notice_eta}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_etd_yn}<br/>{prop.notice_etd}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_det_yn}<br/>{prop.notice_det}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_dem_yn}<br/>{prop.notice_dem}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.manage_yn}<br/>{prop.inspect_yn}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_email_yn}<br/>{prop.notice_email}</TableCell>
				                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >{prop.notice_phone_yn}<br/>{prop.notice_phone}</TableCell>
					  	            </TableRow>      
			                  );
			                })
			           }
			           
			        </TableBody>
			        {(tableData.length >= 10 ?
			        <TableFooter >
			        	<TableRow  >
			        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
			        		<Button
							    color="info"
								onClick={handleAddFunction}
			        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
							>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData[0].TOT_PAGE}&nbsp;)</Button>
					    </TableCell>
			        	</TableRow>
			        </TableFooter>: null )}
			      </Table>
			      </TableContainer>
			    </div>
	  );
	}