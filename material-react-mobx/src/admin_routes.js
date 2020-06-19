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
import TerminalInfo from 'views/Pages/TestPage/TerminalInfo.js';
import LineCode from 'views/Pages/TestPage/LineCode.js';
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
import ScrapIcon from '@material-ui/icons/Description';
import TerminalIcon from "@material-ui/icons/LocalShippingOutlined";
var dashRoutes = [
  {
    collapse: true,
    name: "Excel Sch",
    rtlName: "Excel Sch",
    icon: ScrapIcon,
    state: "ExcelCollapse",
    // layout: "/admin"
    views: [
      {
      path: "/schedule",
      name: "Excel Sch Row Data",
      rtlName: "Excel Sch Row Data",
      icon: TerminalIcon,
      component: SampleData,
      layout: "/admin"
      },
      {
        path: "/portcode",
        name: "Excel Sch Port Code",
        rtlName: "항구코드",
        mini: "PT",
        rtlMini: "PT",
        component: SchPortCode,
        layout: "/admin"
      },
     
    ]
  },
  {
    collapse: true,
    name: "Web Scraping",
    rtlName: "Web Scraping",
    icon: ScrapIcon,
    state: "ScrapingCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/lineManage",
        name: "LINE SCRAP MANAGE",
        rtlName: "선사별 스크랩 설정",
        mini: "PT",
        rtlMini: "PT",
        component: Buttons,
        component: ScrapManage,
        layout: "/admin"
      },
      {
        path: "/lineScrap",
        name: "LINE SCRAP",
        rtlName: "선사별 스크랩 조회",
        mini: "PT",
        rtlMini: "PT",
        component: ScrapResult,
        layout: "/admin"
      },
      {
        path: "/linePort",
        name: "LINE PORT",
        rtlName: "선사별 스크랩 PORT",
        mini: "PT",
        rtlMini: "PT",
        component: ScrapPort,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "Monitoring",
    rtlName: "Monitoring",
    mini:'Mo',
    rtlMini:'Mo',
    state: "MonitoringCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/excelSchLog",
        name: "Excel Sch Log",
        rtlName: "Excel Sch Log",
        icon: TerminalIcon,
        component: ExcelSchLog,
        layout: "/admin"
      },
      {
        path: "/errorlog",
        name: "ERROR LOG PAGE",
        rtlName: "Error log page",
        component:ErrorLogPage,
        icon: TerminalIcon,
        layout: "/admin"
      },
      {
        path: "/own_thread_manage",
        name: "ownthreadmanage",
        rtlName: "ThreadManage",
        //component:
        icon: TerminalIcon,
        layout: "/admin"
      },


      
    ]
  },
  {
    collapse: true,
    name: "Code",
    rtlName: "Code",
    mini:'Co',
    rtlMini:'Co',
    // layout: "/admin"
    state: "CodeCollapse",
    views: [
      {
        path: "/cuship",
        name: "Line Code",
        rtlName: "LINE CODE",
        icon: TerminalIcon,
        component: LineCode,
        layout: "/admin"
      },
      {
        path: "/terminalinfo",
        name: "Terminal Code",
        rtlName: "Terminal code",
        icon: TerminalIcon,
        component: TerminalInfo,
        layout: "/admin"
      },
      {
        path: "/codeport",
        name: "Port code",
        rtlName: "Port Code",
        icon: TerminalIcon,
        //component: SampleData,
        layout: "/admin"
      },
      {
        path: "/vslinfo",
        name: "Vessel Code",
        rtlName: "Vessel Code",
        icon: TerminalIcon,
        //component: SampleData,
        layout: "/admin"
      },
      {
        path: "/vsltype",
        name: "Vessel Type Code",
        rtlName: "Vessel Type Code",
        icon: TerminalIcon,
        //component: SampleData,
        layout: "/admin"
      },
    ]
  },  
  {
    collapse: true,
    name: "Business",
    rtlName: "Business",
    mini:'Bs',
    rtlMini:'Bs',
    state: "BusinessCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/blList",
        name: "User BL Data",
        rtlName: "UserBlData",
        icon: TerminalIcon,
        component: UserRequest,
        layout: "/admin"
      },
      {
        path: "/board",
        name: "Board Data",
        rtlName: "Board Data",
        icon: TerminalIcon,
        //component: SampleData,
        layout: "/admin"
      },
      {
        path: "/demdetosc",
        name: "DEM&DET&OSC Data",
        rtlName: "DEM&DET&OSC Data",
        icon: TerminalIcon,
        component: SampleData,
        layout: "/admin"
      },
        {
          path: "/sample",
          name: "Inland Tracking",
          rtlName: "Inland Tracking",
          icon: TerminalIcon,
          component: SampleData,
          layout: "/admin"
        },

    ]
  },  
  {
    collapse: true,
    name: "User",
    rtlName: "User",
    mini:'Us',
    rtlMini:'Us',
    state: "UserCollapse",
    // layout: "/admin"
    views: [
      {
        path: "/userlist",
        name: "User List Data",
        rtlName: "User List Data",
        icon: TerminalIcon,
        component: UserList,
        layout: "/admin"
      },
      {
        path: "/useruisetting",
        name: "User Ui Setting",
        rtlName: "User Ui Setting",
        icon: TerminalIcon,
        //component: SampleData,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "MANAGE",
    rtlName: "회원관리",
    icon: "content_paste",
    state: "formsCollapse",
    views: [
      {
        path: "/manage",
        name: "manage Page",
        rtlName: "회원관리",
        mini: "MB",
        rtlMini: "MB",
        component: RegularForms,
        layout: "/admin"
      },
      
    ]
  },  
];
export default dashRoutes;
