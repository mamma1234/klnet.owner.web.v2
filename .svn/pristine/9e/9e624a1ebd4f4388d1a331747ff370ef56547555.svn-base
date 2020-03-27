import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import BackupIcon from "@material-ui/icons/Backup";
import StarIcon from "@material-ui/icons/Stars";
import MapIcon from "@material-ui/icons/Map";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
//import FormControl from "@material-ui/core/FormControl";
//import Icon from "@material-ui/core/Icon";
import Popover from  '@material-ui/core/Popover';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
//import CardIcon from "components/Card/CardIcon.js";

// import page
import Login from "views/Pages/Login/LoginPage.js";
import Blupload from "views/Pages/Tracking/BLPage/UploadPage.js";
import HotSet from "views/Pages/Tracking/HotSet/HotSet.js";
import Map from "views/Pages/Tracking/Map/Map.js";
import Table from "views/Pages/Tracking/TrackingDetail.js";
// @material-ui/core icon
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Assignment from "@material-ui/icons/Assignment";
// other import
import axios from 'axios';
//import moment from 'moment';




//import FixedPlugin from "views/Tracking/Setting/CustomFixedPlugin.js";
//import Modal from '@material-ui/core/Modal';
//import JoinPage from "components/Form/Common/JoinPage.js";

import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CardContent from '@material-ui/core/CardContent';
import Collapse from '@material-ui/core/Collapse';
//import TestForm from "components/Form/Common/Search.js";
import Grid from '@material-ui/core/Grid';


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
let numCnt =1;

export default function ScheduleList() {


  const setEndDate = new Date();
  //const [carrierCode,setCarrierCode] = useState("");
  const [dateGbSet,setDateGbSet] = useState("ETA");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [vesselName,setVesselName] = useState("");
  const [blNo,setBlNo] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [portData,setPortData] = useState([]);
  const [trackingList,setTrackingList] = useState([]);
  const [fromDate,setFromDate] = useState(new Date());
  const [toDate,setToDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));
  const [anchorE1, setAnchorE1] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);
  //const [anchorE4, setAnchorE4] = useState(null);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  //const [viewVlaue, setViewVlaue] = React.useState("list");
  const [openJoin,setOpenJoin] = useState(false);
  const [optionData,setOptionData] = useState([]);
  
  let portCode = [];
  

  const handleFixedClick = () => {
	    if (fixedClasses === "dropdown") {
	    	 setFixedClasses("dropdown show");
			  axios.post("/com/getUserSetting").then(res => portCode(res.data[0]))
			  //.then(res => console.log(JSON.stringify(res.data[0])))
			  .catch(err => {
			        if(err.response.status == "403") {
			        	setOpenJoin(true);
			        }
			    });

	    } else {
	      setFixedClasses("dropdown");
	      setOptionData([]);
	    }
};
  
useEffect(() => {
	    console.log('effect');

    	axios.get("/com/getPortCodeInfo")
	    .then(res => setPortData(res.data));
    	
	    function handleTouchMove(event) {
	    	if(openJoin) {
	    		event.preventDefault();
	    	}
	    }
	    
	    window.addEventListener("touchmove",handleTouchMove, {
	    	passive: false
	    });

	    return () => {
	      console.log('cleanup');
	      window.removeEventListener("touchmove",handleTouchMove);
	    };
}, [openJoin]);
  
  
  const onPortSearchValue = (e) => {
	  console.log(">>>click");
	    const values = e.target.value;
	    if(values != "" && values.length > 2) {
	    	axios.get("/com/getPortCodeInfo")
		    .then(res => setPortData(res.data));
	    }  
  }

  
  const onSPortChange = (e,data) => {
	  if(data) {
		  setSPort(data.PORT_CODE);
	  } else {
		  setSPort("");
	  }
  }

  const onEPortChange = (e,data) => {
	  if(data) {
		  setEPort(data.PORT_CODE);
	  } else {
		  setEPort("");
	  }
  }
  
  const onSubmit = () => {
	  //search
	  numCnt=1;
	  axios.post("/loc/getTrackingList",{blno:blNo,vslname:vesselName,num:numCnt})
			  //{ carrierCode:carrierCode,
		//  								  startDate:moment(fromDate).format('YYYYMMDD'),
		 // 								  endDate:moment(toDate).format('YYYYMMDD'),
		  //								  startPort:sPort,
		  //								  endPort:ePort,
		  //								  vesselName:vesselName
	  									//})
	    .then(res => setTrackingList(res.data))
	    .catch(err => {
	       //console.log(err.response.status);
	        if(err.response.status == "403") {
	        	setOpenJoin(true);
	        }
	        //window.location.href = "/Landing";
	    });
	  //alert("Tracking Info Search onSubmit");
  }

   const handleAddRow = () => {

    //page ++
    numCnt=numCnt+1;

    axios.post("/loc/getTrackingList",{blno:blNo,vslname:vesselName,num:numCnt}).then(res => setTrackingList([...trackingList,...res.data]))
          .catch(err => {
            if(err.response.status == "403") {
	        	setOpenJoin(true);
	        }
            });
            
  };
  
  const handleClose = () => {
	  setAnchorE1(null);
	  setAnchorE2(null);
	  setAnchorE3(null);
	  //setAnchorE4(null);
  }
  
  const open_bl = Boolean(anchorE1);
  const open_hot = Boolean(anchorE2);
  const open_map = Boolean(anchorE3);
  //const open_set = Boolean(anchorE4);
  const id_bl = open_bl ? 'simple-popover1':undefined;
  const id_hot = open_hot ? 'simple-popover2':undefined;
  const id_map = open_map ? 'simple-popover3':undefined;
  //const id_set = open_set ? 'simple-popover4':undefined;
    
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" icon>
					<CardIcon color="info" >
						<Assignment />
					</CardIcon>
				<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>				
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={12}>
		     	<Grid container spacing={1}>
	     		<Grid item xs={12} sm={10}>
	      			<Grid container spacing={1}>
	      			<Grid item xs={12} sm={12}>
	    			<Grid container spacing={1}>
	    				<Grid item xs={12} sm={2}>
	    									<CustomSelect
	    										id="dateGb"
	    										labelText = "구분"
	    										setValue = {dateGbSet}
	    										option = {["ETA","ETD","ATA","ATD"]}
	    										inputProps={{onChange:event => setDateGbSet(event.target.value)}}
	    										formControlProps={{fullWidth: true}}
	    									/>
	    				</Grid>
	    				<Grid item xs={12} sm={5}>
	    					<Grid container spacing={1}>
	    						<Grid item xs={12} sm={6}> 
	    											<CalendarBox
	    												labelText ="From"
	    												id="fromDate"
	    												format="yyyy-MM-dd"
	    												setValue={fromDate}
	    												onChangeValue={date => setFromDate(date)}
	    												formControlProps={{fullWidth: true}} 
	    											/>
	    						</Grid>
	    						<Grid item xs={12} sm={6}>
	    											<CalendarBox
	    												labelText ="To"
	    												id="toDate"
	    												format="yyyy-MM-dd"
	    												setValue={toDate}
	    												onChangeValue={date => setToDate(date)}
	    												formControlProps={{fullWidth: true}}
	    											/>
	    						</Grid>
	    					</Grid>
	    				</Grid>
	    				<Grid item xs={12} sm={4} >
	    					<TextField id="blNo" label="BL No." onChange={event => setBlNo(event.target.value)} fullWidth />
	    				</Grid>
	    				{/*}<Grid item xs={12} sm={1} style={{textAlignLast:'right',paddingTop:'20px',paddingBottom:'0px'}}>
	    									<Button
	    										color="info"
	    										size="sm"
	    										style={{width:'100px'}}
	    										startIcon={<BackupIcon/>}
	    										onClick={e=>setAnchorE1(e.currentTarget)}
	    									>BL</Button>
	    				</Grid>*/}
	    			</Grid>
	    		</Grid>
							
						<Collapse in={expanded} timeout="auto" unmountOnExit style={{width:'100%'}}>
							<Grid item xs={12} sm={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={5}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={6}>
												<Autocomplete
													options = {portCode}
													getOptionLabel = { options => options?"["+options[0]+"] "+options[1]:<TextField label="출발지"  fullWidth />}
													id="start"
													onChange={onSPortChange}
													loading={true}
													//onClick={onPortSearchValue}
													//onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="출발지"  fullWidth />
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={6}>
												<Autocomplete
													options = {portData}
													getOptionLabel = { options => "["+options.PORT_CODE+"] "+options.PORT_NAME}
													id="end"
													onChange={onEPortChange}
													onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="도착지"  fullWidth />
													)}
												/>
											</Grid> 	
										</Grid>
									</Grid>
									<Grid item xs={12} sm={5} style={{paddingBottom:'0px'}}>
										<TextField id="vslName" label="Vessel Name" onChange={event => setVesselName(event.target.value)} fullWidth />
									</Grid>
								</Grid>
							</Grid>
						</Collapse>
						
		        		</Grid>
	        		</Grid> 
				<Grid item xs={12} sm={2} style={{paddingTop:'10px',paddingBottom:'10px',alignSelf:'flex-end'}}>
					<Button color="info" onClick = {onSubmit}  fullWidth>Search</Button>							
				</Grid>
			</Grid>
		      	</Grid> 
		      	<Grid item xs={12} sm={12} style={{textAlignLast:'center',height:'30px',paddingTop:'5px'}}>
		      		{expanded?<ExpandLess onClick = {handleExpandClick} style={{color:'#00acc1'}}/>:<ExpandMore onClick = {handleExpandClick} style={{color:'#00acc1'}}/>}
		      	</Grid>
         {/* <FixedPlugin
			//handleImageClick={handleImageClick}
			//handleColorClick={handleColorClick}
			//bgColor={color}
			//bgImage={image}
            fixedData={optionData}
			//handleViewClick={handleViewClick}
			handleFixedClick={handleFixedClick}
			fixedClasses={fixedClasses}
		   />
*/ }         <Popover
	      	id={id_bl}
	      	open={open_bl}
	      	anchorEl={anchorE1}
	      	onClose={handleClose}
	  		anchorReference="anchorPosition"
	  		anchorPosition={{top:100,left:690}}
	      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      	transformOrigin={{vertical:'top',horizontal:'center',}}
		  ><Blupload/>
		  </Popover>
		  <Popover
			id={id_hot}
			open={open_hot}
			anchorEl={anchorE2}
			onClose={handleClose}
			anchorReference="anchorPosition"
			anchorPosition={{top:80,left:650}}
			anchorOrigin={{vertical:'bottom',horizontal:'center',}}
			transformOrigin={{vertical:'top',horizontal:'center',}}
		  ><HotSet/>
		  </Popover>
          <Popover
        	id={id_map}
        	open={open_map}
        	anchorEl={anchorE3}
        	onClose={handleClose}
				anchorReference="anchorPosition"
    		anchorPosition={{top:100,left:650}}
        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
        	transformOrigin={{vertical:'top',horizontal:'center',}}
          ><Map/>
          </Popover>

          </CardBody>
        </Card>
	   {/*  <Modal
	     	open={openJoin}
	    	onClose={handleJoinClose}
	      ><JoinPage mode="0" onClose ={()=>setOpenJoin(false)} page="/svc" reTurnText="Login" />
	     </Modal> */}
		 <Drawer anchor="top" open={openJoin} >
            {/* <JoinPage mode="0" onClose ={()=>setOpenJoin(false)} page="/svc" reTurnText="Login" /> */}
		    <Login onClose ={()=>setOpenJoin(false)} /> 
         </Drawer>
	   </GridItem>
      <GridItem xs={12}>
		    <Card style={{marginTop:'5px',marginBottom:'5px'}}>
				<CardBody style={{padding:'0px'}}>
					<Table
						tableHeaderColor="info"
		                tableHead={["BL No", "I/E", "CARRIER", "VESSEL/VOYAGE","CURRENT","POL(ETD/ATD)","POD(ETA/ATA)","PROGRESS","ACTION"]}
						tableData={trackingList}
						onClickHandle ={handleAddRow}
		            /> 
				</CardBody>
			</Card>
		</GridItem>
    </GridContainer>
  );
}
