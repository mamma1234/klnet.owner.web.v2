import React from "react";

import PropTypes from "prop-types";
// @material-ui/core components

import {Table,Grid,TableHead,TableRow,TableBody,TableCell,TableContainer,TableFooter,Popover} from "@material-ui/core";
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
//import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles(styles);

const useStyles2 = makeStyles({
	container: {
		maxHeight:590,
	}
});


export default function DetailTable(props) {

  const classes = useStyles();
  const classess = useStyles2();
  const { tableData, tableHeaderColor, tableRownum,store } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }
  


  return (
    <div  className={classes.tableResponsive} style={{marginTop:'0px'}}> 
    <TableContainer className={classess.container} style={{overflow:'auto'}}>
    	<Table stickyHeader className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          <TableHead  className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px'}} id="scroll_top">
            <TableRow >
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172'}} className={classes.tableHeadCell}>(B/K NO.)<br/>B/L NO.</TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'5%',fontWeight:'bold',color:'#717172'}} className={classes.tableHeadCell}>IMPORT(I)<br/>EXPORT(E)</TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'5%',fontWeight:'bold',color:'#717172'}} className={classes.tableHeadCell}>CARRIER</TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172'}} className={classes.tableHeadCell}>VESSEL/VOYAGE</TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172'}} className={classes.tableHeadCell}>LAST STATUS</TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'12%',fontWeight:'bold'}} className={classes.tableHeadCell}><font color="#717172">POL<br/><font color="orange">ETD</font>/<font color="blue">ATD</font>(<font color="red">TO</font>)</font></TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'12%',fontWeight:'bold'}} className={classes.tableHeadCell}><font color="#717172">POD<br/><font color="orange">ETA</font>/<font color="blue">ATA</font>(<font color="red">TO</font>)</font></TableCell>
                  <TableCell style={{paddingTop:'8px',paddingBottom:'8px',borderBottomWidth:'3px',width:'2%',fontWeight:'bold',color:'#717172'}} className={classes.tableHeadCell}>MORE</TableCell>
            </TableRow>
          </TableHead>
        <TableBody >
           {
              tableData.map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} store={store} color={tableHeaderColor} />
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
		    </TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
      </TableContainer> 
    </div>
  );
}

DetailTable.defaultProps = {
  tableHeaderColor: "gray"
};

DetailTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  //tableHead: PropTypes.arrayOf(PropTypes.string),
};


 class TableRows extends React.Component {
  state = {
	  openMap:false,
	  openTrackingMap: false,
	  openPopup:false,expanded: false,
	  openCurrent: false,
	  bookmarkIcon:"N",
	  iconstate:"add_circle",
	  borderBottomStyleValue:"3px solid #e0e0e0",
	  importUniPassList:[],
	  exportUniPassList:[],
	  demdetlist:[],
	  terminalPosition:[],
	  polyRender:[],
	  seq:0,
	};

  componentDidMount() {
	  this.setState({bookmarkIcon:this.props.data.book_mark});
	  
	//   return axios ({
	// 		url:'/loc/getdemdetCurrent',
	// 		method:'POST',
	// 		headers:{'Authorization':'Bearer '+this.props.store.token},
	// 		data: {blbkg : this.props.data.bl_bkg,
	// 			   ietype : this.props.data.ie_type,
	// 			   }
	// 	})//.then(response => console.log("db data",response.data));
	// 	.then(response => this.setState({demdetlist:response.data })); 
  }
  
  // 테이블 조회
  scheduleToSearch = () => {

/*    return axios ({
		url:'/loc/getScheduleDetailList',
		method:'POST',
		data: {carrierCode : this.props.data.LINE_CODE,
			   startPort : this.props.data.START_PORT,
			   endPort : this.props.data.END_PORT,
			   voyage : this.props.data.VOYAGE_NO,
			   vesselName : this.props.data.VESSEL_NAME
			   }
	}).then(response => this.setState({port:response.data }));*/
    
  }

  __makeDateFormatFromString = (params) => {
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
 
  // 로우 생성
  toggleExpander = () => {
    if (!this.state.expanded) {
      this.setState({ expanded: true ,iconstate:"remove_circle"}, () => {
        if (this.refs.expanderBody) {
			if( "E" === this.props.data.ie_type ) {
				// 수출
				//console.log( '수출', this.props.data.ie_type, this.props.data.bl_yy);
				this.__getUniPassExport(this.props);
				this.__getTrackingGoogleMap(this.props);
				this.__getExportTerminalActivity( this.props );

			} else if( "I" === this.props.data.ie_type ) {
				// 수입
				//console.log('수입', this.props.data.ie_type, this.props.data.bl_yy);
				this.__getUniPassImport(this.props);
				this.__getTrackingGoogleMap(this.props);
				this.__getImportTerminalActivity( this.props );
			}
          slideDown(this.refs.expanderBody);
          this.setState( {borderBottomStyleValue:"3px dotted #e0e0e0"} );
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false , iconstate:"add_circle" ,borderBottomStyleValue:"3px solid #e0e0e0"});
        }
      });
    }

  };
  //current
  handleClickOpen = () => {
	  this.setState({ openCurrent: true }); 
  }
  
  handleClickClose = () => {
	  this.setState({ openPopup: false, openMap: false ,openCurrent: false,openTrackingMap: false});
  }
  //즐겨찾기
  handleStarClick = () => {
	  this.state.bookmarkIcon === "Y"?this.setState({bookmarkIcon:"N"}):this.setState({bookmarkIcon:"Y"})	  
	  return axios ({
			url:'/loc/setUserBLUpdate',
			method:'POST',
			headers:{'Authorization':'Bearer '+this.props.store.token},
			data: {blbk : this.props.data.bl_bkg,
				   reqseq: this.props.data.req_seq,
				   ietype: this.props.data.ie_type,
				   bookmark : this.state.bookmarkIcon === "Y"?"N":"Y"
				   }
		});
  }
  //컨테이너 이동 현황
  handleCntrClick = (event) => {
	  //console.log("cntrList",event);
	  this.setState({ openPopup: true , seq: event});
  }
  //선박 추적 맵
  handleClickMapOpen = () => {
	  //console.log("map");
	  this.setState({ openMap: true });
  }
  //국내 화물 트래킹 맵
  handleClickTrackingMap = () => {
	  //console.log("TrackingMap");
	  this.setState({ openTrackingMap : true})
  }
  //국내 화물 트래킹 데이터 수집 
  	__getTrackingGoogleMap = (props) => {
		return axios ({
			url:'/loc/getTrackingTerminal',
			method:'POST',
			headers:{'Authorization':'Bearer '+this.props.store.token},
			data: {ie_type:this.props.data.ie_type,
				   req_seq:this.props.data.req_seq,
				}
		}).then(res => {
			const params = res.data;
			let terminalPosition = [];
			let polyRender = [];
			if( params.length > 0){
				if (this.props.data.ie_type === "I") {
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
		
				}else if(this.props.data.ie_type === "E") {
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
			  this.setState({terminalPosition:terminalPosition, polyRender:polyRender});
			  
			
	});
}

	// 세관정보 API 수출용
	__getUniPassExport = (props) => {
		return axios ({
			url:'/com/uniPassApiExportAPI002',
			method:'POST',
			headers:{'Authorization':'Bearer '+this.props.store.token},
			data: {
				mblNo: props.data.bl_bkg
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
					returnValue.push( this.__makeDateFormatFromString(element.tkof_dt));
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
			this.setState({exportUniPassList : returnList});
		})
	    .catch(err => {
	        console.log(err);
	    });
	}

	// 세관정보 API 수입용
	__getUniPassImport = (props) => {
		// console.log(props);

		return axios ({
			url:'/com/uniPassApiExportAPI001',
			method:'POST',
			headers:{'Authorization':'Bearer '+this.props.store.token},
			data: {
				blYy : props.data.bl_yy,
				mblNo: props.data.bl_bkg
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
					returnValue.push( element.clearance+"("+this.__makeDateFormatFromString(element.clearance_date)+")");
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
			this.setState({importUniPassList : returnList});
		})
	    .catch(err => {
	        console.log(err);
	    });
	}

	// TERMINAL ACTIVITY 조회
	__getImportTerminalActivity = (props) => {
		let eta = '';
		if ( null != props.data.end_day) {
			eta = props.data.end_day.replace(/\//gi, '');
		}
		return axios ({
			url:'/loc/getImportTerminalActivity',
			method:'POST',
			headers:{'Authorization':'Bearer '+this.props.store.token},
			data: {
				req_seq : props.data.req_seq,
				ie_type: props.data.ie_type,
				vsl_code :props.data.vsl_code,
				vsl_name :props.data.vsl_name,
				voyage_no:props.data.voyage,
				eta:eta,
				pod:props.data.pod_cd,
				carrier_code:props.data.carrier_code,
				ie_type:props.data.ie_type,
				bl_bkg:props.data.bl_bkg
			}
		})
		.then(res => {
			//console.log(res.data);
			this.setState({demdetlist:res.data }) 
		})
	    .catch(err => {
	        console.log(err);
	    });

	}
	__getExportTerminalActivity = (props) => {
		let etd = '';
		if ( null != props.data.start_day ) {
			etd = props.data.start_day.replace(/\//gi, '');
		}
		return axios ({
			url:'/loc/getExportTerminalActivity',
			method:'POST',
			headers:{'Authorization':'Bearer '+this.props.store.token},
			data: {
				req_seq : props.data.req_seq,
				ie_type: props.data.ie_type,
				vsl_name :props.data.vsl_name,
				voyage_no:props.data.voyage,
				etd:etd,
				pol:props.data.pol_cd,
				carrier_code:props.data.carrier_code,
				ie_type:props.data.ie_type,
				bl_bkg:props.data.bl_bkg
			}
		})
		.then(res => {
			//console.log(res.data);
			this.setState({demdetlist:res.data }) 
		})
	    .catch(err => {
	        console.log(err);
	    });

	}

  render() {
     const { data } = this.props;

     const startColor = this.props.data.start_db ==="E"?"orange":"BLUE";
     const endColor = this.props.data.end_db ==="E"?"orange":"BLUE";
     const borderStyle = this.state.borderBottomStyleValue;
     
    return [
      <TableRow key={this.props.index}  style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
        <TableCell style={{paddingTop:'0',paddingBottom:'0',textAlignLast:'left',borderBottom:borderStyle}}>{data.view_bl_bkg}
        	{this.state.bookmarkIcon == 'Y'?<Tooltip title="BookMark"><StarIcon onClick={this.handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>:
        	<Tooltip title="BookMark"><StarBorderIcon onClick={this.handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>}</TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}}>{data.ie_type}</TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}}>
        	<Tooltip title={data.line_nm}>
            	<a target="_blank" href={data.line_url}>
        			{data.image_yn=='Y'?<img src={require("assets/img/carrier/"+data.line_code+".gif")} alt={data.line_code} style={{backgroundColor:'silver'}}/>:data.line_nm}
        		</a>
        	</Tooltip>
        </TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}}>
        	{data.vsl_name}<br/>{data.voyage?"/"+data.voyage:""}
        	{data.vsl_name?<Tooltip title="vessel map infomation"><DirectionsBoatIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={this.handleClickMapOpen} /></Tooltip>
        	:null}</TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}} onClick={this.handleClickOpen}>
         { data.last_status? data.last_status+" ["+data.last_location+"]":null}<br/>{data.last_status_time}
        </TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}}>
        	{data.pol}<br/>
        	<font color={startColor}>{data.start_day}</font>
        	{data.start_day?<font color="red">({data.start_cnt})</font>:""}</TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}}>{data.pod}<br/><font color={endColor}>{data.end_day}</font>{data.end_day?<font color="red">({data.end_cnt})</font>:""}</TableCell>
        <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottom:borderStyle}}><Tooltip title="Detail infomation"><Icon style={{color:'#00acc1',paddingTop:'2px'}} onClick={this.toggleExpander}>{this.state.iconstate}</Icon></Tooltip></TableCell>
        {/*Tracking current detail */}
        <Popover
	      	id="popover"
	      	open={this.state.openCurrent}
	      	onClose={this.handleClickClose}
			anchorReference="anchorPosition"
			anchorPosition={{top:80,left:550}}
	      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      	transformOrigin={{vertical:'top',horizontal:'center',}}
	     > 
    	<CurrentList
    		data={data}
    		openLogin={this.props.onLoginPage} 
    		store ={this.props.store} onClose={this.handleClickClose}/>
    </Popover>
        <Popover
	      	id="popover"
	      	open={this.state.openPopup}
	      	onClose={this.handleClickClose}
			anchorReference="anchorPosition"
			anchorPosition={{top:80,left:550}}
	      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      	transformOrigin={{vertical:'top',horizontal:'center',}}
	     > 
        	<CntrListTable 
        		data={data}
        	    schData={this.state.demdetlist[this.state.seq]}
        		store ={this.props.store} onClose={this.handleClickClose} />
        </Popover>
		<Draggable>
        <Popover
        	id="popover_map"
        	open={this.state.openMap}
        	onClose={this.handleClickClose}
            anchorReference="anchorPosition"
            anchorPosition={{top:80,left:550}}
        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
      		transformOrigin={{vertical:'top',horizontal:'center',}}>
      		<ShipMap
				  parameter={data} onClose={this.handleClickClose}
				  store ={this.props.store}>
			</ShipMap>
          </Popover>
		  </Draggable>
		  <Popover
        	id="popover_trackingmap"
        	open={this.state.openTrackingMap}
        	onClose={this.handleClickClose}
            anchorReference="anchorPosition"
            anchorPosition={{top:80,left:550}}
        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
      		transformOrigin={{vertical:'top',horizontal:'center',}}>
      		<TackingMap
			  setData={this.state.terminalPosition}
			  store={this.props.store.token}
			  ieGubun={data.ie_type}
      		  onClose={this.handleClickClose}
			  polyRender={this.state.polyRender}>
      		  
			</TackingMap>
          </Popover>
      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1} style={{marginTop:'5px',marginBottom:'5px',borderTopColor:'whitesmoke',borderBottomStyle:'solid',borderBottomColor:'#ececec'}}>
          <TableCell colSpan={8} style={{padding:'10px'}}>
            <div ref="expanderBody">
            {data.ie_type==="I"?
	          	<GridItem xs={12}>
		          	<Grid container spacing={1} justify="space-between">
		          		<Grid item xs={12} sm={12} md={4}>
		          		<div>
		          			<TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />TERMINAL(ARRIVAL)　　　TRACKING MAP
							<MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={this.handleClickTrackingMap} />
		          		</div>
					          	<TerminalImp
					                tableHeaderColor={this.props.color}
					                tableHead={["TERMINAL", "ACTIVITY"]}
									tableData={this.state.demdetlist}
					          	    handleCntr={this.handleCntrClick}
					          	/>

			          	</Grid>
			          	<Grid item xs={12} sm={12} md={2}>
			          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />컨테이너 현황</div>

					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["FULL-OUT", "EMPTY-IN"]}
									tableData={[[data.full_out+"/"+data.totalcnt , data.mt_in+"/"+data.totalcnt]]}
					          	/>
	          
			          	</Grid>
			          	<Grid item xs={12} sm={12} md={6}>
		          		<div><CustomIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />CUSTOM</div>
						  <TablesUniPass
							  tableHeaderColor={this.props.color}
							  tableHead={["B/L번호","CLEARLANCE", "관리대상"]}
							  tableData={this.state.importUniPassList}/>
		          
		          	</Grid>
			          	</Grid>
			          </GridItem>
			          :
			        <GridItem xs={12}>
			          	<Grid container spacing={1} justify="space-between">
			          		<Grid item xs={12} sm={12} md={4}>
			          		<div>
			          			<TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />TERMINAL(DEPARTURE)　　　TRACKING MAP
								<MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={this.handleClickTrackingMap} />
							</div>
				          		
						          	<TerminalExp
						                tableHeaderColor={this.props.color}
						                tableHead={["TERMINAL", "ACTIVITY"]}
										tableData={this.state.demdetlist}
						          		handleCntr={this.handleCntrClick}
						          	/>
					
				          	</Grid>
				          	<Grid item xs={12} sm={12} md={2}>
				          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />컨테이너 현황</div>
					          	
						          	<TableList
						                tableHeaderColor={this.props.color}
						                tableHead={["EMPTY-OUT", "FULL-IN"]}
						          		tableData={[[data.mt_out+"/"+data.totalcnt , data.full_in+"/"+data.totalcnt]]}
						          	/>
						          
				          	</Grid>
				          	<Grid item xs={12} sm={12} md={6}>
			          		<div><CustomIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />CUSTOM</div>
							  <TablesUniPass
					                tableHeaderColor={this.props.color}
									tableHead={["EXPORT LICENSE","CLEARLANCE", "INSPECT"]}
									tableData={this.state.exportUniPassList}
								/>
			          	</Grid>
				          	</Grid>
				          </GridItem>}
            </div>
          </TableCell>
        </TableRow>    
      )
    ];
  }
}
