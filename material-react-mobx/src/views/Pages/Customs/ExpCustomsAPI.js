import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTable from "views/Pages/DemDet/CustomTable.js";
import { CardContent, TextField } from "@material-ui/core";
import CustomInput from "components/CustomInput/CustomInput";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import MButton from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import Popover from  '@material-ui/core/Popover';
import ExcelUpload from "views/Pages/DemDet/PopUp/ExcelUpload.js";

import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";
import BackupIcon from "@material-ui/icons/Backup";
import CancelIcon from "@material-ui/icons/CancelPresentation";
import AddIcon from "@material-ui/icons/AddBox";
import ExpCustomsBLDetailTable from "./ExpCustomsBLDetailTable.js";
import Assignment from "@material-ui/icons/Assignment";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import FiberManualRecord from "@material-ui/icons/FiberManualRecord";
import CustomSelect from "components/CustomInput/CustomSelect.js";
import FormControl from "@material-ui/core/FormControl";
import Select from '@material-ui/core/Select';
import InputLabel from "@material-ui/core/InputLabel";
import { Table, TableCell, TableBody, TableRow } from '@material-ui/core';
import DetailTable from "./TablePaging.js";

import customCheckboxRadioSwitch from "assets/jss/material-dashboard-pro-react/customCheckboxRadioSwitch.js";
import MaterialTable from 'material-table';
import { observer, inject} from 'mobx-react'; // 6.x
import axios from 'axios';
import { Link } from "react-router-dom";
import {userService} from 'views/Pages/Login/Service/Service.js';

import queryString from 'query-string';

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
  headerCell: {
      textAlign: "left",
      backgroundColor: "#f2fefd",
      width:'12%',
      padding:'7px',
      
    },
  dataCell: {
      textAlign: "left",
      padding:'7px',
      
    }
};

const useStyles = makeStyles(styles);
const useRadioStyles = makeStyles(customCheckboxRadioSwitch);
{/*class Download extends React.Component {
  
  render() {
    const { data, index } = this.props;
    return (
      <ExcelFile>
        <ExcelSheet dataSet={data} name="Oraganization"/>
      </ExcelFile>
    )
  }
}*/}
let numCnt =1;

export default function ExpCustomsAPI(props) {
//const ExpCustomsAPI = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
  
  const query = queryString.parse(window.location.search);
  //조회조건
  const token = userService.GetItem()?userService.GetItem().token:null;
 
  const [selectedEnabled, setSelectedEnabled] = React.useState(query.param&&query.gubun=="BL"?"bl":"declare");
  const [searchDclrNo,setSearchDclrNo] = useState(query.param&&query.gubun=="DECLARE"?query.param:"");
  const [searchBlNo,setSearchBlNo] = useState(query.param&&query.gubun=="BL"?query.param:"");
  
  const [infoData,setInfoData] = useState([]);
  const [detailDataList,setDetailDataList] = useState([]);
  const [infoDataList,setInfoDataList] = useState([]);
  const [detailCnt,setDetailCnt] = useState("0");
  const [blCnt,setBlCnt] = useState("0");

  
  const searchClear = () => {
	  setSearchDclrNo("");
		setSearchBlNo("");
  };
  
  const handleChangeEnabled = value => {
    searchClear();
    setSelectedEnabled(value);
  };


  useEffect(() => {
    if(query.param) onSubmit();
  },[]);

  const onSubmit = () => {
	 
	  if(token) {
	    selectDclrInfo();
	  } else {
		  props.openLogin();
	  }
  }

  /*const onTest = () => {

	  if(store.token) {
	    selectDclrInfo();
	  } else {
		  props.openLogin();
	  }
  }*/
  

  /*const onClickDclrNo = (dclrNo) => {
	  if(store.token) {
      handleChangeEnabled("declare");
      setSearchDclrNo(dclrNo);
	    selectDclrInfo(dclrNo);
	  } else {
		  props.openLogin();
	  }
  }*/
  
  const selectDclrInfo = (dclrNo) => {
    let searchData;

    if(dclrNo != undefined){
      handleChangeEnabled("declare");
      setSearchDclrNo(dclrNo);
      searchData = {
        expDclrNo: dclrNo
      };
    } else {
      if (selectedEnabled === "declare" ){
        if(searchDclrNo == ""){
          alert("수출신고번호를 입력하세요.");
          return;
        }
        searchData = {
          expDclrNo: searchDclrNo
        };
      }else {
        if( searchBlNo == "" ){
          alert("B/L번호를 입력하세요.");
          return;
        }
        searchData = {
          blNo: searchBlNo
        };
      }
    }

		return axios ({
			url:'/com/uniPassApiSelectExpDclrInfo',
			method:'POST',
			headers:{'Authorization':'Bearer '+token},
			data: searchData
		})
	    .then(res => {
        if(res.data.message == "DCLRNO"){
          setInfoData(res.data.infoData);
          setDetailDataList(res.data.detailDataList);
          setDetailCnt(res.data.detailDataList.length);
        } else if (res.data.message == "BL"){
          setInfoDataList(res.data.infoDataList);
          setBlCnt(res.data.infoDataList.length);
        } else if (res.data.message == "NO_DATA") {
          alert("정보가 존재하지 않습니다");
        } else{
          if(res.data.errMsg != undefined){
            alert(res.data.errMsg);
          }else {
            alert("에러가 발생하였습니다.");
          }
        }
		}).catch(err => {
            if(err.response.status === 401) {
	        	props.openLogin();
	        }
            });
	}

  const classes = useStyles();  
  const radioButtonClasses = useRadioStyles();  

  let content = null;

  if(selectedEnabled === "declare"){
    content =       <GridItem xs={12}>
                      <Card style={{marginBottom:'0px'}}>
                        <CardHeader color="info" icon style={{height:'10px'}}>
                          <CardIcon color="info" style={{padding:'0'}}>
                            <Assignment />
                          </CardIcon>
                          <h4 className={classes.cardTitleBlack}>수출이행내역조회</h4>
                        </CardHeader>
                        <CardBody style={{paddingTop:'50px'}}>
                          <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                            <TableBody>
                              <TableRow>
                                <TableCell className={classes.headerCell}>수출자</TableCell>
                                <TableCell className={classes.dataCell} colSpan="5">{infoData.exppnConm}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className={classes.headerCell}>제조자</TableCell>
                                <TableCell className={classes.dataCell} colSpan="3">{infoData.mnurConm}</TableCell>
                                <TableCell className={classes.headerCell}>적재의무기한</TableCell>
                                <TableCell className={classes.dataCell}>{infoData.loadDtyTmlm}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className={classes.headerCell}>수리일자</TableCell>
                                <TableCell className={classes.dataCell}>{infoData.acptDt}</TableCell>
                                <TableCell className={classes.headerCell}>통관포장개수</TableCell>
                                <TableCell className={classes.dataCell}>{infoData.csclPck}</TableCell>
                                <TableCell className={classes.headerCell}>통관중량(KG)</TableCell>
                                <TableCell className={classes.dataCell}>{infoData.csclWght}</TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell className={classes.headerCell}>선적완료여부</TableCell>
                                <TableCell className={classes.dataCell}>{infoData.shpmCmplYn}</TableCell>
                                <TableCell className={classes.headerCell}>선적포장개수</TableCell>
                                <TableCell className={classes.dataCell}>{infoData.shpmPck}</TableCell>
                                <TableCell className={classes.headerCell}>선적중량(KG)</TableCell>
                                <TableCell className={classes.dataCell} colSpan="3">{infoData.shpmWght}</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </CardBody>
                      </Card> 
                      <Card>
                        <CardHeader color="info" icon style={{height:'10px'}}>
                          {/*<h6 style={{textAlign: "right",color:"#000000", paddingRight:"20px"}}>total:{detailCnt}</h6>}*/}
                          <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"20px", float:'right'}}>TOTAL: {detailCnt}</span>
                        </CardHeader>
                        <CardBody style={{paddingTop:'40px'}}>
                            <DetailTable
                                tableHeaderColor="info"
                                tableHead={["B/L번호", "출항일자", "선적포장개수"]}
                                tableData={detailDataList}
                                tableHeaderColorCode={"#f2fefd"}
                              />
                        </CardBody>
                      </Card> 
                    </GridItem>;
  }
  else if(selectedEnabled === "bl"){
    content = <GridItem xs={12}>
                <Card style={{marginBottom:'0px'}}>
                  <CardHeader color="info" icon style={{height:'10px'}}>
                    <CardIcon color="info" style={{padding:'0'}}>
                      <Assignment />
                    </CardIcon>
                    <h4 className={classes.cardTitleBlack}>수출이행내역조회</h4>
                    <span style={{textAlign: "right",color:"#000000", paddingRight:"20px", paddingTop:"0px", float:'right'}}>TOTAL: {detailCnt}</span>
                  </CardHeader>
                  <CardBody style={{paddingTop:'50px'}}>
                      <ExpCustomsBLDetailTable
                          tableHeaderColor="info"
                          //tableHead={["B/L번호", "출항일자", "선적포장개수"]}
                          tableData={infoDataList}
                          onClickDclrNo={(dclrNo) => selectDclrInfo(dclrNo)}
                        />
                  </CardBody>
                </Card> 
              </GridItem>;
  }
  
  return (
    <GridContainer>
      <GridItem xs={12} xm={12}>
        <Card style={{marginBottom:'0px'}}>
          <CardBody style={{paddingBottom: '0px',paddingTop: '0px', paddingLeft: '15px'}}>
            <Grid container>
            <Grid item xs={4} sm={4} md={4}>
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
                      checked={selectedEnabled === "declare"}
                      onChange={event => handleChangeEnabled(event.target.value)}
                      value="declare"
                      name="radio button enabled"
                      aria-label="declare"
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
                  label="수출신고번호"
                />
                  <CustomInput
                    id="declareNum"
                    inputProps={{
                      value:searchDclrNo,
                      onChange:event => setSearchDclrNo(event.target.value),
                      onFocus:event => handleChangeEnabled("declare")
                    }}
                    //formControlProps={{fullWidth: true}}
                  />
              </div>
              </Grid>
              <Grid item xs={4} sm={4} md={4}>
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
                      checked={selectedEnabled === "bl"}
                      onChange={event => handleChangeEnabled(event.target.value)}
                      value="bl"
                      name="radio button enabled"
                      aria-label="bl"
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
                  label="B/L번호"
                />
                  <CustomInput
                    id="BlNo"
                    inputProps={{
                      value:searchBlNo,
                      onChange:event => setSearchBlNo(event.target.value),
                      onFocus:event => handleChangeEnabled("bl")
                    }}
                    //formControlProps={{fullWidth: true}}
                  />
              </div>
            </Grid>
            <Grid item xs={4} sm={4} md={4} style={{textAlignLast:'right', paddingTop:"20px"}}>
                {/* <Button color="info" onClick = {onSubmit} startIcon={<CancelIcon/>}>초기화</Button> */}
                <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} >SEARCH</Button>
            </Grid>
              
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
      {content}
    </GridContainer>
  );
}

//))
//export default ExpCustomsAPI;