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
    padding:'7px',
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function StatsSgnBrkd(props) {
  const [severity, setSeverity] = useState("");
  const [userStore, setUseStore] = useState(props.store);
  const classes = useStyless();
  const [cnt, setCnt] = useState('0');
  const [hsSgn, setHsSgn] = useState("");
  const [imexTp, setImexTp] = useState("1");
  const [imexTpNm, setImexTpNm] = useState("");
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
  const handleChangeHsSgn = (e) => {
    setHsSgn(e.target.value);
  }
  const handleGubun = (e) => {
    let selectText = e.target.value;

    setImexTpNm(selectText);
    if(selectText === " 수 출 ") {
      setImexTp("1");
    }else if(selectText ===" 수 입 ") {
      setImexTp("2");
    }
  }
  const onSubmit = () => {
    if( hsSgn == "" ) {
      alert( "HS 부호는 필수 입력입니다." );
      return false;
    }
    axios.post("/com/uniPassApiCcctLworCd",{hsSgn:hsSgn, imexTp:imexTp}, {headers:{'Authorization':'Bearer '+userStore.token}}).then(
      res => {
        if(res.data.message == "SUCCESS") {
          AlertMessage("조회가 완료되었습니다.","success");
          setCnt(res.data.infoData.cnt);
          if( res.data.infoData.cnt == 1 ) {
            setGridData([res.data.infoData.data]);
          } else {
            setGridData(res.data.infoData.data);
          }
        }else if (res.data.message == "NO_DATA") {
          AlertMessage("조회결과가 없습니다.","error");
          setCnt(0);
          setGridData([]);
        }else {
          AlertMessage(res.data.errMsg,"error");
          setCnt(0);
          setGridData([]);
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
               <CustomSelect
									id="Gubun"
									labelText = "IMPORT&EXPORT"
									setValue = {imexTpNm}
									option = {[" 수 출 "," 수 입 "]}
									inputProps={{onChange:handleGubun, authWidth:true}}
									
									formControlProps={{fullWidth: true}} 
								/>			
              </Grid>
			     		<Grid item xs={12} md={3}>
                <CustomInput
                  labelText="HS 부호"
                  id="hsSgn"
                  value={hsSgn}
                  inputProps={{onChange:handleChangeHsSgn, authWidth:true}}
                  formControlProps={{
                    fullWidth: true
                  }}/>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>HS 부호별 세관장확인대상 법령코드 및 법령명, 해당 요건승인기관 정보를 제공</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cnt}</span>
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCellStyle}>HS부호</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>신고인확인법령코드</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>신고인확인법령명</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>요건승인기관코드</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>요건승인기관명</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>요건확인서류명</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>적용시작일자</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>적용정료일자</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    gridData.map((element,key) => {
                        return(
                          <TableRow key={key}>
                            {element.hsSgn != undefined?<TableCell className={classes.tableCellStyle}>{element.hsSgn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.dcerCrmLworCd != undefined?<TableCell className={classes.tableCellStyle}>{element.dcerCrmLworCd._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.dcerCfrmLworNm != undefined?<TableCell className={classes.tableCellStyle}>{element.dcerCfrmLworNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.reqApreIttCd != undefined?<TableCell className={classes.tableCellStyle}>{element.reqApreIttCd._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.reqApreIttNm != undefined?<TableCell className={classes.tableCellStyle}>{element.reqApreIttNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.reqCfrmIstmNm != undefined?<TableCell className={classes.tableCellStyle}>{element.reqCfrmIstmNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.aplyStrtDt != undefined?<TableCell className={classes.tableCellStyle}>{element.aplyStrtDt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.aplyEndDt != undefined?<TableCell className={classes.tableCellStyle}>{element.aplyEndDt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
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
