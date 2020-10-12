import Buttons from "views/Components/Buttons.js";
//import Calendar from "views/Calendar/Calendar.js";
//import Charts from "views/Charts/Charts.js";
//import Dashboard from "views/Dashboard/Dashboard.js";
/*import ErrorPage from "views/Pages/ErrorPage.js";
import ExtendedForms from "views/Forms/ExtendedForms.js";
import ExtendedTables from "views/Tables/ExtendedTables.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import GoogleMaps from "views/Maps/GoogleMaps.js";
import GridSystem from "views/Components/GridSystem.js";
import Icons from "views/Components/Icons.js";
import LockScreenPage from "views/Pages/LockScreenPage.js";
import LoginPage from "views/Pages/LoginPage.js";
import Notifications from "views/Components/Notifications.js";
import Panels from "views/Components/Panels.js";
import PricingPage from "views/Pages/PricingPage.js";
import RTLSupport from "views/Pages/RTLSupport.js";
import ReactTables from "views/Tables/ReactTables.js";
import RegisterPage from "views/Pages/RegisterPage.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";*/

import ImportPage from 'views/Pages/TestPage/ImportPage.js';
import BoardDataPage from 'views/Pages/TestPage/BoardData.js';
import DemDetOscPage from 'views/Pages/TestPage/DemDetOsc.js';
import ThreadManage from 'views/Pages/TestPage/ThreadManage.js';
import RegularForms from "views/Forms/RegularForms.js";
import SampleData from "views/Pages/TestPage/SamplePage.js";
import SampleData2 from "views/Pages/TestPage/SamplePage2.js";
import SchedulePage from "views/Pages/TestPage/SampleSchedulePage.js";
import ScrapSchedule from "views/Pages/TestPage/SamplePage.js";
import ScrapManage from "views/Pages/TestPage/ScrapManage.js";
import ScrapResult from "views/Pages/TestPage/ScrapResult.js";
import ScrapPort from "views/Pages/TestPage/ScrapPort.js";
import SchPortCode from "views/Pages/TestPage/SchPortCodeList";
import ExcelSchLog from "views/Pages/TestPage/ExcelSchLogPage.js";
import ErrorLogPage from 'views/Pages/TestPage/ErrorLogList.js';
import UserList from 'views/Pages/TestPage/UserList.js';
import UserRequest from 'views/Pages/TestPage/UserRequest.js';
import UserUiSetting from 'views/Pages/TestPage/UserUiSettingList.js';
import TSCode from "views/Pages/TestPage/TSCodeList";
import PicCode from "views/Pages/TestPage/PicCodeList";

import TerminalInfo from 'views/Pages/TestPage/TerminalInfo.js';
import LineCode from 'views/Pages/TestPage/LineCode.js';
import VslType from 'views/Pages/TestPage/VesselType.js';
import VslInfo from 'views/Pages/TestPage/VesselInfo.js';
// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
//import DashboardIcon from "@material-ui/icons/Dashboard";
//import DateRange from "@material-ui/icons/DateRange";
//import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
//import Place from "@material-ui/icons/Place";
//import Timeline from "@material-ui/icons/Timeline";
//import WidgetsIcon from "@material-ui/icons/Widgets";
import Person from "@material-ui/icons/Person";


import LinkedCameraOutlinedIcon from '@material-ui/icons/LinkedCameraOutlined';
import DvrOutlined from '@material-ui/icons/DvrOutlined';
import CodeOutlined from '@material-ui/icons/CodeOutlined';
import BusinessCenterOutlinedIcon from '@material-ui/icons/BusinessCenterOutlined';
import PeopleOutlined from '@material-ui/icons/PeopleOutlined';

import ScrapIcon from '@material-ui/icons/Description';
import TerminalIcon from "@material-ui/icons/LocalShippingOutlined";
var dashRoutes = [
  {
    collapse: true,
    name: "EXCEL SCH",
    rtlName: "EXCEL SCH",
    icon: ScrapIcon,
    state: "ExcelCollapse",
    // layout: "/admin"
    views: [
       {
    			path: "/importdata",
    			name: "EXCEL DATA IMPORT",
    			rtlName: "게시판",
    			mini: "ID",
    			rtlMini: "ID",
    			component: ImportPage,
    			layout: "/admin"
    		  },
      {
      path: "/schedule",
      name: "EXCEL SCH ROW DATA",
      rtlName: "EXCEL SCH ROW DATA",
      mini: "ES",
      rtlMini: "ES",
      component: SampleData,
      layout: "/admin"
      },
      {
        path: "/portcode",
        name: "EXCEL SCH PORT CODE",
        rtlName: "항구코드",
        mini: "PT",
        rtlMini: "PT",
        component: SchPortCode,
        layout: "/admin"
      },
      {
          path: "/tscode",
          name: "T/S CODE",
          rtlName: "T/S코드",
          mini: "TS",
          rtlMini: "TS",
          component: TSCode,
          layout: "/admin"
        },
        {
            path: "/piccode",
            name: "PIC CODE",
            rtlName: "PIC코드",
            mini: "PIC",
            rtlMini: "PIC",
            component: PicCode,
            layout: "/admin"
          },
     
    ]
  },
  {
    collapse: true,
    name: "WEB SCRAPING",
    rtlName: "Web Scraping",
    icon: LinkedCameraOutlinedIcon,
    state: "ScrapingCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/lineManage",
        name: "LINE SCRAP MANAGE",
        rtlName: "선사별 스크랩 설정",
        mini: "LM",
        rtlMini: "LM",
        component: Buttons,
        component: ScrapManage,
        layout: "/admin"
      },
      {
        path: "/lineScrap",
        name: "LINE SCRAP",
        rtlName: "선사별 스크랩 조회",
        mini: "LS",
        rtlMini: "LS",
        component: ScrapResult,
        layout: "/admin"
      },
      {
        path: "/linePort",
        name: "LINE PORT",
        rtlName: "선사별 스크랩 PORT",
        mini: "LP",
        rtlMini: "LP",
        component: ScrapPort,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "MONITORING",
    rtlName: "Monitoring",
    icon:DvrOutlined,
    state: "MonitoringCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/excelSchLog",
        name: "EXCEL SCH LOG",
        rtlName: "Excel Sch Log",
        mini: "ES",
        rtlMini: "ES",
        component: ExcelSchLog,
        layout: "/admin"
      },
      {
        path: "/errorlog",
        name: "ERROR LOG PAGE",
        rtlName: "Error log page",
        component:ErrorLogPage,
        mini: "EL",
        rtlMini: "EL",
        layout: "/admin"
      },
      {
        path: "/own_thread_manage",
        name: "OWN THREAD MANAGE",
        rtlName: "ThreadManage",
        component:ThreadManage,
        mini: "OT",
        rtlMini: "OT",
        layout: "/admin"
      },


      
    ]
  },
  {
    collapse: true,
    name: "CODE",
    rtlName: "Code",
    icon:CodeOutlined,
    // layout: "/admin"
    state: "CodeCollapse",
    views: [
      {
        path: "/codeline",
        name: "LINE CODE",
        rtlName: "line Code",
        mini: "LC",
        rtlMini: "LC",
        component: LineCode,
        layout: "/admin"
      },
      {
        path: "/terminal",
        name: "Terminal Info",
        rtlName: "Terminal info",
        mini: "TI",
        rtlMini: "TI",
        component: TerminalInfo,
        layout: "/admin"
      },
      {
        path: "/vslinfo",
        name: "VESSEL CODE",
        rtlName: "Vessel Code",
        mini: "VC",
        rtlMini: "VC",
        component: VslInfo,
        layout: "/admin"
      },
      {
        path: "/vsltype",
        name: "VESSEL TYPE CODE",
        rtlName: "Vessel Type Code",
        mini: "VT",
        rtlMini: "VT",
        component: VslType,
        layout: "/admin"
      },
    ]
  },  
  {
    collapse: true,
    name: "BUSINESS",
    rtlName: "Business",
    icon:BusinessCenterOutlinedIcon,
    state: "BusinessCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/blList",
        name: "USER BL DATA",
        rtlName: "UserBlData",
        mini: "BL",
        rtlMini: "BL",
        component: UserRequest,
        layout: "/admin"
      },
      {
        path: "/board",
        name: "BOARD DATA",
        rtlName: "Board Data",
        mini: "BD",
        rtlMini: "BD",
        component: BoardDataPage,
        layout: "/admin"
      },
      {
        path: "/demdetosc",
        name: "DEM&DET&OSC DATA",
        rtlName: "DEM&DET&OSC Data",
        mini: "DD",
        rtlMini: "DD",
        component: DemDetOscPage,
        layout: "/admin"
      },
        {
          path: "/sample",
          name: "INLAND TRACKING",
          rtlName: "Inland Tracking",
          mini: "IT",
          rtlMini: "IT",
          component: SampleData,
          layout: "/admin"
        },

    ]
  },  
  {
    collapse: true,
    name: "User",
    rtlName: "User",
    icon:PeopleOutlined,
    state: "UserCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/userlist",
        name: "USER LIST DATA",
        rtlName: "User List Data",
        mini: "UL",
        rtlMini: "UL",
        component: UserList,
        layout: "/admin"
      },
      {
        path: "/useruisetting",
        name: "USER UI SETTING",
        rtlName: "User Ui Setting",
        mini: "US",
        rtlMini: "US",
        component: UserUiSetting,
        layout: "/admin"
      },
    ]
  },
  {/*{
    collapse: true,
    name: "MANAGE",
    rtlName: "회원관리",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/manage",
        name: "MANAGE PAGE",
        rtlName: "회원관리",
        mini: "MB",
        rtlMini: "MB",
        component: RegularForms,
        layout: "/admin"
      },
      
    ]
  },  */}
];
export default dashRoutes;
