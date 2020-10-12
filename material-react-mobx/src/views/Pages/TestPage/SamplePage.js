import React,{ useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";


import TextField from '@material-ui/core/TextField';

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
import {CircularProgress,Table,TableRow,TableHead,TableBody,TableCell,TableFooter} from "@material-ui/core";

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
  const [cntrNo,setCntrNo] = useState("");
  const [tapNum,setTapNum] = useState(0);
  const [importData,setImportData] = useState([]);
  const [exportData,setExportData] = useState([]);
  //const [openJoin,setOpenJoin] = useState(false);
  
  
  const handleTapsClick = (e) => {
	  setTapNum(e);
	  if(cntrNo) {
		  onSubmit(); 
	  }
  }
  
  const onSubmit = () => {
	  
	  if(store.token) { 
		  if(tapNum===0) {
			  numCnt=1;
			  axios.post("/com/getImpFlowSample",{cntrNo:cntrNo,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
				.then(setImportData([]))
			    .then(res => setImportData(res.data))
			    .catch(err => {
			        if(err.response.status === 403) {
			        	//setOpenJoin(true);
			        }
			    });

		  } else {	
			  numCnt=1;
		      axios.post("/com/getExpFlowSample",{cntrNo:cntrNo,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
					.then(setExportData([]))
					.then(res => setExportData(res.data))
					.catch(err => {
						if(err.response.status === 403) {
					       	//setOpenJoin(true);
					    }
					});

		  }
	  }
  }
  
  const onSubmitAdd = () => {
	  
	  if(store.token) {
		  
			  if(tapNum===0) {
				  if(numCnt != importData[0].tot_page) {
					  numCnt=numCnt+1; 
					  axios.post("/com/getImpFlowSample",{cntrNo:cntrNo,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
					    .then(res => setImportData([...importData,...res.data]) )
					    .catch(err => {
					        if(err.response.status === 403) {
					        	//setOpenJoin(true);
					        }
					    });
				  }
		
			  } else {	
				  if(numCnt != exportData[0].tot_page) {
				  numCnt=numCnt+1; 			  
			      axios.post("/com/getExpFlowSample",{cntrNo:cntrNo,num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
						.then(res => setExportData([...exportData,...res.data]))
						.catch(err => {
							if(err.response.status === 403) {
						       	//setOpenJoin(true);
						    }
						});
				  }
			  }
	
	  }
  }
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} sm={9} md={4}>
			     			<TextField id="cntrNo" label="Container No." onChange={event => setCntrNo(event.target.value)} value={cntrNo} fullWidth />
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
	              tabName: "Import"
	              //,tabIcon: Face
	              ,tabContent: (
	                  <ImpTable
	                      tableHeaderColor="info"
	                      tableData={importData}
	                      onClickHandle = {onSubmitAdd}
	                  	  tableRownum={numCnt}
	                  />
	              )
	          }          
	          ,{
	              tabName: "Export"
	              //,tabIcon: Face
	              ,tabContent: (
	                  <ExpTable
	                      tableHeaderColor="info"
	                      //tableHead={[   "SEQ","CNTR_NO","OUT_DATE_TIME","OUT_TERMINAL","OUT_FULL_EMPTY","OUT_BKG_NO","OUT_BL_NO","OUT_CARRIER_CODE","OUT_SEAL_NO","OUT_CAR_NO","PRE_IN_DATE_TIME","PRE_IN_TERMINAL","PRE_IN_FULL_EMPTY","PRE_IN_BKG_NO","PRE_IN_BL_NO","PRE_IN_CARRIER_CODE","PRE_IN_SEAL_NO","PRE_IN_CAR_NO","POL","POL_IN_DATE_TIME","POL_IN_TERMINAL","POL_IN_FULL_EMPTY","POL_IN_BKG_NO","POL_IN_BL_NO ","POL_IN_CARRIER_CODE","POL_IN_SEAL_NO","POL_IN_CAR_NO","IN_DATE_TIME","IN_TERMINAL","IN_FULL_EMPTY","IN_BKG_NO","IN_BL_NO","IN_CARRIER_CODE","IN_SEAL_NO","IN_CAR_NO","RETURN_DATE","LOAD_DATE_TIME","LOAD_VESSEL_CODE","LOAD_TERMINAL_REF_NO","LOAD_TERMINAL","LOAD_CARRIER_CODE","LOAD_SEAL_NO","LOAD_BL_NO","LOAD_BOOKING_NO","LOAD_FULL_EMPTY","MFCS_MRN","MFCS_DPT_DATE","MFCS_LINE_CODE","MFCS_BL_NO","MFCS_SEAL_NO","CLL_SEQ","CLL_CARRIER_CODE","CLL_SOC","CLL_BL_NO","CLL_SEAL_NO","OUT_SCH_ETA","OUT_SCH_ETD","OUT_SCH_LINE_CODE","OUT_SCH_TERMINAL","OUT_SCH_VESSEL_CODE","OUT_SCH_TERMINAL_REF_NO","OUT_SCH_ROUTE_CODE","OUT_SCH_ETB","OUT_SCH_LINE_VSL","OUT_SCH_VOYAGE_NO","OUT_BKG_SHIPPER_ID","OUT_BKG_SHIPPER_NAME","IN_SCH_ETA","IN_SCH_ETD","IN_SCH_LINE_CODE","IN_SCH_TERMINAL","IN_SCH_VESSEL_CODE","IN_SCH_TERMINAL_REF_NO","IN_SCH_ROUTE_CODE","IN_SCH_ETB","IN_SCH_LINE_VSL","IN_SCH_VOYAGE_NO","IN_BKG_SHIPPER_ID","IN_BKG_SHIPPER_NAME","CLL_SCH_CH_LINE_CODE","CLL_SCH_TERMINAL","CLL_SCH_VESSEL_CODE","CLL_SCH_TERMINAL_REF_NO","CLL_SCH_ROUTE_CODE","CLL_SCH_ETB","CLL_SCH_LINE_VSL","CLL_SCH_VOYAGE_NO","LOAD_SCH_ETA","LOAD_SCH_ETD","LOAD_SCH_LINE_CODE","LOAD_SCH_TERMINAL","LOAD_SCH_VESSEL_CODE","LOAD_SCH_TERMINAL_REF_NO","LOAD_SCH_ROUTE_CODE","LOAD_SCH_ETB","LOAD_SCH_LINE_VSL","LOAD_SCH_VOYAGE_NO","CHANGE_VESSEL_CODE","CHANGE_TERMINAL_REF_NO","CHANGE_LINE_VSL","CHANGE_VOYAGE_NO","CHANGE_ROUTE","CHANGE_TERMINAL","CHANGE_ETA","CHANGE_ETB","CHANGE_ETD","CHANGE_POL","OUT_CODECO_THIS_IPM","OUT_CODECO_KEY_ID","PRE_IN_CODECO_THIS_IPM","PRE_IN_CODECO_KEY_ID","POL_IN_CODECO_THIS_IPM","POL_IN_CODECO_KEY_ID","IN_CODECO_THIS_IPM","IN_CODECO_KEY_ID","LOAD_COARRI_THIS_IPM","OUT_BKG_SIETA","CLL_SCH_ETD","CLL_SD","IN_BKG_SID","OUT_SCH_VOYAGE_SID","IN_SCH_VOYAGE_SID","CLL_SCH_VOYAGE_SID","LOAD_SCH_VOYAGE_SID","REG_DATE","UPDATE_DATE","CLOSE_DATE"," CARRIER_CODE","BL_NO","TYPE_SIZE"]}
	                      tableData={exportData}
	                      onClickHandle = {onSubmitAdd}
	                      tableRownum={numCnt}
	                  />
	              )
	          }]}>     
      </CustomTabs>
		</GridItem>
    </GridContainer>
  );
}



function ImpTable(props) {

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
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >SEQ</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CNTR_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_DATE_TIME<br/>UNLOAD_VESSEL_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_TERMINAL_REF_NO<br/>UNLOAD_TERMINAL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_CARRIER_CODE<br/>UNLOAD_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_BL_NO<br/>UNLOAD_BOOKING_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_FULL_EMPTY<br/>UNLOAD_VESSEL_NAME</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_CARRIER_REF_NO<br/>UNLOAD_POL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UNLOAD_POD<br/>OUT_DATE_TIME</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_TERMINAL<br/>OUT_FULL_EMPTY</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_BL_NO<br/>OUT_CARRIER_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SEAL_NO<br/>OUT_CAR_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_DATE_TIME<br/>IN_TERMINAL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_FULL_EMPTY<br/>IN_BL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_CARRIER_CODE<br/>IN_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_CAR_NO<br/>MFCS_MRN</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >MFCS_ARV_DATE<br/>MFCS_LINE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >MFCS_BL_NO<br/>MFCS_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >MFCS_POD<br/>MFCS_POL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >DISCHARGE_TERMINAL<br/>UNLOAD_COARRI_THIS_IPM</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_CODECO_THIS_IPM<br/>OUT_CODECO_KEY_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_CODECO_THIS_IPM<br/>IN_CODECO_KEY_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >REG_DATE<br/>UPDATE_DATE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLOSE_DATE<br/>CARRIER_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >BL_NO<br/>TYPE_SIZE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POD<br/>POL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >DELIVERY_ORDER_NO</TableCell>
	            </TableRow>
	          </TableHead>
	        <TableBody>
	           {
	              tableData.map((prop, key) => {
	                  return (
	          	            <TableRow key={key}>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.SEQ}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CNTR_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_DATE_TIME}<br/>{prop.UNLOAD_VESSEL_CODE}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_TERMINAL_REF_NO}<br/>{prop.UNLOAD_TERMINAL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_CARRIER_CODE}<br/>{prop.UNLOAD_SEAL_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_BL_NO}<br/>{prop.UNLOAD_BOOKING_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_FULL_EMPTY}<br/>{prop.UNLOAD_VESSEL_NAME}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_CARRIER_REF_NO}<br/>{prop.UNLOAD_POL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UNLOAD_POD}<br/>{prop.OUT_DATE_TIME}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_TERMINAL}<br/>{prop.OUT_FULL_EMPTY}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_BL_NO}<br/>{prop.OUT_CARRIER_CODE}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SEAL_NO}<br/>{prop.OUT_CAR_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_DATE_TIME}<br/>{prop.IN_TERMINAL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_FULL_EMPTY}<br/>{prop.IN_BL_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_CARRIER_CODE}<br/>{prop.IN_SEAL_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_CAR_NO}<br/>{prop.MFCS_MRN}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.MFCS_ARV_DATE}<br/>{prop.MFCS_LINE_CODE}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.MFCS_BL_NO}<br/>{prop.MFCS_SEAL_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.MFCS_POD}<br/>{prop.MFCS_POL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.DISCHARGE_TERMINAL}<br/>{prop.UNLOAD_COARRI_THIS_IPM}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_CODECO_THIS_IPM}<br/>{prop.OUT_CODECO_KEY_ID}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_CODECO_THIS_IPM}<br/>{prop.IN_CODECO_KEY_ID}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.REG_DATE2}<br/>{prop.UPDATE_DATE2}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLOSE_DATE}<br/>{prop.CARRIER_CODE}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.BL_NO}<br/>{prop.TYPE_SIZE}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POD}<br/>{prop.POL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.DELIVERY_ORDER_NO}</TableCell>
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


function ExpTable(props) {

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
	            <TableRow style={{borderBottomStyle:'solid',borderBottomColor:'#00acc1'}}>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >SEQ</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CNTR_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_DATE_TIME<br/>OUT_TERMINAL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_FULL_EMPTY<br/>OUT_BKG_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_BL_NO<br/>OUT_CARRIER_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SEAL_NO<br/>OUT_CAR_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >PRE_IN_DATE_TIME<br/>PRE_IN_TERMINAL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >PRE_IN_FULL_EMPTY<br/>PRE_IN_BKG_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >PRE_IN_BL_NO<br/>PRE_IN_CARRIER_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >PRE_IN_SEAL_NO<br/>PRE_IN_CAR_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL<br/>POL_IN_DATE_TIME</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL_IN_TERMINAL<br/>POL_IN_FULL_EMPTY</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL_IN_BKG_NO<br/>POL_IN_BL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL_IN_CARRIER_CODE<br/>POL_IN_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL_IN_CAR_NO<br/>IN_DATE_TIME</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_TERMINAL<br/>IN_FULL_EMPTY</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_BKG_NO<br/>IN_BL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_CARRIER_CODE<br/>IN_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_CAR_NO<br/>RETURN_DATE</TableCell>     
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_DATE_TIME<br/>LOAD_VESSEL_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_TERMINAL_REF_NO<br/>LOAD_TERMINAL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_CARRIER_CODE<br/>LOAD_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_BL_NO<br/>LOAD_BOOKING_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_FULL_EMPTY<br/>MFCS_MRN</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >MFCS_DPT_DATE<br/>MFCS_LINE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >MFCS_BL_NO<br/>MFCS_SEAL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SEQ<br/>CLL_CARRIER_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SOC<br/>CLL_BL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SEAL_NO<br/>OUT_SCH_ETA</TableCell> 
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SCH_ETD<br/>OUT_SCH_LINE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SCH_TERMINAL<br/>OUT_SCH_VESSEL_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SCH_TERMINAL_REF_NO<br/>OUT_SCH_ROUTE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SCH_ETB<br/>OUT_SCH_LINE_VSL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_SCH_VOYAGE_NO<br/>OUT_BKG_SHIPPER_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_BKG_SHIPPER_NAME<br/>IN_SCH_ETA</TableCell>       
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_SCH_ETD<br/>IN_SCH_LINE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_SCH_TERMINAL<br/>IN_SCH_VESSEL_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_SCH_TERMINAL_REF_NO<br/>IN_SCH_ROUTE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_SCH_ETB<br/>IN_SCH_LINE_VSL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_SCH_VOYAGE_NO<br/>IN_BKG_SHIPPER_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_BKG_SHIPPER_NAME<br/>CLL_SCH_CH_LINE_CODE</TableCell>                  
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SCH_TERMINAL<br/>CLL_SCH_VESSEL_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SCH_TERMINAL_REF_NO<br/>CLL_SCH_ROUTE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SCH_ETB<br/>CLL_SCH_LINE_VSL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SCH_VOYAGE_NO<br/>LOAD_SCH_ETA</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_SCH_ETD<br/>LOAD_SCH_LINE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_SCH_TERMINAL<br/>LOAD_SCH_VESSEL_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_SCH_TERMINAL_REF_NO<br/>LOAD_SCH_ROUTE_CODE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_SCH_ETB<br/>LOAD_SCH_LINE_VSL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_SCH_VOYAGE_NO<br/>LOAD_SCH_VOYAGE_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CHANGE_VESSEL_CODE<br/>CHANGE_TERMINAL_REF_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CHANGE_LINE_VSL<br/>CHANGE_VOYAGE_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CHANGE_ROUTE<br/>CHANGE_TERMINAL</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CHANGE_ETA<br/>CHANGE_ETB</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CHANGE_ETD<br/>CHANGE_POL</TableCell>	                  
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >OUT_CODECO_THIS_IPM<br/>OUT_CODECO_KEY_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >PRE_IN_CODECO_THIS_IPM<br/>PRE_IN_CODECO_KEY_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >POL_IN_CODECO_THIS_IPM<br/>POL_IN_CODECO_KEY_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_CODECO_THIS_IPM<br/>IN_CODECO_KEY_ID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_COARRI_THIS_IPM<br/>OUT_BKG_SIETA</TableCell>	                  
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CLL_SCH_ETD<br/>CLL_SD</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_BKG_SID<br/>OUT_SCH_VOYAGE_SID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >IN_SCH_VOYAGE_SID<br/>CLL_SCH_VOYAGE_SID</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >LOAD_SCH_VOYAGE_SID<br/>REG_DATE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >UPDATE_DATE<br/>CLOSE_DATE</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >CARRIER_CODE<br/>BL_NO</TableCell>
	                  <TableCell style={{backgroundColor:'#e4fefe',paddingTop:'0',paddingBottom:'0'}} >TYPE_SIZE</TableCell>
	            </TableRow>
	          </TableHead>
	        <TableBody>
	           {
	              tableData.map((prop, key) => {
	                  return (
	          	            <TableRow key={key} style={{borderBottomStyle:'solid',borderBottomColor:'#ececec'}}>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.SEQ}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CNTR_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_DATE_TIME}<br/>{prop.OUT_TERMINAL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_FULL_EMPTY}<br/>{prop.OUT_BKG_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_BL_NO}<br/>{prop.OUT_CARRIER_CODE}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SEAL_NO}<br/>{prop.OUT_CAR_NO}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.PRE_IN_DATE_TIME}<br/>{prop.PRE_IN_TERMINAL}</TableCell>
			  	                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.PRE_IN_FULL_EMPTY}<br/>{prop.PRE_IN_BKG_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.PRE_IN_BL_NO}<br/>{prop.PRE_IN_CARRIER_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.PRE_IN_SEAL_NO}<br/>{prop.PRE_IN_CAR_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POL}<br/>{prop.POL_IN_DATE_TIME}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POL_IN_TERMINAL}<br/>{prop.POL_IN_FULL_EMPTY}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POL_IN_BKG_NO}<br/>{prop.POL_IN_BL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POL_IN_CARRIER_CODE}<br/>{prop.POL_IN_SEAL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POL_IN_CAR_NO}<br/>{prop.IN_DATE_TIME}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_TERMINAL}<br/>{prop.IN_FULL_EMPTY}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_BKG_NO}<br/>{prop.IN_BL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_CARRIER_CODE}<br/>{prop.IN_SEAL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_CAR_NO}<br/>{prop.RETURN_DATE}</TableCell>     
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_DATE_TIME}<br/>{prop.LOAD_VESSEL_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_TERMINAL_REF_NO}<br/>{prop.LOAD_TERMINAL}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_CARRIER_CODE}<br/>{prop.LOAD_SEAL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_BL_NO}<br/>{prop.LOAD_BOOKING_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_FULL_EMPTY}<br/>{prop.MFCS_MRN}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.MFCS_DPT_DATE}<br/>{prop.MFCS_LINE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.MFCS_BL_NO}<br/>{prop.MFCS_SEAL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SEQ}<br/>{prop.CLL_CARRIER_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SOC}<br/>{prop.CLL_BL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SEAL_NO}<br/>{prop.OUT_SCH_ETA}</TableCell> 
				    			  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SCH_ETD}<br/>{prop.OUT_SCH_LINE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SCH_TERMINAL}<br/>{prop.OUT_SCH_VESSEL_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SCH_TERMINAL_REF_NO}<br/>{prop.OUT_SCH_ROUTE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SCH_ETB}<br/>{prop.OUT_SCH_LINE_VSL}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_SCH_VOYAGE_NO}<br/>{prop.OUT_BKG_SHIPPER_ID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_BKG_SHIPPER_NAME}<br/>{prop.IN_SCH_ETA}</TableCell>       
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_SCH_ETD}<br/>{prop.IN_SCH_LINE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_SCH_TERMINAL}<br/>{prop.IN_SCH_VESSEL_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_SCH_TERMINAL_REF_NO}<br/>{prop.IN_SCH_ROUTE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_SCH_ETB}<br/>{prop.IN_SCH_LINE_VSL}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_SCH_VOYAGE_NO}<br/>{prop.IN_BKG_SHIPPER_ID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_BKG_SHIPPER_NAME}<br/>{prop.CLL_SCH_CH_LINE_CODE}</TableCell>                  
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SCH_TERMINAL}<br/>{prop.CLL_SCH_VESSEL_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SCH_TERMINAL_REF_NO}<br/>{prop.CLL_SCH_ROUTE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SCH_ETB}<br/>{prop.CLL_SCH_LINE_VSL}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SCH_VOYAGE_NO}<br/>{prop.LOAD_SCH_ETA}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_SCH_ETD}<br/>{prop.LOAD_SCH_LINE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_SCH_TERMINAL}<br/>{prop.LOAD_SCH_VESSEL_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_SCH_TERMINAL_REF_NO}<br/>{prop.LOAD_SCH_ROUTE_CODE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_SCH_ETB}<br/>{prop.LOAD_SCH_LINE_VSL}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_SCH_VOYAGE_NO}<br/>{prop.LOAD_SCH_VOYAGE_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CHANGE_VESSEL_CODE}<br/>{prop.CHANGE_TERMINAL_REF_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CHANGE_LINE_VSL}<br/>{prop.CHANGE_VOYAGE_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CHANGE_ROUTE}<br/>{prop.CHANGE_TERMINAL}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CHANGE_ETA}<br/>{prop.CHANGE_ETB}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CHANGE_ETD}<br/>{prop.CHANGE_POL}</TableCell>	                  
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.OUT_CODECO_THIS_IPM}<br/>{prop.OUT_CODECO_KEY_ID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.PRE_IN_CODECO_THIS_IPM}<br/>{prop.PRE_IN_CODECO_KEY_ID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.POL_IN_CODECO_THIS_IPM}<br/>{prop.POL_IN_CODECO_KEY_ID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_CODECO_THIS_IPM}<br/>{prop.IN_CODECO_KEY_ID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_COARRI_THIS_IPM}<br/>{prop.OUT_BKG_SIETA}</TableCell>	                  
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CLL_SCH_ETD}<br/>{prop.CLL_SD}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_BKG_SID}<br/>{prop.OUT_SCH_VOYAGE_SID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.IN_SCH_VOYAGE_SID}<br/>{prop.CLL_SCH_VOYAGE_SID}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.LOAD_SCH_VOYAGE_SID}<br/>{prop.REG_DATE2}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.UPDATE_DATE2}<br/>{prop.CLOSE_DATE}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.CARRIER_CODE}<br/>{prop.BL_NO}</TableCell>
				                  <TableCell style={{paddingTop:'0',paddingBottom:'0'}} >{prop.TYPE_SIZE}</TableCell>
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