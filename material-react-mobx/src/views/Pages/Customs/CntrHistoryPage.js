import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Table from "./TablePaging.js";
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
import { observer, inject} from 'mobx-react'; // 6.x


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
    color: "#000000",
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
};

const useStyles = makeStyles(styles);

const TableList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
  const classes = useStyles();
  const [cntrList, setCntrList] = useState([]);
  const [cntrCnt, setCntrCnt] = useState('0');

  React.useEffect(() => {
	    getCntrInfoList();
	    //.then(res => console.log(JSON.stringify(res.data)));
	    
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  function getCntrInfoList() {
    if(props.cargMtNo == undefined){
      alert("화물관리번호가 올바르지 않습니다");
      return;
    }
    const searchData = {
      cargMtNo: props.cargMtNo
    };
    axios.post("/com/uniPassApiSelectCntrInfo",searchData, {headers:{'Authorization':'Bearer '+userStore.token}})
    .then(res => {
      if (res.data.message == "SUCCESS"){
        setCntrCnt(res.data.infoDataList.length);
        setCntrList(res.data.infoDataList);
      }
      else if(res.data.message == "NO_DATA"){
        alert("조회결과가 없습니다");
        return;
      } else { //ERROR
        alert(res.data.errMsg);
      }
    }).catch(err => {
        if(err.response.status === 401) {
        	props.openLogin();
        }
        });
  }

  return (
    <Card style={{width:'700px'}}>
 		  <CardHeader color="info" stats icon >
		    <CardIcon color="info" style={{height:'40px'}}>
			    <IconM style={{width:'20px',fontSize:'20px',lineHeight:'15px'}}>content_copy</IconM>
        </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>컨테이너내역 조회</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cntrCnt}</span>
      </CardHeader>
      <CardBody>
          <GridItem>
          <Table
              tableHeaderColor="info"
              tableHead={["No", "컨테이너번호", "컨테이너규격","봉인번호1", "봉인번호2", "봉인번호3"]}
              tableData={cntrList}
              tableHeaderColorCode="#f2fefd"
            />
          </GridItem>
      </CardBody>
    </Card>
  );
}
));
export default TableList;