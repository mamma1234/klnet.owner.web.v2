import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import EventAvailableOutlined from '@material-ui/icons/EventAvailableOutlined';
import DirectionsBoatOutlined from '@material-ui/icons/DirectionsBoatOutlined';
import RepeatOneOutlinedIcon from '@material-ui/icons/RepeatOneOutlined';
//import SwapVertOutlined from '@material-ui/icons/SwapVertOutlined';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownwardOutlined';
import LocalShippingOutlined from '@material-ui/icons/LocalShippingOutlined';
import LocalShipping from '@material-ui/icons/LocalShipping';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/timelineStyle.js";

const useStyles = makeStyles(styles);

export default function TimelineImp(props) {
  const classes = useStyles();
  const setStartDate = new Date();
  const { stories, simple  } = props;
  const timelineClass =
    classes.timelineCustom +
    " " +
    cx({
      [classes.timelineSimple]: simple
    });
  return (
    <ul className={timelineClass}>

        		 <li className={classes.itemCustom}>
        	     <div className={classes.timelineBadgeCustom +
        	             " " +
        	             classes["danger"] +
        	             " " +
        	             cx({
        	               [classes.timelineSimpleBadge]: simple
        	             })}>
        		<EventAvailableOutlined className={classes.badgeIconCustom} fontSize="large"/>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelinePanelInverted]: true || simple,
        	               [classes.timelineSimplePanel]: simple
        	             })} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
        		<div style={{fontSize:'12px'}}>ESTIMATED DEPARTURE</div>
        	     </div>
        	     <div className={
        	            classes.timelinePanelCustom +
        	            " " +
        	            cx({
        	              [classes.timelineSimplePanel]: simple
        	            })}>
        	     <div className={classes.timelineBody}>
        	            <a component={Link} target="_blank" href={"/svc/tracking?ietype=I&dategb=D&from=T"}>
        	      {stories.estimated}</a>&nbsp;B/L</div>           
        	     </div>
        	</li>
        	 <li className={classes.itemCustom}>
        	     <div className={classes.timelineBadgeCustom +
        	             " " +
        	             classes["success"] +
        	             " " +
        	             cx({
        	               [classes.timelineSimpleBadge]: simple
        	             })}>
        		<DirectionsBoatOutlined className={classes.badgeIconCustom} fontSize="large"/>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelinePanelInverted]: true || simple,
        	               [classes.timelineSimplePanel]: simple
        	             })} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
        		<div style={{fontSize:'12px'}}>SHIPPING</div>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	            " " +
        	            cx({
        	              [classes.timelineSimplePanel]: simple
        	            })}>
        	     <div className={classes.timelineBody}>
        	            <a component={Link} target="_blank" href={"/svc/flightinfo"}>
        	            {stories.shipping}</a>&nbsp;B/L</div>           
        	     </div>
        	</li>
        	 <li className={classes.itemCustom}>
        	     <div className={classes.timelineBadgeCustom +
        	             " " +
        	             classes["info"] +
        	             " " +
        	             cx({
        	               [classes.timelineSimpleBadge]: simple
        	             })}>
        		<RepeatOneOutlinedIcon className={classes.badgeIconCustom} fontSize="large"/>
        	     </div>
        	     <div className={ classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelinePanelInverted]: true || simple,
        	               [classes.timelineSimplePanel]: simple
        	             })} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
        		<div style={{fontSize:'12px'}}>ETA D-1</div>
        	     </div>
        	     <div className={
        	            classes.timelinePanelCustom +
        	            " " +
        	            cx({
        	              [classes.timelineSimplePanel]: simple
        	            })}>
        	     <div className={classes.timelineBody}>
        	            <a component={Link} target="_blank" href={"/svc/tracking?dategb=D&ietype=I&from=1&to=T"}>
        	            {stories.eta}</a>&nbsp;B/L</div>           
        	     </div>
        	</li>
        	<li className={classes.itemCustom}>
        	     <div className={classes.timelineBadgeCustom +
        	             " " +
        	             classes["warning"] +
        	             " " +
        	             cx({
        	               [classes.timelineSimpleBadge]: simple
        	             })}>
        		<ArrowDownwardIcon className={classes.badgeIconCustom} fontSize="large"/>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelinePanelInverted]: true || simple,
        	               [classes.timelineSimplePanel]: simple
        	             })} style={{paddingBottom:'0px',paddingTop:'10px',paddingLeft:'4px'}}>
        		<div style={{fontSize:'12px'}}>UNLOAD<br/><p style={{marginBottom:'0',fontSize:"8px"}}>(BEFORE GATE OUT)</p>
        	        </div>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelineSimplePanel]: simple
        	             })}>
        	     <div className={classes.timelineBody}>
        	            <a component={Link} target="_blank" href={"/svc/demDet/Import"}>
        	            {stories.unload}</a>&nbsp;CNTR</div>           
        	     </div>
        	</li>
        	<li className={classes.itemCustom} >
        	     <div className={classes.timelineBadgeCustom +
        	             " " +
        	             classes["primary"] +
        	             " " +
        	             cx({
        	               [classes.timelineSimpleBadge]: simple
        	             })}>
        		<LocalShippingOutlined className={classes.badgeIconCustom} fontSize="large"/>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelinePanelInverted]: true || simple,
        	               [classes.timelineSimplePanel]: simple
        	             })} style={{paddingBottom:'0px',paddingTop:'10px',paddingLeft:'4px'}}>
        		<div style={{fontSize:'12px'}}>GATE OUT/EMPTY IN<br/><p style={{fontSize:"8px"}}>(LAST 7DAYS)</p>
        	        </div>
        	     </div>
        	     <div className={classes.timelinePanelCustom +
        	             " " +
        	             cx({
        	               [classes.timelineSimplePanel]: simple
        	             })}>
        	     <div className={classes.timelineBody}>
        	            <a component={Link} target="_blank" href={"/svc/demDet/Import"}>
        	            {stories.gate}</a>&nbsp;CNTR</div>           
        	     </div>
        	</li>
    </ul>
  );
}
