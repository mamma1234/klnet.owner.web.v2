import React,{useState,useEffect} from "react";
import { Table, TableCell, TableBody, TableRow } from '@material-ui/core';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// core components
///import Grid from '@material-ui/core/Grid';
//import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
//import icon
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
//import page


import axios from 'axios';

/*const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));*/

const styles = {
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "300",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
	  },
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();
  //const classess = useStyless();
  
  const {data, charge} = props;
  
  let tariffStr = "";
  if (props.charge == "DEM") {
	tariffStr = props.data.dem_tariff;
  } else if (props.charge == "DET") {
	tariffStr = props.data.det_tariff;
  } else if (props.charge == "OSC") {
	tariffStr = props.data.osc_tariff;
  };
  

  
  
  
  return (
		<div style={{maxHeight:'600px',maxWidth:'840px'}}>
	        <Card style={{marginTop:'20px',marginBottom:'0'}}>		
	        	<CardHeader color="info" stats icon style={{paddingBottom:'2px',height:'45px'}}>
	        		<CardIcon color="info" style={{padding:'4px'}}>
	        			<Icon>content_copy</Icon>
	        		</CardIcon>
	        	</CardHeader>
				<CardBody style={{paddingTop:'0',paddingLeft:'5px',paddingRight:'5px'}}>
			    <Table>
					<TableBody>
					<TableRow>
            			<TableCell>
							{ tariffStr != null?tariffStr.split('/n').map( (str, index) => {
								return (<span key={index}>{str}<br/></span>)
							}):""}

						</TableCell>
					</TableRow>
					</TableBody>
				</Table>

					
		    	</CardBody>
	    	</Card>
      </div>
  );
}
