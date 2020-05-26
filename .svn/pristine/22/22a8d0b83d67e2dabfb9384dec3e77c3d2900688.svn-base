import React from "react";

// @material-ui/core components
//import { makeStyles } from "@material-ui/core/styles";

import axios from 'axios';

import { useCookies  } from 'react-cookie';


//import styles from "assets/jss/material-dashboard-pro-react/views/loginPageStyle.js";
import { observer, inject } from 'mobx-react'; // 6.x


//const useStyles = makeStyles(styles);

const AccessPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props}) => {
	
console.log("props:",props);
  
  const [cookies, setCookie, removeCookie] = useCookies(['name']);
  
React.useEffect(() => {
   userStore.setUser(cookies['plismplus'].user);
   userStore.setToken(cookies['plismplus'].token);
   props.history.push("/landing");
   removeCookie('plismplus',{path:'/'});
 }, []);
 }
 ))
 
 export default AccessPage;
