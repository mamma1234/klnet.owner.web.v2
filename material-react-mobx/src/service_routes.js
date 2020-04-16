import FclPage from "views/Pages/TestPage/SamplePage.js";
import TerminalPage from "views/Pages/TestPage/SamplePage.js";
import TrackingPage from 'views/Pages/Tracking/TrackingList.js';
import DemDetPage from 'views/Pages/DemDet/DemDetList.js';
import ScrapSchedule from "views/Pages/TestPage/SamplePage.js";
import DemDetMapPage from 'views/Pages/DemDet/Map/DemDetMap.js';
import SampleData from "views/Pages/TestPage/SamplePage.js";
import SampleData2 from "views/Pages/TestPage/SamplePage2.js";
import ProfilePage from "views/Pages/Member/UserProfile.js";
import SettingPage from "views/Pages/Member/UserServiceSetting.js";
import BoardPage from "views/Pages/Board/BoardPage.js";
import MainUploadBL from "views/Pages/BLUpload/UploadPage"
// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

// @material-ui/icons
import DirectionsBoat from  "@material-ui/icons/DirectionsBoat";
import ScrapIcon from '@material-ui/icons/Description';
import MapIcon from "@material-ui/icons/Map";
import Person from "@material-ui/icons/Person";

var ServiceRoutes = [
  {
    collapse: true,
    name: "Location",
    rtlName: "위치정보",
    icon: DirectionsBoat,
    state: "pageCollapse",
    views: [
      {
        path: "/tracking",
        name: "Tracking Service",
        rtlName: "선박위치정보",
        mini: "TK",
        rtlMini: "TK",
        component: TrackingPage,
        layout: "/svc"
      },
      {
        path: "/demDet",
        name: "DEM/DET/STORAGE",
        rtlName: "보관기한",
        mini: "DD",
        rtlMini: "DD",
        component: DemDetPage,
        layout: "/svc"
      },
    ]
  },
  {
    collapse: true,
    name: "SCHEDULE",
    rtlName: "스케쥴",
    icon: ScrapIcon,
    state: "componentsCollapse",
    views: [
      {
        path: "/fcl",
        name: "FCL Sea Schedule",
        rtlName: "FCL 해상 스케쥴",
        mini: "FS",
        rtlMini: "FC",
        component: FclPage,
        layout: "/svc"
      },
      {
        path: "/terminal",
        name: "Terminal Schedule",
        rtlName: "터미널스케쥴",
        mini: "TS",
        rtlMini: "TS",
        component: TerminalPage,
        layout: "/svc"
      }, 
    ]
  },
  {
    path: "/mapService",
    name: "Dem&Det MAP",
    rtlName: "MAP",
    icon: MapIcon,
    component: DemDetMapPage,
    layout: "/svc"
  },
  {
    path: "/scrap",
    name: "Web Scraping",
    rtlName: "Web Scraping",
    icon: ScrapIcon,
    component: ScrapSchedule,
    layout: "/svc"
  },
  {
    path: "/sample",
    name: "Exp&Imp sample Data",
    rtlName: "Exp&Imp sample Data",
    icon: Person,
    component: SampleData,
    layout: "/svc"
  },
    {
    path: "/test",
    name: "test",
    rtlName: "Exp&Imp sample Data",
    icon: Person,
    component: SampleData2,
    layout: "/svc"
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
    path: "/uploadbl",
    name: "BL Upload",
    rtlName: "User BL Upload",
    icon: Person,
    component: MainUploadBL,
    layout: "/svc"
    },
];
export default ServiceRoutes;
