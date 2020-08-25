import React,{ useState,useEffect } from "react";

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
import Tooltip from '@material-ui/core/Tooltip';
//import Popover from "@material-ui/core/Popover";
//import Paper from "@material-ui/core/Paper";
// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
//import { slideDown, slideUp } from "components/Slide/Slide.js";
//import SchLinePicPop from "views/Pages/Schedule/SchLinePicPop.js";


//import axios from 'axios';
//import TableList from "components/Table/TableSmallLine.js";
//import Button from "components/CustomButtons/Button.js";

//import { useCookies } from 'react-cookie';
import { observer, inject} from 'mobx-react'; // 6.x

const classes = makeStyles(theme => ({
  root: {
    padding: 0,
  },
}));

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
  const {count,page,rowsPerPage,onChangePage } =props;

	
	console.log(":"+count+":"+page+":"+rowsPerPage+":"+onChangePage);
	
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

//export default function ToggleTable(props) {
  const ToggleTable = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 

  useEffect(() => {
    console.log('effect-detail');
    setPage(0);
  },[props.tableData]);

  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const [page,setPage] = React.useState(0);
  const [rowsPerPage,setRowsPerPage] = React.useState(10);

  //const [cookies, setCookie] = useCookies(['name']); 

  const handleChagePage = (e,newPage) => {
    setPage(newPage);
  }
  
  const handleChangeRowsPerPage = event => {
	  setRowsPerPage(parseInt(event.target.value,10));
    setPage(0);
  }


  
  
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table} size="small" stickyHeader={true} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]} >
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell 
                  tyle={{paddingTop:'0',paddingBottom:'0',borderBottomWidth:'3px',fontWeight:'bold',fontWeight:'600',color:'#717172',borderBottom:'2px solid #00b1b7'}} align="center"
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
           {(rowsPerPage > 0?tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :  tableData).map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} page={page} userStore={userStore}/> 
                  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter>
        	<TableRow>
        		<TablePagination 
        			rowsPerPageOptions={[10,20,40,{label:'All',value:-1}]}
        			colSpan={12}
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
}))
export default ToggleTable;

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
  state = { expanded: false , port: [], pop:false};


  handleClick = () => {
    this.setState({pop:true});
  };

  handleClose = () => {
    this.setState({pop:false});
  };

  render() {

    return [
      <TableRow  key={this.props.index} >
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.port_name}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}><a style={{cursor: "pointer",color:"rgba(0, 0, 0, 0.87)",textDecoration:"underline"}} target="_blank" href={this.props.data.terminal_url}><Tooltip title={this.props.data.f_terminal_name}><span>{this.props.data.terminal_name}</span></Tooltip></a></TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.vessel_name}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.voyage_no}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.atb}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.closing_time}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.atd}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}><Tooltip title={this.props.data.line_nm}><span>{this.props.data.carrier_code}</span></Tooltip></TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.unload_container}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.load_container}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.shifting_container}</TableCell>
        <TableCell onClick={this.toggleExpander} align="center" style={{fontSize:"13px"}}>{this.props.data.status}</TableCell>                      
      </TableRow>                 
    ];
  }
}
