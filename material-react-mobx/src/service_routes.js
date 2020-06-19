import FclPage from "views/Pages/Schedule/FclScheduleList.js";
import CalPage from "views/Pages/Schedule/TerminalScheduleList.js";
//import TerminalPage from "views/Pages/TestPage/SamplePage.js";
import TrackingPage from 'views/Pages/Tracking/TrackingList.js';
import DemDetPage from 'views/Pages/DemDet/DemDetList.js';

import DemDetMapPage from 'views/Pages/DemDet/Map/DemDetMap.js';

import ProfilePage from "views/Pages/Member/UserProfile.js";
import SettingPage from "views/Pages/Member/UserServiceSetting.js";
import BoardPage from "views/Pages/Board/BoardPage.js";
import MainUploadBL from "views/Pages/BLUpload/UploadPage"
import TestMap from "views/Pages/TestPage/TestMap";
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
import ScrapIcon from '@material-ui/icons/Description';
//import MapIcon from "@material-ui/icons/Map";
//import BackupIcon from "@material-ui/icons/Backup";
import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import EventAvailable from "@material-ui/icons/EventAvailable";
import Schedule from "@material-ui/icons/Schedule";

import ImpCustomsPassInfoPage from "views/Pages/Customs/ImpCustomsPassInfo.js";
import ExpCustomsAPIPage from "views/Pages/Customs/ExpCustomsAPI.js";
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat';


var ServiceRoutes = [
  {
    path: "/uploadbl",
    name: "BL Upload",
    rtlName: "User BL Upload",
    mini: "BU",
    rtlMini: "BU",
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


    ]
  },
  {
    collapse: true,
    name: "DEM/DET/STORAGE",
    rtlName: "보관기한정보",
    icon: EventAvailable,
    state: "demdetCollapse",
    views: [
      {
        path: "/demDet",
        name: "DEM/DET/STORAGE",
        rtlName: "보관기한",
        mini: "DD",
        rtlMini: "DD",
        component: DemDetPage,
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
    icon: ScrapIcon,
    state: "customsCollapse",
    views: [
      {
        path: "/customImp",
        name: "수입화물진행정보",
        rtlName: "PASS",
        mini: "수입",
        rtlMini: "수입",
        component: ImpCustomsPassInfoPage,
        layout: "/svc"
      },
      {
          path: "/customsExp",
          name: "수출이행내역",
          rtlName: "Customs",
          mini: "수출",
          rtlMini: "수출",
          component: ExpCustomsAPIPage,
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
    path: "/flightinfo",
    name: "Ship Flight Info",
    rtlName: "선박 운항 정보",
    icon: DirectionsBoatIcon, 
    component: TestMap,
    layout: "/svc"
  },
];
export default ServiceRoutes;
