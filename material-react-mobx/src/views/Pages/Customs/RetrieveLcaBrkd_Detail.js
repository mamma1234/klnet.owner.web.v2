import React from 'react';
import PropTypes from "prop-types";
import { makeStyles,useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import TablePagination from "@material-ui/core/TablePagination";
import TableFooter from "@material-ui/core/TableFooter";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import {Snackbar,Tooltip} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import {userService} from 'views/Pages/Login/Service/Service.js';
const useStyles = makeStyles(theme => ({

	  headerCell: {
	    backgroundColor: "#f2fefd",
	    width:'30%',
	  padding:'7px',
	  textAlign:'right'
	  },
	  bodyCell: {
	    textAlign: "left",
	  padding:'7px',
	  },
	  tableHeaderCellStyle: {
	    borderStyle:'solid',
	    borderColor:'#dbdbdb',
	    borderWidth:'0.5px',
	    padding:'7px',
	    backgroundColor:'#f2fefd',
	    width:'15%'
	  },tableCellStyle: {
	    borderStyle:'solid',
	    borderColor:'#dbdbdb',
	    borderWidth:'0.5px',
	    padding:'7px',
	  }
	}));

const useStyles1 = makeStyles(theme => ({
	root:{
		flexShrink:0,
		marginLeft: theme.spacing(2.5),
	},
	cellStyle: {
		textAlign: "center",
		padding:'7px',
	}
}));


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Row(props: { row: ReturnType<typeof createData> }) {

  const { row } = props;
  //console.log("props:",props);
  const [open, setOpen] = React.useState(props.onOpen);
  const [list, setList] = React.useState([]);
  const [errMessage, setErrmessage] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [severity, setSeverity] = React.useState("");
  const [changeColor, setChangeColor] = React.useState("white");
  
  const openView =() => {
	  const token = userService.GetItem()?userService.GetItem().token:null;
  	  if(token) {
      //API014
  		  if(!open) {
  		    axios.post("/com/uniPassRetrieveLcaDt",{param1:row.lcaSgn._text,param2:row.cstmSgn._text}, 
  		    		{headers:{'Authorization':'Bearer '+token}})
  		    		.then(setList([]))
  		    		.then(
  		      res => {
  		        if(res.data.message == "SUCCESS") {
  		          setList(res.data.infoData);
  		          setChangeColor("#f8f8f8");
  		        }else if (res.data.message == "NO_DATA") {
  		          AlertMessage("조회결과가 없습니다.","error");
  		        }else {
  		          AlertMessage(res.data.errMsg,"error");
  		        }
  		      }
  		    ).catch(err => {
  	            if(err.response.status === 401) {
  		        	props.openLogin();
  		        }
  	            });
  		  } else {
  			setChangeColor("white");
  		  }
  		 } else {
  			props.openLogin();
  		 }
  	  setOpen(!open);
  	  
    }
  
  const handleAlertClose = (event, reason) => {
	    if(reason ==='clickaway') {
	      return;
	    }
	    setAlertOpen(false);
	  }
	  const AlertMessage = (message,icon) => {
	    setErrmessage(message);
	    setSeverity(icon);
	    setAlertOpen(true);
	  }
  
  const classes = useStyles();

  return (
    <React.Fragment>
      <TableRow onClick={openView}>
        <TableCell className={classes.tableCellStyle} style={{backgroundColor:changeColor}}>{row.cstmSgn._text}</TableCell>
        <TableCell className={classes.tableCellStyle} style={{backgroundColor:changeColor}}>{row.lcaSgn._text}</TableCell>
        <TableCell className={classes.tableCellStyle} style={{backgroundColor:changeColor}}>{row.cstmNm._text}</TableCell>
        <TableCell className={classes.tableCellStyle} style={{backgroundColor:changeColor}}>{row.lcaNm._text}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell className={classes.tableCellStyle} style={{ paddingBottom: 0, paddingTop: 0, borderBottomWidth:0 ,borderTopWidth:0}} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Table size="small" aria-label="purchases">
              {
            	  list.length>0?list.map((element,key) => {
	                  return(
	                   <TableBody key={key}>
	                    <TableRow >
	                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'15%'}}>관세사 상호명</TableCell>
	                      <TableCell className={classes.tableCellStyle}>{element.lcaConm._text}</TableCell>
	                    </TableRow>
	                    <TableRow >
	                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'15%'}}>관세사 대표 전화</TableCell>
	                      <TableCell className={classes.tableCellStyle} >{element.telno._text}</TableCell>
	                    </TableRow>
	                    <TableRow >
	                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'15%'}}>관세사 주소</TableCell>
	                      <TableCell className={classes.tableCellStyle}>{element.addr._text}</TableCell>
	                    </TableRow>
	                    <TableRow >
	                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'15%'}}>관세사 대표자명</TableCell>
	                      <TableCell className={classes.tableCellStyle}>{element.rppnNm._text}</TableCell>
	                    </TableRow>
	                    <TableRow >
	                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'15%'}}>관세사 구분코드</TableCell>
	                      <TableCell className={classes.tableCellStyle}>{element.lcaTp._text}</TableCell>
	                    </TableRow>
	                    </TableBody>
	                  )
	                  }):"No Data"}
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
      <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}

		</Alert>
	</Snackbar>
    </React.Fragment>
  );
}
export default function CollapsibleTable(props) {
	
	  const [page,setPage] = React.useState(0);
	  const [rowsPerPage,setRowsPerPage] = React.useState(10);
	  const [open,setOpen] = React.useState(false);
	  
	  const emptyRows = rowsPerPage - Math.min(rowsPerPage,props.tableRow.length - page * rowsPerPage);
	  
	  const handleChagePage = (e,newPage) => {
		  setPage(newPage);
		  setOpen(false);
	  }
	  
	  const handleChangeRowsPerPage = event => {
		  setRowsPerPage(parseInt(event.target.value,10));
		  setPage(0);
	  }
	  	  
	const classes = useStyles();
	
  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table" style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7',borderCollapse:'unset'}}>
        <TableHead>
          <TableRow>
	          <TableCell className={classes.tableHeaderCellStyle}>관할세관부호</TableCell>
	          <TableCell className={classes.tableHeaderCellStyle}>관세사부호</TableCell>
	          <TableCell className={classes.tableHeaderCellStyle}>관할세관명</TableCell>
	          <TableCell className={classes.tableHeaderCellStyle}>관세사명</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0?props.tableRow.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) :  props.tableRow).map((row, key) => (
            <Row key={key} row={row} onOpen={open} {...props} />
          ))}
        </TableBody>
        {(props.tableRow.length >= 5 ?
              <TableFooter>
            	<TableRow>
            		<TablePagination 
            			rowsPerPageOptions={[5,10,15,{label:'All',value:-1}]}
            			colSpan={4}
            			count={props.tableRow.length}
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
    </TableContainer>
  );
}

function TablePageinationActions(props) {
	const classes = useStyles1();
	const theme = useTheme();
	const {count,page,rowsPerPage,onChangePage} =props;
	
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