import React from "react";

import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Checkbox from "@material-ui/core/Checkbox";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";

import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import Button from "components/CustomButtons/Button.js";
import Tooltip from '@material-ui/core/Tooltip';
import Popover from  '@material-ui/core/Popover';
import Tariff from "views/Pages/DemDet/PopUp/tariff.js";

// core components
import { slideDown, slideUp } from "components/Slide/Slide.js";
import TableList from "components/Table/TableSmallLine.js";
import Tablestyles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";



const classes = makeStyles(theme => ({
  root: {
    padding: 0,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow : 'hidden',
    padding : 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

const useStyles = makeStyles(styles => ({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow : 'hidden',
    padding : 0,
    position: 'absolute',
    top: 20,
    width: 1,
  }
}));
const TableStyle = makeStyles(Tablestyles);

function TablePageinationActions(props) {
	const theme = useTheme();
	const {count,page,rowsPerPage,onChangePage } =props;
	
	//console.log(":"+count+":"+page+":"+rowsPerPage+":"+onChangePage);
	
	const handleFirstPageButtonClick = e => {
		onChangePage(e,0);
	}
	
	const handleBackButtonClick = e => {
		onChangePage(e,page -1);
	}
	
	const handleNextButtonClick = e => {
		onChangePage(e,page +1);
	}
	
	const handleLastPageButtonClick = e => {
		onChangePage(e,Math.max(0,Math.ceil(count / rowsPerPage)-1));
	}
	
	return (
		<div className = {classes.root}>
			<IconButton
				onClick = {handleFirstPageButtonClick}
				disabled={page === 0 }
				aria-label="first page"
			>
			{theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon/>}
			</IconButton>
			<IconButton
				onClick = {handleBackButtonClick}
				disabled={page === 0 }
				aria-label="previous page"
			>
		{theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
		</IconButton>
		<IconButton
			onClick = {handleNextButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage) -1 }
			aria-label="next page"
		>
	{theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
	</IconButton>
		<IconButton
			onClick = {handleLastPageButtonClick}
			disabled={page >= Math.ceil(count / rowsPerPage)-1 }
			aria-label="last page"
		>
		{theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon/>}
		</IconButton>
		</div>
	);
	
}

TablePageinationActions.propTypes = {
		count:	PropTypes.number.isRequired,
		onChangePage: PropTypes.func.isRequired,
		page: PropTypes.number.isRequired,
		rowsPerPage:PropTypes.number.isRequired,
}


export default function ToggleTable(props) {


  const classes = TableStyle();
  const { tableData, tableHeaderColor } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }

  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
      <Table className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
        <TableHead  style={{padding:'5px',textAlignLast:'center'}}>
          <TableRow >
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >
                  <Checkbox
                    value="secondary"
                    color="primary"
                    inputProps={{ 'aria-label': 'secondary checkbox' }}
                  />
                </TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >CARRIER</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >CNTR NO</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >TERMINAL</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >STATUS</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >DEMERRAGE</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >DETENTION</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >STORAGE CHARGE</TableCell>
                <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >COMBINED</TableCell>
                {/* <TableCell style={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',color:'#717172',borderBottom:'2px solid #00b1b7'}} >DO신청</TableCell> */}
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
            );
          })}
          {/*  {
           (rowsPerPage > 0?  tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :  tableData).map((prop, idx, key) => {
                  return (
                    <TableRows key={idx} index={idx + 1} data={prop} expand={false}/>
                  );
                })} */}
                
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter>
        	<TableRow>
            <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={10}>
              <Button 
                color="info" onClick={handleAddFunction}
        		    style={{paddingLeft:'60px',paddingRight:'60px'}}>
                  MORE
                  {/* &nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData.length}&nbsp;) */}
              </Button>
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
  tableHead: PropTypes.arrayOf(PropTypes.string),
};


class TableRows extends React.Component { 
  
  state = {
          
          
          cntrExpanded: false
          , demOpenCurrent: false
          , detOpenCurrent: false
          , oscOpenCurrent: false
        };

  

  

  

  //dem tariff popup
  demHandleClickOpen = () => {
    
      this.setState({ demOpenCurrent: true }); 
    
	  
  }
  
  demHandleClickClose = () => {
	  this.setState({ demOpenPopup: false, demOpenCurrent: false});
  }

  //det tariff popup
  detHandleClickOpen = () => {
	  this.setState({ detOpenCurrent: true }); 
  }
  
  detHandleClickClose = () => {
	  this.setState({ detOpenPopup: false, detOpenCurrent: false});
  }

  oscHandleClickOpen = () => {
	  this.setState({ oscOpenCurrent: true }); 
  }
  
  oscHandleClickClose = () => {
	  this.setState({ oscOpenPopup: false, oscOpenCurrent: false});
  }

  cntrExpander = () => {
    
    
    

    if (!this.state.cntrExpanded) {
      this.setState({ cntrExpanded: true }, () => {
        if (this.refs.expandCntr) {slideDown(this.refs.expandCntr);}
      });
    } else {
      slideUp(this.refs.expandCntr, {onComplete: () => {this.setState({ cntrExpanded: false });}});
    }
  };
  
  render() {
    const { data } = this.props;

    const statusColor = data.cntr_status === "LOAD"?"orange":((data.cntr_status === "GATE IN" || data.cntr_status === "GATE OUT") ? "blue":((data.cntr_status === "DEM" || data.cntr_status === "DET") ? "red":"gray"));
    const demOverdayColor = data.dem_over_day > 0 && data.cntr_status === "DEM" ? "red":"";
    const detOverdayColor = data.det_over_day > 0 && data.cntr_status === "DET" ? "red":"";
    const oscOverdayColor = data.osc_over_day > 0 && data.cntr_status === "OSC" ? "red":"";

    return [
      
      <TableRow key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
        <TableCell align="center" >
          <Checkbox
          value="secondary"
          color="primary"
          inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        </TableCell>
        {/* <b><a>{(data.image_yn === 'Y')?<img alt={data.line_code} src={require("assets/img/carrier/"+data.img_line_code+".gif")} />:data.line_code}</a></b> */}
        <TableCell align="center" >
        <Tooltip title={data.line_code}>
            	<a target="_blank" rel="noopener noreferrer" href={data.line_url}  >
        			{data.image_yn === 'Y'?<img src={require("assets/img/carrier/"+data.img_line_code+".gif")} alt={data.line_code} />:<img src={require("assets/img/carrier/No-Image.gif")} alt={data.line_code}/>}
        		</a>
        	</Tooltip>

        </TableCell>
        <TableCell align="center" onClick={this.cntrExpander}>{data.cntr_no}</TableCell>
        <TableCell align="center" onClick={this.cntrExpander}>{data.current_terminal}</TableCell>
        <TableCell align="center" onClick={this.cntrExpander}><b><font color={statusColor}>{data.cntr_status}</font></b></TableCell>
        <TableCell align="center" onClick={this.demHandleClickOpen}>{data.dem_date} (<font color={demOverdayColor}>+{data.dem_over_day}</font>)<br/><font color={demOverdayColor}>{data.dem_amount} {data.dem_unit}</font></TableCell>
        <Popover
	      	id="demPopover"
	      	open={this.state.demOpenCurrent}
	      	onClose={this.demHandleClickClose}
          // anchorReference="anchorPosition"
          // anchorPosition={{top:100,left:550}}
          anchorOrigin={{vertical:'center',horizontal:'center',}}
          transformOrigin={{vertical:'center',horizontal:'center',}}
          > 
          <Tariff
            data={data}
            charge="DEM"
            //openLogin={this.props.onLoginPage} 
            //store ={this.props.store}
          />
        </Popover>
        <TableCell align="center" onClick={this.detHandleClickOpen}>{data.ret_date} (<font color={detOverdayColor}>+{data.det_over_day}</font>)<br/><font color={detOverdayColor}>{data.det_amount} {data.det_unit}</font></TableCell> 
        <Popover
	      	id="detPopover"
	      	open={this.state.detOpenCurrent}
	      	onClose={this.detHandleClickClose}
          // anchorReference="anchorPosition"
          // anchorPosition={{top:80,left:550}}
          anchorOrigin={{vertical:'center',horizontal:'center',}}
          transformOrigin={{vertical:'center',horizontal:'center',}}
          > 
          <Tariff
            data={data}
            charge="DET"
            //openLogin={this.props.onLoginPage} 
            //store ={this.props.store}
          />
        </Popover>
        <TableCell align="center" onClick={this.oscHandleClickOpen}>{data.osc_date} (<font color={oscOverdayColor}>+{data.osc_over_day}</font>)<br/><font color={oscOverdayColor}>{data.osc_amount} {data.osc_unit}</font></TableCell>
        <Popover
	      	id="oscPopover"
	      	open={this.state.oscOpenCurrent}
	      	onClose={this.oscHandleClickClose}
          // anchorReference="anchorPosition"
          // anchorPosition={{top:80,left:550}}
          anchorOrigin={{vertical:'center',horizontal:'center',}}
          transformOrigin={{vertical:'center',horizontal:'center',}}
          > 
          <Tariff
            data={data}
            charge="OSC"
            //openLogin={this.props.onLoginPage} 
            //store ={this.props.store}
          />
        </Popover>
        <TableCell align="center"><br/>{data.combin_amount} {data.combin_unit}</TableCell>
        {/*<TableCell >{data.dem_det_remark}</TableCell> */} 
        {/* <TableCell align="center" >
        {data.do_yn === 'Y'?
          <a target="_blank" href={data.do_url}><MButton
            variant="contained"
            //color="primary"
            size="small"
            style={{lineHeight:"1",}}
            //startIcon={<CancelIcon/>}
            onClick={null}
          >DO신청
          </MButton></a>:""}
        </TableCell> */}
      </TableRow>
      ,this.state.cntrExpanded && (
        <TableRow key = {this.props.index+400000} style={{marginTop:'5px',marginBottom:'5px',borderTopStyle:'double',borderTopColor:'whitesmoke',borderBottomStyle:'solid',borderBottomColor:'#ececec'}}>
          <TableCell colSpan={11} style={{padding:'5px'}}>
            <div ref="expandCntr"> 
              <TableList
                  tableHeaderColor={this.props.color}
                  tableHead={["SZ/TP","Booking No","M-BL","VESSEL","VOYAGE","EMPTY PICK UP","FULL RETRUN","POL","POD","GATE OUT","GATE IN","LOAD","ETD"]}
                  tableData={[
                              [
                              data.type_size
                              ,data.bkg_no
                              ,data.mbl_no
                              ,data.vsl_name
                              ,data.voyage
                              ,data.mt_outgate_terminal_name
                              ,data.full_ingate_terminal_name
                              ,data.pol,data.pod
                              ,data.mt_outgate_date,data.full_ingate_date
                              ,data.loading_date
                              ,data.etd
                              ]
                            ]}
              /> 
            </div>
          </TableCell>
        </TableRow>    
      )
      
      
     
    ];
  }
}
