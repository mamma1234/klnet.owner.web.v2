import React,{ useState, useEffect } from "react";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import {TextField} from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import SearchIcon from '@material-ui/icons/Search';
import CardIcon from "components/Card/CardIcon.js";
import DetailTable from "views/Pages/DemDet/Import/importDetailTable.js";
import Assignment from "@material-ui/icons/Assignment";
import Checkbox from "@material-ui/core/Checkbox";
import {userService} from 'views/Pages/Login/Service/Service.js';

import axios from 'axios';
//import {ExcelFile, ExcelSheet} from "react-export-excel";

let numCnt =1;
let ieType = "I";

export default function DemDetList(props) {
  
  const [demDetList,setDemDetList] = useState([]);
  
  const [lineData, setLineData] = useState([]);

  //조회조건
  const [lineCode, setLineCode] = useState("");
  const [mblNo,setMblNo] = useState("");
  const [cntrNo,setCntrNo] = useState("");
  const [token] = useState(props.token);

  const [onlyChecked, setOnlyChecked] = useState(false);
 
  useEffect(() => {
    
    //console.log(props.location.state);
   /* if (props.location.state !== undefined) {
      setParamData(props.location.state.param);
    }*/

     axios.post("/api/getCustomLineCode",{}//,{headers:{'Authorization':'Bearer '+token}}
     ).then(res => setLineData(res.data));
/*       .catch(err => {
    		        if(err.response.status === 403||err.response.status === 401) {
    		        	props.openLogin();
    				}
       });*/

    if(props.location.state !== null) {
      setOnlyChecked(true);
      const localStorageCheck =  userService.GetItem()?userService.GetItem().token:null;
        if(localStorageCheck) {
          numCnt=1;
          //search
          axios.post("/loc/getImportDemDetList",{
            lineCode:lineCode
            ,mblNo:mblNo
            ,ieType:ieType
            ,cntrNo:cntrNo
            ,num:numCnt
            ,onlyChecked:true
          },{headers:{'Authorization':'Bearer '+localStorageCheck}})
            .then(setDemDetList([]))
            .then(res => setDemDetList(res.data))
            .catch(err => {
               //console.log(err.response.status);
               if(err.response.status === 403||err.response.status === 401) {
                  props.openLogin();
                }
                
            });
        } else {
          props.openLogin();
        }
      
    }
    return () => {
        //console.log('cleanup');
      };
  },[]);
  const onlyHandleChange = (event) => {
    if (onlyChecked) {setOnlyChecked(false)} else {setOnlyChecked(true)};
  }

  const onSubmit = () => {
    // console.log("====> onlyChecked :"+onlyChecked);
	  const localStorageCheck =  userService.GetItem()?userService.GetItem().token:null;
	  if(localStorageCheck) {
	    numCnt=1;
      //search
		  axios.post("/loc/getImportDemDetList",{
	      lineCode:lineCode
        ,mblNo:mblNo
        ,ieType:ieType
	      ,cntrNo:cntrNo
        ,num:numCnt
        ,onlyChecked:onlyChecked
	    },{headers:{'Authorization':'Bearer '+localStorageCheck}})
	    	.then(setDemDetList([]))
		    .then(res => setDemDetList(res.data))
		    .catch(err => {
		       //console.log(err.response.status);
		    	 if(err.response.status === 403||err.response.status === 401) {
		        	props.openLogin();
		        }
		        
		    });
	  } else {
		  props.openLogin();
	  }
    //console.log(">>> demDetList : ",demDetList) ;
  }
  //console.log(paramData);

  const handleAddRow = () => {
	  const localStorageCheck =  userService.GetItem()?userService.GetItem().token:null;
	  if(localStorageCheck) {
	    //page ++
	    numCnt=numCnt+1;
      axios.post("/loc/getImportDemDetList",{
	      lineCode:lineCode
        ,mblNo:mblNo
        ,ieType:ieType
	      ,cntrNo:cntrNo
        ,num:numCnt 
        ,onlyChecked:onlyChecked
	    },{headers:{'Authorization':'Bearer '+localStorageCheck}}) 
	    .then(res => setDemDetList([...demDetList,...res.data]))
	    .catch(err => {
	      if(err.response.status === 403 || err.response.status === 401) {
	    	  props.openLogin();
	      }
	    }); 
	  } else {
		  props.openLogin();
	  }
  };
  

  const onCarrierSearchValue = (e) => {
	  const localStorageCheck =  userService.GetItem()?userService.GetItem().token:null; 
    const values = e.target.value;
    if(values !== undefined && values !== "" && values.length >= 2) {
    	if(localStorageCheck) {
	      axios.post("/loc/getCustomLineCode",{},{headers:{'Authorization':'Bearer '+localStorageCheck}})
	      .then(res => setLineData(res.data))
	      .catch(err => {
	    		        if(err.response.status === 403||err.response.status === 401) {
	    		        	props.openLogin();
	    				}
	    		    });
    	} else {
    		props.openLogin();
    	}
    }  
    //console.log(">>> lineData : ",lineData) ;
  }

  const onCarrierChange = (e,data) => {
	  if(data) {
		  setLineCode(data.id);
	  } else {
		  setLineCode("");
	  }
  }
  
  return (
        <Card style={{marginBottom:'0px'}}>
          <CardHeader color="info" icon >
            <CardIcon color="info" style={{padding:'0'}}>
              <Assignment />
            </CardIcon>
	        </CardHeader>
          <CardBody >
	          <Card style={{marginTop:'0',marginBottom:'5px'}}>
	    		<CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
		            <Grid container spacing={1} direction = "row" alignItems="center">
		              <Grid item xs={12} sm={3} md={3} style={{paddingBottom:'10px'}}>	
		                <Autocomplete
		                  inputRoot={{style:{marginBottom:'6px'}}}
		                  options = {lineData}
		                  getOptionLabel = { option => option.id+" "+option.nm}
		                  id="lineCode"
		                  onChange={onCarrierChange}
		                  onInputChange={onCarrierSearchValue}
		                  //setValue = {lineData}
		                  inputProps={{onChange:event => setLineCode(event.target.value)}}
		                  renderInput={params => (
		                    <TextField {...params} label={<font color="#AAAAAA" style={{fontSize:'14px'}}>CARRIER</font>} fullWidth />
		                  )}
		                />
		              </Grid>
		              <Grid item xs={12} sm={2} md={2}>
		                <CustomInput
		                  labelText="B/L NO"
		                  id="mblNo"
		                  inputProps={{onChange:event => setMblNo(event.target.value)}}
		                  formControlProps={{fullWidth:true}}/>
		              </Grid>
		              <Grid item xs={12} sm={2} md={2}>
		                <CustomInput
		                  labelText="CNTR NO"
		                  id="cntrNo"
		                  inputProps={{onChange:event => setCntrNo(event.target.value)}}
		                  formControlProps={{fullWidth: true}} 
		                />
		              </Grid>
		
		              <Grid item xs={12} sm={3} md={3} >
		                <Checkbox
		                  id="chargeOnly"
		                  checked={onlyChecked}
		                  onChange={onlyHandleChange}
		                  name ="chargeOnly"
		                  color="primary"
		                  inputProps={{ 'aria-label': 'secondary checkbox' }}
		                />비용 발생 컨테이너 보기
		              </Grid>
		            </Grid>
				    
				    </CardBody>
				    </Card>
				    
	       <Grid item xs={12} style={{paddingBottom:'10px',textAlign:'-webkit-right'}}>
		      	<Grid item xs={12} sm={3} md={2} style={{textAlign:'center'}}>
			      {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
			      {/* <Button color="info" onClick = {onSubmit}  >조회</Button>*/}
			      <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} fullWidth >Search</Button>
			      {/* <Button color="info" >삭제</Button>
			      <Button color="info" //onClick = {Download} 
			        id='btnExport' >엑셀다운로드</Button> */}
			    </Grid>
		    </Grid>
              <DetailTable 
                tableHeaderColor = "info"
                //tableHead = {["선택","선사", "CNTR NO", "DETENTION", "DEMURRAGE", "COMBINED","STORAGE","REMARKS","DO신청"]}
                tableData = { demDetList }
                tableRownum={numCnt}
                onClickHandle ={handleAddRow}
              />
          </CardBody>
        </Card>     
  );
}