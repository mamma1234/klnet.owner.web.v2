import React,{Component} from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import dotenv from "dotenv";
import MapSkin from './CustomMap';
import {MAP} from 'react-google-maps/lib/constants';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import axios from 'axios';
import TerminalList from './TerminalList.js';
import FilterIcon from '@material-ui/icons/Filter';
import {IconButton} from "@material-ui/core";
dotenv.config();
const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`100%`}}/>,
      containerElement: <div style={{width:'100%', height: `80vh` }}/>,
      mapElement: <div style={{height:`100%` }}/>,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
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
    >
    <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
      <a href={"latlng"}>lat : {props.locationlat}, lng : {props.locationlng}</a>
    </MapControl>
    <MapControl position = {window.google.maps.ControlPosition.LEFT_TOP}>
      <div style={{marginTop:"10px", marginLeft:"5px", borderRadius:'15px', float:'left'}}>
        <img src={require("assets/img/pp_logo.gif")} alt={"plismplus"} width={"60px"} height={"40px"}/>
        <a href={"plismplus"} style={{marginTop:'7px', fontWeight:'bold',fontSize:'24px'}}>PLISM PLUS</a>
      </div>
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


    { props.portCode.length !== 0 && (props.portCode.map(data => {
        return(
          <Marker 
            key = {data.port}
            draggable = {false} 
            position={{lat:data.wgs84_y, lng:data.wgs84_x}} // 마커 위치 설정 {lat: ,lng: }   
            icon={data.sum==="0"?require("assets/img/marker.png"):require("assets/img/marker_red.png")}
            animation={data.sum==="0"?0:1}
            defaultVisible={props.markerVisible}
            options ={{
              label:{
                text: data.sum!=="0"?"　"+data.sum:" ",
                fontSize:'25px',
                fontWeight:'bold'
              }
            }}
            visible={props.markerVisible}
            onClick={() => props.onToggleOpen(data.port) }
            >
            {props.isOpen && data.port === props.port && props.getPortInfo(data)}
          </Marker>
        )
          
      }))
      
    } 

  </GoogleMap>
));

export default class DemDetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      zoom: 8,
      map: 'map',
      centerPosition: {
        lat: 36.431748, 
        lng: 127.384496
      },
      setStyle: [],
      locationlat:0,
      locationlng:0,
      token: props.store.token,
      portCode:[],
      portCodeCopy:[],
      markerVisible: true,
      isOpen:false,
      port:"",
      menuDisplay1: "none",
      menuDisplay2: "none"
    };
  }

  componentWillMount() {
    try {
      axios.post("/loc/getDemDetPort",{},{headers:{'Authorization':'Bearer '+this.state.token}}).then(res => {
        this.setState(state => ({
          portCodeCopy:res.data,
          portCode:res.data,
          
        }));
      }).catch(err => {
        if(String(err.response.status) === "403" || String(err.response.status) === "401") {
         // props.openLogin();
        }
    })
    
    } catch (e) {
        console.log(e);
    }
  }
  // shouldComponentUpdate(next,state) {
  //   const vital = this.state.portCode !== state.portCode;
  //   return vital
  // }
  handleMarkerClick = () => {
    this.setState(state => ({
      zoom:21
    }));
  }
  onMouseMove = (param1, param2) => {
    this.setState(state => ({
      locationlat:param1,
      locationlng:param2
    }));
  }
  onToggleOpen = (param1) => {
    this.setState({
      isOpen:!this.state.isOpen,
      port: param1
    })
  }
  getPortInfo = (param1) => {
    return(
      <TerminalList port={param1} token={this.state.token}/>
    )
  }
  onMenuDisplay = (param1, param2) => {
    this.setState(state => ({
      menuDisplay1: param1
    }))
  }
  
  getPort = ( port ) => {
    
    if (port != null) {
        axios.post("/loc/getDemDetPort",{ portCode:port.port},{headers:{'Authorization':'Bearer '+this.state.token}}).then(res => {
          this.setState(state => ({
            portCode:res.data
          }))
        }).catch(err => {
          if(String(err.response.status) === "403" || String(err.response.status) === "401") {
           // props.openLogin();
          }
      })
    } else{
        axios.post("/loc/getDemDetPort",{},{headers:{'Authorization':'Bearer '+this.state.token}})
        .then(res => {
          this.setState(state => ({
            portCode:res.data
          }))
        })
        .catch(err => {
          if(String(err.response.status) === "403" || String(err.response.status) === "401") {
           //props.openLogin();
          }
        });;
    }
  }
  onSetMapStyle = (param1) => {
    console.log(param1);
    this.setState(state => ({
      setStyle: param1
    }))
  }
  render() {
    return (
      <div>
        <MyMapComponent
          isMarkerShown={true}
          onMarkerClick={this.handleMarkerClick}
          onLocation={this.onMouseMove}
          zoom={this.state.zoom}
          setStyle={this.state.setStyle}
          centerPosition={this.state.centerPosition}
          locationlat={this.state.locationlat}
          locationlng={this.state.locationlng}
          portCode={this.state.portCode}
          markerVisible={this.state.markerVisible}
          onToggleOpen={this.onToggleOpen}
          getPortInfo={this.getPortInfo}
          isOpen={this.state.isOpen}
          port={this.state.port}
          onMenuDisplay={this.onMenuDisplay}
          getPort={this.getPort}
          onSetMapStyle={this.onSetMapStyle}
          menuDisplay1={this.state.menuDisplay1}
          menuDisplay2={this.state.menuDisplay2}
        />
      </div>
    );
  }
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