import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import EventAvailableOutlined from '@material-ui/icons/EventAvailableOutlined';
import DirectionsBoatOutlined from '@material-ui/icons/DirectionsBoatOutlined';
import Forward30Outlined from '@material-ui/icons/Forward10Outlined';
//import SwapVertOutlined from '@material-ui/icons/SwapVertOutlined';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpwardOutlined';
import LocalShippingOutlined from '@material-ui/icons/LocalShippingOutlined';
import LocalShipping from '@material-ui/icons/LocalShipping';
import LanguageOutlined from '@material-ui/icons/LanguageOutlined';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/timelineStyle.js";

const useStyles = makeStyles(styles);

export default function TimelineExp(props) {
  const classes = useStyles();
  const { stories, simple } = props;
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
   		<LocalShippingOutlined className={classes.badgeIconCustom} fontSize="large"/>
   	     </div>
   	     <div className={classes.timelinePanelCustom +
   	             " " +
   	             cx({
   	               [classes.timelinePanelInverted]: true || simple,
   	               [classes.timelineSimplePanel]: simple
   	             })} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
   		<div style={{fontSize:'12px'}}>EMPTY OUT</div>
   	     </div>
   	     <div className={
   	            classes.timelinePanelCustom +
   	            " " +
   	            cx({
   	              [classes.timelineSimplePanel]: simple
   	            })}>
   	     <div className={classes.timelineBody}>
   	            <a component={Link} target="_blank" href={"/svc/demDet/Export"}>
   	      {stories.empty_out}</a>&nbsp;CNTR</div>           
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
   		<LocalShipping className={classes.badgeIconCustom} fontSize="large" style={{transform:'rotateY(180deg)'}}/>
   	     </div>
   	     <div className={classes.timelinePanelCustom +
   	             " " +
   	             cx({
   	               [classes.timelinePanelInverted]: true || simple,
   	               [classes.timelineSimplePanel]: simple
   	             })} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
   		<div style={{fontSize:'12px'}}>FULL IN</div>
   	     </div>
   	     <div className={classes.timelinePanelCustom +
   	            " " +
   	            cx({
   	              [classes.timelineSimplePanel]: simple
   	            })}>
   	     <div className={classes.timelineBody}>
   	            <a component={Link} target="_blank" href={"/svc/demDet/Export"}>
   	            {stories.full_in}</a>&nbsp;CNTR</div>           
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
   		<ArrowUpwardIcon className={classes.badgeIconCustom} fontSize="large"/>
   	     </div>
   	     <div className={ classes.timelinePanelCustom +
   	             " " +
   	             cx({
   	               [classes.timelinePanelInverted]: true || simple,
   	               [classes.timelineSimplePanel]: simple
   	             })} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
   		<div style={{fontSize:'12px'}}>LOAD</div>
   	     </div>
   	     <div className={
   	            classes.timelinePanelCustom +
   	            " " +
   	            cx({
   	              [classes.timelineSimplePanel]: simple
   	            })}>
   	     <div className={classes.timelineBody}>
   	            <a component={Link} target="_blank" href={"/svc/demDet/Export"}>
   	            {stories.load_cnt}</a>&nbsp;CNTR</div>           
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
   		<DirectionsBoatOutlined className={classes.badgeIconCustom} fontSize="large"/>
   	     </div>
   	     <div className={classes.timelinePanelCustom +
   	             " " +
   	             cx({
   	               [classes.timelinePanelInverted]: true || simple,
   	               [classes.timelineSimplePanel]: simple
   	             })} style={{paddingBottom:'0px',paddingTop:'10px',paddingLeft:'4px'}}>
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
   	<li className={classes.itemCustom} >
   	     <div className={classes.timelineBadgeCustom +
   	             " " +
   	             classes["primary"] +
   	             " " +
   	             cx({
   	               [classes.timelineSimpleBadge]: simple
   	             })}>
   		<LanguageOutlined className={classes.badgeIconCustom} fontSize="large"/>
   	     </div>
   	     <div className={classes.timelinePanelCustom +
   	             " " +
   	             cx({
   	               [classes.timelinePanelInverted]: true || simple,
   	               [classes.timelineSimplePanel]: simple
   	             })} style={{paddingBottom:'0px',paddingTop:'10px',paddingLeft:'4px'}}>
   		<div style={{fontSize:'12px'}}>POD ARRIVAL<br/><p style={{fontSize:"8px"}}>(LAST 7DAYS)</p>
   	        </div>
   	     </div>
   	     <div className={classes.timelinePanelCustom +
   	             " " +
   	             cx({
   	               [classes.timelineSimplePanel]: simple
   	             })}>
   	     <div className={classes.timelineBody}>
   	            <a component={Link} target="_blank" href={"/svc/tracking?dategb=D&ietype=E&from=7&to=T"}>
   	            {stories.pod_arrival}</a>&nbsp;B/L</div>           
   	     </div>
   	</li>
</ul>
  );
}
