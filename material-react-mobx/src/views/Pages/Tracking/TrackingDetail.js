import React,{useState} from "react";

import PropTypes from "prop-types";
// @material-ui/core components

import {Hidden,Select,Table,Grid,TableHead,TableRow,TableBody,TableCell,TableContainer,TableFooter,Popover,Box,Collapse,Typography} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


import ShipMap from "components/Map/ShipMap.js";
//import GridContainer from "components/Grid/GridContainer.js";
import TableList from "components/Table/TableSmallLine.js";
import TablesUniPass from "components/Table/TablesUniPass.js";
import GridItem from "components/Grid/GridItem.js";
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Draggable from 'react-draggable';
//import Card from "components/Card/Card.js";
//import Access from "@material-ui/icons/AccessAlarm";
import Assign from "@material-ui/icons/AssignmentTurnedIn";

import Icon from '@material-ui/core/Icon';
import MapIcon from "@material-ui/icons/Map";
import CustomIcon from "@material-ui/icons/AccountBalanceSharp";
import TerminalIcon from "@material-ui/icons/LocalShippingOutlined";
//import ActListIcon from "@material-ui/icons/ListAlt";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";
import TackingMap from "components/Map/TrackingMap.js"
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoatOutlined';
import CurrentList from "views/Pages/Tracking/Current/TrackingCurrent.js";
import CntrListTable from "views/Pages/Tracking/Terminal/TrackingCntrList.js";
//import Slider from "components/Slide/Slider.js";
import Button from "components/CustomButtons/Button.js";
// page
import TerminalImp from "views/Pages/Tracking/TrackingImpTerminal.js";
import TerminalExp from "views/Pages/Tracking/TrackingExpTerminal.js";
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

const tableStyles = makeStyles(styles);

const useStyles = makeStyles(theme => ({

	  tableMainHeaderCell: {
	      textAlign: 'left',
	      backgroundColor: '#f2fefd',      
	    },
	    tableMainDtlCell: {
	        textAlign: 'left',
	        padding:'7px',   
	      },
	  tableDtlHeaderCell: {
		  textAlign: 'center',
		  paddingTop:'0',
		  paddingBottom:'0',
		  backgroundColor: '#f2fefd',
		  border:'1px solid silver' 
	  },
	  tableDtlBodyCell: {
		  backgroundColor: 'white',
		  paddingTop:'0',
		  paddingBottom:'0',
		  border:'1px solid silver' 
	  }, 
	  


	  
	}));

const useStyles2 = makeStyles({
	container: {
		maxHeight:590,
	}
});
const mainPanel = React.createRef();

export default function TrackingDetail (props) {
	  const classes = tableStyles();
	  const [deviceStyle,setDeviceStyle] = React.useState("inherit");
	  //const classes = useStyles();

	  React.useEffect(() => {
			
		    if (window.innerWidth <= 960) {
		    	console.log("windows size:",window.innerWidth);
		    	setDeviceStyle("auto");
		      } else {
		    	  console.log("windows size:",window.innerWidth);
		    	  setDeviceStyle("inherit");
		      }
		    
		  });
	  
	  const {
		  tableData, tableHeaderColor, tableRownum,token,curpage
	  } = props;
	  
	  const [curPage,setCurPage] = useState(curpage);

	  
	  const tableCellClasses =
	      classes.tableHeadCell +
	      " " +
	      classes.tableCell;
	  
	  function  BodyData() {
		      
    		  return ( 
    				  tableData.map((prop, key) => ( 
    				  <RowTable key={key} row={prop} />
              ))
              );
	  }
	  
	  const handleAddFunction = () => {
		    props.onClickHandle(curPage);
	  }  
	  
	  const handleCurPage = (event) => {
		  setCurPage(event.target.value);
	  }
	  
	  return ( 
		        <div  className={classes.tableResponsive} style={{marginTop:'0px',overflowX:deviceStyle}}>

			    	<Table stickyHeader className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
			          <TableHead  className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px'}} id="scroll_top">
			            <TableRow >
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'15%',fontWeight:'bold',color:'#717172'}} >(B/K NO.)<br/>B/L NO.</TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'2%',fontWeight:'bold',color:'#717172'}} >IMPORT(I)<br/>EXPORT(E)</TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'3%',fontWeight:'bold',color:'#717172'}} >CARRIER</TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'4%',fontWeight:'bold',color:'#717172'}} >VESSEL/VOYAGE</TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172'}} >LAST STATUS</TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'12%',fontWeight:'bold'}} ><font color="#717172">POL<br/><font color="orange">ETD</font>/<font color="blue">ATD</font>(<font color="red">TO</font>)</font></TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'12%',fontWeight:'bold'}} ><font color="#717172">POD<br/><font color="orange">ETA</font>/<font color="blue">ATA</font>(<font color="red">TO</font>)</font></TableCell>
			                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'2%',fontWeight:'bold',color:'#717172'}} >MORE</TableCell>
			            </TableRow>
			          </TableHead>
			        <TableBody >
			           {
			              tableData.map((prop, key) => {
			                  return (
			                    <RowTable key={key} index={key + 1} data={prop} token={token} color={tableHeaderColor} />
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
							>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData[0].tot_page}&nbsp;)</Button>
							&nbsp;&nbsp;&nbsp;				
							<Select
					          native
					          id = "CURPAGE"
					          value={curPage}
					          label=""
					           onChange={handleCurPage}
					        >
					        <option value="10">10</option>
					        <option value="20">20</option>
					        <option value="30">30</option>
					        </Select>
					    </TableCell>
			        	</TableRow>
			        </TableFooter>: null )}
			      </Table>
	
	    </div>
	  );
	}

function RowTable(props: { data: ReturnType<typeof createData> }) {
	  
	  const { data,index,token,color } = props;
	  const [openMap,setOpenMap] = useState(false);
	  const [openTrackingMap,setOpenTrackingMap] = useState(false);
	  const [openPopup,setOpenPopup] = useState(false);
	  const [openCurrent,setOpenCurrent] = useState(false);
	  const [bookmarkIcon,setBookmarkIcon] = useState(data.book_mark?data.book_mark:"N");
	  
	  const [iconstate,setIconstate] = useState("add_circle");
	  const [borderBottomStyleValue,setBorderBottomStyleValue] = useState("1px solid #e0e0e0");
	  
	  const [importUniPassList,setImportUniPassList] = useState([]);
	  const [exportUniPassList,setExportUniPassList] = useState([]);
	  const [demdetlist,setDemdetlist] = useState([]);
	  const [terminalPosition,setTerminalPosition] = useState([]);
	  const [polyRender,setPolyRender] = useState([]);
	  const [seq,setSeq] = useState(0);
	  
	  const startColor = data.start_db ==="E"?"orange":"BLUE";
	  const endColor = data.end_db ==="E"?"orange":"BLUE";
	     
	  
	  const [open, setOpen] = React.useState(false);
	  
	  
	  const classes = useStyles();
	  const tableClasses = tableStyles();
	  
	  const handleStarClick = () => {

			  axios.post("/loc/setUserBLUpdate",
					     {blbk : data.bl_bkg,reqseq: data.req_seq,
				          ietype: data.ie_type,
				          bookmark : data.book_mark === "Y"?"N":"Y"
				         },
					     {headers:{'Authorization':'Bearer '+token}})
			    .then(setBookmarkIcon(bookmarkIcon === "Y"?"N":"Y"))
			    .catch(err => {
			        if(err.response.status === 403||err.response.status === 401) {
			        	props.openLogin();
					}
			    });		  
	  }
	  
	  const handleCollOpen = () => {
		  if (!open) {
			  if( "E" === data.ie_type ) {
					// 수출
					//console.log( '수출', this.props.data.ie_type, this.props.data.bl_yy);
					__getUniPassExport();
					__getTrackingGoogleMap();
					__getExportTerminalActivity();

				} else if( "I" === data.ie_type ) {
					// 수입
					console.log('수입', data.ie_type, data.bl_yy);
					__getUniPassImport();
					__getTrackingGoogleMap();
					__getImportTerminalActivity();
				}
			  setBorderBottomStyleValue("1px dotted #e0e0e0");
			  setIconstate("remove_circle");
			  setOpen(true);
		  } else {
			  setBorderBottomStyleValue("1px solid #e0e0e0");
			  setIconstate("add_circle");
			  setOpen(false);
		  }		  
	  }
	  
	//컨테이너 이동 현황
	  const handleCntrClick = (event) => {
		  console.log("cntrList",event);
		  //this.setState({ openPopup: true , seq: event});
		  setOpenPopup(true);
		 
	  }
	  //선박 추적 맵
	  const handleClickMapOpen = () => {
		  //console.log("map");
		  //this.setState({ openMap: true });
		  setOpenMap(true);
	  }
	  //국내 화물 트래킹 맵
	  const handleClickTrackingMap = () => {
		  //console.log("TrackingMap");
		  //this.setState({ openTrackingMap : true})
		  setOpenTrackingMap(true);
	  }
	  //current
	  const handleClickOpen = () => {
		  //this.setState({ openCurrent: true }); 
		  setOpenCurrent(true);
	  }
	  
	  const handleClickClose = () => {
		 // this.setState({ openPopup: false, openMap: false ,openCurrent: false,openTrackingMap: false});
		  setOpenMap(false);
		  setOpenPopup(false);
		  setOpenTrackingMap(false);
		  setOpenCurrent(false);
		  
	  }
	  
	  const __makeDateFormatFromString = (params) => {
			let message = ''
				if( params === '' ) {
					message = ''
				} else {
					if( params.length === 14 ) {
						let yyyy = params.substr(0,4);
						let mm = params.substr(4,2);
						let dd = params.substr(6,2);
						let hh = params.substr(8,2);
						let mi = params.substr(10,2);
						message = yyyy+"-"+mm+"-"+dd+" "+hh+":"+mi;
					} else if (params.length === 8 ) {
						let yyyy = params.substr(0,4);
						let mm = params.substr(4,2);
						let dd = params.substr(6,2);
						message = yyyy+"-"+mm+"-"+dd;
					}
				}
				return message;
			  }
	  
	// 세관정보 API 수출용
		const __getUniPassExport = () => {
			return axios ({
				url:'/com/uniPassApiExportAPI002',
				method:'POST',
				headers:{'Authorization':'Bearer '+token},
				data: {
					mblNo: data.bl_bkg
				}
			})
		    .then(res => {
				// console.log( res.data );
				let returnList = [];
				res.data.forEach( element => {
					let returnValue = [];
					if( 'NO_DATA' === element.message ) {
						returnValue.push( '' );
						returnValue.push( '관세청 유니패스 바로가기' );
						returnValue.push( '' );
					} else {
						returnValue.push( element.exp_dclr_no);
						returnValue.push( __makeDateFormatFromString(element.tkof_dt));
						returnValue.push( element.shpm_cmpl_yn);
						// 3번째 MBL(M), HBL(H), DECLARE(D)
						// 4번째 MBLNO or HBL NO
						returnValue.push( "DECLARE");
						returnValue.push( element.exp_dclr_no);
						// 5번째 수출(/svc/customsExp) 수입("/svc/customImp") 구분
						returnValue.push( "/svc/unipassapi?tabvalue=1" );
					}
					returnList.push(returnValue);
				});
				setExportUniPassList(returnList);
			})
		    .catch(err => {
		        console.log(err);
		    });
		}

		// 세관정보 API 수입용
		const __getUniPassImport = () => {
			// console.log(props);

			return axios ({
				url:'/com/uniPassApiExportAPI001',
				method:'POST',
				headers:{'Authorization':'Bearer '+token},
				data: {
					blYy : data.bl_yy,
					mblNo: data.bl_bkg
				}
			})
		    .then(res => {
				let returnList = [];
				res.data.forEach( element => {
					// console.log( element );
					let returnValue = [];
					if( 'NO_DATA' == element.message ){
						returnValue.push( '' );
						returnValue.push( '관세청 유니패스 바로가기' );
						returnValue.push( '' );
					} else {
						// 0번째 MBL번호 HBL 번호 조합
						if( element.hbl_no === undefined || element.hbl_no === 'undefined' ){
							returnValue.push( element.mbl_no);
						} else {
							returnValue.push( element.mbl_no+ "-"+element.hbl_no);
						}
						// 1번째 DATE
						returnValue.push( element.clearance+"("+__makeDateFormatFromString(element.clearance_date)+")");
						// 2번째
						returnValue.push( element.mt_trgt_carg_yn_nm);
						// 3번째 MBL(M), HBL(H)
						// 4번째 MBLNO or HBL NO
						if( element.hbl_no === undefined || element.hbl_no === 'undefined' ){
							returnValue.push( "MBL");
							returnValue.push( element.mbl_no);
						} else {
							returnValue.push( "HBL");
							returnValue.push( element.hbl_no);
						}
						// 5번째 수출(/svc/customsExp) 수입("/svc/customsImp") 구분
						returnValue.push( "/svc/unipassapi?tabvalue=0" );
					}
					returnList.push(returnValue);
				});
				setImportUniPassList(returnList);
			})
		    .catch(err => {
		        console.log(err);
		    });
		}

		// TERMINAL ACTIVITY 조회
		const __getImportTerminalActivity = () => {

			let eta = '';
			if ( null != data.end_day) {
				eta = data.end_day.replace(/\//gi, '');
			}
			return axios ({
				url:'/loc/getImportTerminalActivity',
				method:'POST',
				headers:{'Authorization':'Bearer '+token},
				data: {
					req_seq : data.req_seq,
					ie_type: data.ie_type,
					vsl_code :'',
					vsl_name :data.max_vsl_name,
					voyage_no:data.voyage,
					eta:eta,
					pod:data.pod_cd,
					carrier_code:data.carrier_code,
					ie_type:data.ie_type,
					bl_bkg:data.bl_bkg
				}
			})
			.then(res => {
				console.log(res.data);
				setDemdetlist(res.data); 
			})
		    .catch(err => {
		        console.log(err);
		    });

		}
		const __getExportTerminalActivity = () => {
			let etd = '';
			if ( null != data.start_day ) {
				etd = data.start_day.replace(/\//gi, '');
			}
			return axios ({
				url:'/loc/getExportTerminalActivity',
				method:'POST',
				headers:{'Authorization':'Bearer '+token},
				data: {
					req_seq : data.req_seq,
					ie_type: data.ie_type,
					vsl_name :data.vsl_name,
					voyage_no:data.voyage,
					etd:etd,
					pol:data.pol_cd,
					carrier_code:data.carrier_code,
					ie_type:data.ie_type,
					bl_bkg:data.bl_bkg
				}
			})
			.then(res => {
				//console.log(res.data);
				setDemdetlist(res.data); 
			})
		    .catch(err => {
		        console.log(err);
		    });

		}
	  
		//국내 화물 트래킹 데이터 수집 
	  	const __getTrackingGoogleMap = () => {
			return axios ({
				url:'/loc/getTrackingTerminal',
				method:'POST',
				headers:{'Authorization':'Bearer '+token},
				data: {ie_type:data.ie_type,
					   req_seq:data.req_seq,
					}
			}).then(res => {
				
			   console.log("res.data:",res.data);
				const params = res.data;
				let terminalPosition = [];
				let polyRender = [];
				if( params.length > 0){
					if (data.ie_type === "I") {
					  if(params[0].unload_terminal !== null) {
						terminalPosition.push({time:params[0].unload_date,terminal:params[0].unload_terminal, wgs84_x:params[0].unload_terminal_x, wgs84_y: params[0].unload_terminal_y,work_name:'양하'});
			
						if(params[0].full_outgate_terminal !== null && params[0].mt_outgate_terminal === null) {
						  terminalPosition.push({time:params[0].full_outgate_date,terminal:params[0].full_outgate_terminal, wgs84_x:params[0].full_outgate_terminal_x, wgs84_y: params[0].full_outgate_terminal_y, work_name:'풀컨테이너 반출'});
			
						  if(params[0].mt_ingate_terminal !== null) {
							terminalPosition.push({time:params[0].mt_ingate_date, terminal:params[0].mt_ingate_terminal, wgs84_x:params[0].mt_ingate_terminal_x, wgs84_y: params[0].mt_ingate_terminal_y, work_name:'공컨테이너 반입'});
							
						  }
			
						}else if(params[0].full_outgate_terminal === null && params[0].mt_outgate_terminal !==null) {
						  terminalPosition.push({time:params[0].mt_outgate_date, terminal:params[0].mt_outgate_terminal, wgs84_x:params[0].mt_outgate_terminal_x, wgs84_y: params[0].mt_outgate_terminal_y, work_name:'공컨테이너 반출'});
						  if(params[0].mt_ingate_terminal !== null) {
							terminalPosition.push({time:params[0].mt_ingate_date, terminal:params[0].mt_ingate_terminal, wgs84_x:params[0].mt_ingate_terminal_x, wgs84_y: params[0].mt_ingate_terminal_y, work_name:'공컨테이너 반입'});
							
						  }
						}else {
			
						}
					  }
			
					}else if(data.ie_type === "E") {
					  if(params[0].mt_outgate_terminal != null) {
						terminalPosition.push({time:params[0].mt_outgate_date,terminal:params[0].mt_outgate_terminal, wgs84_x:params[0].mt_outgate_terminal_x, wgs84_y: params[0].mt_outgate_terminal_y, work_name:'공컨테이너 반출'});
						if(params[0].full_ingate_terminal !== null && params[0].mt_ingate_terminal === null) {
						  terminalPosition.push({time:params[0].full_ingate_date,terminal:params[0].full_ingate_terminal, wgs84_x:params[0].full_ingate_terminal_x, wgs84_y: params[0].full_ingate_terminal_y, work_name:'풀컨테이너 반입'}); 
						}else if(params[0].full_ingate_terminal === null && params[0].mt_ingate_terminal !== null) {
						  terminalPosition.push({time:params[0].mt_ingate_date,terminal:params[0].mt_ingate_terminal, wgs84_x:params[0].mt_ingate_terminal_x, wgs84_y: params[0].mt_ingate_terminal_y, work_name:'공컨테이너 반입'}); 
						}else if(params[0].full_ingate_terminal !== null && params[0].mt_ingate_terminal !== null) {
						  terminalPosition.push({time:params[0].full_ingate_date,terminal:params[0].full_ingate_terminal, wgs84_x:params[0].full_ingate_terminal_x, wgs84_y: params[0].full_ingate_terminal_y, work_name:'풀컨테이너 반입'});             
						}else {
			
						}
			
					  }else {
			
					  }
					  if(params[0].load_terminal !== null) {
						terminalPosition.push({time:params[0].load_date,terminal:params[0].load_terminal, wgs84_x:params[0].load_terminal_x, wgs84_y: params[0].load_terminal_y,work_name:'선적'});             
					  }else {
			
					  }
					}else {
			
					}
				  }
				  
				  terminalPosition.map((element, index) => {
					polyRender.push({lat:element.wgs84_y,lng:element.wgs84_x});
				  });
				  setTerminalPosition(terminalPosition);
				  setPolyRender(polyRender);	
			});
	  	}
	  	

	  return (
	    <React.Fragment>
	      <TableRow key={props.index} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}}>
	        <TableCell className={classes.tableMainDtlCell} style={{paddingTop:'0',paddingBottom:'0',textAlignLast:'left',borderBottom:borderBottomStyleValue}}>{data.view_bl_bkg}
	        {bookmarkIcon === 'Y'?<Tooltip title="BookMark"><StarIcon onClick={handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>:
	        	<Tooltip title="BookMark"><StarBorderIcon onClick={handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>}
	        </TableCell>
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}}>{data.ie_type}</TableCell>
	        
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}}>
	        	<Tooltip title={data.line_nm}>
	            	<a target="_blank" href={data.line_url}>
	        			{data.image_yn=='Y'?<img src={require("assets/img/carrier/"+data.line_code+".gif")} alt={data.line_code} style={{backgroundColor:'silver'}}/>:data.line_nm}
	        		</a>
	        	</Tooltip>
	        </TableCell>
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}}>
	        	{data.vsl_name}<br/>{data.voyage?"/"+data.voyage:""}
	        	{data.vsl_name?<Tooltip title="vessel map infomation">
	        	<DirectionsBoatIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} 
	        	onClick={handleClickMapOpen} /></Tooltip>
	        	:null}</TableCell>
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}} onClick={handleClickOpen}>
	         { data.last_status? data.last_status+" ["+data.last_location+"]":null}<br/>{data.last_status_time}
	        </TableCell>
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}}>
	        	{data.pol}<br/>
	        	<font color={startColor}>{data.start_day}</font>
	        	{data.start_day?<font color="red">({data.start_cnt})</font>:""}</TableCell>
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}}>
	        {data.pod}<br/><font color={endColor}>{data.end_day}</font>{data.end_day?<font color="red">({data.end_cnt})</font>:""}</TableCell>
	        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderBottomStyleValue}}><Tooltip title="Detail infomation">
	        <Icon style={{color:'#00acc1',paddingTop:'2px'}} onClick={handleCollOpen}>{iconstate}</Icon></Tooltip></TableCell>
	        {/*Tracking current detail */}
	        <Popover
		      	id="popover"
		      	open={openCurrent}
		      	onClose={handleClickClose}
				anchorReference="anchorPosition"
				anchorPosition={{top:80,left:550}}
		      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
		      	transformOrigin={{vertical:'top',horizontal:'center',}}
		     > 
	    	<CurrentList
	    		data={data}
	    		openLogin={props.onLoginPage} 
	    		store ={token} onClose={handleClickClose}/>
	    </Popover>
	        <Popover
		      	id="popover"
		      	open={openPopup}
		      	onClose={handleClickClose}
				anchorReference="anchorPosition"
				anchorPosition={{top:80,left:550}}
		      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
		      	transformOrigin={{vertical:'top',horizontal:'center',}}
		     > 
	        	<CntrListTable 
	        		data={data}
	        	    schData={demdetlist[seq]}
	        		store ={token} onClose={handleClickClose} />
	        </Popover>
			<Draggable>
	        <Popover
	        	id="popover_map"
	        	open={openMap}
	        	onClose={handleClickClose}
	            anchorReference="anchorPosition"
	            anchorPosition={{top:80,left:550}}
	        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      		transformOrigin={{vertical:'top',horizontal:'center',}}>
	      		<ShipMap
					  parameter={data} onClose={handleClickClose}
					  token ={token}>
				</ShipMap>
	          </Popover>
			  </Draggable>
			  <Popover
	        	id="popover_trackingmap"
	        	open={openTrackingMap}
	        	onClose={handleClickClose}
	            anchorReference="anchorPosition"
	            anchorPosition={{top:80,left:550}}
	        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      		transformOrigin={{vertical:'top',horizontal:'center',}}>
	      		<TackingMap
				  setData={terminalPosition}
				  store={token}
				  ieGubun={data.ie_type}
	      		  onClose={handleClickClose}
				  polyRender={polyRender}>
				</TackingMap>
	          </Popover>
	      </TableRow>
	      <TableRow>
	        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#f5f5f5' }} colSpan={8}>
	          <Collapse in={open} timeout="auto" unmountOnExit>
	            <Box margin={1}>
	            {data.ie_type==="I"?
	    	          	<GridItem xs={12}>
	    		          	<Grid container spacing={1} justify="space-between">
	    		          		<Grid item xs={12} sm={12} md={4}>
	    		          		<div>
	    		          			<TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />TERMINAL(ARRIVAL)　　　TRACKING MAP
	    							<MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={handleClickTrackingMap} />
	    		          		</div>
	    					          	<TerminalImp
	    					                tableHeaderColor={color}
	    					                tableHead={["TERMINAL", "ACTIVITY"]}
	    									tableData={demdetlist}
	    					          	    handleCntr={handleCntrClick}
	    					          	/>
	    			          	</Grid>
	    			          	<Grid item xs={12} sm={12} md={2}>
	    			          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />컨테이너 현황</div>

	    					          	<TableList
	    					                tableHeaderColor={color}
	    					                tableHead={["FULL-OUT", "EMPTY-IN"]}
	    									tableData={[[data.full_out+"/"+data.totalcnt , data.mt_in+"/"+data.totalcnt]]}
	    					          	/>
	    	          
	    			          	</Grid>
	    			          	<Grid item xs={12} sm={12} md={6}>
	    		          		<div><CustomIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />CUSTOM</div>
	    						  <TablesUniPass
	    							  tableHeaderColor={color}
	    							  tableHead={["B/L번호","CLEARLANCE", "관리대상"]}
	    							  tableData={importUniPassList}/>
	    		          
	    		          	</Grid>
	    			          	</Grid>
	    			          </GridItem>
	    			          :
	    			        <GridItem xs={12}>
	    			          	<Grid container spacing={1} justify="space-between">
	    			          		<Grid item xs={12} sm={12} md={4}>
	    			          		<div>
	    			          			<TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />TERMINAL(DEPARTURE)　　　TRACKING MAP
	    								<MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={handleClickTrackingMap} />
	    							</div>
	    				          		
	    						          	<TerminalExp
	    						                tableHeaderColor={color}
	    						                tableHead={["TERMINAL", "ACTIVITY"]}
	    										tableData={demdetlist}
	    						          		handleCntr={handleCntrClick}
	    						          	/>
	    					
	    				          	</Grid>
	    				          	<Grid item xs={12} sm={12} md={2}>
	    				          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />컨테이너 현황</div>
	    					          	
	    						          	<TableList
	    						                tableHeaderColor={color}
	    						                tableHead={["EMPTY-OUT", "FULL-IN"]}
	    						          		tableData={[[data.mt_out+"/"+data.totalcnt , data.full_in+"/"+data.totalcnt]]}
	    						          	/>
	    						          
	    				          	</Grid>
	    				          	<Grid item xs={12} sm={12} md={6}>
	    			          		<div><CustomIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />CUSTOM</div>
	    							  <TablesUniPass
	    					                tableHeaderColor={color}
	    									tableHead={["EXPORT LICENSE","CLEARLANCE", "INSPECT"]}
	    									tableData={exportUniPassList}
	    								/>
	    			          	</Grid>
	    				          	</Grid>
	    				          </GridItem>}
	            </Box>
	          </Collapse>
	        </TableCell>
	      </TableRow>
	    </React.Fragment>
	  );
	}