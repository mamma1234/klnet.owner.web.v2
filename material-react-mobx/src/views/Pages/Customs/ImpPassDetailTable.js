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
import TablePagination from "@material-ui/core/TablePagination";

import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import LastPageIcon from "@material-ui/icons/LastPage";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import MButton from '@material-ui/core/Button';
import Button from "components/CustomButtons/Button.js";

// core components
import { slideDown, slideUp } from "components/Slide/Slide.js";
import axios from 'axios';
import TableList from "components/Table/TableSmallLine.js";
import ImpPassShedDetail from "./ImpPassShedDetail.js"
import ImpPassLcaDetail from "./ImpPassLcaDetail.js"
import Popover from  '@material-ui/core/Popover';

import Grid from '@material-ui/core/Grid';


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
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px'
  }
}));

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


  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor, tableRownum, tableHeaderColorCode } = props;
  const [page,setPage] = React.useState(0);
  const [rowsPerPage,setRowsPerPage] = React.useState(5);
  //console.log(">>> tableData : ",tableData);
  //console.log(props);

  const handleAddFunction = () => {
    props.onClickHandle();
  }


  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
      <Table className={classes.table} >
        <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{textAlignLast:'center', backgroundColor:tableHeaderColorCode}}>
          <TableRow className={classes.tableHeadRow}>
                <TableCell className={classes.tableHeaderCellStyle} rowSpan="2">No.</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>처리단계</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>장치장 / 장치위치</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>포장개수(단위)</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>반출입(처리)일시</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>신고번호</TableCell>
          </TableRow>
          <TableRow className={classes.tableHeadRow}>
                <TableCell className={classes.tableHeaderCellStyle}>처리일시</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>장치장명</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>중량</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>반출입(처리)내용</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>반출입근거번호</TableCell>
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
          expanded: false,
          openShed: false,
          openLca: false
        };

  handleClickOpenShed = () => {
    if(this.props.data.shedSgn != undefined && this.props.data.shedSgn != ""){
      this.setState({ openShed: true }); 
    }
  }

  handleClickOpenLca = () => {
    if(this.props.data.cargTrcnRelaBsopTpcd === "수입신고"){
      this.setState({ openLca: true }); 
    }
  }

  handleClickClose = () => {
	  this.setState({ openShed: false, openLca:false});
  }

  componentDidMount() {
    if (this.state.expanded != "") {
      this.setState({ expanded: true});
    } else {
      this.setState({ expanded: false});
    }
  }

  render() {
    const { data } = this.props;
    
    return [
      
      <TableRow key={this.props.index}>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}}
          rowSpan={this.props.data.bfhnGdncCn != undefined? "3":"2"}>{data.no}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}}>{data.cargTrcnRelaBsopTpcd}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'left'}} onClick={this.handleClickOpenShed}>
          <u style={{cursor:"pointer"}}>{data.shedSgn}</u></TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'right'}}>{data.pck_text}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}}>{data.rlbrDttm}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}}>{data.dclrNo}</TableCell>
        <Popover
	      	id="popoverShed"
	      	open={this.state.openShed}
	      	onClose={this.handleClickClose}
          anchorReference="anchorPosition"
          anchorPosition={{top:80,left:550}}
          anchorOrigin={{vertical:'bottom',horizontal:'center',}}
          transformOrigin={{vertical:'top',horizontal:'center',}}
        > 
          <ImpPassShedDetail
            snarSgn={data.shedSgn}
            token ={this.props.store}/>
        </Popover>
      </TableRow>, 
      <TableRow key={this.props.index+1}>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}}>{data.prcsDttm}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'left'}}>{data.shedNm}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'right'}}>{data.wght_text}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}}>{data.rlbrCn}</TableCell>
        <TableCell style={{borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px',padding:'7px', textAlign:'center'}} onClick={this.handleClickOpenLca}>
          {this.props.data.cargTrcnRelaBsopTpcd === "수입신고"?<u style={{cursor:"pointer"}}>{data.rlbrBssNo}</u>:data.rlbrBssNo}</TableCell>
        
        <Popover
	      	id="popoverLca"
	      	open={this.state.openLca}
	      	onClose={this.handleClickClose}
          anchorReference="anchorPosition"
          anchorPosition={{top:80,left:550}}
          anchorOrigin={{vertical:'bottom',horizontal:'center',}}
          transformOrigin={{vertical:'top',horizontal:'center',}}
        > 
          <ImpPassLcaDetail
            dclrNo={data.dclrNo}
            token ={this.props.store}/>
        </Popover>
      </TableRow>,
      this.props.data.bfhnGdncCn != undefined? 
        (<TableRow key = {this.props.index+2}>
          <TableCell colSpan={6} style={{padding:'7px',borderStyle:'solid',borderColor:'#dbdbdb',borderWidth:'1px'}}>
              <Grid style={{textAlign:"center"}}>{this.props.data.bfhnGdncCn}</Grid>
          </TableCell>
        </TableRow>)
        : <TableRow key = {this.props.index+2} style={{display:"none"}}></TableRow>
     
    ];
  }
}
