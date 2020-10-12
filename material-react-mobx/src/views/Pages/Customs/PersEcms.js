import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, Table, TableBody, TableRow, TableCell, Input, FormControl, InputLabel} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MaskedInput from 'react-text-mask';
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
    width:'50%',
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'50%',
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PersEcms(props) {
  const [severity, setSeverity] = useState("");
 // const [userStore] = useState(props.store);
  const classes = useStyless();
  const [persEcm, setPersEcm] = useState("");
  const [pltxNm, setPltxNm] = useState("");
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
  const handleChange = (e) => {
    setPltxNm(e.target.value);
  }
  const handleChangeText = (e) => {
    setPersEcm(e.target.value);
  }
  const onSubmit = () => {
    if(persEcm.length === 0) {
      AlertMessage("개인통관 고유 부호를 입력해주세요.","error");
      return;
    }
    if(persEcm.length > 13) {
      AlertMessage("개인통관 고유 부호가 너무 깁니다..","error");
      return;
    }
    if(pltxNm.length === 0) {
      AlertMessage("납세의무자명을 입력해주세요.","error");
      return;
    }
    if(pltxNm.length > 12) {
      AlertMessage("납세의무자명 자릿수가 너무 깁니다.","error");
      return;
    }
    const token = userService.GetItem()?userService.GetItem().token:null;
    if(token) {
    axios.post("/com/uniPassPersEcms",{persEcm:persEcm,pltxNm:pltxNm}, {headers:{'Authorization':'Bearer '+token}}).then(
      res => {

        if(res.data.message === "SUCCESS") {
          AlertMessage("일치.","success");
          
        }else if (res.data.message === "ERROR") {
          AlertMessage(res.data.errMsg._text,"error");
          setGridData(res.data.infoData.data);
        }else {
          AlertMessage(res.data.errMsg._text,"error");
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
      <Grid item xs={12} sm={12} md={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={6} md={3}>
                <CustomInput
                    labelText="개인통관 고유부호"
                    id="persEcm"
                    value={persEcm}
                    inputProps={{onChange:handleChangeText, fullWidth:true}}
                    />		
              </Grid>
              <Grid item xs={6} md={3}>
                <CustomInput
                      labelText="납세의무자명"
                      id="pltxNm"
                      value={pltxNm}
                      inputProps={{onChange:handleChange, fullWidth:true}}
                      />		
              </Grid>
              <Grid item xs={12} sm={12} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
                <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} fullWidth={true}>SEARCH</Button>
              </Grid>
            </Grid>
      </Grid>
      </CardBody>
      </Card>
      {gridData.length !==0? (
      <Card>
        <CardHeader color="info" stats icon >
        <CardIcon color="info" style={{padding:'0'}}>
        <Assignment />
        </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>수입신고 개인통관고유부호 검증</b></h4>
        </CardHeader>
        <CardBody>
          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
            <TableBody>
              {
                  gridData.map((element,key) => {
                      return(
                        <TableRow key={key}>
                          <TableCell className={classes.tableHeaderCellStyle}>오류내용</TableCell>
                          <TableCell className={classes.tableCellStyle}>{element.persEcmQryRtnErrInfoVo.errMsgCn._text!==undefined?element.persEcmQryRtnErrInfoVo.errMsgCn._text:""}</TableCell>
                        </TableRow>
                      )})
              }
            </TableBody>
          </Table>
        </CardBody>
      </Card>
    ):null}
    
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
