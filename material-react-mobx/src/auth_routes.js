import RegisterPage from "views/Pages/Member/RegisterPage.js";
import FindInfoPage from "views/Pages/Member/FindInfoPage.js";
// @material-ui/icons
import Person from "@material-ui/icons/Person";

var ServiceRoutes = [

  {
	path: "/register",
	name: "Plism Plus+",
	rtlName: "회원가입",
    icon: Person,
	component: RegisterPage,
	layout: "/authpage"
  },
  {
		path: "/findinfo",
		name: "Plism Plus+",
		rtlName: "정보찾기",
	    icon: Person,
		component: FindInfoPage,
		layout: "/authpage"
	  }
];
export default ServiceRoutes;
