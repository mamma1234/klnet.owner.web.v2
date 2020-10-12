import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Grid from '@material-ui/core/Grid';
//import Select from '@material-ui/core/Select';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
//import AppBar from '@material-ui/core/AppBar';
//import Toolbar from '@material-ui/core/Toolbar';
//import { Alert,AlertTitle } from '@material-ui/lab';

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
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';
//import FormGroup from '@material-ui/core/FormGroup';
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
//import Tooltip from '@material-ui/core/Tooltip';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

import AssignmentOutlinedIcon from '@material-ui/icons/AssignmentOutlined';
import TodayOutlinedIcon from '@material-ui/icons/TodayOutlined';
import ListAltOutlinedIcon from '@material-ui/icons/ListAltOutlined';
//import StarIcon from '@material-ui/icons/StarBorder';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
// other import
import axios from 'axios';
import moment from 'moment';
import ScheduleToggleTable from "views/Pages/Schedule/ScheduleDetailTable.js";
import SchLinePicPop from "views/Pages/Schedule/SchLinePicPop.js";


import CustomTabs from "components/CustomTabs/CustomScheduleTabs.js";

import { Calendar as BigCalendar, momentLocalizer } from "react-big-calendar";
//import "views/Pages/Schedule/react-big-calendar.css";

import Popover from "@material-ui/core/Popover";
//import Typography from '@material-ui/core/Typography';

import SchDetailPop from "views/Pages/Schedule/SchDetailPop.js";

//import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import Checkbox from '@material-ui/core/Checkbox';
//import Box from '@material-ui/core/box';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import {userService} from 'views/Pages/Login/Service/Service.js';
//import { useCookies } from 'react-cookie';
//import { observer, inject} from 'mobx-react'; // 6.x

//import { events as calendarEvents } from "variables/general.js";
//import SweetAlert from "react-bootstrap-sweetalert";

//import styles2 from "assets/jss/material-dashboard-pro-react/components/buttonStyle.js";

const localizer = momentLocalizer(moment);

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;



  
/*  const tileData = [
   {
     img: require('assets/img/carrier/CMA.gif'),
     title: 'CMA',
   },   
   {
	img: require('assets/img/carrier/APL.gif'),
	title: 'APL',
  },
  {
	img: require('assets/img/carrier/HAS.gif'),
	title: 'HEUNG-A',
  },
 ]; */
 


//const useStyles2 = makeStyles(styles2);

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
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
    marginTop: "0px",
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

export default function ScheduleList(props) {
//const ScheduleList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 

  //const setDate = new Date();
  const setEndDate = new Date();
  const [carrierCode,setCarrierCode] = useState("");
  const [sPort,setSPort] = useState("");
  const [ePort,setEPort] = useState("");
  const [vesselName,setVesselName] = useState("");
  const [selectData,setSelectData] = useState([]);
  const [portData,setPortData] = useState([]);
  const [scheduleData,setScheduleData] = useState([]);
  const [tileData,setTileData] = useState([]);
  const [sDate,setSDate] = useState(new Date());
  const [eDate,setEDate] = useState(setEndDate.setDate(setEndDate.getDate()+6));
  const [eWeek,setEWeek] = useState("4 week");
  const [formatter,setFormatter] = useState("yyyy-MM-dd");
  const [state, setState] = React.useState({
	checkedA: false,
	pop2: false,
	line_code: ""
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  const [anchorEl, setAnchorEl] = useState(null);

  const [detailParam, setDetailParam] = useState(null);
  //const {token} = props;

//console.log(">>>>",store);
  //const [cDate,setCDate] = useState(new Date());

  const [tapNum,setTapNum] = useState(0);

  //const [cookies, setCookie] = useCookies(['name']); 

  const handleTapsClick = (e) => {
	  debugger;
	setTapNum(e);
	if(e==1) {
		const nDate = new Date(sDate);
		const pDate = nDate.setDate(1);
		setSDate(pDate);
		setFormatter("yyyy-MM");
		onSubmit(null,pDate,nDate,e);
	} 
	
	if (e==0) {
		setFormatter("yyyy-MM-dd");
		onSubmit(null,null,null,e);
	}

	if(e==2) getServiceCarrierList();
  }

  const handleEWeek = (e) => {
	// console.log("xx",e.target.value);
	setEWeek(e.target.value);	  
 }


  
  useEffect(() => {
		console.log('effect');
		//debugger;
		const token = userService.GetItem()?userService.GetItem().token:null;
		if(token) {
		    axios.post("/sch/getCarrierInfo",{},{headers:{'Authorization':'Bearer '+token}}).then(res => setSelectData(res.data));
		    //.then(res => console.log(JSON.stringify(res.data)));
		}
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  const onCarrierChange = (e,data) => {
	  //debugger;

	  let multiCarrier = "";

	for (let index in data) {
		console.log(data[index].line_code);

		multiCarrier = multiCarrier + "'" + data[index].line_code + "'";

		if(data.length-1 != index) multiCarrier = multiCarrier + ",";
	}

	  
	  if(data) {setCarrierCode(multiCarrier);} else {setCarrierCode("");}
	  
  }
  
  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    const token = userService.GetItem()?userService.GetItem().token:null;
	    if(values != undefined && values != "" && values.length >= 2) {
	    	if(token) {
		    	axios.post("/sch/getPortCodeInfo",{ portCode:values},{headers:{'Authorization':'Bearer '+token}})
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

  
  const onSPortChange = (e,data) => {
	  if(data) {
		  setSPort(data.port_code);
	  } else {
		  setSPort("");
	  }
  }

  const onEPortChange = (e,data) => {
	  if(data) {
		  setEPort(data.port_code);
	  } else {
		  setEPort("");
	  }
  }
  
  const onSubmit = (e,sPDate,ePDate,eTabnum) => {

	//debugger;
	const token = userService.GetItem()?userService.GetItem().token:null;
	if(eTabnum == undefined && tapNum==2) {
		getServiceCarrierList();
	} else {

	  //let sQDate = "";
	  //let eQDate = "";
	  //let pTapnum = "";
	  
/* 	  if (sPDate != undefined) {
		sQDate = sPDate;
	  } else {
		sQDate = sDate;
	  }
	 
	  if (ePDate != undefined) {
		eQDate = ePDate;
	  } else {
		eQDate = eDate;
	  } */

/* 	  if (eTabnum != undefined) {
		pTapnum = eTabnum;
	  } else {
		pTapnum = tapNum;
	  } */

	
	  //search
	
	//console.log("SUBMIT",store.token);
		if(token) {
		  
		  axios.post("/sch/getScheduleList",{ carrierCode:carrierCode,
			  								  startDate:moment(sPDate != undefined ? sPDate:sDate).format('YYYYMMDD'),
												endDate:moment(ePDate != undefined ? ePDate:eDate).format('YYYYMMDD'),
												eWeek:eWeek,tapNum:eTabnum != undefined ? eTabnum:tapNum,
			  								  startPort:sPort,
			  								  endPort:ePort,
												vesselName:vesselName,
												direct:state.checkedA
		  									},{headers:{'Authorization':'Bearer '+token}})
			.then(setScheduleData([])).then(res => setScheduleData(res.data))
		    .catch(err => {
		        if(err.response.status === 403||err.response.status === 401) {
		        	props.openLogin();
				}
		    });
		} else {
			props.openLogin();
		}
		//if(sDate.toString() != "Invalid Date") {
		//	setCDate(sDate);
		//}
	}
  }

  function getServiceCarrierList() {
	  
	const token = userService.GetItem()?userService.GetItem().token:null;
	if(token) {
		  return axios ({
			url:'/sch/getServiceCarrierList',
			method:'POST',
			data: {startPort:sPort,
				endPort:ePort
				 },
			headers:{'Authorization':'Bearer '+token}
		  }).then(setTileData([])).then(res => setTileData(res.data))
		  .catch(err => {
			if(err.response.status === 403||err.response.status === 401) {
				props.openLogin();
			}
		});
	} else {
		
		props.openLogin();
	}
	console.log(tileData[0]);
}
  
  const classes = useStyles();

  //const classes2 = useStyles2();
  //const [events, setEvents] = React.useState(calendarEvents);
  //const [alert, setAlert] = React.useState(null);
  const selectedEvent = (event,e) => {
	//window.alert(event.title);
	//debugger;
	setDetailParam(event);
	setAnchorEl(e.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

/*   const handleClick = (event) => {
	  debugger;
    setAnchorEl("testpop");
  }; */
  
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigatedEvent = date => {
 	  //debugger;
	  const nDate = new Date(date);
	  const pDate = nDate.setDate(1);
	setSDate(pDate);
	nDate.setMonth( nDate.getMonth() + 1); 
	setEDate(nDate.setDate(0));
	console.log(moment(sDate).format('YYYYMMDD') + moment(eDate).format('YYYYMMDD'));
	onSubmit(null,pDate,nDate,null);
  };

  const handleClick2 = (e,line_code) => {
	  debugger;
    setState({pop2:true, line_code:line_code});
  };

  const handleClose2 = () => {
    setState({pop2:false});
  };
  

  /*
  const addNewEventAlert = slotInfo => {
    setAlert(
      <SweetAlert
        input
        showCancel
        style={{ display: "block", marginTop: "-100px" }}
        title="Input something"
        onConfirm={e => addNewEvent(e, slotInfo)}
        onCancel={() => hideAlert()}
        confirmBtnCssClass={classes.button + " " + classes.success}
        cancelBtnCssClass={classes.button + " " + classes.danger}
      />
    );
  };
  const addNewEvent = (e, slotInfo) => {
    var newEvents = events;
    newEvents.push({
      title: e,
      start: slotInfo.start,
      end: slotInfo.end
    });
    setAlert(null);
    setEvents(newEvents);
  };
  const hideAlert = () => {
    setAlert(null);
  };

  const eventColors = event => {
    var backgroundColor = "event-";
    event.color
      ? (backgroundColor = backgroundColor + event.color)
      : (backgroundColor = backgroundColor + "default");
    return {
      className: backgroundColor
    };
  };
  */
  

  return (
       <Card style={{marginBottom:'0px'}}>
  			<CardHeader color="info" icon style={{height:'10px'}}>
			<CardIcon color="info" style={{padding:'0'}}>
				<Assignment />
			</CardIcon>			
		</CardHeader>
        <CardBody >
        	<Card style={{marginTop:'0',marginBottom:'5px'}}>
				<CardBody style={{paddingTop:'5px',paddingBottom:'5px'}}>
			      	<GridContainer spacing={1}>
			      				<GridItem xs={12} sm={4}>
								  <Autocomplete
					        			options = {portData}
					        			getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
					        			id="start"
					        			onChange={onSPortChange}
					        			onInputChange={onPortSearchValue}
					        			renderInput={params => (
					        					<TextField {...params} label="Origin"  fullWidth />
					        			)}
					        		/>
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
									<Autocomplete
					        			options = {portData}
					        			getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
					        			id="end"
					        			onChange={onEPortChange}
					        			onInputChange={onPortSearchValue}
					        			renderInput={params => (
					        				<TextField {...params} label="Destination"  fullWidth />
					        			)}
					        		/>
					        	</GridItem>
								<GridItem xs={12} sm={4}>
								{tapNum != 2 && (<CalendarBox
					        			labelText ="Start Date"
										id="portDate"
										disabled={tapNum != 0}
					      				format={formatter}
					      				setValue={sDate}
					        			onChangeValue={date => setSDate(date)}
					        			formControlProps={{fullWidth: true}}
					        	  	/>)}
					        	</GridItem>
{/* 					        	<GridItem xs={12} sm={4}>
									<TextField id="vesselName" label="Vessel Name" onChange={event => setVesselName(event.target.value)} value={vesselName} fullWidth />
					        	</GridItem> */}
					        	<GridItem xs={12} sm={4}>
								{tapNum != 2 && (<FormControl fullWidth >
									<InputLabel></InputLabel>
									<Select 
									native
									id = "portDateWeek"
									disabled={tapNum != 0}
									value={eWeek}
									label=""
									onChange={handleEWeek}
									style={{marginTop:'13px'}}
									>
									<option value="2 week">2 Weeks Out</option>
									<option value="4 week">4 Weeks Out</option>
									<option value="6 week">6 Weeks Out</option>
									<option value="8 week">8 Weeks Out</option>
									</Select>
									</FormControl>)}
{/* 					        		<CalendarBox
					        			labelText ="입항일자"
					        			id="portDate"
					        			format="yyyy-MM-dd"
					        			setValue={eDate}
					        		    onChangeValue={
											date => setEDate(date)
										}
					        			formControlProps={{fullWidth: true}}
					        		/> */}
					        	</GridItem>
					        	<GridItem xs={12} sm={4}>
								{tapNum != 2 && (<Autocomplete
									disabled={tapNum == 2}
										size="small"
										multiple
										options = {selectData}
										disableCloseOnSelect
										limitTags={1}
					        			getOptionLabel = { option => option.line_name }
					        			id="carrierCode"
					        			onChange={onCarrierChange}
					        			renderInput={params => (
					        				<TextField {...params} label="Carrier" fullWidth />
										)}
										renderOption={(option, { selected }) => (
											<React.Fragment>
											  <Checkbox
												icon={icon}
												checkedIcon={checkedIcon}
												style={{ marginRight: 8 }}
												checked={selected}
											  />
											  {option.line_name}
											</React.Fragment>
										  )}
					        		/>)}
					        	</GridItem>
								<GridItem xs={12} sm={4}>
								{tapNum != 2 && (<FormControlLabel style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '0px',paddingRight: '15px'}}
								control={
								<Checkbox checked={state.checkedA} color="default" 
								onChange={handleChange} name="checkedA" />}
								label="Direct Only">
									</FormControlLabel>)}
								</GridItem>
		        	</GridContainer>   	
		          </CardBody>
		          </Card>
		          <GridItem xs={12} style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
			      	<GridItem xs={12} sm={3} md={2} style={{textAlign:'center'}}>
				      {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
				      {/* <Button color="info" onClick = {onSubmit}  >조회</Button>*/}
				      <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>}  fullWidth>Search</Button>
				      {/* <Button color="info" >삭제</Button>
				      <Button color="info" //onClick = {Download} 
				        id='btnExport' >엑셀다운로드</Button> */}
				    </GridItem>
			    </GridItem>
			    
		          
				<div>
					<div style={{position:"absolute",zIndex:"1",right:"50px",top:"23px",display:"none"}}>
				    <Button size="sm" color="linkedin" target="_blank" href={"https://new.portmis.go.kr/portmis/websquare/websquare.jsp?w2xPath=/portmis/w2/si/pmb/mbrp/info/UI-SI-MBRP-201-51.xml&menuCd=M9106&menuNm=%BC%B1%BB%E7%BA%B0%20%BF%EE%C0%D3%B0%F8%C7%A5%20%B8%AE%BD%BA%C6%AE&w2xHome=/portmis/w2/main/&w2xDocumentRoot="}>해양수산부 운임 공표 조회</Button>
				    </div>
				  
				  <div style={{position:"relative",zIndex:"0"}}>
					  <CustomTabs headerColor="info"
					  handleTapsClick={handleTapsClick}
					  tabs={[
						  {
							tabName: "List"
							,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (
									<div>
									<div style={{textAlign: "end"}}>
									<span style={{textAlign: "end",paddingBottom: '0px',color:"#000000", paddingRight:"10px", paddingTop:"0px"}}>Total:{scheduleData.length}건</span>
									</div>
          			<GridContainer>
          			{/*<h5 style={{paddingBottom: '0px',paddingTop: '0px',paddingLeft: '15px',paddingRight: '15px',fontWeight:'bold',marginTop:'0px',marginBottom:'0px' }}>※ {scheduleData.length} 건 검색 완료</h5>*/}
						
						<GridItem xs={12}>
          					<ScheduleToggleTable 
		                        tableHeaderColor="info"
		                        tableHead={["Carrier", "Vessel Name", "Voyage No", "Origin", "Destination", "Charge", "T/Time", "T/S", "Booking"]}
								tableData={scheduleData}
		                     /> 
		                </GridItem>
					</GridContainer></div>
							)
							},{
								tabName: "Calendar"
								//,tabIcon: Face
								,tabIcon: (TodayOutlinedIcon)
								,tabContent: (
									<GridContainer justify="center">
									<GridItem xs={12}>
									  <Card>
										<CardBody calendar>
										  <BigCalendar 
											selectable
											localizer={localizer}
											//events={events}
											events={scheduleData
/* 												[{
													title: "CMA CGM VOLGA\n0BX56E1MA",
													allDay: false,
													start: new Date(2020, 3, 10, 10, 0),
													end: new Date(2020, 3, 10, 11, 0)
												},
												{
													title: "SM JAKARTA\n1917W",
													allDay: false,
													start: new Date(2020, 3, 14),
													end: new Date(2020, 3, 14)
												},
												{
													title: "TEST\n12345",
													allDay: false,
													start: new Date(2020, 3, 14),
													end: new Date(2020, 3, 14)
												}
												] */
											}
											defaultView="month"
											popup
											//views={['month','agenda']}
											views={["month"]}
											scrollToTime={new Date(1970, 1, 1, 6)}
											//defaultDate={new Date()}
											defaultDate={new Date(sDate)}
											onSelectEvent={(event,e) => selectedEvent(event,e)}
											//onSelectSlot={slotInfo => addNewEventAlert(slotInfo)}
											//eventPropGetter={eventColors}
											onNavigate={date => navigatedEvent(date)}
											//elementProps={{ onClick: e => selectedEvent(e.currentTarget,e.event)}}
											style={{height: "700px"}}
										  />
										<Popover
											id={id}
											open={open}
											anchorEl={anchorEl}
											onClose={handleClose}
											anchorReference="anchorPosition"
											anchorPosition={{top:80,left:550}}
											anchorOrigin={{vertical:'bottom',horizontal:'center',}}
											transformOrigin={{vertical:'top',horizontal:'center',}}
										>
											<SchDetailPop
												detailParam = {detailParam} //store={token}
											/>
										</Popover>
										</CardBody>
									  </Card>								  
									</GridItem>

								  </GridContainer>
								)
					 },
					 {
						tabName: "Carrier List"
						,tabIcon: (ListAltOutlinedIcon)
						,tabContent: (
				  <GridContainer>
					  <GridItem xs={12}>
					  <div className={classes.root}>
      <GridList cellHeight={180} className={classes.gridList}>
        <GridListTile key="Subheader" cols={2} style={{ height: 'auto' }}>
          <ListSubheader component="div"></ListSubheader>
        </GridListTile>
        {tileData.map((tile) => (
          <GridListTile key={tile.rownum} style={{ height: '150px',width:'400px'}}>
          <div align='center'>
		<img src={require("assets/img/carrier/"+tile.img+".gif")} alt={tile.title} width='100' height='100' />
		</div>
            <GridListTileBar  
			  title={
				<IconButton className={classes.cardTitleWhite} onClick={(e) => handleClick2(e,tile.line_code)} size="small">{tile.title}
			  </IconButton>
			}
              //subtitle={<span>by: {tile.author}</span>}
              actionIcon={tile.line_url && (
                <IconButton target="_blank" href={tile.line_url}>
                  <InfoIcon className={classes.cardTitleWhite}/>
                </IconButton>)
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
	<Popover
                    id="pop2"
                    open={state.pop2}
                    onClose={handleClose2}
                    anchorReference="anchorPosition"
                    anchorPosition={{top:80,left:550}}
                        anchorOrigin={{vertical:'bottom',horizontal:'center',}}
                        transformOrigin={{vertical:'top',horizontal:'center',}}
                  >
											<SchLinePicPop
												detailParam = {state} //store={token}
											/>
                  </Popover>
					</GridItem>
				</GridContainer>
						)
						}
					 ]}>   
					</CustomTabs>
					</div>
					</div>
					<h6 style={{paddingBottom: '0px',paddingTop: '0px',paddingLeft: '15px',paddingRight: '15px',color:'red',fontWeight:'bold' }}>※ 상기 스케줄은 실제 운항 스케줄과 상이할수 있습니다. 업무 진행시 선사와 필히 확인하시기 바랍니다.</h6>

          </CardBody>
        </Card>

  );
}
//))
//export default ScheduleList;