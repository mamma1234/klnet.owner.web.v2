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


export default function BtcoVhclQry(props) {
  const [severity, setSeverity] = useState("");
  //const [userStore, setUseStore] = useState(props.token);
  const classes = useStyless();
  const [btcoSgn, setBtcoSgn] = useState("");
  const [vhclNoSanm, setVhclNoSanm] = useState("");
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
  const handleChangeBtcoSgn = (e) => {
    setBtcoSgn(e.target.value);
  }
  const handleChangeVhclNoSanm = (e) => {
    setVhclNoSanm(e.target.value);
  }
  const onSubmit = () => {
    if( btcoSgn == "" ) {
      alert( "보세운송업자부호 필수 입력입니다." );
      return false;
    }
    if( vhclNoSanm == "" ) {
      alert( "차량번호선기명 필수 입력입니다." );
      return false;
    }
    const token = userService.GetItem()?userService.GetItem().token:null;
    if (token) {
    axios.post("/com/uniPassApiBtcoVhclQry",{btcoSgn:btcoSgn, vhclNoSanm:vhclNoSanm}, {headers:{'Authorization':'Bearer '+token}}).then(
    res => {
      if(res.data.message == "SUCCESS") {
        AlertMessage("조회가 완료되었습니다.","success");
        console.log(res.data.infoData.data);
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
                  labelText="보세운송업자부호"
                  id="btcoSgn"
                  value={btcoSgn}
                  inputProps={{onChange:handleChangeBtcoSgn, authWidth:true}}
                  formControlProps={{
                    fullWidth: true
                  }}/>		
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomInput
                  labelText="차량번호선기명"
                  id="vhclNoSanm"
                  value={vhclNoSanm}
                  inputProps={{onChange:handleChangeVhclNoSanm, authWidth:true}}
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
        <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>보세운송차량등록 내역 조회</b></h4>
        <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
      </CardHeader>
      <CardBody>
      <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
        <TableBody>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>보세운송업자부호</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.btcoSgn!=undefined?gridData.btcoSgn._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>보세운송차량등록일자</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.bnbnTrnpVhclRgsrDt!=undefined?gridData.bnbnTrnpVhclRgsrDt._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>차량정보일련번호</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.vhclInfoSrno!=undefined?gridData.vhclInfoSrno._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>차량번호선기명</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.vhclNoSanm!=undefined?gridData.vhclNoSanm._text:""}</TableCell>
          </TableRow>
          <TableRow>
          <TableCell className={classes.tableHeaderCellStyle}>보세운송장비구분코드</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.bnbnTrnpEqipTpcd!=undefined?gridData.bnbnTrnpEqipTpcd._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>보세운송장비구분명</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.bnbnTrnpEqipTpcdNm!=undefined?gridData.bnbnTrnpEqipTpcdNm._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>사용여부</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.useYn!=undefined?gridData.useYn._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>등록일자</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.rgsrDt!=undefined?gridData.rgsrDt._text:""}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>삭제일자</TableCell>
            <TableCell className={classes.tableCellStyle} colSpan={3}>{gridData.delDt!=undefined?gridData.delDt._text:""}</TableCell>
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
