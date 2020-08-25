import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CardContent, TextField } from "@material-ui/core";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';

import Popover from  '@material-ui/core/Popover';

import CardIcon from "components/Card/CardIcon.js";
import ImpPassDetailTable from "./ImpPassDetailTable.js";
import Assignment from "@material-ui/icons/Assignment";
import SearchIcon from '@material-ui/icons/Search';
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import CustomSelect from "components/CustomInput/CustomSelect.js";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import MaterialTable from 'material-table';
import CntrHistoryPage from "./CntrHistoryPage.js";
import ImpPassTable from "./ImpPassTable.js";

import queryString from 'query-string';

import { observer, inject} from 'mobx-react'; // 6.x

import axios from 'axios';
//import {ExcelFile, ExcelSheet} from "react-export-excel";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "bold",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
	  },
};

const useStyles = makeStyles(styles);
const useRadioStyles = makeStyles(customCheckboxRadioSwitch);
let numCnt =1;

const ImpCustomsPassInfo = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 

  const query = queryString.parse(window.location.search);

  const [passInfoData,setPassInfoData] = useState([]);
  const [impPassList,setImpPassList] = useState([]);
  const [hblList,setHblList] = useState([]);

  //조회조건
  const [store,setStore] = useState(props.store);

  const year = (new Date()).getFullYear();
 
  const [selectedEnabled, setSelectedEnabled] = React.useState(query.param&&(query.gubun=="MBL"||query.gubun=="HBL")?"blNum":"cargoNum");
  const [searchCargo,setSearchCargo] = useState(query.param&&query.gubun=="MNG"?query.param:"");
  const [searchMbl,setSearchMbl] = useState(query.param&&query.gubun=="MBL"?query.param:"");
  const [searchHbl,setSearchHbl] = useState(query.param&&query.gubun=="HBL"?query.param:"");
  const [searchBlYy,setSearchBlYy] = useState(year);
	const [openCntr, setOpenCntr] = useState(false);
  const [showHblList, setShowHblList] = useState(false);
  const [detailCnt, setDetailCnt] = useState("0");
  
  const handleChangeEnabled = event => {
    searchClear();
    setSelectedEnabled(event.target.value);
  };

  useEffect(() => {
    if(query.param) onSubmit();
  },[]);

  const onSubmit = () => {
	  if(store.token) {
      setShowHblList(false);
	    selectPassInfo();
	  } else {
		  props.openLogin();
	  }
  }
  //console.log(paramData);

  const handleAddRow = () => {
	  if(store.token) {
	    //page ++
	    numCnt=numCnt+1;
	
	   
	  } else {
		  props.openLogin();
	  }
  };
  
	const handleOpenCntr = () => {
    if(passInfoData.cargMtNo != undefined){
      setOpenCntr(true);
    }
  };

	const handleClose = () => {
		setOpenCntr(false);
  };
  
	const onClickHblList = (event, rowData) => {
    selectPassInfo(rowData.cargMtNo);
  };
  
  const searchClear = () => {
		setSearchCargo("");
		setSearchMbl("");
		setSearchHbl("");
		setSearchBlYy(year);
  };
  
  const selectPassInfo = (selectedCargNo) => {
    let searchData;

    if (selectedCargNo != undefined){
      searchData = {
        cargMtNo: selectedCargNo
      };
    }else {
      if (selectedEnabled === "cargoNum" ){
        if(searchCargo == ""){
          alert("화물관리번호를 입력하세요.");
          return;
        }
        searchData = {
          cargMtNo: searchCargo
        };
      }else {
        if( searchBlYy == "" ){
          alert("연도를 선택하세요.");
          return;
        }else {
          if(searchMbl == "" && searchHbl == ""){
            alert("M-B/L 또는 H-B/L을 입력하세요.");
            return;
          }
        }
        searchData = {
          mblNo: searchMbl,
          hblNo: searchHbl,
          blYy : searchBlYy
        };
      }
    }

		return axios ({
			url:'/com/uniPassApiSelectPassInfo',
			method:'POST',
			headers:{'Authorization':'Bearer '+userStore.token},
			data: searchData
		})
	    .then(res => {

        if(res.data.message == "INFO"){
          setPassInfoData(res.data.infoData);
          setImpPassList(res.data.detailDataList);
          setDetailCnt(res.data.detailDataList.length);
        } else if (res.data.message == "LIST"){
          setHblList(res.data.infoDataList);
          setPassInfoData(res.data.infoData);
          setImpPassList(res.data.detailDataList);
          setShowHblList(true);
          setDetailCnt(res.data.detailDataList.length);
        } else if (res.data.message == "NO_DATA") {
          alert("정보가 존재하지 않습니다");
        } else {
          alert(res.data.errMsg);
        }
		}).catch(err => {
            if(err.response.status === 401) {
	        	props.openLogin();
	        }
            });
	}


  const classes = useStyles();  
  const radioButtonClasses = useRadioStyles();  

	//const container_open = Boolean(anchorC);
	//const upload = container_open ? 'simple-popover':undefined;

  let searchContent = null;
  let hblContent = null;

  if(selectedEnabled === "cargoNum"){
    searchContent = <Grid container spacing={1}>
                <Grid item xs={10} sm={10} md={10}>
                  <TextField id="cargo" label="화물관리번호" onChange={event => setSearchCargo(event.target.value)} value={searchCargo} //variant="outlined" size="small" 
                      />
                </Grid>
              </Grid>;
  }
  else if(selectedEnabled === "blNum"){
    searchContent = <Grid container spacing={1}>
                <Grid item xs={3} sm={3} md={3}>
                  <TextField id="mbl" label="M-B/L" onChange={event => setSearchMbl(event.target.value)} value={searchMbl} //variant="outlined" size="small" 
                      />
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <TextField id="hbl" label="H-B/L" onChange={event => setSearchHbl(event.target.value)} value={searchHbl} //variant="outlined" size="small" 
                      />
                </Grid>
                <Grid item xs={3} sm={3} md={3}>
                  <CustomSelect
                    id="year"
                    labelText = "Year"
                    setValue = {searchBlYy}
                    option = {[year-1, year, year+1]}
                    inputProps={{
                      onChange:event=> setSearchBlYy(event.target.value)
                    }}
                    
                    //formControlProps={{fullWidth: true}} 
                  />
                </Grid>
              </Grid>;
  }

  if(showHblList){
    hblContent =  <GridItem xs={12}>
                    <Card>
                      <CardHeader color="info" icon style={{height:'10px'}}>
                        <CardIcon color="info" style={{padding:'0'}}>
                          <Assignment />
                        </CardIcon>
                        <h4 className={classes.cardTitleBlack}>H-B/L 목록</h4>
                      </CardHeader>
                      <CardBody style={{paddingTop:'50px'}}>
                        <MaterialTable
                                  title=""
                                  options={{actionsColumnIndex: -1, textAlign:'left', padding:'7px'}}
                                  columns={
                                    [{headerStyle: {backgroundColor:'#f2fefd'}, width: '5%', title: 'No', field: 'no', editable:'never' }
                                    ,{headerStyle: {backgroundColor:'#f2fefd'}, width: '25%', title: '화물관리번호', field: 'cargMtNo', editable:'never' }
                                    ,{headerStyle: {backgroundColor:'#f2fefd'}, width: '20%', title: 'H-B/L 번호', field: 'hblNo', editable:'never' }
                                    ,{headerStyle: {backgroundColor:'#f2fefd'}, width: '10%', title: '입항일자', field: 'etprDt', editable:'never' }
                                    ,{headerStyle: {backgroundColor:'#f2fefd'}, width: '15%', title: '양륙항', field: 'dsprNm', editable:'never' }
                                    ,{headerStyle: {backgroundColor:'#f2fefd'}, width: '15%', title: '운송사명', field: 'shcoFlco', editable:'never' }]
                                  }
                                  data={hblList}
                                  onRowClick={onClickHblList}
                                />
                      </CardBody>
                    </Card> 
                  </GridItem>;
  }else {
    hblContent = null;
  }
  
  return (
    <GridContainer>
      <GridItem xs={12} xm={12}>
        <Card style={{marginBottom:'0px'}}>
          <CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
            <Grid container>
              <Grid item xs={2} sm={2} md={2}>
                <div
                  className={
                    radioButtonClasses.checkboxAndRadio +
                    " " +
                    radioButtonClasses.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedEnabled === "cargoNum"}
                        onChange={handleChangeEnabled}
                        value="cargoNum"
                        name="radio button enabled"
                        aria-label="cargoNum"
                        icon={
                          <FiberManualRecord
                            className={radioButtonClasses.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={radioButtonClasses.radioChecked}
                          />
                        }
                        classes={{
                          checked: radioButtonClasses.radio,
                          root: radioButtonClasses.radioRoot
                        }}
                      />
                    }
                    classes={{
                      label: radioButtonClasses.label,
                      root: radioButtonClasses.labelRoot
                    }}
                    label="화물관리번호"
                  />
                </div>
                <div
                  className={
                    radioButtonClasses.checkboxAndRadio +
                    " " +
                    radioButtonClasses.checkboxAndRadioHorizontal
                  }
                >
                  <FormControlLabel
                    control={
                      <Radio
                        checked={selectedEnabled === "blNum"}
                        onChange={handleChangeEnabled}
                        value="blNum"
                        name="radio button enabled"
                        aria-label="blNum"
                        icon={
                          <FiberManualRecord
                            className={radioButtonClasses.radioUnchecked}
                          />
                        }
                        checkedIcon={
                          <FiberManualRecord
                            className={radioButtonClasses.radioChecked}
                          />
                        }
                        classes={{
                          checked: radioButtonClasses.radio,
                          root: radioButtonClasses.radioRoot
                        }}
                      />
                    }
                    classes={{
                      label: radioButtonClasses.label,
                      root: radioButtonClasses.labelRoot
                    }}
                    label="M-B/L or H-B/L"
                  />
                </div>
              </Grid>
              <Grid item xs={8} sm={8} md={8}>
                  {searchContent}
              </Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
                <Button color="info" onClick = {onSubmit}  endIcon={<SearchIcon/>}>SEARCH</Button>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
      {hblContent}
      <GridItem xs={12}>
        <Card>
          <CardHeader color="info" icon >
            <CardIcon color="info" style={{padding:'0'}}>
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardTitleBlack}>수입화물 통관진행정보</h4>
	        </CardHeader>
          <CardBody style={{paddingTop:'50px'}}>
            <ImpPassTable tableData={ passInfoData } ></ImpPassTable>
            <Grid item style={{textAlignLast:'right'}}>
              <Button color="info" onClick={handleOpenCntr}>컨테이너내역</Button>
              <Popover
                id={'popoverCntr'}
                open={openCntr}
                //anchorEl={anchorC}
                onClose={handleClose}
                anchorReference="anchorPosition"
                anchorPosition={{top:10,left:550}}
                anchorOrigin={{vertical:'bottom',horizontal:'center',}}
                transformOrigin={{vertical:'top',horizontal:'center',}}>
                  <CntrHistoryPage 
                    token={store}
                    cargMtNo={passInfoData.cargMtNo}
                  />
              </Popover>
            </Grid>
          </CardBody>
        </Card> 
      </GridItem>    
      <GridItem xs={12}>
        <Card>
          <CardHeader color="info" icon style={{height:'10px'}}>
            <CardIcon color="info" style={{padding:'0'}}>
              <Assignment />
            </CardIcon>
            <h4 className={classes.cardTitleBlack} style={{display:'inline-block'}}>통관진행 현황</h4>
            <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px", float:'right'}}>TOTAL: {detailCnt}</span>
	        </CardHeader>
          <CardBody style={{paddingTop:'40px'}}>
              <ImpPassDetailTable 
                tableHeaderColor = "info"
                //tableHead = {["선택","선사", "CNTR NO", "DETENTION", "DEMURRAGE", "COMBINED","STORAGE","REMARKS","DO신청"]}
                tableData = { impPassList }
                tableRownum={numCnt}
                onClickHandle ={handleAddRow}
                tableHeaderColorCode={"#f2fefd"}
              />
          </CardBody>
        </Card> 
      </GridItem>    
    </GridContainer>
  );
}
))

export default ImpCustomsPassInfo;