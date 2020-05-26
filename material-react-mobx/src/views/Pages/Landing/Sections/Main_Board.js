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
import Table from 'components/Table/TableBoardPaging.js';
import axios from 'axios';
import styles from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
const useStyles = makeStyles(styles);

export default function BoardTest(props) {

    const {data} = props;
    //console.log("data:",data);
    const classes = useStyles();

    return(
    <div className={classes.section} style={{paddingTop:'2%',paddingBottom:'0'}}>
    	
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={9}>
	      	<div style={{textAlignLast:'right',marginBottom:'0'}}>
		    <Link to="/svc/board" >
		    	<p><font color="black">+more</font></p>
			  </Link>
			</div>
         <Card>
	     <CardHeader color="info" stats icon style={{paddingBottom:'2px',height:'45px'}}>
	 		<CardIcon color="info" style={{padding:'4px'}}>
	 			<Icon>content_copy</Icon>
	 		</CardIcon>
	 		<h4 style={{textAlignLast:'left'}}><font color="black">공지사항</font></h4>
	 	  </CardHeader>
	      <CardBody style={{paddingTop:'5px'}}>
	        	<Table
	        		tableHeaderColor="info"
			        tableHead={["no", "title", "inser_name","search_cnt","insert_date"]}
			        tableData={data} 
			     />
	      </CardBody>
	    </Card>
        </GridItem>
      </GridContainer>
    </div> 
    );
}
