import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
//import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import {Grid, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
//import IconM from "@material-ui/core/Icon";
import axios from 'axios';
//import CustomSelect from "components/CustomInput/CustomSelect.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CustomInput from "components/CustomInput/CustomInput.js";

const useStyless = makeStyles(theme => ({

  headerCell: {
    backgroundColor: "#f2fefd",
    width:'30%',
  padding:'7px',
  textAlign:'right'
  },
  bodyCell: {
    textAlign: "left",
  padding:'7px',
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'15%'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function SimlFxamtAplyNaplyEntsQty(props) {
	
  const [severity, setSeverity] = useState("");
  const {store} =props;
  const classes = useStyless();
  const [cntrList, setCntrList] = useState([]);
  const [gubunCode, setGubunCode] = useState("A01");
  const [gubun, setGubun] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  
  const [ecm, setEcm] = useState("");
  
  const handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
      return;
    }
    setAlertOpen(false);
  }
  const AlertMessage = (message,icon) => {
    setErrmessage(message)
    setSeverity(icon)
    setAlertOpen(true);
  }
  const handleGubun = (e) => {
    let selectText = e.target.value;

    setGubun(selectText);
    if(selectText === "내국세율 부호") {
      setGubunCode("A01");
    }else if(selectText ==="관세 감면 부호") {
      setGubunCode("A02");
    }else if(selectText ==="관세 분납 부호") {
      setGubunCode("A03");
    }else if(selectText ==="부가세감면율 부호") {
      setGubunCode("A04");
    }
  }
  const onSubmit = () => {

	 if(store.token) {
		 
	    axios.post("/com/uniPassApiSimlFxamtQry",{param:ecm}, {headers:{'Authorization':'Bearer '+store.token}}).then(
	      res => {
	        if(res.data.message == "SUCCESS") {
	          setGridData(res.data.infoData.data);
	        }else if (res.data.message == "NO_DATA") {
	          AlertMessage("조회결과가 없습니다.","error");
	        }else {
	          AlertMessage(res.data.errMsg,"error")
	        }
	      }
	    ).catch(err => {
            if(err.response.status === 401) {
	        	props.openLogin();
	        }
            });
	 } else {
		props.openLogin();
	 }
  }
  return (
    <div>
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
			     		<Grid item xs={12} md={3}>
				     		<CustomInput
					            labelText={
					              <span>
					              <font size="2">통관고유번호</font>
					              </span>
					            }
					            id="ecm"
					            formControlProps={{
					              fullWidth: true
					            }}
					            inputProps={{
					            	//onBlur: event => change(event.target.value, "id"),
					            	onChange: event =>setEcm(event.target.value)
					              //labelWidth:110
					            }}   
				          	/>	
			     		</Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} >SEARCH</Button>
              </Grid>
            </Grid>
      </Grid>
      </CardBody>
      </Card>
      <Card>
        <CardHeader color="info" stats icon >
	        <CardIcon color="info" style={{padding:'0'}}>
	        <Assignment />
	      </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>간이정액 적용/비적용 업체 조회</b></h4>
          {/*<span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cntrCnt}</span>*/}
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          {
              gridData.map((element,key,index) => {
                  return(
                       	<TableBody key={key}>
                        <TableRow>
                        	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>간이정액비적용승인일자</TableCell>
                        	<TableCell className={classes.tableCellStyle}>{element.simlFxamtNnaplyApredDt._text}</TableCell>
                        </TableRow>
                        <TableRow>
                      	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>상호</TableCell>
                      	<TableCell className={classes.tableCellStyle}>{element.conm._text}</TableCell>
                        </TableRow>
                    	  <TableRow>
      		              <TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>간이정액적용승인일자</TableCell>
      		              <TableCell className={classes.tableCellStyle}>{element.simlFxamtAplyApreDt._text}</TableCell>
                    	  </TableRow>
      		          <TableRow>
      		          	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>간이정액비적용지정사유</TableCell>
      		            <TableCell className={classes.tableCellStyle}>{element.simlFxamtNnaplyApntRsn._text}</TableCell>
      		          </TableRow>
      		          <TableRow>
      		          	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>등록세관명</TableCell>
      		          	<TableCell className={classes.tableCellStyle}>{element.rgsrCstmNm._text}</TableCell>
      		          </TableRow>
                    </TableBody>
                  )
                  })
          }
          
 
            </Table>
          </CardBody>
        </Card>

    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}

		</Alert>
	</Snackbar>
  </div>
  );
}
