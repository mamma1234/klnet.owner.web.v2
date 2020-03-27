import LoginPage from "views/Pages/Login/LoginPage.js";
import RegisterPage from "views/Pages/Member/RegisterPage.js";

// @material-ui/icons
import Person from "@material-ui/icons/Person";

var ServiceRoutes = [
  {
    path: "/login",
    name: "Login Page",
    rtlName: "로그인",
	icon: Person,
    component: LoginPage,
    layout: "/auth"
  },
  {
	path: "/register",
	name: "Register Page",
	rtlName: "회원가입",
    icon: Person,
	component: RegisterPage,
	layout: "/auth"
  },
];
export default ServiceRoutes;
