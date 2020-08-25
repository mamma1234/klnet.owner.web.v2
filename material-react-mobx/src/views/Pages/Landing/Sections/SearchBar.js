import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import {Collapse} from "@material-ui/core";

// @material-ui/icons
import Chat from "@material-ui/icons/Chat";
//import VerifiedUser from "@material-ui/icons/VerifiedUser";
//import Fingerprint from "@material-ui/icons/Fingerprint";
// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
//import InfoArea from "components/InfoArea/InfoAreaLanding.js";
//import bgimage from "assets/img/tracking.png";
import styles from "assets/jss/material-kit-pro-react/views/landingPageSections/productStyle.js";
import styles2 from "assets/jss/material-dashboard-pro-react/components/infoStyle";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Button from "components/CustomButtons/Button.js";
import {Select,TextField,Grid} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import axios from 'axios';

const useStyles = makeStyles(styles);

const useStyles2 = makeStyles(styles2);

export default function ProductSection() {
  //const classes = useStyles();
  const classes2 = useStyles2();
  const [hsData, setHsData] = React.useState([]);
  const [hsCode, setHscode] = React.useState("");
  const [hscodeOpen, setHscodeOpen] = React.useState(false);
  
  const [imoData, setImoData] = React.useState([]);
  const [imo, setImo] = React.useState("");
  const [imoOpen, setImoOpen] = React.useState(false);
  
  
  const hs_search = () => {
	  if(hsCode) {
	  axios.post("/api/elasticHsSearch",{hs:hsCode})
	    .then(setHsData([]))
	    .then(res => {
	    	if(res.data) {console.log("hs data",res.data);	
	    			  setHsData(res.data);
	                  setHscodeOpen(true);	
		    } else {
		    	setHsData({satmntPrdlstNm:"데이터가 존재하지 않습니다."});
	            setHscodeOpen(true);	
		    }}
	    		)
	    .catch(err => {
	       alert(err);
	       setHscodeOpen(false);
	    });
	  } else {
		  setHscodeOpen(false);
	  }
  }
  
  const imo_search = () => {
	  if(imo) {
	  axios.post("/api/elasticImoSearch",{imo:imo})
	    .then(setImoData([]))
	    .then(res => {  console.log("imo data",res.data);		
	    			if(res.data) {
	    				setImoData(res.data);
	    				setImoOpen(true);
	    			} else {
						setImoData({imo:"",name:"데이터가 존재 하지 않습니다."});
						setImoOpen(true);
	    			}
	    		})
	    .catch(err => {
	       alert(err);
	       setImoOpen(false);
	    });
	  } else {
		  setImoOpen(false);
	  }
  }
  
  return (
    <div>
      <GridItem xs={12} sm={12} md={12}>
	      <GridContainer justify="center">
	      	<GridItem xs={12} sm={12} md={6}>
		      	<Card style={{marginBottom:'0'}}>
		      		<CardHeader style={{paddingTop:'5px',paddingBottom:'5px'}}>
			      		<div className={classes2.infoArea} style={{maxWidth:'none'}}>
			            <div className={classes2.iconWrapper + " " + classes2["info"]}>
			              <Chat className={classes2.icon} />
			            </div>
			            <div className={classes2.descriptionWrapper}>
			              <h4 className={classes2.title}>HS CODE 란?</h4>
			              <GridContainer justify="center">
					      	<Grid item xs={12} sm={12} md={3} style={{padding:'0'}}>
					      		<img src={require("assets/img/hscode.jpg")} style={{width:'95%'}}/>
					      	</Grid>
					      	<Grid item xs={12} sm={12} md={8}>
					      		<p className={classes2.description} style={{marginBottom:'25px'}}>HS CODE는 국제통일 상품분류체계에 따라 대외 무역거래 상품을 총괄적으로 분류한 품목 분류 코드를 말합니다. 이 HS CODE는 총 6자리로 구성되어 있으며, 우리나라는 물건의 세부 분류를 위해 4자리를 추가해 사용하고 있습니다.  (이를 HSK 코드라고 합니다.)</p>
					      	</Grid>
					      	</GridContainer>
			            </div>
			          </div>	 
					 </CardHeader>
					 <CardBody style={{paddingTop:'0'}}>
			      		<GridContainer justify="center">
				      	<GridItem xs={12} sm={12} md={7}>
				      		<TextField id="searchBar1" //label={<font size="2">HS CODE</font>} 
				      			onChange={event => setHscode(event.target.value)} 
				      			variant="outlined" size="small" fullWidth style={{marginTop:'5px'}} />
				      	</GridItem>
				      	<GridItem xs={12} sm={12} md={'auto'}>
				      		<Button  color="info" size="sm"  onClick={hs_search} 
				      			endIcon={<SearchIcon/>} 
				      			style={{paddingTop:'11px',paddingBottom:'11px'}}
				      			fullWidth>조회하기</Button>
				      	</GridItem>
				     </GridContainer>
				     <Collapse in={hscodeOpen} timeout="auto" unmountOnExit style={{width:'100%'}}>
					     <Table>
						     <TableHead>
					            <TableRow>
						            <TableCell style={{paddingBottom:'0'}}>품목번호</TableCell>
						            <TableCell style={{paddingBottom:'0'}}>품명</TableCell>
						        </TableRow>
						     </TableHead>
						     <TableBody>
							     <TableRow>
						            <TableCell style={{paddingBottom:'0'}}>{hsData.prdlstCd}&nbsp;{hsData.prdlstCdDetail}</TableCell>
						            <TableCell style={{paddingBottom:'0'}}>{hsData.satmntPrdlstNm}</TableCell>
						         </TableRow>
						     </TableBody>
					     </Table>
				     </Collapse>
					 </CardBody>
			     </Card> 
	      	</GridItem>
	      	<GridItem xs={12} sm={12} md={6}>
	      		<Card style={{marginBottom:'0'}}>
	      			<CardHeader style={{paddingTop:'5px',paddingBottom:'5px'}}>
		      			<div className={classes2.infoArea} style={{maxWidth:'none'}}>
			            <div className={classes2.iconWrapper + " " + classes2["info"]}>
			              <Chat className={classes2.icon} />
			            </div>
			            <div className={classes2.descriptionWrapper}>
			              <h4 className={classes2.title}>IMO</h4>
					      	<img src={require("assets/img/imo_image.png")} />
					      	<p className={classes2.description} style={{marginBottom:'0px'}}>This is the English language IMDG Code exactly as on the IMDG Code for Windows except For Dangerous Goods note generation.</p>
			            </div>
			          </div>
		      	     </CardHeader>
				     <CardBody style={{paddingTop:'0'}}>
					     <GridContainer justify="center">
			      	      	<GridItem xs={12} sm={12} md={7}>
			      	      		<TextField id="searchBar2" //label={<font size="2">IMO CODE</font>} //onChange={event => setEmail(event.target.value)}
			      	      		onChange={event => setImo(event.target.value)} 
			      	      		variant="outlined" size="small" fullWidth style={{marginTop:'5px'}} />
			      	      	</GridItem>
			      	      	<GridItem xs={12} sm={12} md={'auto'}>
			      	      	<Button  color="info" size="sm"  onClick={imo_search}
			      	    		endIcon={<SearchIcon/>} 
			      	    	style={{paddingTop:'11px',paddingBottom:'11px'}}
			      	    	fullWidth>조회하기</Button>
			      	      	</GridItem>
		   	         </GridContainer>  
		   	      <Collapse in={imoOpen} timeout="auto" unmountOnExit style={{width:'100%'}}>
				     <Table>
					     <TableHead>
				            <TableRow>
					            <TableCell style={{paddingBottom:'0'}}>IMO CODE</TableCell>
					            <TableCell style={{paddingBottom:'0'}}>IMO NAME</TableCell>
					        </TableRow>
					     </TableHead>
					     <TableBody>
					    	 <TableRow>
						            <TableCell style={{paddingBottom:'0'}}>{imoData.imo}</TableCell>
						            <TableCell style={{paddingBottom:'0'}}>{imoData.name}</TableCell>
						         </TableRow>
					     </TableBody>
				     </Table>
			     </Collapse>
					 </CardBody>
				 </Card> 
	      	</GridItem>
	      </GridContainer> 
      </GridItem>
    </div>
  );
}
