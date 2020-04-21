import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
//import Modal from '@material-ui/core/Modal';
//import JoinPage from "components/Form/Common/JoinPage.js";
import axios from 'axios';
import Icon from "@material-ui/core/Icon";


const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));

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
  const classes = useStyles();

  const [selectData,setSelectData] = useState([]);

  const {detailParam} = props;

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
    return axios ({
      url:'/sch/getScheduleDetailList',
      method:'POST',
      data: {carrierCode : props.detailParam.line_code,
           startPort : props.detailParam.start_port,
           endPort : props.detailParam.end_port,
           voyage : props.detailParam.voyage_no,
           vesselName : props.detailParam.vsl_name,
           startDate : "",
           endDate : "",
           svc : ""
           }
    }).then(setSelectData([])).then(res => setSelectData(res.data));
  }
  
  return (
        <Card>
 		<CardHeader color="info" stats icon >
		<CardIcon color="info" style={{height:'26px'}}>
			<IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>FCL Sea Schedule Detail</h4>
        <p/>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- LINE CODE : {props.detailParam.line_code}</p>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- VSL NAME : {props.detailParam.vsl_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- VOYAGE NO : {props.detailParam.voyage_no}</p>
        <p className={classes.cardTitleBlack}>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- PORT : {props.detailParam.start_port} ({props.detailParam.start_day}) -> {props.detailParam.end_port} ({props.detailParam.end_day})</p>
  </CardHeader>
          <CardBody>
		         <GridItem>
				     <Table
				          tableHeaderColor="info"
				          tableHead={["Vessel Name","Voyage No","POL","POD"]}
				          tableData={selectData}
				        />
				     </GridItem>
          </CardBody>
        </Card>
  );
}
