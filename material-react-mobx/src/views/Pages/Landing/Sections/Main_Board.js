import React,{ useState, useEffect } from "react";
import { Link  } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Board from "components/Board/Board.js"
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CardContent, TextField } from "@material-ui/core";
// board table page
//import Table from 'components/Table/TableBoardPaging.js';

//import styles from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
//import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";
import Edit from "@material-ui/icons/ArtTrack";
import Tooltip from "@material-ui/core/Tooltip";
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import PlaylistAdd from '@material-ui/icons/PlaylistAdd';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Chat from "@material-ui/icons/Chat";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import axios from 'axios';

import styles from "assets/jss/material-dashboard-pro-react/views/dashboardStyle.js";
import table from "assets/jss/material-dashboard-pro-react/components/tableStyle";

const tableStyles = makeStyles(table);

const useStyles = makeStyles(styles);

const useRowStyles = makeStyles({
	  root: {
	    '& > *': {
	      borderBottom: 'unset',
	    },
	  },
	});

export default function BoardTest(props) {

    const {data,tableRownum,totPage } = props;
    //console.log("data:",data);
    const classes = useStyles();
    
    const handleAddFunction = () => {
        props.onClickHandle();
      }
    
    return(

         <Card>
	     <CardHeader color="info" style={{background:'white',paddingTop:'0',paddingBottom:'5px'}}>
		     <GridContainer justify="space-between">
		  	  	<GridItem xs={12} sm={12} md={'auto'} >
		  	  		<h4 style={{textAlignLast:'left',color:'black'}}><Chat style={{color:'#00acc1'}}>content_copy</Chat> 공지사항</h4>
		  	   </GridItem>
		  	 <GridItem xs={12} sm={12} md={'auto'} >
			 		 <Tooltip
		            id="tooltip-top"
		            title="Edit"
		            placement="bottom"
		            classes={{ tooltip: classes.tooltip }}
		          >
		            <Button color="transparent" simple justIcon>
		              <Edit className={classes.underChartIcons} style={{color:'black'}} />
		            </Button>
		          </Tooltip>
		  	   </GridItem>
		  	   </GridContainer>
		     <CollapsibleTable
	 		   tableHeaderColor="info"
		       tableHead={["no", "title", "inser_name","search_cnt","insert_date"]}
		       tableData={data} 
		     />
	 	  </CardHeader>
	      <CardBody style={{paddingTop:'0',paddingBottom:'0',paddingRight:'30px'}}>	        	
	      <GridContainer justify="space-between">
	      <GridItem xs={12} sm={12} md={'auto'} >
	      <font size="2">({tableRownum}/{totPage})</font>
	      </GridItem>
		  	 <GridItem xs={12} sm={12} md={'auto'} >
			 		 <Tooltip
		            id="tooltip-top"
		            title="더보기"
		            placement="bottom"
		            classes={{ tooltip: classes.tooltip }}
		          >
		            <Button color="transparent" simple justIcon onClick={handleAddFunction}>
		              <PlaylistAdd className={classes.underChartIcons} style={{color:'black'}}/><font size="2">더보기</font>
		            </Button>
		          </Tooltip>
		  	   </GridItem>
	  	   </GridContainer>

	      </CardBody>
	    </Card>

    );
}

function Row(props) {
	  const { row } = props;
	  const [open, setOpen] = React.useState(false);
	  const [detailData, setDetailData] = React.useState([]);
	  const classes = tableStyles();
	  
	  const handleOpen =(id)=>{

		  axios.post("/api/getBoardDetail",{board_id:id})
		  .then(setDetailData([]))
	      .then(res => setDetailData(res.data[0]));
		  setOpen(!open);

	  }

	  return (
	    <React.Fragment>
	      <TableRow className={classes.tableRow} onClick={(event) => handleOpen(row.board_id)}>
	      {/*<TableCell component="th" scope="row" style={{paddingTop:'10px',paddingBottom:'10px'}} >{row.board_id}</TableCell>*/}
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.title}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.author_name}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.hit_count}</TableCell>
	        <TableCell style={{paddingTop:'10px',paddingBottom:'10px'}}>{row.insert_date}</TableCell>
	      </TableRow>
	      <TableRow>
	        <TableCell style={{ paddingBottom: 0, paddingTop: 0 , paddingLeft:'3px',paddingRight:'3px' }} colSpan={6}>
	          <Collapse in={open} timeout="auto" unmountOnExit>
	            <Box margin={1}>
	            <div className={classes.tableResponsive}>
	            <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}} className={classes.table}>
	            <TableBody>
		                <TableRow>
		                  <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px',width:'10%'}}>제목</TableCell>
		                  <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}} colspan={3}>{detailData.title}</TableCell> 
		                </TableRow>
		                <TableRow>
			                <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>등록자</TableCell>
			                <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}}>{detailData.author_name}</TableCell>
			                <TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px',width:'10%'}}>등록일</TableCell>
			                <TableCell style={{paddingTop:'3px',paddingBottom:'3px'}}>{detailData.insert_date}</TableCell>
			            </TableRow>
		              	<TableRow>
		              		<TableCell style={{backgroundColor: "#f2fefd",paddingTop:'3px',paddingBottom:'3px'}}>내용</TableCell>
		              		<TableCell style={{paddingTop:'3px',paddingBottom:'3px'}} colspan={3}>
		              		{
		              			String(detailData.content).split('\n').map( (line, index) => {
		                          return (<span key={index}>{line}<br/></span>)
		                        })
		                      }
		              		</TableCell>
		              	</TableRow>
	            </TableBody>
	        </Table>
	        </div>
	            </Box>
	          </Collapse>
	        </TableCell>
	      </TableRow>
	    </React.Fragment>
	  );
	}

	function CollapsibleTable(props) {
	  const classes = tableStyles();
	  const { tableHead, tableData, tableHeaderColor, colSpan } = props; // eslint-disable-line no-unused-vars
		 
		 
	  return (
			    <div className={classes.tableResponsive}>
			      <Table className={classes.table}>
	              <TableHead style={{padding:'5px',backgroundColor:'#f2fefd'}} className={classes[tableHeaderColor + "TableHeader"]}>
	                <TableRow style={{borderBottomStyle:'solid',borderBottomColor:'#00bcd4'}} className={classes.tableRow + " " + classes.tableRowHead}>
	    	            {/*<TableCell className={classes.tableCell + " " + classes.tableHeadCell} stype={{width:'5%'}}>no</TableCell>*/}
	    	            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >title</TableCell>
	    	            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} stype={{width:'10%'}}>reg</TableCell>
	    	            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} stype={{width:'5%'}}>view</TableCell>
	    	            <TableCell className={classes.tableCell + " " + classes.tableHeadCell} stype={{width:'10%'}}>insert_date</TableCell>
	                </TableRow>
	              </TableHead>
	        <TableBody>
	        {tableData.map((prop, key) => {
	            return (
	              <Row key={key} row={prop} />
	            );
	          })}
	        </TableBody>
	      </Table>
	      </div>
	  );
	}
