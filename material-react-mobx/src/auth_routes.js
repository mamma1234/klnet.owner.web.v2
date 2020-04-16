import LoginPage from "views/Pages/Login/LoginPage.js";
import RegisterPage from "views/Pages/Member/RegisterPage.js";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

var ServiceRoutes = [
  {
    path: "/login",
    name: "",
    rtlName: "로그인",
	icon: Person,
    component: LoginPage,
    layout: "/authpage"
  },
  {
	path: "/sign",
	name: "Register Page",
	rtlName: "회원가입",
    icon: Person,
	component: RegisterPage,
	layout: "/authpage"
  },

];
export default ServiceRoutes;
