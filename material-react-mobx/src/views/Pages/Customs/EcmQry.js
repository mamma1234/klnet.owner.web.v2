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
function TextMaskCustom(props) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/,/\d/,/\d/,'-',/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,/\d/]}
      placeholderChar={'\u2000'}
      showMask
      />
  );
}

export default function Ecmqry(props) {
  const [severity, setSeverity] = useState("");
  const [userStore] = useState(props.store);
  const classes = useStyless();
  const [gubunText, setGubunText] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  const [businessNumber, setBusinessNumber] = useState("")
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
    setBusinessNumber(e.target.value);
  }
  const handleChangeText = (e) => {
    setGubunText(e.target.value);
  }
  const onSubmit = () => {
    let number = businessNumber.replace(/-/gi,'');
    number = number.replace(/(\s*)/gi,'');

    if(gubunText.length === 0) {
      AlertMessage("통관 고유 부호를 입력해주세요.","error");
      return;
    }
    if(gubunText.length > 19) {
      AlertMessage("통관 고유 부호가 너무 깁니다..","error");
      return;
    }
    if(number.length !== 10) {
      AlertMessage("사업자 번호의 길이가 10자리가 아닙니다.","error");
      return;
    }
    
    axios.post("/com/uniPassApiecmQry",{_text:gubunText,_number:businessNumber}, {headers:{'Authorization':'Bearer '+userStore.token}}).then(
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
  }
  return (
    <div>
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
			     		<Grid item xs={12} md={3}>
                <CustomInput
                    labelText="통관 고유부호"
                    id="ecm"
                    value={gubunText}
                    inputProps={{onChange:handleChangeText, fullWidth:true}}
                    formControlProps={{
                      fullWidth: true
                    }}/>		
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl style={{paddingTop:'12px'}}>
                <InputLabel>사업자 번호</InputLabel>
                <Input 
                  value={businessNumber}
                  onChange={handleChange}
                  name="textmask"
                  id="formatted-text-mask-input"
                  inputComponent={TextMaskCustom}
                  >

                </Input>
                </FormControl>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>통관 고유 부호</b></h4>
        </CardHeader>
        <CardBody>
        <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
					<TableBody>
						<TableRow>
						<TableCell className={classes.tableHeaderCellStyle}>사용여부</TableCell>
						<TableCell className={classes.tableCellStyle}>{gridData.useYN!==undefined?gridData.useYN._text:""}</TableCell>
						</TableRow>
						<TableRow>
						<TableCell className={classes.tableHeaderCellStyle}>통관고유부호</TableCell>
						<TableCell className={classes.tableCellStyle}>{gridData.ecm!==undefined?gridData.ecm._text:""}</TableCell>
						</TableRow>
						<TableRow>
						<TableCell className={classes.tableHeaderCellStyle}>상호명</TableCell>
						<TableCell className={classes.tableCellStyle}>{gridData.conmNm!==undefined?gridData.conmNm._text:""}</TableCell>
						</TableRow>
            <TableRow>
						<TableCell className={classes.tableHeaderCellStyle}>사업자등록번호</TableCell>
						<TableCell className={classes.tableCellStyle}>{gridData.bsnsNo!==undefined?gridData.bsnsNo._text:""}</TableCell>
						</TableRow>
            <TableRow>
						<TableCell className={classes.tableHeaderCellStyle}>대표자명</TableCell>
						<TableCell className={classes.tableCellStyle}>{gridData.rppnNm!==undefined?gridData.rppnNm._text:""}</TableCell>
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
