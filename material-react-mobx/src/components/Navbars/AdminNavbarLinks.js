import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// import { Link,Redirect  } from "react-router-dom";
import { Link,Redirect} from "react-router-dom";
// import { Manager, Target, Popper } from "react-popper";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Paper from "@material-ui/core/Paper";
import Grow from "@material-ui/core/Grow";
import Hidden from "@material-ui/core/Hidden";
import Popper from "@material-ui/core/Popper";
import Divider from "@material-ui/core/Divider";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import HighlightOff from '@material-ui/icons/HighlightOff';
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Typography from '@material-ui/core/Typography';
// @material-ui/icons
import Person from "@material-ui/icons/Person";
import Notifications from "@material-ui/icons/Notifications";
import Dashboard from "@material-ui/icons/Dashboard";
import Search from "@material-ui/icons/Search";
import TablePageing from 'components/Navbars/ServiceNotiTable.js';
// core components
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Cookies from "js-cookie";
import axios from 'axios';
import { observer, inject} from 'mobx-react'; // 6.x
import {userService} from 'views/Pages/Login/Service/Service.js';
import styles from "assets/jss/material-dashboard-pro-react/components/adminNavbarLinksStyle.js";

const useStyles = makeStyles(styles);

export default function AdminHeaderLinks(props) {
//const AdminHeaderLinks = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => {  
  const [openNotification, setOpenNotification] = React.useState(null);
  const localStorageCheck =  userService.GetItem()||null;
  const [msgCnt,setMsgCnt] = React.useState();
  const [msg,setMsg] = React.useState([]);
  const [openMsgMore, setOpenMsgMore] = React.useState(false);
  const [msgMoreData,setMsgMoreData] = React.useState([]);
  
  const handleClickNotification = event => {
    if (openNotification && openNotification.contains(event.target)) {
      setOpenNotification(null);
    } else {
      setOpenNotification(event.currentTarget);
    }
  };
  const handleCloseNotification = () => {
    setOpenNotification(null);
  };
  const [openProfile, setOpenProfile] = React.useState(null);
  const handleClickProfile = event => {
    if (openProfile && openProfile.contains(event.target)) {
      setOpenProfile(null);
    } else {
      setOpenProfile(event.currentTarget);
    }
  };
  const handleCloseProfile = () => {
    setOpenProfile(null);
  };
  const classes = useStyles();
  const { rtlActive ,isAuthenticated} = props;
  const searchButton =
    classes.top +
    " " +
    classes.searchButton +
    " " +
    classNames({
      [classes.searchRTL]: rtlActive
    });
  const dropdownItem = classNames(classes.dropdownItem, classes.primaryHover, {
    [classes.dropdownItemRTL]: rtlActive
  });
  const wrapper = classNames({
    [classes.wrapperRTL]: rtlActive
  });
  const managerClasses = classNames({
    [classes.managerClasses]: true
  });
  
  const handleLogout = () => {
		    axios.get("/auth/logout",{headers:{'Authorization':'Bearer '+localStorageCheck.token}} )
		    .then(res => {
		        if (res.data.message){
		        	alert(res.data.message);
		        } else {
		        	userService.removeToken();
	                console.log("log out!");
	                props.history.replace('/');
		        }
		    })
		    .catch(err => {
		        console.log(err);
		        console.log(">>>>err>");
		    })

	  }
  
 React.useEffect(() => {
	  console.log("admin layout localStorageCheck value:",localStorageCheck);
	  msgCheck();
	  
	  return () => {
	      console.log('cleanup');
	    }; 
	  
  }, []);
 
 
 const msgCheck = () => {
	 if(localStorageCheck) {
	 axios.post("/com/getUserNotice",{},{headers:{'Authorization':'Bearer '+localStorageCheck.token}})
	    .then(res => setMsgCnt(res.data[0].noti_cnt))
	    .catch(err => {
	       console.log("HeaderLinks err",err);
	    }); 
	 }
 }
 
 const handleSelectMsg = (event) => {
	 //console.log("msg",localStorageCheck.token);
	  if(localStorageCheck) {
		  axios.post("/com/getUserMessage",{},{headers:{'Authorization':'Bearer '+localStorageCheck.token}}
			  )//.then(res=>console.log(res.data))
		    .then(res => {
		    	setMsg(res.data);
		    	setMsgCnt(0);
		    })
		    .catch(err => {
		       console.log("HeaderLinks err",err);
		    });  
	  }

	  if (openNotification && openNotification.contains(event.target)) {
	        setOpenNotification(null);
	  } else {
	    	setOpenNotification(event.currentTarget);
	  }
 }
 
 const handleMoreMessage = () => {

       axios.post("/com/getUserMoreNotice",{},{headers:{'Authorization':'Bearer '+localStorageCheck.token}})
	    .then(res => { setMsgMoreData(res.data);setOpenNotification(null); setOpenMsgMore(true);})
	    .catch(err => {
	       console.log("HeaderLinks err",err);
	    });
	  
 }
 
 const handleClose = () => {
	  setOpenMsgMore(false);
 }
 
 function DialogComponet(props) {
	  return (	  
		<Dialog
			open={openMsgMore}
		    onClose={handleClose}
		    //PaperComponent={PaperComponent}
		    aria-labelledby="draggable-dialog-title" 
		>
		<DialogContent style={{padding:'0',minWidth:'430px',maxWidth:'680px'}}>
			<MsgMoreTable />
		</DialogContent>
		</Dialog>
	  );
 }

 
 
 const MsgMoreTable = () => {
	  return (
			  <div>
			  	<HighlightOff onClick={handleClose} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>
		        <Card className={classes.justifyContentCenter}>
		        	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		        		<CardIcon color="info" style={{height:'56px'}}>
		        			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		        		</CardIcon>
		        		 <Typography variant="h6" style={{flexGrow:'1',textAlign:'start',color:'#7a7a7a'}}>More then Notice</Typography>
		        	</CardHeader>
		        	<CardBody style={{paddingBottom:'2px'}}> 
			            <TablePageing
				            tableHeaderColor="info"
				            tableHead={["no", "MSG","FROM","NOTI_DATE","EVENT"]}
				            tableData={msgMoreData}
			            	{...props}
			            />
		          </CardBody>
		        </Card>
		      </div>
	  
	  );
 }
		        	
 const MsgView = (props) => {
	  return (<h3> test  </h3>);
 }
 
 function handleListKeyDown(event) {
	  if(event.key === 'Tab') {
		  event.preventDefault();
		  setOpenNotification(null);
	  }
 }
  
  return (
    <div className={wrapper}>
    {localStorageCheck?(isAuthenticated && localStorageCheck.user.usertype=="A")?"ADMIN":isAuthenticated?localStorageCheck.user.username:null:null} {isAuthenticated?" 님 환영합니다.":null}
    {isAuthenticated?  
    <div className={managerClasses}>
        <Button
          color="transparent"
          justIcon
          aria-label="Notifications"
          aria-owns={openNotification ? "notification-menu-list" : null}
          aria-haspopup="true"
          //onClick={handleClickNotification}
          onClick={handleSelectMsg}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Notifications
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          {msgCnt>0?<span className={classes.notifications}>{msgCnt}</span>:null}
          <Hidden mdUp implementation="css">
            <span
              onClick={handleClickNotification}
              className={classes.linkText}
            >
              {rtlActive ? "إعلام" : "Notification"}
            </span>
          </Hidden>
        </Button>
        <Popper
          open={Boolean(openNotification)}
          anchorEl={openNotification}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openNotification,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseNotification}>
                {msg.length >0?
                <MenuList  onKeyDown={(event)=>handleListKeyDown(event)}>
			          {msg.map((data,key) => {
			        	  return (
			        			  
			                      <MenuItem
			                        key={key}
			                        onClick={handleCloseNotification}
			                        className={dropdownItem}
			                        style={{whiteSpace:'unset',paddingTop:'3px',paddingBottom:'3px',paddingLeft:'10px',paddingRight:'10px'}}
			                      >
			                      <Typography variant="body2" style={{maxWidth:'400px',minWidth:'400px'}}>{data.message}<br/><font size="1">{data.message_from}({data.message_insert_date})</font></Typography>
			                      <Divider />
			                      </MenuItem>      
			        	  );
			          })}
			          <MenuItem
                      onClick={handleMoreMessage}
                      className={dropdownItem}
                    >
                      ... 더보기
                    </MenuItem>
                  </MenuList>:
                	  <MenuList >
		              	<MenuItem className={dropdownItem}>메시지가 존재하지 않습니다.</MenuItem>
		              </MenuList>}
                </ClickAwayListener>
              </Paper>
        </Popper>
      </div>:null}

      <div className={managerClasses}>
      {isAuthenticated?
        <Button
          color="transparent"
          aria-label="Person"
          justIcon
          aria-owns={openProfile ? "profile-menu-list" : null}
          aria-haspopup="true"
          onClick={handleClickProfile}
          className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
          muiClasses={{
            label: rtlActive ? classes.labelRTL : ""
          }}
        >
          <Person
            className={
              classes.headerLinksSvg +
              " " +
              (rtlActive
                ? classes.links + " " + classes.linksRTL
                : classes.links)
            }
          />
          <Hidden mdUp implementation="css">
            <span onClick={handleClickProfile} className={classes.linkText}>
              {rtlActive ? "الملف الشخصي" : "Profile"}
            </span>
          </Hidden>
        </Button>
        :
            <Button
              color="transparent"
              justIcon
              aria-label="Notifications"
              aria-owns={openNotification ? "notification-menu-list" : null}
              aria-haspopup="true"
              onClick={props.onLoginPageOpen}
              className={rtlActive ? classes.buttonLinkRTL : classes.buttonLink}
              muiClasses={{
                label: rtlActive ? classes.labelRTL : ""
              }}
            >
              <Person
                className={
                  classes.headerLinksSvg +
                  " " +
                  (rtlActive
                    ? classes.links + " " + classes.linksRTL
                    : classes.links)
                }
              />
            </Button>
            }
        <Popper
          open={Boolean(openProfile)}
          anchorEl={openProfile}
          transition
          disablePortal
          placement="bottom"
          className={classNames({
            [classes.popperClose]: !openProfile,
            [classes.popperResponsive]: true,
            [classes.popperNav]: true
          })}
        >
          {({ TransitionProps }) => (
            <Grow
              {...TransitionProps}
              id="profile-menu-list"
              style={{ transformOrigin: "0 0 0" }}
            >
              <Paper className={classes.dropdown}>
                <ClickAwayListener onClickAway={handleCloseProfile}>
                  <MenuList role="menu">
                  {isAuthenticated && (localStorageCheck?localStorageCheck.user.usertype:null)=="A"?
                     	 <MenuItem
                             component={Link}
                             to="/svc"
                             onClick={handleCloseProfile}
                             className={dropdownItem}
                            >{rtlActive ? "사용자전환" : "Service Change"}
                               </MenuItem>:null}
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الملف الشخصي" : "Profile"}
                    </MenuItem>
                    <MenuItem
                      onClick={handleCloseProfile}
                      className={dropdownItem}
                    >
                      {rtlActive ? "الإعدادات" : "Settings"}
                    </MenuItem>
                    <Divider light />
                    <MenuItem
                    onClick={handleLogout}
                    className={dropdownItem}
                  >
                    {rtlActive ? "로그아웃" : "Log out"}
                  </MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

//))

//export default AdminHeaderLinks;

AdminHeaderLinks.propTypes = {
  rtlActive: PropTypes.bool
};
