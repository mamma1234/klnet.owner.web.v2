import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import {Grid, TextField, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
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
  },tableNumberCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'5%'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'30%'
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ShedInfo(props) {
  const [severity, setSeverity] = useState("");
  //const [userStore] = useState(props.store);
  const classes = useStyless();
  const [tCnt, setTCnt] = useState('0');
  

  const [customNo, setCustomNo] = useState("");
  
  const [csaCode, setcsaCode] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);

  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
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
    if (!customNo & !csaCode) {
		  alert("세관코드 또는 장치장코드 1가지는 필수 입력값입니다.");
		  document.getElementById("customNo").focus();
      return false;
	  } else {
		  const token = userService.GetItem()?userService.GetItem().token:null;
		  if(token) {
      axios.post("/com/uniPassShedInfo",{customNo:customNo,csaCode:csaCode}, {headers:{'Authorization':'Bearer '+token}}).then(
      res => {
          if(res.data.message == "SUCCESS") {
            AlertMessage("조회가 완료되었습니다.","success");
            setTCnt(res.data.infoData.cnt)
            setGridData(res.data.infoData.data);
          }else if (res.data.message == "NO_DATA") {
            AlertMessage("조회결과가 없습니다.","error");
            setTCnt("0")
            setGridData([]);
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
  }
  return (
    <div>
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
              <Grid item xs={12} md={3}>
                <TextField id="customNo" label="세관코드" onChange={event => setCustomNo(event.target.value)} value={customNo} fullWidth />			
              </Grid>
              <Grid item xs={12} md={3}>
                <TextField id="csaCode" label="장치장코드" onChange={event => setcsaCode(event.target.value)} value={csaCode} fullWidth />			
              </Grid>
              		     		
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>장치장정보 조회</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {tCnt}</span>
        </CardHeader>
        <CardBody>
        
          <Table   style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          { gridData.map((element,key) => {     
         //console.log(">> element:",element);
         
          return(             
            <TableBody key={key}>
 
              <TableRow >
                <TableCell className={classes.tableNumberCellStyle} rowSpan="5">No.{key+1}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>보세구역부호</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.snarSgn!=undefined?element.snarSgn._text:""}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>보세구역명</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.snarNm!=undefined?element.snarNm._text:""}</TableCell>
              </TableRow>  
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>보세구역주소</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.snarAddr!=undefined?element.snarAddr._text:""}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>보세구역전화번호</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.snartelno!=undefined?element.snartelno._text:""}</TableCell>
              </TableRow>  
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>과태료부과대상여부</TableCell>
                <TableCell colSpan="3" className={classes.tableCellStyle}>{element.pnltLvyTrgtYn!=undefined?element.pnltLvyTrgtYn._text:""}</TableCell>
              </TableRow>  
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>가산세징수여부</TableCell>
                <TableCell colSpan="3" className={classes.tableCellStyle}>{element.adtxColtPridYn!=undefined?element.adtxColtPridYn._text:""}</TableCell>
              </TableRow>  
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>하역장소보세구역여부</TableCell>
                <TableCell colSpan="3" className={classes.tableCellStyle}>{element.ldunPlcSnarYn!=undefined?element.ldunPlcSnarYn._text:""}</TableCell>
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
