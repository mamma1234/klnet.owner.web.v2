import React from "react";
import cx from "classnames";
// import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import ServiceNavbar from "components/Navbars/ServiceNavbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/ServiceSidebar.js";
//import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Pages/Login/LoginPage.js';
import routes from "service_routes.js";
import axios from 'axios';
import styles from "assets/jss/material-dashboard-pro-react/layouts/adminStyle.js";
import {userService} from 'views/Pages/Login/Service/Service.js';
//import Cookies from "js-cookie";
import { observer, inject } from 'mobx-react'; // 6.x
// import Button from "components/CustomButtons/Button.js";
// import KeboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
// import Fab from '@material-ui/core/Fab';
// import Zoom from '@material-ui/core/Zoom';
// import Toolbar from '@material-ui/core/Toolbar';
// import useScrollTrigger from '@material-ui/core/useScrollTrigger';
//import Tooltip from '@material-ui/core/Tooltip';
var ps;

const useStyles = makeStyles(styles);

/*const userbuttonStyles = makeStyles((theme)=> ({
	root: {
		top:'693px',
		position: 'fixed',
		bottom:theme.spacing(2),
		right: theme.spacing(2),
	},
}));*/

export default function Dashboard(props) {
//const Dashboard = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
//console.log("props:",props);
 const { ...rest } = props;
  // states and functions
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [miniActive, setMiniActive] = React.useState(true); // default true로  설정
  //const [image, setImage] = React.useState(require("assets/img/sidebar-2.jpg"));
  const image = require("assets/img/sidebar-4.jpg");
  //const [color, setColor] = React.useState("blue");
  const color = "blue";
  //const [bgColor, setBgColor] = React.useState("black");
  const bgColor = "black";
  // const [hasImage, setHasImage] = React.useState(true);
  //const [fixedClasses, setFixedClasses] = React.useState("dropdown");
  //const [logo, setLogo] = React.useState(require("assets/img/logo-white.svg"));
  const logo = require("assets/img/pp_logo.gif");
  const [isAuthenticated,setIsAuthenticated] =React.useState(false);
  const [open,setOpen] = React.useState(false);
  const [userData,setUserData] =React.useState([]);
  const token =  userService.GetItem()?userService.GetItem().token:null;
  //const store =userStore;
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

	    /*if (userStore.token) {*/
	  // 로컬 스토리지에 값이 있는지 확인 
	  
	      axios.get("/auth/user",{headers:{'Authorization':'Bearer '+token}})
	        //.then(res => console.log("return:",res.data))
	        .then(res => 
	          {if(res.data) {

	           // console.log("res.data.user", res.data.user);
	           // console.log("res.data.token", res.data.token);
	            //userStore.setUser(res.data.user);
	            //userStore.setToken(res.data.token);
	        	//토큰 저장
	        	userService.SetItem(res.data);
	        	//로그인상태
	            setIsAuthenticated(true);
	            //유저정보
	            setUserData(res.data.user);
	          } else {
            setIsAuthenticated(false);
	            setUserData([]);
	          }}
	        )
	        .catch(err => {
	        setIsAuthenticated(false);
	      });    

	   /* } */ 

	  }, []);
  
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
  /*const handleImageClick = image => {
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
  };*/
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
 
      if (prop.layout === "/svc") {
        return (
          <Route
            path={prop.layout + prop.path}
            //component={prop.component}
          	render={() =><prop.component openLogin={onOpenHandle} loginClose={event=>handleLoginClose(event)} token={token} {...rest}/>}
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
  
  const handleLoginClose=user => {
	  setOpen(false);
	  console.log("popup close:",user);
	  if(user) {
		  setIsAuthenticated(true);
		  setUserData(user);
	  } else {
		  setIsAuthenticated(false);
		  setUserData([]); 
	  }
	  //setIsAuthenticated(true);
	  //setUserData(user);
  }
  
/*  const handleClick = (event) => {
	  const anchor = document.querySelector('#scroll_top');
	  if(anchor) {
		  anchor.scrollIntoView();
	  }
  };*/

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
      <div className={mainPanelClasses} ref={mainPanel} >
        <ServiceNavbar
          sidebarMinimize={sidebarMinimize.bind(this)}
          miniActive={miniActive}
          brandText={getActiveRoute(routes)}
          handleDrawerToggle={handleDrawerToggle}
          isAuthenticated={isAuthenticated}
          onLoginPageOpen={()=>setOpen(true)}
          {...rest}
        />
        {/*<div id="scroll_top"></div>*/}
        {/* On the /maps/full-screen-maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
        {getRoute() ? (
          <div className={classes.content} style={{padding:'0px'}}>
            <div className={classes.container}>
              <Switch>
                {getRoutes(routes)}
                <Redirect from="/svc" to="/svc/dashbord" />
              </Switch>
            </div>
          </div>
        ) : (
          <div className={classes.map}>
            <Switch>
              {getRoutes(routes)}
              <Redirect from="/svc" to="/svc/dashbord" />
            </Switch>
          </div>
        )}
        <Footer fluid store={token} />
        
{/*      <div className={"fixed-plugin"} style={{top:'85%',width:'35px'}}>
	    <div onClick={handleClick}>
	    	<Tooltip title="Scroll Top">
	    		<i className="fa fa-angle-double-up fa-2x" style={{color:'white'}}/>
	    	</Tooltip>
	    </div>
      </div>*/}
      <Dialog
      	open={open}
        onClose={()=>setOpen(false)}
      >
       <DialogContent style={{maxWidth:'400px',minWidth:'350px'}}><LoginPage onClose={event=>handleLoginClose(event)}/></DialogContent>   
      </Dialog>
      </div> 
    </div>
  );
}

//))
//export default Dashboard;