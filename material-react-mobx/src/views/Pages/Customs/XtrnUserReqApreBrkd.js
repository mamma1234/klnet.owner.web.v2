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
    backgroundColor:'#f2fefd',
    width:'25%'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    width:'25%'
  },
  tableMulHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
  },tableMulCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
  }  
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function XtrnUserReqApreBrkd(props) {
  const [severity, setSeverity] = useState("");
  const [userStore] = useState(props.store);
  const classes = useStyless();
  const [reqApreNo, setReqApreNo] = useState("");
  const [ieGubun, setIeGubun] = useState("I");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  const [rowData, setRowData] = useState([]);
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
    setReqApreNo(e.target.value);
  }
  const onSubmit = () => {
    axios.post("/com/uniPassXtrnUserReqApreBrkd",{imexTpcd:ieGubun,reqApreNo:reqApreNo}, {headers:{'Authorization':'Bearer '+userStore.token}}).then(
      res => {
        if(res.data.message === "SUCCESS") {
          AlertMessage("조회가 완료되었습니다.","success");
          if(ieGubun==="I") {
            setRowData(res.data.infoData.data[0].xtrnUserImpReqApreBrkdQryRsltVo);
            setGridData(res.data.infoData.data[0].xtrnUserImpReqApreDtlBrkdQryRsltVo);
          }else if(ieGubun==="E") {
            setRowData(res.data.infoData.data[0].xtrnUserExpReqApreBrkdQryRsltVo);
            setGridData(res.data.infoData.data[0].xtrnUserExpReqApreDtlBrkdQryRsltVo);
          }
          
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
                <CustomSelect
                    id="Gubun"
                    labelText = "구분"
                    setValue = {ieGubun==="I"?"수입":"수출"}
                    option = {["수입","수출"]}
                    inputProps={{onChange:(e) => {
                      setGridData([])
                      setRowData([])
                      if(e.target.value==="수입") {
                        setIeGubun("I")
                      }else{
                        setIeGubun("E")
                      }
                    }}}/>		
              </Grid>
              <Grid item xs={12} md={3}>
                <CustomInput
                      labelText="요건 승인번호"
                      id="reqApreNo"
                      value={reqApreNo}
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

    {ieGubun ==="I"? (
      <div>
 <Card>
 <CardHeader color="info" stats icon >
   <CardIcon color="info" style={{padding:'0'}}>
     <Assignment />
   </CardIcon>
     <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>수입요건승인내역</b></h4>
     <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
 </CardHeader>
   <CardBody>
   <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
     <TableBody>
       <TableRow>
         <TableCell className={classes.tableHeaderCellStyle} >승인조건</TableCell>
         <TableCell className={classes.tableCellStyle}>{rowData.apreCond!==undefined?rowData.apreCond._text:""}</TableCell>
         <TableCell className={classes.tableHeaderCellStyle}>발급일자</TableCell>
         <TableCell className={classes.tableCellStyle}>{rowData.issDt!==undefined?rowData.issDt._text:""}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell className={classes.tableHeaderCellStyle}>선적항</TableCell>
         <TableCell className={classes.tableCellStyle}>{rowData.lprt!==undefined?rowData.lprt._text:""}</TableCell>
         <TableCell className={classes.tableHeaderCellStyle}>관련서식명</TableCell>
         <TableCell className={classes.tableCellStyle}>{rowData.relaFrmlNm!==undefined?rowData.relaFrmlNm._text:""}</TableCell>
       </TableRow>
       <TableRow>
         <TableCell className={classes.tableHeaderCellStyle}>유효기간</TableCell>
         <TableCell className={classes.tableCellStyle}>{rowData.valtPrid!==undefined?rowData.valtPrid._text:""}</TableCell>
         <TableCell className={classes.tableHeaderCellStyle}>관련법령</TableCell>
         <TableCell className={classes.tableCellStyle}>{rowData.relaLwor!==undefined?rowData.relaLwor._text:""}</TableCell>
       </TableRow>
       <TableRow>
       <TableCell className={classes.tableHeaderCellStyle}>인도조건</TableCell>
       <TableCell className={classes.tableCellStyle}>{rowData.dlcn!==undefined?rowData.dlcn._text:""}</TableCell>
       <TableCell className={classes.tableHeaderCellStyle}>요건승인번호</TableCell>
       <TableCell className={classes.tableCellStyle}>{rowData.reqApreNo!==undefined?rowData.reqApreNo._text:""}</TableCell>
       </TableRow>
     </TableBody>
   </Table>

   </CardBody>
</Card>
<Card>
 <CardHeader color="info" stats icon >
   <CardIcon color="info" style={{padding:'0'}}>
     <Assignment />
   </CardIcon>
     <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>수입요건승인내역</b></h4>
     <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
 </CardHeader>
   <CardBody>
   <Table   style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
       <TableHead> 
         <TableRow>
           <TableCell className={classes.tableMulHeaderCellStyle}>HS 부호</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>품목식별부호</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>잔량중량</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>승인중량</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>통관중량</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>중량단위</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>수량단위</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>품목코드</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>B/L번호</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>승인수량</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>용도명</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>잔량수량</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>품명및규격</TableCell>
           <TableCell className={classes.tableMulHeaderCellStyle}>통관수량</TableCell>
         </TableRow>
       </TableHead>
       <TableBody >
       { gridData.map((element,key) => {     
    //console.log(">> element:",element);
    
     return( 
         <TableRow key={key}>
           <TableCell className={classes.tableMulCellStyle}>{element.hsSgn!=undefined?element.hsSgn._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.prlstIdfySgn!=undefined?element.prlstIdfySgn._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.rsqtyWght!=undefined?element.rsqtyWght._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.apreWght!=undefined?element.apreWght._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.csclWght!=undefined?element.csclWght._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.wghtUt!=undefined?element.wghtUt._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.qtyUt!=undefined?element.qtyUt._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.prlstCd!=undefined?element.prlstCd._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.blNo!=undefined?element.blNo._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.apreQty!=undefined?element.apreQty._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.usgNm!=undefined?element.usgNm._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.rsqtyQty!=undefined?element.rsqtyQty._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.prnmStsz!=undefined?element.prnmStsz._text:""}</TableCell>
           <TableCell className={classes.tableMulCellStyle}>{element.csclQty!=undefined?element.csclQty._text:""}</TableCell>
         </TableRow>  
        )
       })    
       }  
       </TableBody>
     </Table>

   </CardBody>
</Card>
</div>
    ):
    (
      <div>
      <Card>
      <CardHeader color="info" stats icon >
        <CardIcon color="info" style={{padding:'0'}}>
          <Assignment />
        </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>수출요건승인내역</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
      </CardHeader>
        <CardBody>
        <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          <TableBody>
            <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>해외거래처상호</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.ovcsConm!==undefined?gridData.ovcsConm._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>승인조건</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.apreCond!==undefined?gridData.apreCond._text:""}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>목적국</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.dstcy!==undefined?gridData.dstcy._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>발급일자</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.issDt!==undefined?gridData.issDt._text:""}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.tableHeaderCellStyle}>관련서식명</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.relaFrmlNm!==undefined?gridData.relaFrmlNm._text:""}</TableCell>
              <TableCell className={classes.tableHeaderCellStyle}>유효기간</TableCell>
              <TableCell className={classes.tableCellStyle}>{gridData.valtPrid!==undefined?gridData.valtPrid._text:""}</TableCell>
            </TableRow>
            <TableRow>
            <TableCell className={classes.tableHeaderCellStyle}>해외거래처명</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.ovcsNm!==undefined?gridData.ovcsNm._text:""}</TableCell>
            <TableCell className={classes.tableHeaderCellStyle}>관련법령</TableCell>
            <TableCell className={classes.tableCellStyle}>{gridData.relaLwor!==undefined?gridData.relaLwor._text:""}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
     
        </CardBody>
     </Card>
     <Card>
      <CardHeader color="info" stats icon >
        <CardIcon color="info" style={{padding:'0'}}>
          <Assignment />
        </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>수출요건승인내역</b></h4>
          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px"}}></span>
      </CardHeader>
        <CardBody>
        <Table   style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
            <TableHead> 
              <TableRow>
                <TableCell className={classes.tableMulHeaderCellStyle}>HS 부호</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>품목식별부호</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>순중량</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>수량단위</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>용도명</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>잔량수량</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>품명및규격</TableCell>
                <TableCell className={classes.tableMulHeaderCellStyle}>통관수량</TableCell>
              </TableRow>
            </TableHead>
            <TableBody >
            { gridData.map((element,key) => {     
         //console.log(">> element:",element);
         
          return( 
              <TableRow key={key}>
                <TableCell className={classes.tableMulCellStyle}>{element.hsSgn!=undefined?element.hsSgn._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.prlstIdfySgn!=undefined?element.prlstIdfySgn._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.ntwg!=undefined?element.ntwg._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.qtyUt!=undefined?element.qtyUt._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.usgNm!=undefined?element.usgNm._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.rsqtyQty!=undefined?element.rsqtyQty._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.prnmStsz!=undefined?element.prnmStsz._text:""}</TableCell>
                <TableCell className={classes.tableMulCellStyle}>{element.csclQty!=undefined?element.csclQty._text:""}</TableCell>
              </TableRow>  
             )
            })    
            }  
            </TableBody>
          </Table>
     
        </CardBody>
     </Card>
     </div>
    )
  }
   



   
    
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
