import React,{useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
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
import queryString from 'query-string';

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
    width:'25%'
  },
  tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'25%'
  }
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function ShipCoBrkdQry(props) {
  const query = queryString.parse(window.location.search);
  const [severity, setSeverity] = useState("");
  const classes = useStyless();
  const [userStore, setUseStore] = useState(props.store);
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  const [shipCoSgn, setShipCoSgn] = useState(query.shipCoSgn?query.shipCoSgn:"");

  

  React.useEffect(() => {
    // return () => {
      if(query.shipCoSgn) {
        onSubmit();
      }
    // };
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
  const handleChangeShipCoSgn = (e) => {
    setShipCoSgn(e.target.value);
  }

  const onSubmit = () => {
    if( shipCoSgn == "" ) {
      alert( "선박회사코드(4자리) 필수 입력입니다." );
      return false;
    }
    axios.post("/com/uniPassApiShipCoBrkdQry",{shipCoSgn:shipCoSgn}, {headers:{'Authorization':'Bearer '+userStore.token}}).then(
    res => {
      if(res.data.message == "SUCCESS") {
        AlertMessage("조회가 완료되었습니다.","success");
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
  }
  return (
    <div>
      <Card>
        <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
          <Grid item xs={12} sm={9} md={12}>
            <Grid container spacing={1} justify="space-between">
              <Grid item xs={12} md={3}>
                <CustomInput
                  labelText="선박부호회사"
                  id="shipCoSgn"
                  value={shipCoSgn}
                  inputProps={{
                    onChange:handleChangeShipCoSgn
                    // onChange:event => setShipCoSgn(event.target.value)
                    , authWidth:true}}
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
        <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>선박회사 부호, 상호, 주소 등 상세 정보 제공</b></h4>
        <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
      </CardHeader>
      <CardBody>
      <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>사업자등록번호</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.brno!=undefined?gridData.brno._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>대표자명</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.rppnNm!=undefined?gridData.rppnNm._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>국가명</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.cntyNm!=undefined?gridData.cntyNm._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>선박회사국적</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.shipCoNat!=undefined?gridData.shipCoNat._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>선박대리점명</TableCell>
            <TableCell className={classes.tableCellStyle} colSpan={3}>{gridData.shipAgncNm!=undefined?gridData.shipAgncNm._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>등록번호</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.rgsrNo!=undefined?gridData.rgsrNo._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>등록일자</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.rgsrDt!=undefined?gridData.rgsrDt._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>전화번호</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.telno!=undefined?gridData.telno._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>팩스번호</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.faxNo!=undefined?gridData.faxNo._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>본사주소</TableCell>
            <TableCell className={classes.tableCellStyle} colSpan={3}>{gridData.hdofAddr!=undefined?gridData.hdofAddr._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>대리점주소</TableCell>
            <TableCell className={classes.tableCellStyle} colSpan={3}>{gridData.agncAddr!=undefined?gridData.agncAddr._text:""}</TableCell>
          </TableRow>

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
