import React,{ useState, useEffect } from "react";
import { Link } from 'react-router-dom';

//@material-ui/core components
import {Collapse,Grid,Snackbar,FormControl,InputLabel,Select,Tooltip,TextField} from '@material-ui/core';

//@material-ui/lab components
import {Autocomplete,Alert} from '@material-ui/lab';

//Customs components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "views/Pages/Tracking/TrackingDetail.js";

//icon
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";
import Assignment from "@material-ui/icons/Assignment";
import CardIcon from "components/Card/CardIcon.js";

// other import
import axios from 'axios';
import Moment from 'moment';
import queryString from 'query-string';

let numCnt =1;
let initialValue = null;
let updateCount = 0; // 수정이력

export default function TrackingList(props) {

  const query = queryString.parse(window.location.search);
	
  const {store} =props;
  const setStartDate = new Date();
  const setEndDate = new Date();
  const setStartDateOld = new Date();
  const setEndDateOld = new Date();
  const [dategb,setDategb] = useState(query.dategb?query.dategb:"D");
  const [dategbOld,setDategbOld] = useState(query.dategb?query.dategb:"D");
  
  const [ietype,setIetype] = useState(query.ietype?query.ietype:"A");
  const [ietypeOld,setIetypeOld] = useState(query.ietype?query.ietype:"A");
  //const [labelName,setLabelName] = useState("BL & BK NO.");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [sPortOld,setSPortOld] = useState("");
  const [ePortOld,setEPortOld] = useState("");
  //const [vesselName,setVesselName] = useState("");
  const [searchKey,setSearchKey] = useState("");
  const [searchKeyOld,setSearchKeyOld] = useState("");
  const [lineCode,setLineCode] = useState([]);
  const [carrierCode,setCarrierCode] = useState("");
  const [carrierCodeOld,setCarrierCodeOld] = useState("");
  //const [selectData,setSelectData] = useState([]);
  const [portData,setPortData] = useState([]);
  const [trackingList,setTrackingList] = useState([]);
  const [fromDate,setFromDate] = useState(query.from === "T"?setStartDate:query.from === "7"?setStartDate.setDate(setStartDate.getDate()-7):query.from === "1"?setStartDate.setDate(setStartDate.getDate()-1):setStartDate.setDate(setStartDate.getDate()-3));
  const [toDate,setToDate] = useState(query.to=== "T"?setEndDate:setEndDate.setDate(setEndDate.getDate()+3));
  const [fromDateOld,setFromDateOld] = useState(query.from === "T"?setStartDate:query.from === "7"?setStartDate.setDate(setStartDate.getDate()-7):query.from === "1"?setStartDate.setDate(setStartDate.getDate()-1):setStartDateOld.setDate(setStartDateOld.getDate()-3));
  const [toDateOld,setToDateOld] = useState(query.to === "T"?setEndDate:setEndDateOld.setDate(setEndDateOld.getDate()+3));
/*  const [anchorE1, setAnchorE1] = useState(null);
  const [anchorE2, setAnchorE2] = useState(null);
  const [anchorE3, setAnchorE3] = useState(null);*/
  const [totCnt,setTotCnt] = useState(0);
  const [severity, setSeverity] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");

  //const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  //const [optionData,setOptionData] = useState([]);
 
  //const [openTest,setOpenTest] = useState(false);

  //let portCode = [];
  

  /* const handleFixedClick = () => {
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
  */

useEffect(() => {
	if(query.ietype) {
		onSubmit();
	}
	   // console.log('Tracking effect');
		//console.log('userStore',store);
    	//axios.get("/com/getPortCodeInfo")
	    //.then(res => setPortData(res.data));
    	
	   /* function handleTouchMove(event) {
	    	if(openJoin) {
	    		event.preventDefault();
	    	}
	    }*/
	    
	   /* window.addEventListener("touchmove",handleTouchMove, {
	    	passive: false
	    });*/

	    return () => {
	      console.log('cleanup');
	     // window.removeEventListener("touchmove",handleTouchMove);
	    };
}, []);
  
  
/*  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != "" && values.length > 2) {
	    	axios.get("/com/getPortCodeInfo")
		    .then(res => setPortData(res.data));
	    }  
  }*/

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

  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values !== undefined && values !== "" && values.length >= 2) {
	    	if(store.token) {
		    	axios.post("/com/getTrackingPortCode",{ portCode:values},{headers:{'Authorization':'Bearer '+store.token}})
		    	.then(setPortData([]))
			    .then(res => setPortData(res.data))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
					}
			    });
	    	} else {
	    		props.openLogin();
	    	}
	    }  
}
  
  const onLineSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != undefined && values != "" && values.length >= 1) {
	    	if(store.token) {
		    	axios.post("/loc/getCustomLineCode",{},{headers:{'Authorization':'Bearer '+store.token}})
		    	.then(setLineCode([]))
			    .then(res => setLineCode(res.data))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
					}
			    });
	    	} else {
	    		props.openLogin();
	    	}
	    }  
}

  
  const onSubmit = () => {
		// 초기값 구분 initialValue
		if(ietype === ietypeOld && dategb === dategbOld && fromDate === fromDateOld && toDate === toDateOld 
				&& searchKey === searchKeyOld && sPort === sPortOld && ePort === ePortOld && carrierCode === carrierCodeOld && updateCount === 0) {
			initialValue = "Y";
		} else {
			updateCount = updateCount++; // 변경 이력 카운트
			initialValue = "N";
		}
	  
	  if(store.token) {
  
	  //search
	  numCnt=1;
	  axios.post("/loc/getTrackingList",{
		  ietype:ietype,
		  dategb:dategb,
		  from:Moment(fromDate).format('YYYYMMDD'),
		  to:Moment(toDate).format('YYYYMMDD'),
		  blbk:searchKey,
		  start:sPort,
		  end:ePort,
		  line:carrierCode,
		  initial:initialValue,
		  num:numCnt},{headers:{'Authorization':'Bearer '+store.token}}
		  )
		.then(setTrackingList([]))
		.then(setTotCnt(0))
	    .then(res => {
	    				if(res.status === 200) {
	    					setTrackingList(res.data);
	    					setTotCnt(res.data[0].tot_cnt);
	    				} else {
	    					setTrackingList([]);
	    					setTotCnt(0);	
	    				}
	    			})
	    .catch(err => {
	        if(err.response !== undefined ) {
	        	if(err.response.status === 403||err.response.status === 401) {
	        	props.openLogin();
	        	}
			} else {
				console.log("errod ");
				setTotCnt(0);
				alertMessage('조회된 데이터가 존재 하지 않습니다.','error');
				setTrackingList([]);		
			}
	        
	    });
	  } else {
		  props.openLogin();
	  }
  }

   const handleAddRow = () => {
		// 초기값 구분 initialValue
		if(ietype === ietypeOld && dategb === dategbOld && fromDate === fromDateOld && toDate === toDateOld 
				&& searchKey === searchKeyOld && sPort === sPortOld && ePort === ePortOld && carrierCode === carrierCodeOld && updateCount === 0) {
			initialValue = "Y";
		} else {
			initialValue = "N";
		}
		
	  if(store.token) {
		  if(numCnt != trackingList[0].tot_page) {
			//page ++
		    numCnt=numCnt+1; 
		    axios.post("/loc/getTrackingList",{
			    	  ietype:ietype,
					  dategb:dategb,
					  from:Moment(fromDate).format('YYYYMMDD'),
					  to:Moment(toDate).format('YYYYMMDD'),
					  blbk:searchKey,
					  start:sPort,
					  end:ePort,
					  line:carrierCode,
					  initial:initialValue,
					  num:numCnt},{headers:{'Authorization':'Bearer '+store.token}})
				  .then(res => setTrackingList([...trackingList,...res.data]))
		          .catch(err => {
		            if(err.response.status === 403 || err.response.status === 401) {
			        	//setOpenJoin(true);
			        	props.openLogin();
			        }
		            });
		  }
	  } else {
		  props.openLogin();
	  }     
  };
  
/*  const handleClose = () => {
	  setAnchorE1(null);
	  setAnchorE2(null);
	  setAnchorE3(null);
  }*/
    
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleIEGubun = (e) => {
	 // console.log("xx",e.target.value);
	  setIetype(e.target.value);	  
  }
  
  const handelLoginOpen = () => {
	  props.openLogin();
  }
  
  const handelSelectDate =(event) => {
	  if(event.target.value === "X") {
		  setDategb(event.target.value);
		  setFromDate(null);
		  setToDate(null);
	  } else {
		  setDategb(event.target.value);
		  setFromDate(setStartDate.setDate(setStartDate.getDate()-3));
		  setToDate(setEndDate.setDate(setEndDate.getDate()+3));
	  }
  }
  
  const handleClick = (event) => {
	  const anchor = document.querySelector('#scroll_top');
	  if(anchor) {
		  anchor.scrollIntoView();
	  }
  };
  
  //const classs = klnetStyles();
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} style={{marginBottom:'5px'}}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" icon >
					<CardIcon color="info" style={{padding:'0'}}>
						<Assignment />
					</CardIcon>
				{/*<h5 className={classes.cardTitleBlack}>Search To Tacking Info </h5>*/}				
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={12}>
		     	<Grid container spacing={3}>
	     		<Grid item xs={12} sm={12} md ={9}>
	      			<Grid container spacing={1}>
	      			<Grid item xs={12} sm={12}>
	    			<Grid container spacing={2}>
	    				<Grid item xs={12} sm={12} md={2} >
	    					<FormControl fullWidth>
						        <InputLabel id = "ie_type" >IMPORT&EXPORT</InputLabel>
						        <Select
						          native
						          id = "IE_TYPE_SELECT"
						          value={ietype}
						          label="IMPORT&EXPORT"
						           onChange={handleIEGubun}
						        >
						        <option value="A">ALL</option>
						        <option value="I">IMPORT</option>
						        <option value="E">EXPORT</option>
						        </Select>
						   </FormControl>
	    				</Grid>
	    				<Grid item xs={12} sm={12} md={3}>
	    					<TextField id="blbk" label="B/L & B/K No." onChange={event => setSearchKey(event.target.value)} value={searchKey} //variant="outlined" size="small" 
	    						fullWidth />
	    				</Grid>
	    				<Grid item xs={12} sm={12} md={2} >
	    					<FormControl fullWidth>
							        <InputLabel id = "ie_type" >Date</InputLabel>
							        <Select
							          native
							          id = "start_end"
							          value={dategb}
							          label="Date"
							           onChange={handelSelectDate}
							        >
							        <option value="D">ETD&ATD</option>
							        <option value="A">ETA&ATA</option>
							        <option value="X">No Period</option>
									<option value="I">등록일자</option>
							        </Select>
							 </FormControl>
    				</Grid>
	    				<Grid item xs={12} sm={12} md={5}>
	    					<Grid container spacing={1}>
	    						<Grid item xs={12} sm={12} md ={6}> 
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
	    						<Grid item xs={12} sm={12} md ={6}>
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
									<Grid item xs={12} md={12} sm={12}>
										<Grid container spacing={1}>
											<Grid item xs={12} sm={12} md={4}style={{paddingLeft:'8px',paddingRight:'8px'}}>
												<Autocomplete
													options = {portData}
													getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
													id="start"
													onChange={(e,data)=>setSPort(!data?'':data.port_code)}
													noOptionsText="Please enter 2 characters ..."
													onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="출발지"  //variant="outlined" size="small" 
															fullWidth />
													)}
												/>
											</Grid>
											<Grid item xs={12} sm={12} md={4}style={{paddingLeft:'8px',paddingRight:'8px'}}>
												<Autocomplete
													options = {portData}
													getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
													id="end"
													noOptionsText="Please enter 2 characters ..."
													onChange={(e,data)=>setEPort(!data?'':data.port_code)}
													onInputChange={onPortSearchValue}
													renderInput={params => (
														<TextField {...params} label="도착지"  //variant="outlined" size="small" 
															fullWidth />
													)}
												/>
											</Grid> 
											<Grid item xs={12} sm={12} md={4}style={{paddingLeft:'8px',paddingRight:'8px'}}>	
												<Autocomplete
												options = {lineCode}
												getOptionLabel = { option => option.id +' '+option.nm }
												noOptionsText="Please enter 1 characters ..."
												id="carrierCode"
												onInputChange={onLineSearchValue}
												onChange={(e,data)=>setCarrierCode(!data?'':data.id)}
												renderInput={params => (
													<TextField inputProps={{maxLength:4}} {...params} label="선사" fullWidth />
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
	        	<Grid item xs={12} sm={12} md={3} style={{paddingTop:'6px',paddingBottom:'10px',alignSelf:'flex-end',textAlign:'center'}}>
	        		<Tooltip title="B/L(B/K) Upload">
	        			<Button 
	        				color="info" //onClick={() => setAnchorE1(true)}  
	        				component={Link} to="/svc/uploadbl"
	        				endIcon={<Assignment />}
	        				style={{paddingTop:'11px',width:'35%'}}>B/L(B/K)</Button>
	        		</Tooltip>&nbsp;&nbsp;&nbsp;
					<Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} style={{width:'55%'}} >Search</Button>							
				</Grid>
			</Grid>
		  </Grid> 
		  <Grid container spacing={1}>
		      	<Grid item xs={12} style={{textAlignLast:'center',height:'30px',paddingTop:'5px'}}>
		      		{expanded?<ExpandLess onClick = {handleExpandClick} style={{color:'#00acc1'}}/>:<ExpandMore onClick = {handleExpandClick} style={{color:'#00acc1'}}/>}
		      	</Grid>
		  </Grid>
          </CardBody>
        </Card>
	   </GridItem>
      <GridItem xs={12}>
      	
		    <Card style={{marginTop:'5px',marginBottom:'5px'}}>
		    <span style={{textAlign: "end",color:"#000000", paddingRight:"20px", paddingTop:"5px"}}>[ Data Count: {trackingList.length}건 / {totCnt}건 ]</span>
				<CardBody style={{padding:'0px'}}>
					<Table
						tableHeaderColor="info"
						tableRownum={numCnt}
						tableData={trackingList}
						onClickHandle ={handleAddRow}
						onLoginPage ={handelLoginOpen}
						store={store}
		            />
		            {trackingList.length > 0?
		            <div className={"fixed-plugin"} style={{top:'85%',width:'45px',right:'2%',borderRadius:'8px'}}>
					    <div onClick={handleClick}>
					    	<Tooltip title="Scroll Top">
					    		<i className="fa fa-angle-double-up fa-3x" style={{color:'white'}}/>
					    	</Tooltip>
					    </div>
					</div>:null
		            }
				</CardBody>
			</Card>
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
