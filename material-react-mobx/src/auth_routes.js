import RegisterPage from "views/Pages/Member/RegisterPage.js";

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
  }

];
export default ServiceRoutes;
