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
import Popover from "@material-ui/core/Popover";
//import Paper from "@material-ui/core/Paper";

// core components
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";
import { slideDown, slideUp } from "components/Slide/Slide.js";
import SchLinePicPop from "views/Pages/Schedule/SchLinePicPop.js";


import axios from 'axios';
import TableList from "components/Table/TableSmallLine.js";
import Button from "components/CustomButtons/Button.js";

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

  const [det,setDet] = useState(true);

  //const [cookies, setCookie] = useCookies(['name']); 

  const handleChagePage = (e,newPage) => {
    console.log("handleChagePage : ");
    setDet(false);
    setPage(newPage);
  }
  
  const handleChangeRowsPerPage = event => {
    console.log("handleChangeRowsPerPage");
    setDet(false);
	  setRowsPerPage(parseInt(event.target.value,10));
    setPage(0);
  }


  
  
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table} size="small" stickyHeader={true}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow className={classes.tableHeadRow}>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
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
        			colSpan={8}
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

  componentDidMount() {
    console.log("componentDidMount");
    //this.scheduleToSearch();
  }

  componentDidUpdate(prevProps) {
    console.log("componentDidUpdate");
    //debugger;
    if(this.props.page != prevProps.page) {
      this.setState({ expanded: false });
      //this.scheduleToSearch();
    }
  }

  // 테이블 조회
  scheduleToSearch = () => {
    this.setState({port:[]});
    return axios ({
		url:'/sch/getScheduleDetailList',
		method:'POST',
		data: {carrierCode : this.props.data.line_code,
			   startPort : this.props.data.start_port,
			   endPort : this.props.data.end_port,
			   voyage : this.props.data.voyage_no,
         vesselName : this.props.data.vsl_name,
         startDate : this.props.data.start_day,
         endDate : this.props.data.end_day,
         svc : this.props.data.svc
         },
    headers:{'Authorization':'Bearer '+this.props.userStore.token}
  },).then(response => this.setState({port:response.data }));

    
  }
 
  // 로우 생성
  toggleExpander = () => {
/*     if (!this.state.expanded) {
      this.setState({ expanded: true }, () => {
        if (this.refs.expanderBody) {
          slideDown(this.refs.expanderBody);//this.scheduleToSearch();
        }
      });
    } else {
      slideUp(this.refs.expanderBody, {
        onComplete: () => {
          this.setState({ expanded: false });
        }
      });
    } */

  };

  
  render() {
    //const { data } = this.props;
     const { port } = this.state;

     
    if(!this.props.det && this.state.expanded) {
      //this.toggleExpander();
      //console.log("render!!!!");
    }
     
     console.log(">>> port : ",this.state.port) ;
     console.log(">>> line_code : ",port) ;
    return [
      <TableRow  key={this.props.index}  >
        {/* <TableCell >{this.props.data.line_code}</TableCell> */}
        <TableCell onClick={this.handleClick} style={{cursor: "pointer"}}><Tooltip title={this.props.data.line_nm}>{this.props.data.image_yn=='Y'?<img width='40' height='40' src={require("assets/img/carrier/"+this.props.data.line_code+".gif")} />:<img width='40' height='40' src={require("assets/img/carrier/No-Image.gif")} />}</Tooltip>
        </TableCell>
        <TableCell onClick={this.toggleExpander}>{this.props.data.vsl_name}</TableCell>
        <TableCell onClick={this.toggleExpander}>{this.props.data.voyage_no}</TableCell>
        <TableCell onClick={this.toggleExpander}>{this.props.data.start_port_name} ({this.props.data.start_day})</TableCell>
        <TableCell onClick={this.toggleExpander}>{this.props.data.end_port_name} ({this.props.data.end_day})</TableCell>
        <TableCell onClick={this.toggleExpander}>{this.props.data.tt}</TableCell>
        <TableCell onClick={this.toggleExpander}>{this.props.data.ts}</TableCell>
        <TableCell >{this.props.data.line_url && ( <Button size="sm" target="_blank" href={this.props.data.line_url} color="info" >BOOKING</Button>)}</TableCell>
                              
        <Popover
                    id="pop"
                    open={this.state.pop}
                    onClose={this.handleClose}
                    anchorReference="anchorPosition"
                    anchorPosition={{top:80,left:550}}
                        anchorOrigin={{vertical:'bottom',horizontal:'center',}}
                        transformOrigin={{vertical:'top',horizontal:'center',}}
                  >
											<SchLinePicPop
												detailParam = {this.props.data} store={this.props.userStore}
											/>
                  </Popover>
      </TableRow>,
      this.state.expanded && (
        <TableRow key = {this.props.index+1}>
          <TableCell colSpan={4}>
            <div ref="expanderBody"> 
            <TableList
                  tableHeaderColor={this.props.color}
                  tableHead={["Vessel Name","Voyage No","POL","POD"]}
//                  tableData={[["DEPATURE 2020-01-29", "2020-01-29", "2020-01-29","1","2","3","4"],
//                  ["LOGING 2020-01-29", "2020-01-29", "2020-01-29","1","2","3","4"]]}
                  tableData={port}
              />  
            </div>
          </TableCell>
        </TableRow>
      )                  
    ];
  }
}
