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
import {Grid, TextField, Paper, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import CustomSelect from "components/CustomInput/CustomSelect.js";
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


export default function IoprRprtLst(props) {
  const [severity, setSeverity] = useState("");
  //const [userStore, setUseStore] = useState(props.store);
  const classes = useStyless();
  const [tCnt, setTCnt] = useState('0');
  

  const [shipCallImoNo, setShipCallImoNo] = useState("");
  const [gubunCode, setGubunCode] = useState("");
  const [gubun, setGubun] = useState("");
  const [customNo, setCustomNo] = useState("");
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

  const handleGubun = (e) => {
    let selectText = e.target.value;

    setGubun(selectText);
    if(selectText === "선택") {
      setGubunCode("");
    }else if(selectText ==="입항") {
      setGubunCode("10");
    }else if(selectText ==="출항") {
      setGubunCode("11");
    }
  }

  const onSubmit = () => {
    if (!shipCallImoNo) {
		  alert("선박호출IMO번호는 필수 입력값입니다.");
		  document.getElementById("shipCallImoNo").focus();
		  return false;
	  } else if (!gubunCode) {
		  alert("입출항구분은 필수 입력값입니다.");
		  document.getElementById("Gubun").focus();
		  return false;
	  } else if (gubunCode === "11" & !customNo) {
		  alert("출항의 경우 세관코드는 필수 입력값입니다.");
		  document.getElementById("customNo").focus();
		  return false;
	  } else {
		  const token = userService.GetItem()?userService.GetItem().token:null;
		  if(token) {
	      axios.post("/com/uniPassIoprRprtLst",{shipCallImoNo:shipCallImoNo,gubunCode:gubunCode,customNo:customNo}, {headers:{'Authorization':'Bearer '+token}}).then(
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
                <TextField id="shipCallImoNo" label="선박호출IMO번호" onChange={event => setShipCallImoNo(event.target.value)} value={shipCallImoNo} fullWidth />			
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomSelect
									id="Gubun"
									labelText = "입출항구분"
									setValue = {gubun}
									option = {["선택","입항","출항"]}
									inputProps={{onChange:handleGubun}}
									formControlProps={{fullWidth: true}} 
								/>
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField id="customNo" label="세관부호" onChange={event => setCustomNo(event.target.value)} value={customNo} fullWidth />			
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>입출항보고 내역 조회</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {tCnt}</span>
        </CardHeader>
        <CardBody>
        
          <Table   style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          { gridData.map((element,key) => {     
         //console.log(">> element:",element);
         
          return(  
            <TableBody key={key}>
              
              <TableRow >
                <TableCell  className={classes.tableNumberCellStyle} rowSpan="6">No.{key+1}</TableCell>
                {gubunCode==="10"? 
                <TableCell className={classes.tableHeaderCellStyle}>입항체출번호</TableCell>:
                <TableCell className={classes.tableHeaderCellStyle}>출항제출번호</TableCell>
                }  
                {gubunCode==="10"? 
                <TableCell className={classes.tableCellStyle}>{element.ioprSbmtNo!=undefined?element.ioprSbmtNo._text:""}</TableCell>:
                <TableCell className={classes.tableCellStyle}>{element.ioprSbmtNo!=undefined?element.ioprSbmtNo._text:""}</TableCell>
                }
                {gubunCode==="10"? 
                <TableCell className={classes.tableHeaderCellStyle}>입항일시</TableCell>:
                <TableCell className={classes.tableHeaderCellStyle}>출항일시</TableCell>
                }
                {gubunCode==="10"? 
                <TableCell className={classes.tableCellStyle}>{element.etprDttm!=undefined?element.etprDttm._text.replace(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/, "$1-$2-$3 $4:$5"):""}</TableCell>:
                <TableCell className={classes.tableCellStyle}>{element.tkofDttm!=undefined?element.tkofDttm._text.replace(/([0-9]{4})([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{2})/, "$1-$2-$3 $4:$5"):""}</TableCell>
                }
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>세관부호</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.cstmSgn._text}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>세관명</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.cstmNm!=undefined?element.cstmNm._text:""}</TableCell>
              </TableRow>
              <TableRow>
                {gubunCode==="10"? 
                <TableCell className={classes.tableHeaderCellStyle}>출발항구코드</TableCell>:
                <TableCell className={classes.tableHeaderCellStyle}>도착항구코드</TableCell>
                }
                {gubunCode==="10"? 
                <TableCell className={classes.tableCellStyle}>{element.dptrPortAirptCd!=undefined?element.dptrPortAirptCd._text:""}</TableCell>:
                <TableCell className={classes.tableCellStyle}>{element.arvlCntyPortAirptCd!=undefined?element.arvlCntyPortAirptCd._text:""}</TableCell>
                }
                {gubunCode==="10"? 
                <TableCell className={classes.tableHeaderCellStyle}>출발항구명</TableCell>:
                <TableCell className={classes.tableHeaderCellStyle}>도착항구명</TableCell>
                }
                {gubunCode==="10"? 
                <TableCell className={classes.tableCellStyle}>{element.dptrPortAirptNm!=undefined?element.dptrPortAirptNm._text:""}</TableCell>:
                <TableCell className={classes.tableCellStyle}>{element.arvlCntyPortAirptNm!=undefined?element.arvlCntyPortAirptNm._text:""}</TableCell>
                }
                
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>선박명</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.shipFlgtNm!=undefined?element.shipFlgtNm._text:""}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>선박국가명(코드)</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.shipAirCntyCd!=undefined?element.shipAirCntyNm._text+"("+element.shipAirCntyCd._text+")":""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>선박계선장소코드</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.shipLamrPlcCd!=undefined?element.shipLamrPlcCd._text:""}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>선박계선장소명</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.shipLamrPlcNm!=undefined?element.shipLamrPlcNm._text:""}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>전체승무원인원수</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.alCrmbPecnt!=undefined?element.alCrmbPecnt._text:""}</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>전체승객인원수</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.alPsngPecnt!=undefined?element.alPsngPecnt._text:""}</TableCell>
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
