import React,{useState} from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";

import ShipMap from "components/Map/ShipMap.js";
import GridContainer from "components/Grid/GridContainer.js";
import TableList from "components/Table/TableSmallLine.js";
import GridItem from "components/Grid/GridItem.js";
import Popover from  '@material-ui/core/Popover';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';

import Card from "components/Card/Card.js";
import Access from "@material-ui/icons/AccessAlarm";
import Assign from "@material-ui/icons/AssignmentTurnedIn";

import Icon from '@material-ui/core/Icon';
import MapIcon from "@material-ui/icons/Map";
import CustomIcon from "@material-ui/icons/AccountBalanceSharp";
import TerminalIcon from "@material-ui/icons/Store";
import ActListIcon from "@material-ui/icons/ListAlt";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";
import TackingMap from "components/Map/TrackingMap.js"
import CurrentList from "views/Pages/Tracking/TrackingDetailCurrent.js";
import CntrListTable from "views/Pages/Tracking/TrackingCntrList.js";
import Slider from "components/Slide/Slider.js";
import Button from "components/CustomButtons/Button.js";
// page
import TerminalImp from "views/Pages/Tracking/TrackingImpTerminal.js";
import TerminalExp from "views/Pages/Tracking/TrackingExpTerminal.js";
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';

const useStyles = makeStyles(styles);


export default function ToggleTable(props) {


  const classes = useStyles();
  const { tableData, tableHeaderColor, tableRownum } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }


  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
      <Table className={classes.table}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px',textAlignLast:'center'}}>
            <TableRow className={classes.tableHeadRow} style={{borderBottomStyle:'solid',borderBottomColor:'#ececec'}}>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>(B/K NO.)<br/>B/L NO.</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>IMPORT(I)<br/>EXPORT(E)</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>CARRIER</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>VESSEL<br/>/VOYAGE</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>LAST CURRENT</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>POL<br/><font color="orange">ETD</font>/<font color="blue">ATD</font>(<font color="red">TO</font>)</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>POD<br/><font color="orange">ETA</font>/<font color="blue">ATA</font>(<font color="red">TO</font>)</TableCell>
                  <TableCell style={{borderBottomWidth:'3px'}} className={classes.trackingtableCell + " " + classes.tableHeadCell}>MORE</TableCell>
            </TableRow>
          </TableHead>
        <TableBody>
           {tableData.map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
                  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter >
        	<TableRow  >
        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
        		<Button
				    color="info"
					onClick={handleAddFunction}
        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
				>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData.length}&nbsp;)</Button>
		    </TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
    </div>
  );
}

ToggleTable.defaultProps = {
  tableHeaderColor: "gray"
};

ToggleTable.propTypes = {
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
  state = { openMap:false, openTrackingMap: false,openPopup:false,expanded: false ,openCurrent: false, bookmarkIcon:"N", iconstate:"add_circle", rowStyle:"borderTopStyle:'dashed'"};

  componentDidMount() {
	  this.setState({bookmarkIcon:this.props.data.book_mark}); 
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
 
  // 로우 생성
  toggleExpander = () => {
    if (!this.state.expanded) {
      this.setState({ expanded: true ,iconstate:"remove_circle"}, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false , iconstate:"add_circle" });
        }
      });
    }

  };
  //current
  handleClickOpen = () => {
	  this.setState({ openCurrent: true });
  }
  
  handleClickClose = () => {
	  this.setState({ openPopup: false, openMap: false ,openCurrent: false});
  }
  //즐겨찾기
  handleStarClick = () => {
	  
	  this.state.bookmarkIcon == "Y"?this.setState({bookmarkIcon:"N"}):this.setState({bookmarkIcon:"Y"})
			  
	  return axios ({
			url:'/loc/setUserBLUpdate',
			method:'POST',
			data: {blbk : this.props.data.bl_bkg,
				   reqseq: this.props.data.req_seq,
				   bookmark : this.state.bookmarkIcon=="Y"?"N":"Y"
				   }
		});
	  
	  
	  
  
  }
  //컨테이너 이동 현황
  handleCntrClick = () => {
	  console.log("cntrList");
	  this.setState({ openPopup: true });
  }
  //선박 추적 맵
  handleClickMapOpen = () => {
	  console.log("map");
	  this.setState({ openMap: true });
  }
  //국내 화물 트래킹 맵
  handleClickTrackingMap = () => {
	  console.log("TrackingMap");
	  this.setState({ openTrackingMap : true})
  }


  
  render() {
     const { data } = this.props;

     const startColor = this.props.data.start_db =="E"?"orange":"BLUE";
     const endColor = this.props.data.end_db =="E"?"orange":"BLUE";
     
     let point =0;
 
    
    return [
      <TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.bl_bkg}
        	{this.state.bookmarkIcon == 'Y'?<Tooltip title="BookMark"><StarIcon onClick={this.handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>:
        	<Tooltip title="BookMark"><StarBorderIcon onClick={this.handleStarClick} style={{color:'#00acc1',verticalAlign:'bottom'}} /></Tooltip>}</TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.ie_type}</TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.line_code?<img src={require("assets/img/carrier/"+data.line_code+".gif")} />:data.carrier_code}</TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}}>
        	{data.vsl_name}<br/>{data.voyage?"/"+data.voyage:""}
        	<Tooltip title="vessel map infomation"><MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={this.handleClickMapOpen} /></Tooltip></TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}} onClick={this.handleClickOpen}>
        {/*{data.last_current.length>18?data.last_current.substring(0,15)+" ...":data.last_current}*/}{data.last_current}
        </TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.pol}<br/><font color={startColor}>{data.start_day}</font>{data.start_day?Math.sign(data.start_cnt)==1?<font color="red">({"+"+data.start_cnt})</font>:<font color="red">({data.start_cnt})</font>:""}</TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}}>{data.pod}<br/><font color={endColor}>{data.end_day}</font>{data.end_day?Math.sign(data.end_cnt)==1?<font color="red">({"+"+data.end_cnt})</font>:<font color="red">({data.end_cnt})</font>:""}</TableCell>
        <TableCell style={{padding:'8px',textAlignLast:'center',borderBottomWidth:'3px'}}><Tooltip title="Detail infomation"><Icon style={{color:'#00acc1'}} onClick={this.toggleExpander}>{this.state.iconstate}</Icon></Tooltip></TableCell>
        <Popover
	      	id="popover"
	      	open={this.state.openCurrent}
	      	onClose={this.handleClickClose}
			anchorReference="anchorPosition"
			anchorPosition={{top:80,left:550}}
	      	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
	      	transformOrigin={{vertical:'top',horizontal:'center',}}
	     > 
    	<CurrentList blNo={data.bl_bkg} ieType={data.ie_type} carrierCode={data.carrier_code}/>
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
        	<CntrListTable blNo={data.bl_bkg} ieType={data.ie_type} carrierCode={data.carrier_code}/>
        </Popover>
        <Popover
        	id="popover_map"
        	open={this.state.openMap}
        	onClose={this.handleClickClose}
            anchorReference="anchorPosition"
            anchorPosition={{top:80,left:550}}
        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
      		transformOrigin={{vertical:'top',horizontal:'center',}}>
      		<ShipMap
		  		vesselName={data.vsl_name}>
			</ShipMap>
          </Popover>
		  <Popover
        	id="popover_trackingmap"
        	open={this.state.openTrackingMap}
        	onClose={this.handleClickClose}
            anchorReference="anchorPosition"
            anchorPosition={{top:80,left:550}}
        	anchorOrigin={{vertical:'bottom',horizontal:'center',}}
      		transformOrigin={{vertical:'top',horizontal:'center',}}>
      		<TackingMap
			  port={"KRKAN"}>
			</TackingMap>
          </Popover>





      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1} style={{marginTop:'5px',marginBottom:'5px',borderTopStyle:'double',borderTopColor:'whitesmoke',borderBottomStyle:'solid',borderBottomColor:'#ececec'}}>
          <TableCell colSpan={9} style={{padding:'10px'}}>
            <div ref="expanderBody">
            {data.ie_type=="I"?
	          	<GridItem xs={12}>
		          	<GridContainer>
		          		<GridItem xs={12} sm={5} md={5}>
		          		<div>
		          			<TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />TERMINAL(ARRIVAL)　　　TRACKING MAP
							<MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={this.handleClickTrackingMap} />
		          		</div>
					          	<TerminalImp
					                tableHeaderColor={this.props.color}
					                tableHead={["TERMINAL", "ACTIVITY", "OSC D-DAY"]}
										tableData={[
							            ["허치슨 감만 터미널", "DEPATURE 2020-01-29", "2020-01-29(-6Days)"]
							          ]}
					          	    handleCntr={this.handleCntrClick}
					          	/>

			          	</GridItem>
			          	<GridItem xs={12} sm={3} md={3}>
			          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />컨테이너 현황</div>

					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["FULL-OUT", "EMPTY-IN"]}
										tableData={[
							            ["2/5", "2/5"],
							          ]}
					          	/>
	          
			          	</GridItem>
			          	<GridItem xs={12} sm={4} md={4}>
		          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />CUSTOM</div>
	
				          	<TableList
				                tableHeaderColor={this.props.color}
				                tableHead={["CLEARLANCE", "INSPECT"]}
									tableData={[
						            ["반입신고(2020-01-29 00:00)", "Y"]
						          ]}
				          	/>
		          
		          	</GridItem>
			          	</GridContainer>
			          </GridItem>
			          :
			        	  <GridItem xs={12}>
			          	<GridContainer>
			          		<GridItem xs={12} sm={12} md={4}>
			          		<div>
			          			<TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />TERMINAL(ARRIVAL)　　　TRACKING MAP
								<MapIcon size="20" style={{verticalAlign:'bottom',color:'#00acc1',width:'20px',height:'20px'}} onClick={this.handleClickTrackingMap} />
							</div>
				          		
						          	<TerminalExp
						                tableHeaderColor={this.props.color}
						                tableHead={["TERMINAL", "ACTIVITY"]}
											tableData={[
								            ["허치슨 감만 터미널", "DEATURE 2020-01-29"]
								          ]}
						          		handleCntr={this.handleCntrClick}
						          	/>
					
				          	</GridItem>
				          	<GridItem xs={12} sm={12} md={3}>
				          		<div><Assign style={{color:'#00acc1',verticalAlign:'bottom'}} />컨테이너 현황</div>
					          	
						          	<TableList
						                tableHeaderColor={this.props.color}
						                tableHead={["EMPTY-OUT", "FULL-IN"]}
											tableData={[
								            ["2/5", "2/5"],
								          ]}
						          	/>
						          
				          	</GridItem>
				          	<GridItem xs={12} sm={12} md={5}>
			          		<div><CustomIcon style={{color:'#00acc1',verticalAlign:'bottom'}} />CUSTOM</div>
				          	
					          	<TableList
					                tableHeaderColor={this.props.color}
					                tableHead={["EXPORT LICENSE", "INSPECT", "CLEARLANCE"]}
										tableData={[
							            ["43234-20-234211X", "2020-03-18", "Y"]
							          ]}
					          		
					          	/>
				          
			          	</GridItem>
				          	</GridContainer>
				          </GridItem>}
            </div>
          </TableCell>
        </TableRow>    
      )
    ];
  }
}
