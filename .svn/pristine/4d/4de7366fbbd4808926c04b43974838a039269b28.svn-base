
import PropTypes from 'prop-types';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import React,{ useState, useEffect, Component } from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants'
// core components
//import CardIcon from "components/Card/CardIcon.js";
// other import
//import moment from 'moment';
import {TextField} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TerminalList from './TerminalList.js';
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
import { compose, withStateHandlers, withProps, withHandlers, withState } from "recompose";
import Switch from '@material-ui/core/Switch';
import dotenv from "dotenv";
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
  autoSize: {
    width: 180,
  }
}));
dotenv.config();



export default function DemDetMap(props) {
  const classes = useStyles();
  const [portCode, setPortCode] = useState([]);
  const [portCodeCopy, setPortCodeCopy] = useState([]);
  const portwgs84 = {lat: 36.431748, lng: 127.384496};
  
  
  
  useEffect(() => {
    console.log('호출....');
    axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCode(res.data));
    
    axios.post("/loc/getPort",{ portCode:""}).then(res => setPortCodeCopy(res.data));
    return () => {
        console.log('cleanup');
      };
  },[]);
    
    
  const getPort = (port) => {
    if (port != null) {
        axios.post("/loc/getPort",{ portCode:port.port_code}).then(res => setPortPostion(res.data));



    } else{
        axios.post("/loc/getPort",{ portCode:''}).then(res => setPortPostion(res.data));
    }
  }
    
  const setPortPostion = (data) => {
    setPortCode(data);
  }

  const getPortInfo = (port, props) =>  {
    return(
      <TerminalList port={port}/>
    )
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
      centerPosition: portwgs84
    }), 
    {
    onToggleOpen: ({ isOpen }) =>(portCode) => ({
      isOpen: !isOpen,
      port: portCode})
    
    },
    {
    onToggleOpen2: ({isOpen}) => ({
      isOpen: !isOpen
    })
    }
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
    }),
    withStateHandlers(() => ({
      menuVisible2: false,
      
    }),
    {
    onMenuVisible2: ({ menuVisible2 }) =>() => ({
      menuVisible2: !menuVisible2,
  
    }),
    }),  
    withStateHandlers(() => ({
      menuDisplay1: "none",
      menuDisplay2: "none"
      
    }),
    {
    onMenuDisplay: () =>(menuDisplay1, menuDisplay2) => ({
      menuDisplay1: menuDisplay1,
      menuDisplay2: menuDisplay2,
  
    }),
    }),
    withStateHandlers(() => ({
      locationlat: 0,
      locationlng: 0
      
    }),
    {
    onLocation: () =>(lat, lng) => ({
      locationlat: lat,
      locationlng: lng,
  
    }),
    }),        
    withState('zoom','onZoomChange',8),
    withHandlers(() => {
      const refs = {
        map: undefined,
      }

      return {
        onMapMounted: () => ref => {
          refs.map = ref
        },
        onZoomChanged: ({onZoomChange}) => () => {
          onZoomChange(refs.map.getZoom())
        }
      }
    }),
    withScriptjs,
    withGoogleMap
  
  )
  
  (props =>
    <div id = 'map'>
  
    <GoogleMap
    id = {props.map}
    defaultZoom={props.zoom}
    zoom={props.zoom}
    center={props.centerPosition}
    ref={props.onMapMounted}
    defaultCenter={ props.centerPosition }
    defaultOptions={{
      
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      mapTypeControl: true,
      minZoom: 3,
     
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      },
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    onZoomChanged ={props.onZoomChanged}
    options={{
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: props.setStyle,
      mapTypeControl: true,
      minZoom: 3,
      mapTypeControlOptions: {
        mapTypeIds: ['styled_map']
      },
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    mapContainerStyle={{
      height:"37vh",
      width:"100%"
    }}
    onMouseMove={(e) => {props.onLocation(e.latLng.lat(),e.latLng.lng())}
    
    }
    onClick={(e)=> {props.onToggleOpen()}}
    style={{width:'100%', height: `400px` }}
    
    >
      <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
          <a>lat : {props.locationlat}, lng : {props.locationlng}</a>
      </MapControl>
      <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
          <a>{"Zoom Level : " + props.zoom}</a>
      </MapControl>  
      <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
        <div style={{backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px', float:'right'}}>
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
        <div style={{display:'inline-block', backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px'}}>
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
        <div style={{backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px', float:'right'}}>
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
        <div style={{display:'inline-block', backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'10px'}}>
          <div style={{display:props.menuDisplay2, marginTop:"10px", marginLeft:"15px", marginRight:"15px", marginBottom:"5px"}}>
            <h4>Marker On/Off</h4>
            <Grid component="label" container alignItems="center" spacing={1}>
              <Grid item>Off</Grid>
              <Grid item>
                <Switch defaultChecked={true}
                        onChange={e => props.onMarkerView(e.target.checked)}
                        value="MapSwitch"/>
              </Grid>
              <Grid item>On</Grid>
            </Grid>
            <h4>Search Port</h4>
              <div className={classes.autoSize}>
                <Autocomplete
                  options = {portCodeCopy}
                  getOptionLabel = { option => "["+option.port_kname+"] "+option.port_code}
                  id="portCodeCopy"
                  defaultValue={{port_kname:"전체",port_code:""}}
                  onChange={(e, value) => getPort(value) }
                  renderInput={params => (<TextField {...params} label="Select Port" fullWidth />)}/>
             </div>   
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
  return (
        <DemDetMap></DemDetMap>
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