import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {Grid, Table, TableBody, TableRow, TableCell, Input, FormControl, InputLabel,Paper} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import CustomInput from "components/CustomInput/CustomInput.js";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import MaskedInput from 'react-text-mask';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CustomSelect from "components/CustomInput/CustomSelect.js";
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
  },customselectGubun: {
    marginTop:'12px',
    width:'100%'
  },paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function TextMaskCustom1(props) {
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
function TextMaskCustom2(props) {
  const {inputRef, ...other} = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,'-',/\d/,/\d/,/\d/,/\d/,/\d/,/\d/,/\d/]}
      placeholderChar={'\u2000'}
      showMask
      />
  );
}


export default function DclrCrfnVrfc(props) {
  const [severity, setSeverity] = useState("");
  //const [userStore] = useState(props.store);
  const classes = useStyless();
  const [impDclrCrfnPblsNo,setImpDclrCrfnPblsNo] = useState("");
  const [impDclrNo,setImpDclrNo] = useState("");
  const [pltxIdfyNo,setPltxIdfyNo] = useState("");
  const [pltxIdfyNoGubun,setPltxIdfyNoGubun] = useState("사업자번호");
  const [orcyCntyCd,setOrcyCntyCd] = useState("");
  const [dclrPrnm,setDclrPrnm] = useState("");
  const [dclrWght,setDclrWght] = useState("");
  const [dclrWghtUtCd,setDclrWghtUtCd] = useState("");
  const [txPrcWncrTamt,setTxPrcWncrTamt] = useState("");
  const [impPayQxmt,setImpPayQxmt] = useState("");


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
  

  
  const onSubmit = () => {

	  const token = userService.GetItem()?userService.GetItem().token:null;
      // let number = pltxIdfyNo.replace(/-/gi,'');
      // number = number.replace(/(\s*)/gi,'');
      // if(impDclrCrfnPblsNo.length === 0) {
      //   AlertMessage("발행번호를 입력해주세요.","error");
      //   return;
      // }
      // if(impDclrCrfnPblsNo.length > 13) {
      //   AlertMessage("발행번호의 자릿수가 너무 깁니다.","error");
      //   return;
      // }
      // if(impDclrNo.length === 0) {
      //   AlertMessage("신고번호를 입력해주세요.","error");
      //   return;
      // }
      // // if(element.impDclrNo.length > 10) {
      // //   AlertMessage(String(index+1) + " 행의 신고번호의 자릿수가 너무 깁니다.","error");
      // //   checkInput = false;
      // //   return;
      // // }
      // if(pltxIdfyNo.length === 0) {
      //   AlertMessage(pltxIdfyNoGubun +"를 입력해주세요.","error");
      //   return;
      // }
      // if( pltxIdfyNoGubun === "사업자번호") {

      //   if(number.length !== 10) {
      //     AlertMessage(pltxIdfyNoGubun+" 번호의 길이가 10자리가 아닙니다.","error");
      //     return;
      //   }
      // }else if( pltxIdfyNoGubun === "주민등록번호" ) {
      //   if(number.length !== 13) {
      //     AlertMessage(pltxIdfyNoGubun+" 번호의 길이가 13자리가 아닙니다.","error");
      //     return;
      //   }       
      // }
      // if(orcyCntyCd.length === 0) {
      //   AlertMessage("원산지코드를 입력해주세요.","error");
      //   return;
      // }      
      // if(orcyCntyCd.length > 2) {
      //   AlertMessage("원산지코드의 자릿수가 너무 깁니다.","error");
      //   return;
      // }      
      // if(dclrPrnm.length === 0) {
      //   AlertMessage("품명을 입력해주세요.","error");
      //   return;
      // }      
      // if(dclrPrnm.length > 40) {
      //   AlertMessage("품명의 자릿수가 너무 깁니다.","error");
      //   return;
      // }   
      // if(dclrWght.length === 0) {
      //   AlertMessage("순중량을 입력해주세요.","error");
      //   return;
      // }      
      // if(dclrWght.length > 19) {
      //   AlertMessage("순중량의 자릿수가 너무 깁니다.","error");
      //   return;
      // }            
      // if(dclrWghtUtCd.length === 0) {
      //   AlertMessage("순중량 단위을 입력해주세요.","error");
      //   return;
      // }      
      // if(dclrWghtUtCd.length > 2) {
      //   AlertMessage("순중량 단위의 자릿수가 너무 깁니다.","error");
      //   return;
      // }   


      // if(txPrcWncrTamt.length > 20) {
      //   AlertMessage("총 과세가격의 자릿수가 너무 깁니다.","error");
      //   return;
      // }   
      // if(impPayQxmt.length > 20) {
      //   AlertMessage("총 세액합계의 자릿수가 너무 깁니다.","error");
      //   return;
      // }   
	  if(token) {
      axios.post("/com/uniPassDclrCrfnVrfc",{
        impDclrCrfnPblsNo:impDclrCrfnPblsNo,
        impDclrNo:impDclrNo,
        pltxIdfyNo:pltxIdfyNo,
        orcyCntyCd:orcyCntyCd,
        dclrPrnm:dclrPrnm,
        dclrWght:dclrWght,
        dclrWghtUtCd:dclrWghtUtCd,
        txPrcWncrTamt:txPrcWncrTamt,
        impPayQxmt:impPayQxmt,
      }, {headers:{'Authorization':'Bearer '+token}}).then(
          res => {
            if(res.data) {
              AlertMessage("조회가 완료되었습니다.","success");
              setGridData(res.data.infoData);
            }else {
              AlertMessage("조회결과가 없습니다.","error");
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
        <Grid item xs={12} sm={12} md={12} style={{textAlignLast:'right', paddingTop:"20px"}}>
          <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} >SEARCH</Button>
        </Grid>
      

        <Grid item xs={12} sm={12} md={12} style={{margin:'15px'}}>
                  <Grid container spacing={1} justify="space-between">
                    <Grid item xs={12} sm={2} md={2}>
                      
                      <CustomInput
                        labelText={<span>발행번호<small>(required)</small></span>}
                        id="impDclrCrfnPblsNo"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:impDclrCrfnPblsNo,
                          onChange:(e) => setImpDclrCrfnPblsNo(e.target.value)
                        }}/>
                    </Grid>

                    <Grid item xs={12} sm={2} md={2}>
                      <CustomInput
                        labelText={<span>신고번호<small>(required)</small></span>}
                        id="impDclrNo"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:impDclrNo,
                          onChange:(e) => setImpDclrNo(e.target.value)
                        }}/>
                    </Grid>

                    <Grid item xs={12} sm={4} md={4} className={classes.customselectGubun}>
                      <CustomSelect
                        id="Gubun"
                        labelText = "구분"
                        setValue = {pltxIdfyNoGubun}
                        option = {["사업자번호","주민등록번호"]}
                        inputProps={{onChange:(e) => setPltxIdfyNoGubun(e.target.value)}}/>		
                      <FormControl>
                        <InputLabel>{pltxIdfyNoGubun==="사업자번호"?<span>사업자번호<small>(required)</small></span>:<span>주민등록번호<small>(required)</small></span>}</InputLabel>
                        <Input 
                          value={pltxIdfyNo}
                          onChange={(e) => setPltxIdfyNo(e.target.value)}
                          name="pltxIdfyNo"
                          inputComponent={pltxIdfyNoGubun==="사업자번호"?TextMaskCustom1:TextMaskCustom2}
                          id="pltxIdfyNo">
                          </Input>
                      </FormControl>
                    </Grid> 
                  
                  
                  <Grid item xs={12} sm={1} md={1}>
                      <CustomInput
                        labelText={<span>원산지코드<small>(required)</small></span>}
                        id="orcyCntyCd"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:orcyCntyCd,
                          onChange:(e) => setOrcyCntyCd(e.target.value)
                        }}/>
                  </Grid>
                  <Grid item xs={12} sm={3} md={3}>
                      <CustomInput
                        labelText={<span>품명<small>(required)</small></span>}
                        id="dclrPrnm"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:dclrPrnm,
                          onChange:(e) => setDclrPrnm(e.target.value)
                        }}/>
                  </Grid>
              </Grid>
              <Grid container spacing={1} justify="space-between">
                <Grid item xs={12}sm={3} md={3}>
                  <CustomInput
                        labelText={<span>순중량<small>(required)</small></span>}
                        id="dclrWght"
                        formControlProps={{
                          fullWidth: true
                        }}
                        inputProps={{
                          value:dclrWght,
                          onChange:(e) => setDclrWght(e.target.value)
                        }}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomInput
                    labelText={<span>순중량 단위<small>(required)</small></span>}
                    id="dclrWghtUtCd"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value:dclrWghtUtCd,
                      onChange:(e) => setDclrWghtUtCd(e.target.value)
                    }}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomInput
                    labelText="총 과세가격"
                    id="txPrcWncrTamt"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value:txPrcWncrTamt,
                      onChange:(e) => setTxPrcWncrTamt(e.target.value)
                    }}/>
                </Grid>
                <Grid item xs={12} sm={3} md={3}>
                  <CustomInput
                    labelText="총 세액합계"
                    id="impPayQxmt"
                    formControlProps={{
                      fullWidth: true
                    }}
                    inputProps={{
                      value:impPayQxmt,
                      onChange:(e) => setImpPayQxmt(e.target.value)
                    }}/>
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
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>수입신고 필증검증</b></h4>
        </CardHeader>
        <CardBody>
        <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
					<TableBody>
            {gridData.length !== 0? (
						<TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>결과</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.data[0]}</TableCell>
						</TableRow>
            ):null}

						
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
