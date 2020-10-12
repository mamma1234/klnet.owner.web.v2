import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import {Grid, Table, TableBody, TableRow, TableCell, TableHead} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
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


export default function ExpFfmnPridShrtTrgtPrlst(props) {
  const [severity, setSeverity] = useState("");
  //const [userStore] = useState(props.store);
  const classes = useStyless();
  const [param, setParam] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
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
    setParam(e.target.value);
  }
  const onSubmit = () => {
	  const token = userService.GetItem()?userService.GetItem().token:null;
	  if(token) {
	    axios.post("/com/uniPassExpFfmnPridShrtTrgtPrlst",{param:param}, {headers:{'Authorization':'Bearer '+token}}).then(
	      res => {
	        if(res.data.message === "SUCCESS") {
	          AlertMessage("조회가 완료되었습니다.","success");
	          setGridData(res.data.infoData.data);
	        }else if (res.data.message === "NO_DATA") {
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
                    labelText="HS 부호"
                    id="hsSgn"
                    value={param}
                    inputProps={{onChange:handleChange, fullWidth:true}}
                    formControlProps={{
                      fullWidth: true
                    }}/>
              </Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>통관단일창구 처리이력</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
        </CardHeader>
        <CardBody>
        
        <Table   style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
            <TableHead> 
              <TableRow>
                <TableCell className={classes.tableHeaderCellStyle}>HS 부호</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>이행기간일자</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>대상수입종료일자</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>품명</TableCell>
                <TableCell className={classes.tableHeaderCellStyle}>규격명</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
            { gridData.map((element,key) => {     
         //console.log(">> element:",element);
         
          return( 
              <TableRow key={key}>
                <TableCell className={classes.tableCellStyle}>{element.hsSgn!=undefined?element.hsSgn._text:""}</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.ffmnTmlmDt!=undefined?element.ffmnTmlmDt._text:""}</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.trgImpEndDt!=undefined?element.trgImpEndDt._text:""}</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.prnm!=undefined?element.prnm._text:""}</TableCell>
                <TableCell className={classes.tableCellStyle}>{element.stszNm!=undefined?element.stszNm._text:""}</TableCell>
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
