import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import GridContainer from "components/Grid/GridContainer.js";
import Button from "components/CustomButtons/Button.js";
import Tooltip from '@material-ui/core/Tooltip';
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
//import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
//import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
//import Modal from '@material-ui/core/Modal';
//import JoinPage from "components/Form/Common/JoinPage.js";
import axios from 'axios';
//import Icon from "@material-ui/core/Icon";
//import { observer, inject} from 'mobx-react'; // 6.x


/*const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));*/

const styles = {

  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
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
//  const TableList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
  const classes = useStyles();

  const [selectData,setSelectData] = useState([]);

  const {detailParam,store} = props;

  //debugger;
  
  React.useEffect(() => {
	    console.log('effect');
	    getSchDetailInfo();
	    //.then(res => console.log(JSON.stringify(res.data)));
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  function getSchDetailInfo() {
	  if(store.token) {
		    return axios ({
		      url:'/sch/getScheduleDetailList',
		      method:'POST',
		      data: {carrierCode : detailParam.line_code,
		           startPort : detailParam.start_port,
		           endPort : detailParam.end_port,
		           voyage : detailParam.voyage_no,
		           vesselName : detailParam.vsl_name,
		           startDate : "",
		           endDate : "",
		           svc : ""
		           },
		      headers:{'Authorization':'Bearer '+store.token}
		    }).then(setSelectData([])).then(res => setSelectData(res.data));
	  } else {
		  
	  }
  }
  
  return (
        <Card>
 		<CardHeader color="info" stats icon >
		<CardIcon color="info" style={{height:'26px'}}>
			<IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>FCL Sea Schedule Detail</h4>
        <p/>
        <GridContainer>
      <GridItem xs={12} sm={9} md={9}>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- LINE CODE : {detailParam.line_code}</p>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- VSL NAME : {detailParam.vsl_name}</p>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- VOYAGE NO : {props.detailParam.voyage_no}</p>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- PORT : {detailParam.start_port_name} ({detailParam.start_day}) -> {detailParam.end_port_name} ({props.detailParam.end_day})</p>

        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- T/S : {detailParam.ts}</p>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- T/Time : {detailParam.tt}</p>
      </GridItem>
      <GridItem xs={12} sm={2} md={3}>
      <Tooltip title={detailParam.line_nm}>{detailParam.image_yn=='Y'?<img src={require("assets/img/carrier/"+detailParam.line_code+".gif")} height="100" width="100"  />:<p style={{textAlign: "left"}}><img src={require("assets/img/carrier/No-Image.gif")} height="100" width="100"/></p>}</Tooltip>
      </GridItem>
      </GridContainer>
  </CardHeader>
          <CardBody >
{/* 		         <GridItem>
				     <Table
				          tableHeaderColor="info"
				          tableHead={["Vessel Name","Voyage No","POL","POD"]}
				          tableData={selectData}
				        />
				     </GridItem> */}
             <GridContainer>
             <GridItem xs={12} sm={9} md={9}/>
             <GridItem xs={12} sm={9} md={3} > {detailParam.line_url && ( <Button target="_blank" href={detailParam.line_url} color="info" >BOOKING</Button>)}
             </GridItem>
             </GridContainer>
          </CardBody>
        </Card>
  );
}
//))
//export default TableList;
