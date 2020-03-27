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

//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import Grid from '@material-ui/core/Grid';
import CustomTabs from "components/CustomTabs/CustomTabs2.js";
import ImpTable from "components/Table/TablePaging.js";
import ExpTable from "components/Table/TablePaging.js";

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
};

const useStyles = makeStyles(styles);


export default function ScheduleList() {


  //const [carrierCode,setCarrierCode] = useState("");
  const [cntrNo,setCntrNo] = useState("");
  const [tapNum,setTapNum] = useState(0);
  const [importData,setImportData] = useState([]);
  const [exportData,setExportData] = useState([]);
  const [openJoin,setOpenJoin] = useState(false);
  
  
  const handleTapsClick = (e) => {
	  setTapNum(e);
	  if(cntrNo) {
		  onSubmit(); 
	  }
  }
  
  const onSubmit = () => {
	  if (!cntrNo) {
		  alert("컨테이너번호는 필수 입력값입니다.");
		  document.getElementById("cntrNo").focus();
		  return false;
	  } else {
	  
		  if(tapNum===0) {

			  axios.post("/com/getImpFlowSample",{cntrNo:cntrNo})
				.then(setImportData([]))
			    .then(res => setImportData(res.data))
			    .catch(err => {
			        if(err.response.status == "403") {
			        	setOpenJoin(true);
			        }
			    });

		  } else {	
		      axios.post("/com/getExpFlowSample",{cntrNo:cntrNo})
					.then(setExportData([]))
					.then(res => setExportData(res.data))
					.catch(err => {
						if(err.response.status == "403") {
					       	setOpenJoin(true);
					    }
					});

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
	                      tableHead={["SEQ", "CNTR_NO", "UNLOAD_DATE_TIME", "UNLOAD_VESSEL_CODE", "NLOAD_TERMINAL_REF_NO", "UNLOAD_TERMINAL", "UNLOAD_SEAL_NO", "UNLOAD_BL_NO", "UNLOAD_BOOKING_NO", "OUT_DATE_TIME", "OUT_TERMINAL", "OUT_FULL_EMPTY", "OUT_BL_NO", "OUT_CARRIER_CODE","OUT_SEAL_NO","IN_DATE_TIME", "IN_TERMINAL","IN_FULL_EMPTY","IN_BL_NO","IN_CARRIER_CODE","IN_SEAL_NO","MFCS_MRN","MFCS_ARV_DATE","MFCS_LINE_CODE","MFCS_BL_NO","MFCS_SEAL_NO","UNLOAD_COARRI_THIS_IPM","OUT_CODECO_THIS_IPM","OUT_CODECO_KEY_ID","IN_CODECO_THIS_IPM","IN_CODECO_KEY_ID","TYPE_SIZE","DELIVERY_ORDER_NO","REG_DATE","UPDATE_DATE","CLOSE_DATE","DISCHARGE_TERMINAL"]}
	                      tableData={importData}
	                  />
	              )
	          }

	          
	          ,{
	              tabName: "Export"
	              //,tabIcon: Face
	              ,tabContent: (
	                  <ExpTable
	                      tableHeaderColor="info"
	                      tableHead={[ "SEQ","CNTR_NO","OUT_DATE_TIME","OUT_TERMINAL","OUT_FULL_EMPTY","OUT_BKG_NO","OUT_BL_NO","OUT_CARRIER_CODE","OUT_SEAL_NO","IN_DATE_TIME","IN_TERMINAL","IN_FULL_EMPTY","IN_BKG_NO","IN_BL_NO","IN_CARRIER_CODE","IN_SEAL_NO","LOAD_DATE_TIME","LOAD_VESSEL_CODE","LOAD_TERMINAL_REF_NO","LOAD_TERMINAL","LOAD_CARRIER_CODE","LOAD_SEAL_NO","LOAD_BL_NO","LOAD_BOOKING_NO","RETURN_DATE","MFCS_MRN","MFCS_DPT_DATE","MFCS_LINE_CODE","MFCS_BL_NO","MFCS_SEAL_NO","CLL_SEQ","CLL_CARRIER_CODE","CLL_SOC","CLL_BL_NO","CLL_SEAL_NO","OUT_CODECO_THIS_IPM","OUT_CODECO_KEY_ID","IN_CODECO_THIS_IPM","IN_CODECO_KEY_ID","LOAD_COARRI_THIS_IPM","TYPE_SIZE","POL","SCH_ETA","SCH_ETD","SCH_LINE_CODE","SCH_TERMINAL","SCH_VESSEL_CODE","SCH_TERMINAL_REF_NO","SCH_VOYAGE_SID","IN_BKG_SID","REG_DATE","UPDATE_DATE","CLOSE_DATE"]}
	                      tableData={exportData}
	                  />
	              )
	          }]}>     
      </CustomTabs>
		</GridItem>
    </GridContainer>
  );
}
