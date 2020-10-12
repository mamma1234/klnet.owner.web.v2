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
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CustomInput from "components/CustomInput/CustomInput.js";
//page
import ExpImpAffcSbmtInfo from 'views/Pages/Customs/ExpImpAffcSbmtInfo.js';
import PostNoPrCstmSgnQry from 'views/Pages/Customs/PostNoPrCstmSgnQry.js';
import AlspEntsCdQry from 'views/Pages/Customs/AlspEntsCdQry.js';
import RetrieveTrrt from 'views/Pages/Customs/RetrieveTrrt.js';
import RetrieveLcaBrkd from 'views/Pages/Customs/RetrieveLcaBrkd.js';
import StatsSgnBrkd from 'views/Pages/Customs/StatsSgnBrkd.js';
import Ecmqry from 'views/Pages/Customs/EcmQry.js'
import PrcsStus from 'views/Pages/Customs/ApfmPrcsStusQry.js';
import FlcoBrkd from 'views/Pages/Customs/FlcoBrkd';
import BtcoVhcl from 'views/Pages/Customs/BtcoVhcl';
import ShipCoLst from 'views/Pages/Customs/ShipCoLst';
import ShipCoBrkd from 'views/Pages/Customs/ShipCoBrkd';
import CcctLworCd from 'views/Pages/Customs/CcctLworCd';
import TrifFxrtInfo from 'views/Pages/Customs/TrifFxrtInfo';
import SimlFxamtAplyNaplyEntsQry from 'views/Pages/Customs/SimlFxamtAplyNaplyEntsQry';
import SimlXamrttXtrnUser from 'views/Pages/Customs/SimlXamrttXtrnUserQry'; 
import ImpCustomsPassInfoPage from "views/Pages/Customs/ImpCustomsPassInfo.js";
import ExpCustomsAPIPage from "views/Pages/Customs/ExpCustomsAPI.js";
import FlcoLst from 'views/Pages/Customs/FlcoLst.js';
import FrwrLst from 'views/Pages/Customs/FrwrLst.js';
import FrwrBrkd from 'views/Pages/Customs/FrwrBrkd.js';
import OvrsSplrSgn from 'views/Pages/Customs/OvrsSplrSgn.js';
import IoprRprtLst from 'views/Pages/Customs/IoprRprtLst.js';
import EtprRprtLst from 'views/Pages/Customs/EtprRprtLst.js';
import ShedInfo from 'views/Pages/Customs/ShedInfo.js';
import CntrQry from 'views/Pages/Customs/CntrQry.js';
import PersEcms from 'views/Pages/Customs/PersEcms.js';
import DclrCrfnVrfc from 'views/Pages/Customs/DclrCrfnVrfc.js';
import ExpFfmnPridShrtTrgtPrlst from 'views/Pages/Customs/ExpFfmnPridShrtTrgtPrlst.js';
import XtrnUserReqApreBrkd from 'views/Pages/Customs/XtrnUserReqApreBrkd.js';
import SearchHsSgn from 'views/Pages/Customs/SearchHsSgn.js';
import CustomTabs from "components/CustomTabs/CustomScrollTabs.js";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import queryString from 'query-string';
import {userService} from 'views/Pages/Login/Service/Service.js';
export default function ScrollTapPages(props) {
	
  const query = queryString.parse(window.location.search);
	
  const [severity, setSeverity] = useState("");
  const {store} =props;
  //const classes = useStyless();
  const [cntrList, setCntrList] = useState([]);
  const [cntrCnt, setCntrCnt] = useState('0');
  const [gubunCode, setGubunCode] = useState("A01");
  const [gubun, setGubun] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);

  const [tabvalue,setTabvalue] = React.useState(query.tabvalue?parseInt(query.tabvalue):0);
  
  const [ecm, setEcm] = useState("");

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

    setGubun(selectText);
    if(selectText === "내국세율 부호") {
      setGubunCode("A01");
    }else if(selectText ==="관세 감면 부호") {
      setGubunCode("A02");
    }else if(selectText ==="관세 분납 부호") {
      setGubunCode("A03");
    }else if(selectText ==="부가세감면율 부호") {
      setGubunCode("A04");
    }
  }
  const onSubmit = () => {

	 if(store.token) {
		 
	    axios.post("/com/uniPassApiSimlFxamtQry",{param:ecm}, {headers:{'Authorization':'Bearer '+store.token}}).then(
	      res => {
	        if(res.data.message == "SUCCESS") {
	          setGridData(res.data.infoData.data);
	        }else if (res.data.message == "NO_DATA") {
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
  const [value, setValue] = React.useState(0);
  const handleChange = (event, value) => {
    setValue(value);
  };
  return (
    <div>

	        <CustomTabs headerColor="info"
				  //handleTapsClick={handleTapsClick}
	        	    tabvalue={tabvalue}
				  	tabs={[
						
					  	{
						tabName: "수입화물통관진행정보"
						//,tabIcon: (AssignmentOutlinedIcon)
						,tabContent: (<ImpCustomsPassInfoPage {...props}/>)
					   },
					   {
						tabName: "수출신고번호별수출이행내역"
						//,tabIcon: (TodayOutlinedIcon)
						,tabContent: (<ExpCustomsAPIPage {...props}/>)
				       },
				       {
						tabName: "장치장정보"
							//,tabIcon: (AssignmentOutlinedIcon)
						,tabContent: (<ShedInfo {...props}/>)
						},
						{
							tabName: "통계부호내역"
							//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<StatsSgnBrkd {...props}/>)
					     },
					     {
							tabName: "통관고유부호"
								//,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (<Ecmqry  {...props}/>)
						 },
						 {
							tabName: "통관단일창구 처리이력"
							//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<PrcsStus  {...props}/>)
						 },
						 {
							tabName: "항공사내역"
							//,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (<FlcoBrkd  {...props}/>)
						 },
						 {
									tabName: "보세운송차량등록내역"
									//,tabIcon: (TodayOutlinedIcon)
									,tabContent: (<BtcoVhcl  {...props}/>)
						 },
						 {
							tabName: "선박회사정보"
							//,tabIcon: (AssignmentOutlinedIcon)
							,tabContent: (<ShipCoLst  {...props}/>)
						 },
						 {
							tabName: "선박회사상세정보"
							//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<ShipCoBrkd  {...props}/>)
						 },
						 {
								tabName: "세관장확인대장 법령코드"
								//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<CcctLworCd  {...props}/>)
						 },
						 {
								tabName: "관세환율정보"
								//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<TrifFxrtInfo  {...props}/>)
						  },
						  {
							tabName: "항공사목록"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<FlcoLst  {...props}/>)
						   },
						  {
								tabName: "화물운송주선업자목록"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<FrwrLst  {...props}/>)
						   },
						   {
								tabName: "화물운송주선업자내역"
											//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<FrwrBrkd   {...props}/>)
						   },
						   {
								tabName: "해외공급자부호"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<OvrsSplrSgn   {...props}/>)
						   },
						   {
								tabName: "입출항보고내역"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<IoprRprtLst   {...props}/>)
						   },
						   {
							   tabName: "입출항내역"
								//,tabIcon: (TodayOutlinedIcon)
								   ,tabContent: (<EtprRprtLst   {...props}/>)
						   },
						   {
								tabName: "간이정액 적용/비적용 업체정보"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<SimlFxamtAplyNaplyEntsQry   {...props}/>)
						   },
						   {
								tabName: "간이정액 환급율표"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<SimlXamrttXtrnUser   {...props}/>)
						   },
						   {
								tabName: "컨테이너내역"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<CntrQry   {...props}/>)
						   },
						   {
							tabName: "수입신고 개인통관고유부호 검증"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<PersEcms   {...props}/>)
							},
							{
							tabName: "수입신고필증검증"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<DclrCrfnVrfc   {...props}/>)
							},   
							{
								tabName: "수출이행기간 단축대상 품목"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<ExpFfmnPridShrtTrgtPrlst   {...props}/>)
							},   
							{
							tabName: "수출입 요건승인 내역조회"
									//,tabIcon: (TodayOutlinedIcon)
							,tabContent: (<XtrnUserReqApreBrkd   {...props}/>)
							},
							{
								tabName: "HS부호조회"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<SearchHsSgn   {...props}/>)
							},	
							{
								tabName: "관세사목록"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<RetrieveLcaBrkd   {...props}/>)
							},
							{
								tabName: "관세율조회"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<RetrieveTrrt   {...props}/>)
							},
							{
								tabName: "동축산물 업체코드 조회"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<AlspEntsCdQry   {...props}/>)
							},	
							{
								tabName: "전자첨부서류 제출완료유무"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<ExpImpAffcSbmtInfo   {...props}/>)
							},
							{
								tabName: "우편번호별 관할세관 정보조회"
										//,tabIcon: (TodayOutlinedIcon)
								,tabContent: (<PostNoPrCstmSgnQry   {...props}/>)
							},
				 ]}>   
			</CustomTabs>
  </div>
  );
}
