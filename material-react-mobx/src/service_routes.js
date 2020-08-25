import FclPage from "views/Pages/Schedule/FclScheduleList.js";
import CalPage from "views/Pages/Schedule/TerminalScheduleList.js";
//import TerminalPage from "views/Pages/TestPage/SamplePage.js";
import TrackingPage from 'views/Pages/Tracking/TrackingList.js';
import ImportDemDetPage from 'views/Pages/DemDet/Import/importDemDetList.js';
import ExportDemDetPage from 'views/Pages/DemDet/Export/exportDemDetList.js';

import DemDetMapPage from 'views/Pages/DemDet/Map/DemDetMap.js';
import AccountBalance from "@material-ui/icons/AccountBalance";
import ProfilePage from "views/Pages/Member/UserProfile.js";
import SettingPage from "views/Pages/Member/UserServiceSetting.js";
import BoardPage from "views/Pages/Board/BoardPage.js";
import MainUploadBL from "views/Pages/BLUpload/UploadPage"
import TestMap from "views/Pages/TestPage/TestMap";
import ContainerTracking from 'views/Pages/Tracking/TrackingMap/Map.js'
//import Info from "@material-ui/icons/Info";

import DashPage from "views/Pages/Dashboard/Dashboard.js";
// @material-ui/icons
//import Apps from "@material-ui/icons/Apps";
//import DashboardIcon from "@material-ui/icons/Dashboard";
//import DateRange from "@material-ui/icons/DateRange";
//import GridOn from "@material-ui/icons/GridOn";
//import Image from "@material-ui/icons/Image";
//import Place from "@material-ui/icons/Place";
//import Timeline from "@material-ui/icons/Timeline";
//import WidgetsIcon from "@material-ui/icons/Widgets";

// @material-ui/icons
//import DirectionsBoat from  "@material-ui/icons/DirectionsBoat";
//import ScrapIcon from '@material-ui/icons/Description';
//import MapIcon from "@material-ui/icons/Map";
//import BackupIcon from "@material-ui/icons/Backup";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import EventAvailable from "@material-ui/icons/EventAvailable";
import Schedule from "@material-ui/icons/Schedule";
import CloudUploadOutlined from "@material-ui/icons/CloudUploadOutlined";

import Apipage from 'views/Pages/Customs/ScrollTapPage';

import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';
import InsertChartOutlinedOutlinedIcon  from '@material-ui/icons/InsertChartOutlinedOutlined';
import TestPage from 'views/Pages/TestPage/ExcelUpload';



var ServiceRoutes = [
  {
	        path: "/dashbord",
	        name: "DASHBORD",
	        rtlName: "TOTAL CARGO INFO",
	        icon: InsertChartOutlinedOutlinedIcon,
	        component: DashPage,
	        layout: "/svc"
  },
  {
    path: "/uploadbl",
    name: "BL Upload",
    rtlName: "User BL Upload",
    icon: CloudUploadOutlined,
    component: MainUploadBL,
    layout: "/svc"
  },
  {
    collapse: true,
    name: "LOCATION",
    rtlName: "위치정보",
    icon: LocationOn,
    state: "pageCollapse",
    views: [
      {
        path: "/tracking",
        name: "TRACKING SERVICE",
        rtlName: "선박위치정보",
        mini: "TK",
        rtlMini: "TK",
        component: TrackingPage,
        layout: "/svc"
      },
      {
        path: "/flightinfo",
        name: "SHIP FLIGHT INFO",
        mini: "SF",
        rtlMini: "SF",
        icon: DirectionsBoatIcon, 
        component: TestMap,
        layout: "/svc"
      },
      {
        path: "/cntrmap",
        name: "View Container Movement",
        mini: "CM",
        rtlMini: "CM",
        icon: DirectionsBoatIcon, 
        component: ContainerTracking,
        layout: "/svc"
      },
    ]
  },
  {
    collapse: true,
    name: "DEM/DET/OSC",
    rtlName: "보관기한정보",
    icon: EventAvailable,
    state: "demdetCollapse",
    views: [
      {
        path: "/demDet/Import",
        name: "IMPORT DEM/DET/OSC",
        rtlName: "수입DEM/DET",
        mini: "ID",
        rtlMini: "ID",
        component: ImportDemDetPage,
        layout: "/svc"
      },
      {
        path: "/demDet/Export",
        name: "EXPORT DEM/DET/OSC",
        rtlName: "수출DEM/DET",
        mini: "ED",
        rtlMini: "ED",
        component: ExportDemDetPage,
        layout: "/svc"
      },
      {
        path: "/mapService",
        name: "DEM&DET SUMMARY",
        rtlName: "MAP",
        mini: "MP",
        rtlMini: "MP",
        component: DemDetMapPage,
        layout: "/svc"
      },

    ]
  },  
  {
    collapse: true,
    name: "SCHEDULE",
    rtlName: "스케쥴",
    icon: Schedule,
    state: "componentsCollapse",
    views: [
      {
        path: "/fcl",
        name: "FCL SEA SCHEDULE",
        rtlName: "FCL 해상 스케쥴",
        mini: "FS",
        rtlMini: "FS",
        component: FclPage,
        layout: "/svc"
      },
      {
          path: "/cal",
          name: "TERMINAL SCHEDULE",
          rtlName: "터미널 스케쥴",
          mini: "TS",
          rtlMini: "TS",
          component: CalPage,
          layout: "/svc"
        },
    ]
  },
  {
    collapse: true,
    name: "CUSTOMS",
    rtlName: "Customs",
    icon: AccountBalance,
    state: "customsCollapse",
    views: [
      {
          path: "/unipassapi",
          name: "UNIPASS API SERVICE",
          rtlName: "UAS",
          mini: 'API',
          component: Apipage,
          layout: "/svc"   
        }

      
      
    ]
  },
  {
	path: "/profile",
	name: "Profile Page",
	rtlName: "사용자정보",
    icon: Person,
	component: ProfilePage,
	layout: "/svc"
  },
  {
	path: "/setting",
	name: "Setting Page",
	rtlName: "설정",
    icon: Person,
	component: SettingPage,
	layout: "/svc"
  },
  {
	path: "/board",
	name: "Board Page",
	rtlName: "게시판",
	   icon: Person,
	component: BoardPage,
	layout: "/svc"
  },  
  {
		path: "/testpage",
		name: "testpage",
		rtlName: "게시판",
		   icon: Person,
		component: TestPage,
		layout: "/svc"
	  },    

];
export default ServiceRoutes;
