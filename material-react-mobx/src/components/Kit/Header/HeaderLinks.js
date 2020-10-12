/* eslint-disable */
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// react components for routing our app without refresh
import { Link,Redirect  } from "react-router-dom";
import Button from "components/CustomButtons/Button.js";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
//import Icon from "@material-ui/core/Icon";

// @material-ui/icons
import Apps from "@material-ui/icons/Apps";
//import ShoppingCart from "@material-ui/icons/ShoppingCart";
import ViewDay from "@material-ui/icons/ViewDay";
import Dns from "@material-ui/icons/Dns";
import Info from "@material-ui/icons/Info";
import Public from "@material-ui/icons/Public";
import LinkIcon from "@material-ui/icons/Link";
import LocalShipping from "@material-ui/icons/LocalShipping";
import ImportExport from "@material-ui/icons/ImportExport";
import SettingIcon from '@material-ui/icons/Settings'
//import Build from "@material-ui/icons/Build";
//import ListIcon from "@material-ui/icons/List";
//import People from "@material-ui/icons/People";
//import Assignment from "@material-ui/icons/Assignment";
//import MonetizationOn from "@material-ui/icons/MonetizationOn";
//import Chat from "@material-ui/icons/Chat";
//import Call from "@material-ui/icons/Call";
//import ViewCarousel from "@material-ui/icons/ViewCarousel";
//import ArtTrack from "@material-ui/icons/ArtTrack";
//import ViewQuilt from "@material-ui/icons/ViewQuilt";
//import LocationOn from "@material-ui/icons/LocationOn";
import Fingerprint from "@material-ui/icons/Fingerprint";
//import AttachMoney from "@material-ui/icons/AttachMoney";
//import Store from "@material-ui/icons/Store";
//import AccountCircle from "@material-ui/icons/AccountCircle";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Layers from "@material-ui/icons/Layers";
//import ShoppingBasket from "@material-ui/icons/ShoppingBasket";
import LineStyle from "@material-ui/icons/LineStyle";
//import Error from "@material-ui/icons/Error";
import axios from 'axios';
// core components
import CustomDropdown from "components/CustomDropdown/CustomKitDropdown.js";
//import Button from "components/CustomButtons/Button.js";
import InsertChartOutlinedOutlinedIcon  from '@material-ui/icons/InsertChartOutlinedOutlined';
import styles from "assets/jss/material-kit-pro-react/components/headerLinksStyle.js";

import { observer, inject} from 'mobx-react'; // 6.x

//@material-ui/icons

import ShoppingCart from "@material-ui/icons/ShoppingCart";

import DirectionsBoat from  "@material-ui/icons/DirectionsBoatOutlined";
import Build from "@material-ui/icons/BuildOutlined";
import ListIcon from "@material-ui/icons/ListOutlined";
import People from "@material-ui/icons/PeopleOutlined";
import Assignment from "@material-ui/icons/AssignmentOutlined";
import MonetizationOn from "@material-ui/icons/MonetizationOnOutlined";
import Chat from "@material-ui/icons/ChatOutlined";
import Call from "@material-ui/icons/CallOutlined";
import ViewCarousel from "@material-ui/icons/ViewCarouselOutlined";
import Schedule from "@material-ui/icons/ScheduleOutlined";
import AccountBalance from "@material-ui/icons/AccountBalanceOutlined";
import ArtTrack from "@material-ui/icons/ArtTrackOutlined";
import ViewQuilt from "@material-ui/icons/ViewQuiltOutlined";
import LocationOn from "@material-ui/icons/LocationOnOutlined";

import AttachMoney from "@material-ui/icons/AttachMoneyOutlined";
import Store from "@material-ui/icons/StoreOutlined";
import AccountCircle from "@material-ui/icons/AccountCircleOutlined";
import {userService} from 'views/Pages/Login/Service/Service.js';

import ShoppingBasket from "@material-ui/icons/ShoppingBasketOutlined";

import Error from "@material-ui/icons/ErrorOutlined";

const useStyles = makeStyles(styles);


 export default function HeaderLinks(props) {
//const HeaderLinks = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => {   
//console.log("header prop:",props);
	const { dropdownHoverColor ,isAuthenticated, userData} = props;
	const localStorageCheck =  userService.GetItem();
  const easeInOutQuad = (t, b, c, d) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  const smoothScroll = (e, target) => {
    if (window.location.pathname === "/sections") {
      var isMobile = navigator.userAgent.match(
        /(iPad)|(iPhone)|(iPod)|(android)|(webOS)/i
      );
      if (isMobile) {
        // if we are on mobile device the scroll into view will be managed by the browser
      } else {
        e.preventDefault();
        var targetScroll = document.getElementById(target);
        scrollGo(document.documentElement, targetScroll.offsetTop, 1250);
      }
    }
  };
  const scrollGo = (element, to, duration) => {
    var start = element.scrollTop,
      change = to - start,
      currentTime = 0,
      increment = 20;

    var animateScroll = function() {
      currentTime += increment;
      var val = easeInOutQuad(currentTime, start, change, duration);
      element.scrollTop = val;
      if (currentTime < duration) {
        setTimeout(animateScroll, increment);
      }
    };
    animateScroll();
  };
  //var onClickSections = {};

  
  const classes = useStyles();
   
  const logout = () => {
    //console.log(">>>logout button click");
	    axios.get("/auth/logout",{headers:{'Authorization':'Bearer '+localStorageCheck.token}} )
	    .then(res => {
	        if (res.data.message){
	        	alert(res.data.message);
	        } else {
	        	userService.removeToken();
                //userStore.setUser('');
                //userStore.setToken('');
	        	props.logOut();
	        }
	    })
	    .catch(err => {
	        console.log(err);
	        //window.location.href = "/Landing";
	    })

  }
  
  const clean = () => {
	  //userStore.setUser('');
	  //userStore.setToken('');
  }

  return (
    <List className={classes.list + " " + classes.mlAuto}>
    {isAuthenticated && userData.usertype=="A"?"ADMIN":isAuthenticated?userData.username:null} {isAuthenticated?" 님 환영합니다.":null}
    {isAuthenticated && userData.usertype=="A"?
	    <ListItem className={classes.listItem}>
		    <Link to="/admin" 
		   	 className={classes.dropdownLink}
		    	//onClick={props.onLoginOpen}
		    >
		         <AccountBalance className={classes.dropdownIcons} /> ADMIN MENU
		  </Link>
		  </ListItem>
		  :null}
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="LOCATION"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={LocationOn}
          dropdownList={[
            <Link to="/svc/tracking" className={classes.dropdownLink} refresh="true">
              <DirectionsBoat className={classes.dropdownIcons} /> TRACKING
            </Link>,
            <Link to="/svc/flightinfo" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} /> SHIP FLIGHT INFO
            </Link>
          ]}
        />
      </ListItem>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="DEM/DET/OSC"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={LocationOn}
          dropdownList={[
            <Link to="/svc/demDet/Import" className={classes.dropdownLink} refresh="true">
              <DirectionsBoat className={classes.dropdownIcons} /> IMPORT
            </Link>,
            <Link to="/svc/demDet/Export" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} /> EXPORT
            </Link>,
            <Link to="/svc/mapService" className={classes.dropdownLink}>
              <Layers className={classes.dropdownIcons} /> SUMMARY
            </Link>
          ]}
        />
      </ListItem>
      <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="Schedule"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={Schedule}
          dropdownList={[
            <Link
              to="/svc/fcl"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <ShoppingBasket className={classes.dropdownIcons} /> FCL-SEA
            </Link>,
            <Link
            to="/svc/cal"
            className={classes.dropdownLink}
            onClick={e => smoothScroll(e, "headers")}
          >
            <LocalShipping className={classes.dropdownIcons} /> TERMINAL
          </Link>
          ]}
        />
      </ListItem>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="CUSTOM"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountBalance}
          dropdownList={[
            <Link
              to="/svc/unipassapi"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <ImportExport className={classes.dropdownIcons} /> UNIPASS API SERVICE
            </Link>
          ]}
        />
      </ListItem>
        <ListItem className={classes.listItem}>
        <CustomDropdown
          noLiPadding
          navDropdown
          hoverColor={dropdownHoverColor}
          buttonText="COMMON"
          buttonProps={{
            className: classes.navLink,
            color: "transparent"
          }}
          buttonIcon={AccountBalance}
          dropdownList={[
            <Link
              to="#"
              className={classes.dropdownLink}
              onClick={e => smoothScroll(e, "headers")}
            >
              <ImportExport className={classes.dropdownIcons} /> HS CODE
            </Link>,
            <Link
            to="#"
            className={classes.dropdownLink}
            onClick={e => smoothScroll(e, "headers")}
          >
            <Public className={classes.dropdownIcons} /> IMO
          </Link>,
          <Link
          to="#"
          className={classes.dropdownLink}
          onClick={e => smoothScroll(e, "headers")}
        >
          <Public className={classes.dropdownIcons} /> 품명
        </Link>,
          <Link
          to="#"
          className={classes.dropdownLink}
          onClick={e => smoothScroll(e, "headers")}
        >
          <Public className={classes.dropdownIcons} /> CRM 계산기
        </Link>
          ]}
        />
      </ListItem>

      <ListItem className={classes.listItem}>
	     <Link   to="/svc/setting"  className={classes.dropdownLink}>
       <SettingIcon className={classes.dropdownIcons} /> Setting
      </Link>
	    </ListItem>        
      {isAuthenticated==false?<div>
	  <ListItem className={classes.listItem}>
	     <Link to="#" 
	    	 className={classes.dropdownLink}
	     	onClick={props.onLoginOpen}>
              <Fingerprint className={classes.dropdownIcons} /> LOGIN
       </Link>
	  </ListItem>
	  <ListItem className={classes.listItem}>
	   <Link to="/authpage/register" className={classes.dropdownLink}
	   onClick={clean}
	   >
         <PersonAdd className={classes.dropdownIcons} /> SIGNUP
       </Link>
	  </ListItem></div>
	  :
	  <ListItem className={classes.listItem}>
	     <Link   to="#"   // component="button"
          //variant="body2"
          onClick={
            logout
          } className={classes.dropdownLink}>
           <AccountCircle className={classes.dropdownIcons} /> LOGOUT
           </Link>
	  </ListItem>
        }
    </List>
  );
}
//))

//export default HeaderLinks;

HeaderLinks.defaultProps = {
  hoverColor: "primary"
};

HeaderLinks.propTypes = {
  dropdownHoverColor: PropTypes.oneOf([
    "dark",
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "rose"
  ])
};

