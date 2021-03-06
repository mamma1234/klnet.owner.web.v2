import React from "react";
import cx from "classnames";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import AdminNavbar from "components/Navbars/AdminNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/AdminSidebar.js";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Pages/Login/LoginPage.js';
import routes from "admin_routes.js";
import { observer, inject } from 'mobx-react'; // 6.x
import {userService} from 'views/Pages/Login/Service/Service.js';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";

var ps;

const useStyles = makeStyles(styles);

export default function AdminLayout(props) {
//const Dashboard = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 

  const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true);
  const [image, setImage] = React.useState(require("assets/img/sidebar-4.jpg"));
  const [color, setColor] = React.useState("blue");
  const [bgColor, setBgColor] = React.useState("black");
  // const [hasImage, setHasImage] = React.useState(true);
  const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  const [logo, setLogo] = React.useState(require("assets/img/pp_logo.gif"));
  const [isAuthenticated,setIsAuthenticated] =React.useState(false);
  const [open,setOpen] = React.useState(false);
  const [userData,setUserData] =React.useState([]);
  //const store =userStore;
  const token =  userService.GetItem()?userService.GetItem().token:null;
  //console.log("adminlayout token",token);
   
  // styles
  const classes = useStyles();
  const mainPanelClasses =
    classes.mainPanel +
    " " +
    cx({
      [classes.mainPanelSidebarMini]: miniActive,
      [classes.mainPanelWithPerfectScrollbar]:
        navigator.platform.indexOf("Win") > -1
    });
  // ref for main panel div
  const mainPanel = React.createRef();
  // effect instead of componentDidMount, componentDidUpdate and componentWillUnmount
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);

    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  });
  // functions for changeing the states from components
  const handleImageClick = image => {
    setImage(image);
  };
  const handleColorClick = color => {
    setColor(color);
  };
  const handleBgColorClick = bgColor => {
    switch (bgColor) {
      case "white":
        setLogo(require("assets/img/logo.svg"));
        break;
      default:
        setLogo(require("assets/img/logo-white.svg"));
        break;
    }
    setBgColor(bgColor);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const getRoute = () => {
    return window.location.pathname !== "/admin/full-screen-maps";
  };
  const getActiveRoute = routes => {
    let activeRoute = "Default Brand Text";
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].collapse) {
        let collapseActiveRoute = getActiveRoute(routes[i].views);
        if (collapseActiveRoute !== activeRoute) {
          return collapseActiveRoute;
        }
      } else {
        if (
          window.location.href.indexOf(routes[i].layout + routes[i].path) !== -1
        ) {
          return routes[i].name;
        }
      }
    }
    return activeRoute;
  };
  const onOpenHandle = () => {
	  
	  setOpen(true);
	  setIsAuthenticated(false);
  }
  
  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.collapse) {
        return getRoutes(prop.views);
      }
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            //component={prop.component}
          	render={() => <prop.component openLogin={onOpenHandle} loginClose={event=>handleLoginClose(event)} token={token}/> }
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  const sidebarMinimize = () => {
    setMiniActive(!miniActive);
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  
  React.useEffect(() => {

	    if (token) {

	      axios.get("/auth/user",{headers:{'Authorization':'Bearer '+token}})
	        //.then(res => console.log("return:",res.data))
	        .then(res => 
	          {if(res.data) {

	            //console.log("res.data.user", res.data.user);
	            //userStore.setUser(res.data.user);
	            //userStore.setToken(res.data.token);

	            setIsAuthenticated(true);
	            setUserData(res.data.user);
	            if(res.data.user.usertype!="A") {
	            	alert("페이지 접근할 수 없습니다.");
	    	    	props.history.push('/landing');
	            }
	          } else {
	            setIsAuthenticated(false);
	            setUserData([]);
	          }}
	        )
	        .catch(err => {
	        //setIsAuthenticated(false);
	        onOpenHandle();
	      });
	    }  else {
	    	onOpenHandle();
	    }

	  }, []);
  
  const handleLoginClose=(user) => {
	  setOpen(false);
	  if(user) {
		  console.log(">>user:",user);
		  setIsAuthenticated(true);
		  setUserData(user);
		  if(user.type !="A") {
			  alert("페이지 접근할 수 없습니다.");
			  props.history.push('/landing');
		  }
		  
	  } else {
		  setIsAuthenticated(false);
		  setUserData([]); 
	  }
  }

  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={routes}
      	logoText={"Plism plus"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
      	isAuthenticated={isAuthenticated}
      	onLoginPageOpen={()=>setOpen(true)}
        open={mobileOpen}
        color={color}
        bgColor={bgColor}
        miniActive={miniActive}
        {...rest}
      />
      <div className={mainPanelClasses} ref={mainPanel}>
        <AdminNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          isAuthenticated={isAuthenticated}
          onLoginPageOpen={()=>setOpen(true)}
          userData ={userData}
          {...rest}
        />
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/admin" to="/admin/userlist" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/admin" to="/admin/userlist" />
            </Switch>
          </div>
        )}
        {getRoute() ? <Footer fluid store={token}/> : null}
       {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          handleBgColorClick={handleBgColorClick}
          color={color}
          bgColor={bgColor}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
        />
*/ }     </div>
        <Dialog
      	open={open}
        onClose={()=>setOpen(false)}
      >
       <DialogContent style={{maxWidth:'400px',minWidth:'400px'}}><LoginPage onClose={event=>handleLoginClose(event)}/></DialogContent>   
      </Dialog>
    </div>
  );
}
//))
//export default Dashboard;
