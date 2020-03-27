
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
import CustomInput from "components/CustomInput/CustomInput.js";
import { CardContent, TextField, ListItemIcon, Divider} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TerminalList from 'views/Pages/DemDet/Map/TerminalList.js';
import axios from 'axios';
import MapSkin from './CustomMap';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import FilterIcon from '@material-ui/icons/Filter';
import RoomIcon from '@material-ui/icons/Room';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline
  } from "react-google-maps";
import { compose, withStateHandlers, withProps, lifecycle } from "recompose";
import Switch from '@material-ui/core/Switch';
import dotenv from "dotenv";

import AppBar from '@material-ui/core/AppBar';

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
dotenv.config();





export default function DemDetMap() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [terminalPosition, setTermainalPosition] = useState([]);
  const [portCode, setPortCode] = useState([]);
  const [portCodeCopy, setPortCodeCopy] = useState([]);
  const portwgs84 = {lat: 36.431748, lng: 127.384496};
  const flightPlanCoordinates = [];
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  
 
    useEffect(() => {
      console.log('호출....');
      axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCode(res.data));
      
      axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCodeCopy(res.data));
      axios.post("/loc/getPortLocation",{ portCode:[]}).then(res => setTermainalPosition(res.data));
      return () => {
          console.log('cleanup');
        };
    },[]);
    //const img = require('images/googleMap/dark.png');
    
    
    const getPort = (port) => {
        if (port != null) {
            axios.post("/loc/getPort",{ portCode:port.port_code}).then(res => setPortPostion(res.data));
          }
    }
    
    const setPortPostion = (data) => {
      setPortCode(data);
    }
    
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
    
    const getPortInfo = (port, props) =>  {
      return(
        <TerminalList
          port={port}
        />
      )
    }

for (let v = 0; v < terminalPosition.length; v++) {
  flightPlanCoordinates.push({lat: terminalPosition[v].wgs84_y, lng: terminalPosition[v].wgs84_x});
}    
const DemDetMap=compose(
  
  withProps({

    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
    loadingElement: <div style={{ height:`100%`}}/>,
    containerElement: <div style={{width:'100%', height: `80vh` }}/>,
    mapElement: <div style={{height:`100%` }}/>,
  }),
  withStateHandlers(() => ({
    isOpen: false,
    port: "",
    centerPosition: portwgs84,
    map: "map"
  }), 
  {
  onToggleOpen: ({ isOpen }) =>(portCode, positionX, positionY) => ({
    isOpen: !isOpen,
    port: portCode,
    centerPosition: {lat: positionY, lng: positionX}})
  
},

  ),
  withStateHandlers(() => ({
    setStyle: []
  }),
  {
  onSetMapStyle: () =>(skin) => ({
    setStyle: skin
  }),
    
  }
  ),
  withStateHandlers(() => ({
    markerVisible: true
  }),
  {
  onMarkerView: () =>(switchMarker) => ({
    markerVisible: switchMarker
  }),
  }
  ),
  withStateHandlers(() => ({
    menuVisible1: false
  }),
  {
  onMenuVisible1: ({ menuVisible1 }) =>() => ({
    menuVisible1: !menuVisible1,
  }),

  }
  ),
  withStateHandlers(() => ({
    menuVisible2: false,
    
  }),
  {
  onMenuVisible2: ({ menuVisible2 }) =>() => ({
    menuVisible2: !menuVisible2,

  }),

  }
  ),  
  withStateHandlers(() => ({
    menuDisplay1: "none",
    menuDisplay2: "none"
    
  }),
  {
  onMenuDisplay: () =>(menuDisplay1, menuDisplay2) => ({
    menuDisplay1: menuDisplay1,
    menuDisplay2: menuDisplay2,

  }),

  }
  ),  
  withScriptjs,
  withGoogleMap

)

(props =>
  <div id = 'map'>

  <GoogleMap
  id = {props.map}
  defaultZoom={6}
  center={props.centerPosition}
  onClick={(e) => {
    if(props.isOpen==true) {
      props.onToggleOpen('',e.latLng.lat(), e.latLng.lng());
    }else {
      props.onToggleOpen('',e.latLng.lat(), e.latLng.lng());
    }
  }}
  defaultCenter={ props.centerPosition }
  defaultOptions={{
    scrollwheel: true,
    zoomControl: true,
    disableDefaultUI: true,
    keyboardShortcuts: true,
    styles: props.setStyle,
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['styled_map']
    }
  }}
  options={{
    scrollwheel: true,
    zoomControl: true,
    disableDefaultUI: true,
    keyboardShortcuts: true,
    styles: props.setStyle,
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['styled_map']
    }
  }}
  mapContainerStyle={{
    height:"37vh",
    width:"100%"
  }}
  onMouseMove={(e) => {
    console.log(e);
  }
    
  }
  style={{width:'100%', height: `400px` }}
  
  >
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
      <div style={{backgroundColor:"#C6C6C6", marginTop:"10px", marginRight:"5px", borderRadius:'20px', float:'right'}}>
        <IconButton
          color="secondary"
          onClick={() => {
            if (props.menuDisplay1 == "none") {
                props.onMenuDisplay("block",props.menuDisplay2);
            }else {
                props.onMenuDisplay("none", props.menuDisplay2);
            }
          }}> 
         <FilterIcon/>
        </IconButton>
      </div>      
      <div style={{display:'inline-block', backgroundColor:"#C6C6C6", marginTop:"10px", marginRight:"5px", borderRadius:'20px'}}>
        <div style={{display:props.menuDisplay1}}>
          <img style={{marginLeft:"20px"}} src={require("assets/img/googleMap/dark.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleDark)}/>
          <img style={{marginLeft:"5px"}} src={require("assets/img/googleMap/aubergine.png")} onClick={() => props.onSetMapStyle(MapSkin.MapAubergine)}/>
          <img style={{marginLeft:"5px"}} src={require("assets/img/googleMap/night.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleNight)}/>
          <img style={{marginLeft:"5px"}} src={require("assets/img/googleMap/retro.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleRetro)}/>
          <img style={{marginLeft:"5px"}} src={require("assets/img/googleMap/silver.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleSilver)}/>
          <img style={{marginLeft:"5px",marginRight:"20px"}} src={require("assets/img/googleMap/normal.png")} onClick={() => props.onSetMapStyle([])}/>
        </div>
      </div>
  </MapControl>


  
  <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
      <div style={{backgroundColor:"#C6C6C6", marginTop:"10px", marginRight:"5px", borderRadius:'20px', float:'right'}}>
        <IconButton
          color="secondary"
          onClick={() => {
            if (props.menuDisplay2 == "none") {
                props.onMenuDisplay(props.menuDisplay1,"block");
            }else {
                props.onMenuDisplay(props.menuDisplay1,"none");
            }
          }}> 
        <RoomIcon/>
        </IconButton>
      </div>      
      <div style={{display:'inline-block', backgroundColor:"#C6C6C6", marginTop:"10px", marginRight:"5px", borderRadius:'20px'}}>
        <div style={{display:props.menuDisplay2, marginTop:"10px", marginLeft:"15px", marginRight:"15px", marginBottom:"5px"}}>
          <Grid component="label" container alignItems="center" spacing={1}>
            <Grid item>Off</Grid>
            <Grid item>
              <Switch defaultChecked={true}
                      onChange={e => props.onMarkerView(e.target.checked)}
                      value="MapSwitch"/>
            </Grid>
            <Grid item>On</Grid>
          </Grid>
            <Autocomplete
              options = {portCodeCopy}
              getOptionLabel = { option => "["+option.port_kname+"] "+option.port_code}
              id="portCodeCopy"
              onChange={(e, value) => getPort(value) }
              renderInput={params => (<TextField {...params} label="PORT" fullWidth />)}/>
        </div>    
      </div>

            
            
  </MapControl>  
  
        
    
  {
    portCode.length !== 0 && (portCode.map((data, index) => {

        return(
          <Marker 
            key = {data.port_code}
            draggable = {false} 
            position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
            icon={require("assets/img/marker.png")}
            defaultVisible={props.markerVisible}
            visible={props.markerVisible}
            onClick={() => props.onToggleOpen(data.port_code, data.wgs84_x, data.wgs84_y) }>
            {props.isOpen && data.port_code == props.port && getPortInfo(data)}
          </Marker>
        )
        
    }))
  } 
  
  </GoogleMap>
  </div>
)

//////////////////////////////////////
const CargoTrackingMap=compose(
  
  withProps({

    googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
    loadingElement: <div style={{ height:'100%'}}/>,
    containerElement: <div style={{width:'100%', height: `80vh` }}/>,
    mapElement: <div style={{ height:'100%' }}/>,
  }),
  withStateHandlers(() => ({
    isOpen: false,
    terminalPosition: terminalPosition,
    port: "",
    centerPosition: portwgs84,
    zoom: 8,
    map: "map"
  }), 
  {
  onToggleOpen: ({ isOpen }) =>(portCode, positionX, positionY, zoom) => ({
    isOpen: !isOpen,
    port: portCode,
    zoom: zoom,
    centerPosition: {lat: positionY, lng: positionX} 
  }),
  
  },

  ),  
  withScriptjs,
  withGoogleMap,
)

(props =>
  <GoogleMap
  defaultZoom={props.zoom}
  center={props.centerPosition}
  defaultCenter={15}
  defaultOptions={{
    scrollwheel: true,
    zoomControl: true,
    disableDefaultUI: true,
    keyboardShortcuts: true,
    styles: props.setStyle,
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['styled_map']
    }
  }}
  zoom={props.zoom}
  options={{
    scrollwheel: true,
    zoomControl: true,
    disableDefaultUI: true,
    keyboardShortcuts: true,
    styles: props.setStyle,
    mapTypeControl: true,
    mapTypeControlOptions: {
      mapTypeIds: ['styled_map']
    }
  }}
  
  >
  <MapControl position = {window.google.maps.ControlPosition.TOP_CENTER}>
    <div style={{backgroundColor:'#C6C6C6', borderRadius: '40px'}}>
      <TextField
      
        id='CntrNBl'
        label='Cntr No & BL'
        variant='filled'
        color='primary'
      />    
    </div>
  </MapControl>
  {
    props.terminalPosition.length !== 0 && (props.terminalPosition.map((data, index) => {

    
        return(
          <Marker 
            key = {data.terminal}
            draggable = {false} 
            position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
            icon={require("assets/img/marker.png")}>
          </Marker>
        )

    }))
  }
  
  <Polyline
    path={flightPlanCoordinates}
    geodesic={false}
    options=
    {
      {
      strokeColor: '#FF0000',
     strokeOpacity: 1,
     strokeWeight: 1,
     geodesic:false,
     icons: 
     [{
      icon: 
        {
        path : 1,
        strokeColor: '#0000FF'
        },
      offset: '2',
      repeat: '50px'
     }]
    }}
  />

  
  </GoogleMap>
)










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
      </Tabs>
    </AppBar>
    <TabPanel value={value} index={0}>
      <DemDetMap></DemDetMap>
    </TabPanel>
    <TabPanel value={value} index={1}>
      <CargoTrackingMap></CargoTrackingMap>
    </TabPanel>
  </div>
);
}

class MapControl extends Component {
  static contextTypes = {
    [MAP] : PropTypes.object
  }

  componentWillMount() {
    this.map = this.context[MAP]
    this.controlDiv = document.createElement('div');
    this.map.controls[this.props.position].push(this.controlDiv);
  }

  componentWillUnmount() {
    const controlArray = this.map.controls[this.props.position].getArray()
    for (let index in controlArray) {
      if(controlArray[index] === this.controlDiv) {
        this.map.controls[this.props.position].removeAt(index);
      }
    }
  }
  render() {
    return createPortal(this.props.children,this.controlDiv)
  }
}




