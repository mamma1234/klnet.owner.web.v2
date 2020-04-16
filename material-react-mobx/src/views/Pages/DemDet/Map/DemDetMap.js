
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import React,{ useState, useEffect, Component } from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants'
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import DemDetMap1 from "components/Map/DemDetMap.js"
import TrackingMap from "components/Map/TrackingMap.js"
import AppBar from '@material-ui/core/AppBar';
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TerminalList from 'views/Pages/DemDet/Map/TerminalList.js';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`nav-tabpanel-${index}`}
      aria-labelledby={`nav-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `nav-tab-${index}`,
    'aria-controls': `nav-tabpanel-${index}`,
  };
}

function LinkTab(props) {
  return (
    <Tab
      component="a"
      onClick={event => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  margin:{
    margin: theme.spacing(1)
  }
}));




export default function DemDetMap() {
  const [inputValue, setInputValue] = useState("");
	const [linkUrl,setLinkUrl] = useState("http://dev.seavantage.com/#/tracking/ship?");
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  
 
    useEffect(() => {
      console.log('호출....');
      return () => {
          console.log('cleanup');
        };
    },[]);
    
    
    
    
    const ValidationTextField = withStyles({
      root:{
        '& input:valid + fieldset' : {
          borderColor: 'green',
          borderWidth: 2,
        },
        '& input:invalid + fieldset': {
          borderColor: 'red',
          borderWidth: 2,
        },
        '& input:valid:focus + fieldset': {
          borderLeftWidth: 6,
          padding: '4px !important'
        },

      }
    })(TextField);
    
    const appendUrl = (appendImo) => {

      if(appendImo != "") {
        setLinkUrl(linkUrl + "&imoNo="+appendImo);
        console.log(linkUrl);
        setInputValue("");
      }else {
        alert("imo입력");
      }

      
    }

return (
  <div className={classes.root}>
    <AppBar position="static">
      <Tabs
        variant="fullWidth"
        value={value}
        onChange={handleChange}
        aria-label="nav tabs example"
      >
        <LinkTab label="DEM/DET/STOR MAP" href="/drafts" {...a11yProps(0)} />
        <LinkTab label="Cargo Tracking Map" href="/trash" {...a11yProps(1)} />
        <LinkTab label="TEST" href="/trash" {...a11yProps(2)} />
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <DemDetMap1></DemDetMap1>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <TrackingMap port={'KRPUS'}></TrackingMap>
    </TabPanel>
    <TabPanel value={value} index={2}>
    <Card className={classes.cardStyle}>
    	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
	    	<CardIcon color="info" style={{height:'26px'}}>
				<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
      		</CardIcon>
      	</CardHeader>
      	<CardBody style={{paddingBottom:'2px'}}>
			<GridContainer>
				<GridItem xs={12} sm={12} md={12}>

						<Grid container spacing={4}>
							<Grid item xs={12} sm={12} md={3}>
                <CustomInput
                  labelText="IMO ..."
                  id="imoNum"
                  name="inputValue"
                  formControlProps={{fullWidth: true}}
                  inputProps={{
                    onChange: event => setInputValue(event.target.value),
                    value:inputValue }}
                  />
							</Grid>
							<Grid item xs={12} sm={12} md={3}>
                <Button onClick={()=> { appendUrl(inputValue)}}>Search</Button>
							</Grid>
						</Grid>
					</GridItem>
			  </GridContainer>
			    <Grid item item xs={12} sm={12} md={12}>
				    <form target="maplink"> 
					    <iframe name="maplink" src={linkUrl}  width="100%" height="600" display='block' border='none' position="absolute" frameBorder="0" scrolling="auto" allowFullScreen></iframe>
				    </form>
			    </Grid>
			  </CardBody>
	    </Card> 
    </TabPanel>
  </div>
);
}



