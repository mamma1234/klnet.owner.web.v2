/*eslint-disable*/ import React from "react";
// nodejs library to set properties for components
//import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Kit/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Kit/Header/HeaderLinks.js";
import Parallax from "components/Kit/Parallax/Parallax.js";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";
import CardFooter from "components/Card/CardFooter.js";
// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
import SectionWork from "./Sections/SectionWork.js";
import CommonSearch from "./Sections/SearchBar.js";

//import Dashboard from "./Sections/Dashboard.js";

import Board from "./Sections/Main_Board.js";
// import Cookies from "js-cookie";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Pages/Login/LoginPage.js';
import SignPage from 'views/Pages/Member/RegisterPage.js';
import axios from 'axios';

import {userService} from 'views/Pages/Login/Service/Service.js';

import { observer, inject } from 'mobx-react'; // 6.x
//import { useCookies  } from 'react-cookie';

const useStyles = makeStyles(landingPageStyle);

let numCnt =1;
 export default function LandingPage(props) {
//const LandingPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore}) => { 

  const [open,setOpen] = React.useState(false);
  const [modalGb,setModalGb] = React.useState("login");
  const [isAuthenticated,setIsAuthenticated] =React.useState(false);
  const [userData,setUserData] =React.useState([]);
  const [boardData,setBoardData] =React.useState([]);
  const [totpage,setTotpage] = React.useState(0);
  const [severity, setSeverity] = React.useState("");
  const [alertOpen, setAlertOpen] = React.useState(false);
  const [errMessage, setErrmessage] = React.useState("");

  // console.log("userStore", userStore);
  // console.log("userStore", userStore.me);
  // userStore.setMe("change name");

  //const [cookies, setCookie] = useCookies(['name']);
 /* function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }
*/
  React.useEffect(() => {
	 // console.log(">>>>>main userStore.token",userStore.token);
	  document.body.style.overflow = "unset";
	  
	const localStorageCheck =  userService.GetItem();
		  
	if (localStorageCheck) {
		
	//console.log("login check1");
	//console.log("login check value:",localStorageCheck.token);
      axios.get("/auth/user",{headers:{'Authorization':'Bearer '+localStorageCheck.token}})
        //.then(res => console.log("return:",res.data))
        .then(res => 
          {if(res.data) {
        	  console.log("login check ok");
           // console.log("res.data.user", res.data.user);
        	 
            //userStore.setUser(res.data.user);
            //userStore.setToken(res.data.token);

            setIsAuthenticated(true);
            setUserData(res.data.user);
            userService.SetItem(res.data);
          } else {
            setIsAuthenticated(false);
            setUserData([]);
          }}
        )
        .catch(err => {console.log("login check error");
        setIsAuthenticated(false);
	        axios.get("/auth/logout",{headers:{'Authorization':'Bearer '+localStorageCheck.token}} )
		    .then(res => {
		        if (res.data.message){
		        	alert(res.data.message);
		        } else {
		        	localStorageCheck.removeItem();
		        	//props.logOut();
	                //userStore.setUser('');
	                //userStore.setToken('');
		        	props.history.push('/landing');
		        }
		        	//window.location.href = "/login"; //alert(res.data.userid + " �α��� ����");
		    })
		    .catch(err => {
		        console.log(err);
		        //window.location.href = "/Landing";
		    })
      });    

    }
  }, []);
  
  React.useEffect(() => {
	//board 
	  numCnt=1;
	  axios.post("/api/getBoardList",{type:"main",num:numCnt})
	  .then(setBoardData([]))
      .then(res => {setBoardData(res.data);setTotpage(res.data[0].tot_page);});
	  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  
  const handleAddRow = () => {

	 if(numCnt != boardData[0].tot_page) {
			//page ++
		    numCnt=numCnt+1; 
		    axios.post("/api/getBoardList",{type:"main",num:numCnt})
				  .then(res => {setBoardData([...boardData,...res.data]);setTotpage(res.data[0].tot_page);} );
	 }   
  };
  
  const handleClickLoginPage = () => {
	  setModalGb("login");
	  setOpen(true);  
  }
  
  const handleClickSignPage = () => {
	  setModalGb("sign");
	  setOpen(true);
  }

  const handleClickClose = () => {
	  setOpen(false);
  }
  
  const handleLoginClose =(value) =>{
	  console.log("value ", value);
	  setUserData(value);
	  setOpen(false);
	  setIsAuthenticated(true);
  }
  
  const handleLogOut =() =>{
    setIsAuthenticated(false);
    //userStore.logout();
	  alertMessage('로그아웃 되었습니다.','success');
  }
  
	function Alert(props) {
		return <MuiAlert elevation={6} variant="filled" {...props} />;
	}

	const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }
	
	function  alertMessage (message,icon) {
		setErrmessage(message);
		setSeverity(icon);
		setAlertOpen(true);
	}
	
  
  const logo = require("assets/img/pp_logo.gif");

  return (
    <div>
      <Header
        color="transparent"
        brand="Plism Plus"
            links={<HeaderLinks dropdownHoverColor="info" onLoginOpen={handleClickLoginPage} onSignOpen={handleClickSignPage} isAuthenticated={isAuthenticated} userData={userData} logOut={handleLogOut}/>}
                fixed
                changeColorOnScroll={{
                  height: 300,
                  color: "info"
                }}
      />
      <Dialog
      	open={open}
        onClose={handleClickClose}
      >
       {modalGb=="login"?<DialogContent style={{maxWidth:'400px',minWidth:'350px',paddingLeft:'10px',paddingRight:'10px'}}><LoginPage onClose={handleLoginClose}/></DialogContent>:
    	   <DialogContent style={{maxWidth:'950px',minWidth:'350px',paddingLeft:'15px',paddingRight:'15px'}}><SignPage onClose={e=>setOpen(false)}/></DialogContent>
       }
            
      </Dialog>
      <Parallax image={require("assets/img/main.jpg")}>
        <div className={classes.container} style={{textAlign:'-webkit-right', paddingTop:'10%'}}>
            <GridItem xs={12} sm={6} md={5} >
              <h3 className={classes.title}>Welcome To Plism Plus.</h3>
              <h5>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h5>
                <br />
               {!isAuthenticated?
             <Button
                color="danger"
                size="sm"
                onClick={()=>setOpen(true)}
              >
                Go Service
              </Button>:null}
            </GridItem>
  {/*	      <div style={{opacity:'0.8',textAlign:'-webkit-center'}}>
	      	<GridItem xs={12} sm={12} md={12} >
				<CommonSearch/>
			</GridItem>
			</div>*/}
        </div>

      </Parallax>

      <div className={classNames(classes.main, classes.mainRaised)} style={{marginLeft:'5px',marginRight:'5px'}}>
        <div className={classes.container}>
        <CommonSearch/>
		  {/*<ProductSection />
          <SectionProduct />
          
          <SectionWork />*/}
		  {/*{isAuthenticated?<Dashboard />:null}*/}
          <Board data={boardData} tableRownum={numCnt} onClickHandle ={handleAddRow} totPage={totpage}/>
        </div>
      </div>
      {/*<Footer store={userStore}/>*/}
      <Footer />
	   <Snackbar open={alertOpen} autoHideDuration={2500} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}
		</Alert>
	</Snackbar>
    </div>
  );
}
//))


//export default LandingPage;
