
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import React,{ Component } from "react";
// @material-ui/core components
import { createPortal } from 'react-dom';
import {MAP} from 'react-google-maps/lib/constants'
import MapSkin from './CustomMap';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/Filter';
import HighlightOff from '@material-ui/icons/HighlightOff';
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
    InfoWindow
  } from "react-google-maps";
import { compose, withStateHandlers, withProps, withState, withHandlers} from "recompose";
import dotenv from "dotenv";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";

const useStyles = makeStyles(theme => ({
  root: {
    width: '1300px',
    height: '80vh'
  },
}));
dotenv.config();


export default function TrackingMap(props) {
	console.log(props);
    const classes = useStyles();
    const terminalPosition = props.setData;
    const portwgs84 = {lat: 36.431748, lng: 127.384496};
    const flightPlanCoordinates = props.polyRender;



    const Map=compose(

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
        locationlng: lng,
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
        terminal: "",
        time: ""
      }),
      {
      onInfoCheck: () => (check, terminal, time) => ({
        isInfoOpen: check,
        terminal: terminal,
        time: time
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
        withGoogleMap,
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
            <span>lat : {props.locationlat} , lng : {props.locationlng}</span>
          </MapControl>
          <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
            <span>{"Zoom Level : " + props.zoom}</span>
          </MapControl>  
          <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
            <div style={{backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'15px', float:'right'}}>
              <IconButton
                color="secondary"
                onClick={() => {
                  if (props.menuDisplay1 === "none") {
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
                <img style={{marginLeft:"20px"}} alt={"dark"} src={require("assets/img/googleMap/dark.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleDark)}/>
                <img style={{marginLeft:"5px"}} alt={"aubergine"} src={require("assets/img/googleMap/aubergine.png")} onClick={() => props.onSetMapStyle(MapSkin.MapAubergine)}/>
                <img style={{marginLeft:"5px"}} alt={"night"} src={require("assets/img/googleMap/night.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleNight)}/>
                <img style={{marginLeft:"5px"}} alt={"retro"} src={require("assets/img/googleMap/retro.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleRetro)}/>
                <img style={{marginLeft:"5px"}} alt={"silver"} src={require("assets/img/googleMap/silver.png")} onClick={() => props.onSetMapStyle(MapSkin.MapStyleSilver)}/>
                <img style={{marginLeft:"5px",marginRight:"20px"}} alt={"normal"} src={require("assets/img/googleMap/normal.png")} onClick={() => props.onSetMapStyle([])}/>
              </div>
            </div>
          </MapControl>

          {props.terminalPosition.length !== 0 && (props.terminalPosition.map((data, index) => {
            return(
              <Marker 
                key = {index}
                draggable = {false} 
                position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
                icon={require("assets/img/marker.png")}
                onMouseOver={() => {if(!props.isInfoOpen){props.onInfoCheck(true, data.terminal, data.time)}}}
                onMouseOut={() => {if(props.isInfoOpen)props.onInfoCheck(false, data.terminal, data.time)}}>
                {props.isInfoOpen && (data.terminal === props.terminal && data.time === props.time) && (
                  <InfoWindow
                    position = {{lat:data.wgs84_y, lng:data.wgs84_x}}
                  >
                    <div>
                      Work :{data.work_name}<br></br>
                      Terminal : {data.terminal}<br></br>
                      Time : {data.time}
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
          {/* {props.directions.length !== 0 && props.directions && <DirectionsRenderer directions={props.directions}/>}    */}


      </GoogleMap>
    )
      return (
      <div className={classes.root}>  
      <HighlightOff onClick={()=>props.onClose()} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>
        <Card>
          <CardBody style={{paddingBottom:'2px'}}>   
          <Map/>
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
    const controlArray = this.map.controls[this.props.position].getArray();
    for (let i=0; i < controlArray.length; i++) {
      if(controlArray[i] === this.controlDiv) {
        this.map.controls[this.props.position].removeAt(i);
      }
    }
  }
  render() {
    return createPortal(this.props.children,this.controlDiv)
  }
}



