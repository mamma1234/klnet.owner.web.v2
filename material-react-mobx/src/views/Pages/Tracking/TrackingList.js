import React,{ useState, useEffect } from "react";
import { Link,Redirect } from 'react-router-dom';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from '@material-ui/core/Drawer';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
//import BackupIcon from "@material-ui/icons/Backup";
//import StarIcon from "@material-ui/icons/Stars";
//import MapIcon from "@material-ui/icons/Map";
//import SpeakerNotes from "@material-ui/icons/SpeakerNotes";
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
//import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
//import CardIcon from "components/Card/CardIcon.js";

// import page
import Login from "views/Pages/Login/LoginPage.js";
import Blupload from "views/Pages/Tracking/BLPage/UploadPage.js";
import HotSet from "views/Pages/Tracking/HotSet/HotSet.js";
import Map from "views/Pages/Tracking/Map/Map.js";
import Table from "views/Pages/Tracking/TrackingDetail.js";
// @material-ui/core icon
//import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Assignment from "@material-ui/icons/Assignment";
// other import
import axios from 'axios';
//import moment from 'moment';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Pages/Login/LoginPage.js';
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
import Tooltip from '@material-ui/core/Tooltip';

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
import Moment from 'moment'

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

export default function TrackingList(props) {

  const setEndDate = new Date();
  //const [carrierCode,setCarrierCode] = useState("");
  const [dategb,setDategb] = useState("ETA");
  
  const [ietype,setIetype] = useState("A");
  const [labelName,setLabelName] = useState("BL & BK NO.");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [vesselName,setVesselName] = useState("");
  //const [blNo,setBlNo] = useState("");
  const [searchKey,setSearchKey] = useState("");
  
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
						//setOpenJoin(true);
						
			        }
			    });

	    } else {
	      setFixedClasses("dropdown");
	      setOptionData([]);
	    }
};
  
useEffect(() => {
	    console.log('effect');

    	//axios.get("/com/getPortCodeInfo")
	    //.then(res => setPortData(res.data));
    	
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
	  axios.post("/loc/getTrackingList",{
		  ietype:ietype,
		  dategb:dategb,
		  from:Moment(fromDate).format('YYYYMMDD'),
		  to:Moment(toDate).format('YYYYMMDD'),
		  blbk:searchKey,
		  num:numCnt})
		.then(setTrackingList([]))
	    .then(res => setTrackingList(res.data))
	    .catch(err => {
	       //console.log(err.response.status);
	        if(err.response.status == "403") {
				setOpenJoin(true);
				console.log("여기11111");
				//history.push("/authpage/login");
				//props.history.push("/authpage/login");
				//return (<Link to="/authpage/login" />)
			}
			
	        //window.location.href = "/Landing";
	    });
	  //alert("Tracking Info Search onSubmit");
  }

   const handleAddRow = () => {

    //page ++
    numCnt=numCnt+1;

    axios.post("/loc/getTrackingList",{
    	  ietype:ietype,
		  dategb:dategb,
		  from:Moment(fromDate).format('YYYYMMDD'),
		  to:Moment(toDate).format('YYYYMMDD'),
		  blbk:searchKey,
		  num:numCnt})
    .then(res => setTrackingList([...trackingList,...res.data]))
          .catch(err => {
            if(err.response.status == "403" || err.response.status == "401") {
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
  const handleIEGubun = (e) => {
	  console.log("xx",e.target.value);
	  setIetype(e.target.value);
	  if(e.target.value=="I"){
		  setLabelName("BL No.");
	  } else if(e.target.value=="E") {
		  setLabelName("BK No.");
	  } else {
		  setLabelName("BL & BK No.");
	  }
	  
  }
  const handleLogin = () => {
	  setOpenJoin(false);
	  props.history.push("/svc/tracking");
  }
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" icon style={{height:'10px'}}>
					<CardIcon color="info" style={{padding:'0'}}>
						<Assignment />
					</CardIcon>
				{/*<h5 className={classes.cardTitleBlack}>Search To Tacking Info </h5>*/}				
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={12}>
		     	<Grid container spacing={1}>
	     		<Grid item xs={12} sm={10}>
	      			<Grid container spacing={1}>
	      			<Grid item xs={12} sm={12}>
	    			<Grid container spacing={1}>
	    				<Grid item xs={12} sm={2} md={2} >
	    					<FormControl fullWidth>
						        <InputLabel id = "ie_type" >IMP&EXP</InputLabel>
						        <Select
						          native
						          id = "IE_TYPE_SELECT"
						          value={ietype}
						          label="IMP&EXP"
						           onChange={handleIEGubun}
						        >
						        <option value="A">ALL</option>
						        <option value="I">IMPORT</option>
						        <option value="E">EXPORT</option>
						        </Select>
						   </FormControl>
	    				</Grid>
	    				<Grid item xs={12} sm={3} >
	    					<TextField id="blbk" label={labelName} onChange={event => setSearchKey(event.target.value)} value={searchKey} //variant="outlined" size="small" 
	    						fullWidth />
	    				</Grid>
	    				<Grid item xs={12} sm={2} md={2} >
    					<CustomSelect
    						id="dateGb"
							labelText = "구분"
    						setValue = {dategb}
    						option = {["ETA","ETD","ATA","ATD"]}
    						inputProps={{onChange:event => setDategb(event.target.value)}}
    						formControlProps={{fullWidth: true}}
    					/>
    				</Grid>
	    				<Grid item xs={12} sm={6} md={5}>
	    					<Grid container spacing={1}>
	    						<Grid item xs={12} sm={6}> 
	    							<CalendarBox
	    								labelText ="From"
	    								id="fromDate"
	    								variant="inline"
										format="yyyy-MM-dd"
										//inputVariant="outlined"
										//margin="dense"
	    								setValue={fromDate}
	    								autoOk={true}
	    								onChangeValue={date => setFromDate(date)}
	    								formControlProps={{fullWidth: true}} 
	    							/>
	    						</Grid>
	    						<Grid item xs={12} sm={6}>
	    							<CalendarBox
	    								labelText ="To"
	    								id="toDate"
	    								variant="inline"
										format="yyyy-MM-dd"
										//inputVariant="outlined"
										//margin="dense"
	    								setValue={toDate}
	    								autoOk={true}
	    								onChangeValue={date => setToDate(date)}
	    								formControlProps={{fullWidth: true}}
	    							/>
	    						</Grid>
	    					</Grid>
	    				</Grid>
	    				
	    			</Grid>
	    		</Grid>	
						<Collapse in={expanded} timeout="auto" unmountOnExit style={{width:'100%'}}>
							<Grid item xs={12} sm={12}>
								<Grid container spacing={1}>
									<Grid item xs={12} sm={7}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={6} style={{paddingLeft:'8px',paddingRight:'8px'}}>
												<Autocomplete
													options = {portCode}
													getOptionLabel = { options => options?"["+options[0]+"] "+options[1]:<TextField label="출발지"  fullWidth />}
													id="start"
													onChange={onSPortChange}
													loading={true}
													//onClick={onPortSearchValue}
													//onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="출발지"  //variant="outlined" size="small" 
															fullWidth />
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={6} style={{paddingLeft:'8px',paddingRight:'8px'}}>
												<Autocomplete
													options = {portData}
													getOptionLabel = { options => "["+options.PORT_CODE+"] "+options.PORT_NAME}
													id="end"
													onChange={onEPortChange}
													onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="도착지"  //variant="outlined" size="small" 
															fullWidth />
													)}
												/>
											</Grid> 	
										</Grid>
									</Grid>
								</Grid>
							</Grid>
						</Collapse>
						
		        		</Grid>
	        		</Grid> 
				<Grid item xs={12} sm={2} md={2} style={{paddingTop:'6px',paddingBottom:'10px',alignSelf:'flex-end'}}>
					<Button color="info" onClick = {onSubmit}  fullWidth>Search</Button>							
				</Grid>
			</Grid>
		  </Grid> 
		  <Grid container spacing={1}>
		      	<Grid item xs={12} sm={11} style={{textAlignLast:'center',height:'30px',paddingTop:'5px'}}>
		      		{expanded?<ExpandLess onClick = {handleExpandClick} style={{color:'#00acc1'}}/>:<ExpandMore onClick = {handleExpandClick} style={{color:'#00acc1'}}/>}
		      	</Grid>
		      	<Grid item xs={12} sm={1} style={{textAlignLast:'right',height:'30px',paddingTop:'0px',marginBottom:'1px'}}>
		      		<Tooltip title="BL Upload">
		      		<a onClick={() => setAnchorE1(true)} >
			      		<Assignment style={{color:'#00acc1',width:'20px',height:'20px'}} />
			      		<font style={{fontVariant:'all-small-caps',color:'black'}}>BL</font>
					</a>
					</Tooltip>
		      	</Grid>
		  </Grid>
{/*          <FixedPlugin
			//handleImageClick={handleImageClick}
			//handleColorClick={handleColorClick}
			//bgColor={color}
			//bgImage={image}
            fixedData={optionData}
			//handleViewClick={handleViewClick}
			handleFixedClick={handleFixedClick}
			fixedClasses={fixedClasses}
		   /> */}
         <Popover
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
          </CardBody>
        </Card>
		 <Dialog
			open={openJoin}
			onClose={()=>setOpenJoin(false)}
     	 >
		  <DialogContent style={{maxWidth:'400px',minWidth:'400px'}}>
			  <LoginPage onClose={handleLogin}/></DialogContent> 
      </Dialog>
	   </GridItem>
      <GridItem xs={12}>
		    <Card style={{marginTop:'5px',marginBottom:'5px'}}>
				<CardBody style={{padding:'0px'}}>
					<Table
						tableHeaderColor="info"
		                //tableHead={["(B/K No.) B/L No", "IMPORT(I)/EXPORT(E)", "CARRIER", "VESSEL/VOYAGE","CURRENT","POL(ETD/ATD)","POD(ETA/ATA)","PROGRESS","ACTION"]}
						tableRownum={numCnt}
						tableData={trackingList}
						onClickHandle ={handleAddRow}
		            /> 
				</CardBody>
			</Card>
		</GridItem>
    </GridContainer>
  );
}
