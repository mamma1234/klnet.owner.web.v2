import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import styles from "assets/jss/material-dashboard-pro-react/components/timelineStyle.js";

const useStyles = makeStyles(styles);

export default function Timeline(props) {
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
      {stories.map((prop, key) => {
        const panelClasses =
          classes.timelinePanelCustom +
          " " +
          cx({
            [classes.timelinePanelInverted]: prop.inverted || simple,
            [classes.timelineSimplePanel]: simple
          });
        const panelClasses1 =
            classes.timelinePanelCustom +
            " " +
            cx({
              [classes.timelineSimplePanel]: simple
            });
        const timelineBadgeClasses =
          classes.timelineBadgeCustom +
          " " +
          classes[prop.badgeColor] +
          " " +
          cx({
            [classes.timelineSimpleBadge]: simple
          });
        return (
          <li className={classes.itemCustom} key={key} >
            {prop.badgeIcon ? (
              <div className={timelineBadgeClasses}>
                <prop.badgeIcon className={classes.badgeIconCustom} fontSize="large"/>
              </div>
            ) : null}
            {prop.footer ?(
            <div className={panelClasses} style={{paddingTop:'10px',paddingBottom:'0',paddingLeft:'4px'}}>
                <div style={{fontSize:'12px'}}>{prop.title}<br/>{prop.footer}
                </div>
            </div>
              ) : 
            	  ( <div className={panelClasses} style={{paddingTop:'10px',paddingLeft:'4px'}}>
            	       <div style={{fontSize:'12px'}}>{prop.title}</div>
            	    </div>
            	   )
            }
            <div className={panelClasses1}>
            <div className={classes.timelineBody}>{prop.data}</div>           
          </div>
          </li>
        );
      })}
    </ul>
  );
}

Timeline.propTypes = {
  stories: PropTypes.arrayOf(PropTypes.object).isRequired,
  simple: PropTypes.bool
};
