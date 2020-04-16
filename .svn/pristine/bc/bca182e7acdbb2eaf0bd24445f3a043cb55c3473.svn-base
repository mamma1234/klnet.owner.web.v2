import Buttons from "views/Components/Buttons.js";
import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import ErrorPage from "views/Pages/ErrorPage.js";
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
import RegularForms from "views/Forms/RegularForms.js";
import RegularTables from "views/Tables/RegularTables.js";
import SweetAlert from "views/Components/SweetAlert.js";
import TimelinePage from "views/Pages/Timeline.js";
import Typography from "views/Components/Typography.js";
import UserProfile from "views/Pages/UserProfile.js";
import ValidationForms from "views/Forms/ValidationForms.js";
import VectorMap from "views/Maps/VectorMap.js";
import Widgets from "views/Widgets/Widgets.js";
import Wizard from "views/Forms/Wizard.js";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import GridOn from "@material-ui/icons/GridOn";
import Image from "@material-ui/icons/Image";
import Place from "@material-ui/icons/Place";
import Timeline from "@material-ui/icons/Timeline";
import WidgetsIcon from "@material-ui/icons/Widgets";

var dashRoutes = [
  {
    collapse: true,
    name: "Schedule",
    rtlName: "Schedule",
    icon: Image,
    state: "pageCollapse",
    views: [
      {
        path: "/schedule",
        name: "Schedule Page",
        rtlName: "스케줄",
        mini: "SH",
        rtlMini: "SH",
        component: PricingPage,
        layout: "/admin"
      },
    ]
  },
  {
    collapse: true,
    name: "Code",
    rtlName: "코드",
    icon: Apps,
    state: "componentsCollapse",
    views: [
      {
        path: "/portcode",
        name: "PORT CODE PAGE",
        rtlName: "항구코드",
        mini: "PT",
        rtlMini: "PT",
        component: Buttons,
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
