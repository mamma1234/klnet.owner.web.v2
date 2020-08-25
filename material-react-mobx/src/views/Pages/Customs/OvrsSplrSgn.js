import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
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
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";

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
    backgroundColor:'#f2fefd'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px'
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function OvrsSplrSgn(props) {
  const [severity, setSeverity] = useState("");
  const [userStore, setUseStore] = useState(props.store);
  const classes = useStyless();
  const [cntyCode, setCntyCode] = useState("");
  const [compName, setCompName] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  const [tCnt, setTCnt] = useState('0');
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
  const handleChange = (e) => {
    if(e.target.id === "cntyCodeComp") setCntyCode(e.target.value);
    if(e.target.id === "compNameComp") setCompName(e.target.value);
  }
  const onSubmit = () => {
    axios.post("/com/uniPassOvrsSplrSgn",{cntySgn:cntyCode,conm:compName}, {headers:{'Authorization':'Bearer '+userStore.token}}).then(
      res => {
        if(res.data.message === "SUCCESS") {
          AlertMessage("조회가 완료되었습니다.","success");
          setTCnt(res.data.infoData.cnt);
          setGridData(res.data.infoData.data);
        }else if (res.data.message === "NO_DATA") {
          AlertMessage("조회결과가 없습니다.","error");
          setTCnt("0");
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
  }
  return (
    <div>
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
			     		<Grid item xs={12} md={3}>
               <CustomInput
                    labelText="국가부호"
                    id="cntyCodeComp"
                    value={cntyCode}
                    inputProps={{onChange:handleChange, authWidth:true}}
                    formControlProps={{
                      fullWidth: true
                    }}/>		
              </Grid>
              <Grid item xs={12} md={3}>
               <CustomInput
                    labelText="상호명"
                    id="compNameComp"
                    value={compName}
                    inputProps={{onChange:handleChange, authWidth:true}}
                    formControlProps={{
                      fullWidth: true
                    }}/>		
              </Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
                <Button color="info" onClick = {onSubmit}  endIcon={<SearchIcon/>} >SEARCH</Button>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>해외공급자부호</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {tCnt}</span>
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCellStyle}>해외공급자부호</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>부여일자</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>사용정지상태</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>사용정지사유</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>공급자국가약어</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>영문국가명</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>공급자상호</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>정리후공급자상호</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>공급자주소</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>대표부호</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    gridData.map((element,key) => {
                        return(
                          <TableRow key={key}>
                            {element.ovrsSplrSgn != undefined?<TableCell className={classes.tableCellStyle}>{element.ovrsSplrSgn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.athzDt != undefined?<TableCell className={classes.tableCellStyle}>{element.athzDt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.useStopStts != undefined?<TableCell className={classes.tableCellStyle}>{element.useStopStts._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.useStopRsn != undefined?<TableCell className={classes.tableCellStyle}>{element.useStopRsn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.splrCntyAbrt != undefined?<TableCell className={classes.tableCellStyle}>{element.splrCntyAbrt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.englCntyNm != undefined?<TableCell className={classes.tableCellStyle}>{element.englCntyNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.splrConm != undefined?<TableCell className={classes.tableCellStyle}>{element.splrConm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.afarConmSplrConm != undefined?<TableCell className={classes.tableCellStyle}>{element.afarConmSplrConm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.splrAddr1 != undefined?<TableCell className={classes.tableCellStyle}>{element.splrAddr1._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.rprsSgn != undefined?<TableCell className={classes.tableCellStyle}>{element.rprsSgn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                          </TableRow>
                        )
                        })
                }
              </TableBody>
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
