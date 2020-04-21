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

import landingPageStyle from "assets/jss/material-kit-pro-react/views/landingPageStyle.js";

// Sections for this page
import ProductSection from "./Sections/ProductSection.js";
import SectionProduct from "./Sections/SectionProduct.js";
import SectionTeam from "./Sections/SectionTeam.js";
import SectionWork from "./Sections/SectionWork.js";
// import Cookies from "js-cookie";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import LoginPage from 'views/Pages/Login/LoginPage.js';
import SignPage from 'views/Pages/Member/RegisterPage.js';
import axios from 'axios';

import { observer, inject } from 'mobx-react'; // 6.x
import { useCookies  } from 'react-cookie';

const useStyles = makeStyles(landingPageStyle);



// export default function LandingPage() {
const LandingPage = inject('userStore', 'trackStore')(observer(({ userStore, trackStore }) => { 

  const [open,setOpen] = React.useState(false);
  const [modalGb,setModalGb] = React.useState("login");
  const [isAuthenticated,setIsAuthenticated] =React.useState(false);
  const [userData,setUserData] =React.useState([]);

  // console.log("userStore", userStore);
  // console.log("userStore", userStore.me);
  // userStore.setMe("change name");

  const [cookies, setCookie] = useCookies(['name']);
  function onChange(newName) {
    setCookie('name', newName, { path: '/' });
  }

  React.useEffect(() => {
    // To.박준영 과장 소셜 로그인후 call back 을 LandingPage.js가 아니라 전용 페이지에서 수행했으면 좋겠네. 로그인 최초 접근 하는 페이지?? 혹은 redirect blank 페이지??
    console.log('마운트 될 때만 실행됩니다.');
    console.log("cookies", cookies);    

    if (cookies['connect.sid'] && cookies['connect.userno']) {

      console.log("connect.sid", cookies['connect.sid']);
      console.log("connect.userno", cookies['connect.userno']);
      axios.get("/auth/user",{headers:{'Authorization':'Bearer '+cookies['connect.sid']}})
        //.then(res => console.log("return:",res.data))
        .then(res => 
          {if(res.data) {

            console.log("res.data.user", res.data.user);
            userStore.setUser(res.data.user);
            userStore.setToken(cookies['connect.sid']);

            setIsAuthenticated(true);
            setUserData(res.data);
          } else {
            setIsAuthenticated(false);
            setUserData([]);
          }}
        )
        .catch(err => {
        setIsAuthenticated(false);
      });    

    }  

  }, []);

  React.useEffect(() => {
    console.log("effect");
	  // 사용자 인증 
	  if(isAuthenticated != true) {


		  // if(localStorage.getItem('plismplus')) {
			//   axios.get("/auth/user",{headers:{'Authorization':'Bearer '+localStorage.getItem('plismplus')}})
			//   	//.then(res => console.log("return:",res.data))
			//     .then(res => 
			//     	{if(res.data) {
			//     	  setIsAuthenticated(true);
			//     	  setUserData(res.data);
			//     	} else {
			//     		setIsAuthenticated(false);
			//     		setUserData([]);
			//     	}}
			//     )
			//     .catch(err => {
			// 		setIsAuthenticated(false);
			//     });
		  // } else {
			//   setIsAuthenticated(false);
		  // }
	  }
    window.scrollTo(0, 0);
    document.body.scrollTop = 0;
  });
  const classes = useStyles();
  
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
	  alert("로그아웃 되었습니다.");
  }

  return (
    <div>
      <Header
        color="transparent"
        brand="Plism Plus+"
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
       {modalGb=="login"?<DialogContent style={{maxWidth:'400px',minWidth:'400px'}}><LoginPage onClose={handleLoginClose}/></DialogContent>:
    	   <DialogContent style={{maxWidth:'800px',minWidth:'400px'}}><SignPage/></DialogContent>
       }
            
      </Dialog>
      <Parallax image={require("assets/img/main.jpg")}>
        <div className={classes.container} style={{textAlign:'-webkit-right'}}>
            <GridItem xs={12} sm={6} md={6} >
              <h3 className={classes.title}>Welcome To Plism Plus.</h3>
              <h5>
                Every landing page needs a small description after the big bold
                title, that{"'"}s why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h5>
             {/*   <br />
             <Button
                color="danger"
                size="lg"
                //href="https://www.youtube.com/watch?v=dQw4w9WgXcQ&ref=creativetim"
                target="_blank"
              >
                <i className="fas fa-play" />
                Go Service
              </Button> */}
            </GridItem>
        </div>
      </Parallax>
      <div className={classNames(classes.main, classes.mainRaised)} style={{marginLeft:'19px',marginRight:'19px'}}>
        <div className={classes.container}>
		  <ProductSection />
          <SectionProduct />
          <SectionTeam />
          <SectionWork />
        </div>
      </div>
      <Footer
        content={
          <div>
            <div className={classes.left}>
              <List className={classes.list}>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    Creative Tim
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/presentation?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    About us
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a href="//blog.creative-tim.com/" className={classes.block}>
                    Blog
                  </a>
                </ListItem>
                <ListItem className={classes.inlineBlock}>
                  <a
                    href="https://www.creative-tim.com/license?ref=mkpr-landing"
                    target="_blank"
                    className={classes.block}
                  >
                    Licenses
                  </a>
                </ListItem>
              </List>
            </div>
            <div className={classes.right}>
              &copy; {1900 + new Date().getYear()} , made with{" "}
              <Favorite className={classes.icon} /> by{" "}
              <a
                href="https://www.creative-tim.com/?ref=mkpr-landing"
                target="_blank"
              >
                Creative Tim
              </a>{" "}
              for a better web.
            </div>
          </div>
        }
      />
    </div>
  );
}
))


export default LandingPage;
