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
  BlDetailTableHeader: {
    borderStyle:'solid',
    borderWidth:'1px',
    borderColor:'#d6d6d6',
    backgroundColor: "#f2fefd",
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
  const { tableHead, tableData, tableHeaderColor, tableRownum } = props;
  const [page,setPage] = React.useState(0);
  const [rowsPerPage,setRowsPerPage] = React.useState(5);
  //console.log(">>> tableData : ",tableData);
  //console.log(props);


  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
      <Table className={classes.table} >
        <TableHead style={{padding:'5px',textAlignLast:'center'}}>
          <TableRow>
                <TableCell className={classes.BlDetailTableHeader} colSpan="3">통관사항</TableCell>
                <TableCell className={classes.BlDetailTableHeader} colSpan="4">선적사항</TableCell>
          </TableRow>
          <TableRow>
                <TableCell className={classes.BlDetailTableHeader}>수출자</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>수리일자</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>통관포장개수</TableCell>
                <TableCell className={classes.BlDetailTableHeader} rowSpan="2">적하목록관리번호</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>선기적지</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>선기적포장개수</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>분할회수</TableCell>
          </TableRow>
          <TableRow>
                <TableCell className={classes.BlDetailTableHeader}>수출신고번호</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>적재의무기한</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>통관중량(KG)</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>출항일자</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>선기적중량(KG)</TableCell>
                <TableCell className={classes.BlDetailTableHeader}>선기적완료여부</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRows key={key} index={key + 1} data={prop} classes={classes} color={tableHeaderColor} onClickDclrNo={(dclrNo) => props.onClickDclrNo(dclrNo)} />
            );
          })}
           
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
  
  state = {demExpanded: false , 
          detExpanded: false ,
          oscExpanded: false ,
          cntrExpanded: false
        };

  demExpander = () => {
    this.setState({ cntrExpanded: false });
    this.setState({ detExpanded: false });
    this.setState({ oscExpanded: false });
    if (!this.state.demExpanded) {
      this.setState({ demExpanded: true }, () => {
        if (this.refs.demExpand) {slideDown(this.refs.demExpand);}
      });
    } else {
      slideUp(this.refs.demExpand, {onComplete: () => {this.setState({ demExpanded: false });}});
    }
  }; 

  detExpander = () => {
    this.setState({ cntrExpanded: false });
    this.setState({ demExpanded: false });
    this.setState({ oscExpanded: false });
    if (!this.state.detExpanded) {
      this.setState({ detExpanded: true }, () => {
        if (this.refs.detExpand) {slideDown(this.refs.detExpand);}
      });
    } else {
      slideUp(this.refs.detExpand, {onComplete: () => {this.setState({ detExpanded: false });}});
    }
  }; 

  oscExpander = () => {
    this.setState({ cntrExpanded: false });
    this.setState({ demExpanded: false });
    this.setState({ detExpanded: false });
    if (!this.state.oscExpanded) {
      this.setState({ oscExpanded: true }, () => {
        if (this.refs.oscExpand) {slideDown(this.refs.oscExpand);}
      });
    } else {
      slideUp(this.refs.oscExpand, {onComplete: () => {this.setState({ oscExpanded: false });}});
    }
  }; 

  cntrExpander = () => {
    this.setState({ demExpanded: false });
    this.setState({ detExpanded: false });
    this.setState({ oscExpanded: false });

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
    //const classes = useStyles1();
    //console.log(classes);
    
    return [
          <TableRow key={this.props.index}>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.exppnConm}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.acptDt}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'right'}}>{data.csclPck_text}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}} rowSpan="2">{data.mrn}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.shpmAirptPortNm}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'right'}}>{data.shpmPck_text}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.dvdeWdrw}</TableCell>
          </TableRow>,
          <TableRow key={this.props.index+1}>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center', textDecoration:"underline", cursor:"pointer"}} 
                      onClick={() => {this.props.onClickDclrNo(data.expDclrNo)}}>{data.expDclrNo}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.loadDtyTmlm}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'right'}}>{data.csclWght}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.tkofDt}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'right'}}>{data.shpmWght}</TableCell>
                <TableCell style={{borderStyle:'solid',borderWidth:'1px', borderColor:'#d6d6d6', padding:'7px', textAlign:'center'}}>{data.shpmCmplYn}</TableCell>
          </TableRow>
     
    ];
  }
}
