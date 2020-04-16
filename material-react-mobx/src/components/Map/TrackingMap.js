
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
import axios from 'axios';
import MapSkin from './CustomMap';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/Filter';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
    InfoWindow
  } from "react-google-maps";
import { compose, withStateHandlers, withProps, withState, withHandlers } from "recompose";
import dotenv from "dotenv";
import SearchIcon from '@material-ui/icons/Search';

// @material-ui/core components
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// core components
///import Grid from '@material-ui/core/Grid';
//import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
//import icon
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
//import page



const useStyles = makeStyles(theme => ({
  root: {
    width: '1500px',
    height: '47vw'
  },
}));
dotenv.config();



export default function DemDetMap(props) {
    const classes = useStyles();
    const [terminalPosition, setTermainalPosition] = useState([]);
    const portwgs84 = {lat: 36.431748, lng: 127.384496};
    const flightPlanCoordinates = [];
    const { port } = props; 
    useEffect(() => {
      console.log('호출....');
      axios.post("/loc/getPortLocation",{ portCode:[port]}).then(res => setTermainalPosition(res.data));
      return () => {
        console.log('cleanup');
      };
    },[]);
      
    for (let v = 0; v < terminalPosition.length; v++) {
      flightPlanCoordinates.push({lat: terminalPosition[v].wgs84_y, lng: terminalPosition[v].wgs84_x});
    }    

    const TrackingMap=compose(

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
        centerPosition: portwgs84
      }), 
      {
      onToggleOpen: ({ isOpen }) =>(portCode, positionX, positionY) => ({
        isOpen: !isOpen,
        port: portCode,
        centerPosition: {lat: positionY, lng: positionX}
      }),
      }),
      withStateHandlers(() => ({
        setStyle: []
      }),
      {
      onSetMapStyle: () =>(skin) => ({
        setStyle: skin
      }),
      }),
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
        ocationlng: lng,
      }),
      }),  
      withStateHandlers(() => ({
        cntrNum: ""
      }),
      {
      onEditCntrNum: () => (cntrNum) => ({
        cntrNum: cntrNum
      }),
      }),   
      withStateHandlers(() => ({
        isInfoOpen: false,
        terminal: ""
      }),
      {
      onInfoCheck: () => (check, terminal) => ({
        isInfoOpen: check,
        terminal: terminal
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
      <GoogleMap
        defaultZoom={props.zoom}
        center={props.centerPosition}
        defaultCenter={15}
        ref={props.onMapMounted}
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
        onMouseMove={(e) => {props.onLocation(e.latLng.lat(),e.latLng.lng())}}>

          <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
            <a>lat : {props.locationlat} , lng : {props.locationlng}</a>
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
                <SearchIcon/>
              </IconButton>
            </div>      
            <div style={{display:'inline-block', backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'10px'}}>
              <div style={{display:props.menuDisplay2, marginTop:"10px", marginLeft:"15px", marginRight:"15px", marginBottom:"5px"}}>
                <TextField
                  id='CntrNBl'
                  label='Cntr No & BL'
                  variant='filled'
                  color='primary'/>
              </div>    
            </div>
          </MapControl>
          {props.terminalPosition.length !== 0 && (props.terminalPosition.map((data, index) => {
            return(
              <Marker 
                key = {data.terminal}
                draggable = {false} 
                position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
                icon={require("assets/img/marker.png")}
                onMouseOver={() => {if(!props.isInfoOpen){props.onInfoCheck(true, data.terminal)}}}
                onMouseOut={() => {if(props.isInfoOpen)props.onInfoCheck(false, data.terminal)}}>
                {props.isInfoOpen && data.terminal == props.terminal && (
                  <InfoWindow
                    position = {{lat:data.wgs84_y, lng:data.wgs84_x}}
                  >
                    <div>
                      Terminal : {data.terminal_kname}<br></br>
                      TerminalEname : {data.terminal_ename}
                    </div>
                  </InfoWindow>
                )}
              </Marker>
            )}))
          }

          <Polyline
            path={flightPlanCoordinates}
            geodesic={false}
            options={{
              strokeColor: '#FF0000',
              strokeOpacity: 1,
              strokeWeight: 1,
              geodesic:false,
              icons:[{
                icon:{
                  path : 1,
                  strokeColor: '#0000FF'
                },
              offset: '2',
              repeat: '50px'}]
            }}
          />   
      </GoogleMap>
    )
      return (
      <div className={classes.root}>  
        <Card>
          <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
            <CardIcon color="info">
              <Icon>content_copy</Icon>
            </CardIcon>
          </CardHeader>
          <CardBody style={{paddingBottom:'2px'}}>   
          <TrackingMap/>
          </CardBody>
        </Card>
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



