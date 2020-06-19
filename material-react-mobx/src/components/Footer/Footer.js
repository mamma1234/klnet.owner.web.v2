/*eslint-disable*/
import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Terms from 'views/Pages/TermsOfService.js';
import Privacy from 'views/Pages/PrivacyPolicy.js';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Paper from '@material-ui/core/Paper';
import Draggable from 'react-draggable';
import styles from "assets/jss/material-dashboard-pro-react/components/footerStyle.js";

const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { fluid, white, rtlActive } = props;
  const [open, setOpen] = React.useState(false);
  const [serviceText, setServiceText] = React.useState(""); //약관구분

  function DialogComponet() {
  	  return (	  
  		<Dialog
  			open={open}
  		    onClose={handleClose}
  		    PaperComponent={PaperComponent}
  		    aria-labelledby="draggable-dialog-title"
  		>
  		<DialogContent>
  			{serviceText === "T"?<Terms handleClose={handleClose}/>:<Privacy handleClose={handleClose} />}
  		</DialogContent>
  		</Dialog>
  	  );
  }
  
  const handleClose = () => {
  	  setOpen(false);
  }

  function PaperComponent(props) {
  	  return (
  			  <Draggable handle="#draggable-dialog-title" cancel={'[class*="MuiDialogContent-root"]'} >
  			  	<Paper {...props} />
  			  </Draggable>
  			  );
  }
  var container = cx({
    [classes.container]: !fluid,
    [classes.containerFluid]: fluid,
    [classes.whiteColor]: white
  });
  var anchor =
    classes.a +
    cx({
      [" " + classes.whiteColor]: white
    });
  var block = cx({
    [classes.block]: true,
    [classes.whiteColor]: white
  });
  const handleClickOpen = (event,name) => {
	  
	  if(name === "terms") {
		  setServiceText("T");
	  } else {
		  setServiceText("P");
	  }
	  setOpen(true);
  }
  
  return (
    <footer className={classes.footer} style={{padding:'0'}}>
      <div className={container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock} >
            <Link to="#" onClick={event => handleClickOpen(event,'terms')}>
                {rtlActive ? "이용약관" : "Terms Of Service"}
                </Link>
            </ListItem>
            <ListItem className={classes.inlineBlock} >
            <Link to="#" onClick={event => handleClickOpen(event,'privacy')}>
              {rtlActive ? "기업소개" : "Privacy Policy"}</Link>
          </ListItem>
            <ListItem className={classes.inlineBlock}>
            	<Link to="/svc/board">
            	{rtlActive ? "게시판": "Board"}
            	</Link>
            </ListItem> 
          </List>
        </div>
        <p className={classes.right}>
          &copy; {1900 + new Date().getYear()}{" "}
          <a
            href="https://www.creative-tim.com?ref=mdpr-footer"
            className={anchor}
            target="_blank"
          >
            {rtlActive ? "توقيت الإبداعية" : "Creative Tim"}
          </a>
          {rtlActive
            ? ", مصنوعة مع الحب لشبكة الإنترنت أفضل"
            : ", made with love for a better web"}
        </p>
        <DialogComponet />
      </div>
    </footer>
    
  );
}

Footer.propTypes = {
  fluid: PropTypes.bool,
  white: PropTypes.bool,
  rtlActive: PropTypes.bool
};
