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
import { Link } from 'react-router-dom';
import ActListIcon from "@material-ui/icons/ListAlt";
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
 // const [userStore, setUseStore] = useState(props.store);
  const classes = useStyless();
  const [cnt, setCnt] = useState('0');
  const [shipCoNm, setShipCoNm] = useState("");
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
  const handleChangeShipCoNm = (e) => {
    setShipCoNm(e.target.value);
  }
  const onSubmit = () => {
    if( shipCoNm == "" ) {
      alert( "선박회사명 필수 입력입니다." );
      return false;
    }
    const token = userService.GetItem()?userService.GetItem().token:null;
    if(token) {
    axios.post("/com/uniPassApiShipCoLst",{shipCoNm:shipCoNm}, {headers:{'Authorization':'Bearer '+token}}).then(
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
                  labelText="선박회사명"
                  id="shipCoNm"
                  value={shipCoNm}
                  inputProps={{onChange:handleChangeShipCoNm, authWidth:true}}
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>선박회사 부호 정보 제공</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}>TOTAL: {cnt}</span>
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableHeaderCellStyle}>부호</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>영문명</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>한글명</TableCell>
                  <TableCell className={classes.tableHeaderCellStyle}>대표자명</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                    gridData.map((element,key) => {
                        return(
                          <TableRow key={key}>
                            {element.shipCoSgn != undefined?<TableCell className={classes.tableCellStyle}>
                            <a component={Link} href={'/svc/shipCobrkd'+"?shipCoSgn="+ element.shipCoSgn._text}>
                              {element.shipCoSgn._text}
                              {/* <ActListIcon style={{color:'#00acc1',verticalAlign:'bottom'}}/> */}
                            </a>
                            </TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.shipCoEnglNm != undefined?<TableCell className={classes.tableCellStyle}>{element.shipCoEnglNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.shipCoKoreNm != undefined?<TableCell className={classes.tableCellStyle}>{element.shipCoKoreNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
                            {element.rppnNm != undefined?<TableCell className={classes.tableCellStyle}>{element.rppnNm._text}</TableCell>:<TableCell className={classes.tableCellStyle}></TableCell>}
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
