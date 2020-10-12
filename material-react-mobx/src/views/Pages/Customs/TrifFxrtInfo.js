import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import moment from 'moment';
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
    backgroundColor:'#f2fefd'
  },
  tableCellStyle: {
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
  const [userStore] = useState(props.store);
  const classes = useStyless();
  const [cnt, setCnt] = useState('0');
  const [imexTp, setImexTp] = useState("1");
  const [imexTpNm, setImexTpNm] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  const [formatter] = useState("yyyy-MM-dd");
  const [qDate,setQDate] = useState(new Date());

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

    setImexTpNm(selectText);
    if(selectText === " 수 출 ") {
      setImexTp("1");
    }else if(selectText ===" 수 입 ") {
      setImexTp("2");
    }
  }
  const onSubmit = () => {
	  const token = userService.GetItem()?userService.GetItem().token:null;
	  if(token) {
    axios.post("/com/uniPassApiTrifFxrtInfo", {qryYymmDd:moment(qDate).format('YYYYMMDD'), imexTp:imexTp}, {headers:{'Authorization':'Bearer '+token}}).then(
      res => {
        if(res.data.message === "SUCCESS") {
          AlertMessage("조회가 완료되었습니다.","success");
          setCnt(res.data.infoData.cnt);
          if( res.data.infoData.cnt === 1 ) {
            setGridData([res.data.infoData.data]);
          } else {
            setGridData(res.data.infoData.data);
          }
        } else if (res.data.message === "NO_DATA") {
          AlertMessage("조회결과가 없습니다.","error");
          setCnt(0);
          setGridData([]);
        } else {
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
              <CalendarBox
                labelText ="Search Date"
                id="qryYymmDd"
                format={formatter}
                setValue={qDate}
                onChangeValue={date => setQDate(date)}
                formControlProps={{fullWidth: true}}
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
        <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>관세환율 정보</b></h4>
        <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cnt}</span>
      </CardHeader>
      <CardBody>
        <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>국가부호</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>화폐단위명</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>환율</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>통화부호</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>적용개시일자</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>수출입구분</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              gridData.map((element,key) => {
                return(
                  <TableRow key={key}>
                    {element.cntySgn !== undefined?<TableCell className={classes.tableCellStyle}>{element.cntySgn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                    {element.mtryUtNm !== undefined?<TableCell className={classes.tableCellStyle}>{element.mtryUtNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                    {element.fxrt !== undefined?<TableCell className={classes.tableCellStyle}>{element.fxrt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                    {element.currSgn !== undefined?<TableCell className={classes.tableCellStyle}>{element.currSgn._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                    {element.aplyBgnDt !== undefined?<TableCell className={classes.tableCellStyle}>{element.aplyBgnDt._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                    {element.imexTp !== undefined?<TableCell className={classes.tableCellStyle}>{element.imexTp._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                    </TableRow>
                  )
                }
              )
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
