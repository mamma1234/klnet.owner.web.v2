import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles,useTheme } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import DirectionsIcon from "@material-ui/icons/Directions";
import Button from "components/CustomButtons/Button.js";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import { Popover } from "@material-ui/core";
import SpeedDial from '@material-ui/lab/SpeedDial';
import SpeedDialIcon from '@material-ui/lab/SpeedDialIcon';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import {Link} from "react-router-dom";

const useStyles = makeStyles(styles);

const useStyles1 = makeStyles(theme => ({
	root:{
		flexShrink:0,
		marginLeft: theme.spacing(2.5),
	}
}));

function TablePageinationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {count,page,rowsPerPage,onChangePage} =props;
	
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

export default function CustomTable(props) {
	
  const classes = useStyles();
  const { tableData, tableHeaderColor,colSpan,data,schData } = props;
  const [page,setPage] = React.useState(0);
  const [rowsPerPage,setRowsPerPage] = React.useState(8);

  //const emptyRows = rowsPerPage - Math.min(rowsPerPage,tableData.length - page * rowsPerPage);
  
  const handleChagePage = (e,newPage) => {
	  setPage(newPage);
  }
  
  const handleChangeRowsPerPage = event => {
	  setRowsPerPage(parseInt(event.target.value,8));
	  setPage(0);
  }

  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px',backgroundColor:'aliceblue'}}>
            {data.ie_type === "I"?<TableRow className={classes.tableHeadRow}>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>no</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>Container No</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>SZ/TP</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>접안터미널<br/>접안(예정)일시</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>양하지<br/>양하일시</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>OSC D-DAY</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반출기한</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반출지<br/>반출일시</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반납기한</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반납지<br/>반납일시</TableCell>
            	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>Map</TableCell>
				</TableRow>
            :
            	<TableRow className={classes.tableHeadRow}>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>no</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>Container No</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>SZ/TP</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반출기한</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반출지<br/>반출일시</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반입기한</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>반입지<br/>반입일시</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>OSC</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>선적지<br/>선적지반입일시</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>선적일시</TableCell>
		        	<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>출항일</TableCell>
					<TableCell style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd"}}>Map</TableCell>
		        </TableRow>}
          </TableHead>
        <TableBody>
        {tableData.length > 0?
        	(rowsPerPage > 0?tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :  tableData).map((prop, key) => {
        		return (data.ie_type === "I"?<ImportRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
        		:<ExportRows key={key} index={key + 1} data={prop} sch={schData} color={tableHeaderColor} />
                );
               })
          :
              <TableRow  style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
                <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}} colSpan={colSpan}>NO DATA</TableCell>
              </TableRow>
        }
        </TableBody>
        {(tableData.length >= 8 ?
        <TableFooter>
    	<TableRow>
    		<TablePagination 
    			rowsPerPageOptions={8}
    			colSpan={colSpan}
    			count={tableData.length}
    		    rowsPerPage={rowsPerPage}
    			page={page}
    			SelectProps={{
    				inputProps: {'aria-label':'Rows Per Page'},
    			    native:true,
    			}}
    			onChangePage={handleChagePage}
    			onChangeRowsPerPage={handleChangeRowsPerPage}
    			ActionsComponent={TablePageinationActions}
    	/> 
    	</TableRow>
    </TableFooter>: null )}
      </Table>
    </div>
  );
}

class ImportRows extends React.Component {
		constructor(props) {
			super(props);
			this.state={
				anchorEl: null
				
			}
		}	
	  render() {
		 const { data} = this.props;
		 const handleClick = (e) => {
			 this.setState({ 
				 anchorEl:e.currentTarget
			 })
		 }
		 const handleClose = () => {
			 this.setState({ 
				 anchorEl:null
			 })
		 }
		 const open = Boolean(this.state.anchorEl);
		 const id = open ? 'simple-popover' :undefined;
		 return [
	      <TableRow  key={this.props.index}  style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{this.props.index}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.cntr_no}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.type_size}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.berth_terminal}<br/>{data.berth_date}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.unload_terminal}<br/>{data.unload_date}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.osc_date}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.dem_date}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.full_outgate_terminal}<br/>{data.full_outgate_date}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.ret_date}</TableCell>
	      	<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.mt_ingate_terminal}<br/>{data.mt_ingate_date}</TableCell>
			<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}} align="center">
			<IconButton onClick={handleClick}> 
				<DirectionsIcon />
			</IconButton>	
				<Popover
					id={id}
					open={open}
					anchorEl={this.state.anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical:'bottom',
						horizontal:'center'
					}}
					transformOrigin={{
						vertical:'top',
						horizontal:'center'
					}}>
					<div>
						<a component={Link} target="_blank" href={`/svc/cntrmap?cntr_no=${data.cntr_no}`}>
							<Button color="info">
								New<br></br>Window
							</Button>
                        </a>
						<Link to={{
							pathname : `/svc/cntrmap`,
							state : {param : data.cntr_no}}}>
							<Button color="info">
								Change<br></br>View
							</Button>
						</Link>
					</div>
					</Popover>
			</TableCell>
	      </TableRow>
	    ];
	  }
}
class ExportRows extends React.Component {
	constructor(props) {
		super(props);
		this.state={
			anchorEl: null
			
		}
	}
	render() {
		
		const { data,sch } = this.props;
		const handleClick = (e) => {
			this.setState({ 
				anchorEl:e.currentTarget
			})
		}
		const handleClose = () => {
			this.setState({ 
				anchorEl:null
			})
		}
		const open = Boolean(this.state.anchorEl);
		const id = open ? 'simple-popover' :undefined;
	    return [
	      <TableRow  key={this.props.index}  style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{this.props.index}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.cntr_no}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.type_size}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.ret_date}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.mt_outgate_terminal}<br/>{data.mt_outgate_date}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.dem_date}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.full_ingate_terminal}<br/>{data.full_ingate_date}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.osc_date}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.pol_ingate_terminal}<br/>{data.pol_ingate_time}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{data.load_date}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}}>{sch.activity==="DEPARTURE"?sch.activity_date:''}</TableCell>
			<TableCell style={{paddingTop:'10px',paddingBottom:'10px',paddingLeft:'8px',paddingRight:'8px'}} align="center">
				<DirectionsIcon 
					onClick={handleClick}>
				</DirectionsIcon>
				<Popover
					id={id}
					open={open}
					anchorEl={this.state.anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical:'bottom',
						horizontal:'center'
					}}
					transformOrigin={{
						vertical:'top',
						horizontal:'center'
					}}>
					<div>
						
						<a component={Link} target="_blank" href={`/svc/cntrmap?cntr_no=${data.cntr_no}`}>
							<Button color="info">
								New<br></br>Window
							</Button>
                        </a>
						<Link to={{
							pathname : `/svc/cntrmap`,
							state : {param : data.cntr_no}}}>
							<Button color="info">
								Change<br></br>View
							</Button>
						</Link>
					</div>
					</Popover>
			</TableCell>
		  </TableRow>
	    ];
	  }

}
	        			
CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
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
  //tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

