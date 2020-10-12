import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import {Grid, TextField, Paper, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
import axios from 'axios';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CustomInput from "components/CustomInput/CustomInput.js";
import {userService} from 'views/Pages/Login/Service/Service.js';

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
  //const {token} =props;
  const classes = useStyless();
  const [cntrList, setCntrList] = useState([]);
  const [gubunCode, setGubunCode] = useState("A01");
  const [gubun, setGubun] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  
  const [entsCd, setEntsCd] = useState("");
  
  React.useEffect(() => {
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
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

  const onSubmit = () => {
	 const token = userService.GetItem()?userService.GetItem().token:null;
	 if(token) {
		 
	    axios.post("/com/uniPassApiAlspEntsCdQry",{param:entsCd}, {headers:{'Authorization':'Bearer '+token}}).then(
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
    <div id="api033_top">
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
			     		<Grid item xs={12} md={3}>
				     		<CustomInput
					            labelText={
					              <span>
					              <font size="2">동축산물업체코드</font>
					              </span>
					            }
					            id="ents"
					            formControlProps={{
					              fullWidth: true
					            }}
					            inputProps={{
					            	//onBlur: event => change(event.target.value, "id"),
					            	onChange: event =>setEntsCd(event.target.value)
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>농림축산검역본부 동축산물 업체코드</b></h4>
          {/*<span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cntrCnt}</span>*/}
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          {
              gridData.map((element,key,index) => {
                  return(
                       	<TableBody key={key}>
                        <TableRow>
                        	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>동축산물업체코드</TableCell>
                        	<TableCell className={classes.tableCellStyle}>{element.simlFxamtNnaplyApredDt._text}</TableCell>
                        </TableRow>
                        <TableRow>
                      		<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체상호</TableCell>
                      		<TableCell className={classes.tableCellStyle}>{element.entsConm._text}</TableCell>
                        </TableRow>
                        if(element.entsBrno._text){
	                        <TableRow>
	                      		<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체사업자등록번호</TableCell>
	                      		<TableCell className={classes.tableCellStyle}>{element.entsBrno._text}</TableCell>
	                        </TableRow>
                        }
                        if(element.reqlttSpptCd._text) {
	                        <TableRow>
	                      		<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>요건기관지원코드</TableCell>
	                      		<TableCell className={classes.tableCellStyle}>{element.reqlttSpptCd._text}</TableCell>
	                        </TableRow>
                        }
                        if(element.alspCoTpcd._text) {
	                        <TableRow>
	                      		<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>동축산물회사구분코드</TableCell>
	                      		<TableCell className={classes.tableCellStyle}>{element.alspCoTpcd._text}</TableCell>
	                        </TableRow>
                        }
                        if(element.entsRppnNm._text) {
	                        <TableRow>
	                      		<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체대표자명</TableCell>
	                      		<TableCell className={classes.tableCellStyle}>{element.entsRppnNm._text}</TableCell>
	                        </TableRow>
                        }
                        if(element.entsTelno._text) {
                    	  <TableRow>
      		              	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체전화번호</TableCell>
      		              	<TableCell className={classes.tableCellStyle}>{element.entsTelno._text}</TableCell>
                    	  </TableRow>
                        }
                        if(element.entsEml._text){
                    	  <TableRow>
      		              	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체이메일</TableCell>
      		              	<TableCell className={classes.tableCellStyle}>{element.entsEml._text}</TableCell>
                    	  </TableRow>
                        }
                        if(element.entsEnglNm._text){
                    	  <TableRow>
      		              	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체영문명</TableCell>
      		              	<TableCell className={classes.tableCellStyle}>{element.entsEnglNm._text}</TableCell>
                    	  </TableRow>
                        }
                        if(element.entsEnglAddr._text){
                    	  <TableRow>
      		              	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>업체영문주소</TableCell>
      		              	<TableCell className={classes.tableCellStyle}>{element.entsEnglAddr._text}</TableCell>
                    	  </TableRow>
                        }
      		          <TableRow>
      		          	<TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>사용여부</TableCell>
      		            <TableCell className={classes.tableCellStyle}>{element.useYn._text}</TableCell>
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
