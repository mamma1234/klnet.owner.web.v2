import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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
import {userService} from 'views/Pages/Login/Service/Service.js';


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

//const useStyles = makeStyles(styles);

const useStyles = makeStyles(theme => ({
  root: {
    height: '550px'
  },
}));

export default function TableList(props) {
//  const TableList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
  const classes = useStyles();

  const [selectData,setSelectData] = useState([]);

  const {detailParam,store} = props;

  //debugger;
  
  React.useEffect(() => {
	    console.log('effect');
	    getLinePicInfo();
	    //.then(res => console.log(JSON.stringify(res.data)));
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  function getLinePicInfo() {
    const token = userService.GetItem()?userService.GetItem().token:null;
	  if(token) {
		    return axios ({
		      url:'/sch/getLinePicInfo',
		      method:'POST',
		      data: {carrierCode : detailParam.line_code
		           },
		      headers:{'Authorization':'Bearer '+token}
		    }).then(setSelectData([])).then(res => setSelectData(res.data));
	  } else {
		  
	  }
  }
  
  return (
    <div className={classes.root}>
        <Card>
 		<CardHeader color="info" stats icon >
		<CardIcon color="info" style={{height:'26px'}}>
			<IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
        </CardIcon>
        <h4 style={{textAlign: "left",color:"#000000"}}>Line Pic List</h4>
        <p/>
  </CardHeader>
          <CardBody>
		         <GridItem>
				     <Table
				          tableHeaderColor="info"
				          tableHead={["지역","업무","이름/직급","전화번호","이메일","C.P","비고"]}
				          tableData={selectData}
				        />
				     </GridItem>
          </CardBody>
        </Card>
        </div>
  );
}
//))
//export default TableList;
