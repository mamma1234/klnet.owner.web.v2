import PropTypes from 'prop-types';
  import React,{ Component } from "react";
  // @material-ui/core components
  import { createPortal } from 'react-dom';
  import {MAP} from 'react-google-maps/lib/constants'
  import axios from 'axios';
  import MapSkin from 'components/Map/CustomMap';
  import {Avatar, Card, CardHeader, IconButton, Switch, CardContent, AppBar, Tabs, Tab, Tooltip, Box, Grid, List,ListItem,ListItemText, FormControlLabel, Checkbox,Snackbar,Paper, InputBase,Divider, Collapse} from '@material-ui/core';
  import Button from "components/CustomButtons/Button.js";
  import CalendarBox from "components/CustomInput/CustomCalendar.js";
  import {withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline,InfoWindow,} from "react-google-maps";
  import Draggable from 'react-draggable';
  import { compose, withProps,withState,withHandlers } from "recompose";
  import CustomInput from "components/CustomInput/CustomInput.js";
  import MuiAlert from '@material-ui/lab/Alert';
  import moment from 'moment';
  import { red } from '@material-ui/core/colors';
  import SearchIcon from '@material-ui/icons/Search';
  import {Filter, DirectionsBoat, Replay, YoutubeSearchedFor, Close, FindInPage, Check, ArrowDownward, ArrowUpward} from '@material-ui/icons';
  import { ToggleButton } from '@material-ui/lab';
  import SubMap from 'views/Pages/TestPage/Satellite.js';
  import {userService} from 'views/Pages/Login/Service/Service.js';
  
  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  function TabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
      >
      {value === index && (
        <Box p={3}>
        <div>{children}</div>
        </Box>
      )}
      </div>
    );
    }
    TabPanel.propTypes = {
      children: PropTypes.node,
      index: PropTypes.any.isRequired,
      value: PropTypes.any.isRequired,
    };
    





const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`100%`}}/>,
      containerElement: <div style={{width:'100%', height: `80vh` }}/>,
      mapElement: <div style={{height:`100%` }}/>,
  }),
  withState('zoom','onZoomChange',3),
  withState('center','onCenterChange',{lat:36.431748,lng:127.384496}),
    withHandlers(() => {
      const refs = {
        map: undefined,
      }

      return {
        onMapMounted: () => ref => {
          refs.map = ref
        },
        onZoomChanged: ({onZoomChange}) => () => {
          onZoomChange(refs.map.getZoom());
        },
        onDragEnd: ({onCenterChange}) => () => {
          onCenterChange(refs.map.getCenter());
        },
        onSelectShip: ({onZoomChange, onCenterChange}) => (param1,param2,param3) =>{
          onCenterChange({lat:param1,lng:param2});
          onZoomChange(param3);
        }
      }
    }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap
    
    ref = {props.onMapMounted}
    defaultZoom={props.zoom}
    zoom={props.zoom}
    center={props.center}
    defaultOptions={{
      
      scrollwheel: true,
      zoomControl: true,
      disableDefaultUI: true,
      keyboardShortcuts: true,
      styles: [],
      mapTypeControl: false,
     
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
      zoomControlOptions: {
        position: window.google.maps.ControlPosition.RIGHT_CENTER
      }
    }}
    mapContainerStyle={{
      height:"37vh",
      width:"100%"
    }}
    onDragEnd={props.onDragEnd}
    onMouseMove={(e) => {props.onLocation(e.latLng.lat(),e.latLng.lng())}}
    onClick={(e)=> {props.onToggleOpen(); props.onPortToggle();}}
    style={{width:'100%', height: `400px` }}>
      
      <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
              <span>Zoom Level : {props.zoom}</span>
      </MapControl>
      <MapControl position = {window.google.maps.ControlPosition.RIGHT_BOTTOM}>
          <span>{props.locationlat.toFixed(4)} , {props.locationlng.toFixed(4)}</span>
      </MapControl>
      <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>
        <Paper component="form" style={{padding:'2px 4px', display:'flex', alignItems:'center',width:400}}>
          <InputBase 
            style={{flex:1}}
            placeholder="Insert Container Number"
            inputProps={{
              onChange: event => props.setKeyword(event.target.value)}}>
          </InputBase>
          <IconButton color="primary" onClick ={() => props.onSearch(props.keyword)}>
                  <YoutubeSearchedFor></YoutubeSearchedFor>
          </IconButton>
          <Divider style={{height:28, margin:4}} orientation="vertical"></Divider>
          <IconButton color="primary" onClick ={() => props.onInit()}>
            <Replay></Replay>
          </IconButton>
          <Divider style={{height:28, margin:4}} orientation="vertical"></Divider>
          <IconButton
            color="secondary"
            onClick={() => {
              if (props.menuDisplay1 === "none") {
                  props.onMenuDisplay("block");
              }else {
                  props.onMenuDisplay("none");
              }
            }}> 
           <Filter/>           
          </IconButton>

          
        </Paper>
      </MapControl>
         
      {props.checkParameter.length !== 0 ? (
        <MapControl position = {window.google.maps.ControlPosition.LEFT_TOP}>
        <Collapse in={props.checked} collapsedHeight={26}>
        <Paper component="form" style={{alignItems:'center',maxWidth:300, height:'100%'}}>
          {props.checked===true?(
            <IconButton onClick={() => props.toggleChecked(props.checked)} style={{width:'100%',height:12}} color="primary">
             <ArrowUpward></ArrowUpward>
            </IconButton>
            ):(<IconButton onClick={() => props.toggleChecked(props.checked)} style={{width:'100%',height:12}} color="primary">
              <ArrowDownward></ArrowDownward>
            </IconButton>)}
          
            <div style={{width:'100%',textAlignLast:'center'}}>
              <span style={{fontSize:'16px'}}>선박 정보</span>
              {props.shipList.length !== 0 ?(
                <IconButton style={{height:12}} color="primary" onClick={() => {props.onToggleOpen(props.shipList[0].shipId, props.shipList[0].nationCode)} }>
                  <YoutubeSearchedFor></YoutubeSearchedFor>
                </IconButton>
              ):null}
              
            </div>
            <Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
			     	<Grid container spacing={1}>
			     	  <Grid item xs={12} sm={12} md={6}>
                <span>컨 번호 : {props.checkParameter[0].cntr_no}</span>
						 </Grid>
						 
             <Grid item xs={12} sm={12} md={6} >
                <span>수출입 구분 : {props.checkParameter[0].ie_type ==="I"?"수입":props.checkParameter[0].ie_type ==="E"?"수출":""}</span>
             </Grid>
		        </Grid>
            <Grid container spacing={1}>
			     	  <Grid item xs={12} sm={12} md={6}>
                <span>선박명 : {props.checkParameter[0].vsl_name !== null?props.checkParameter[0].vsl_name:"Unknown"}</span>
						 </Grid>
						 
             <Grid item xs={12} sm={12} md={6} >
                <span>선사 : {props.checkParameter[0].carrier_name}</span>
             </Grid>
		        </Grid>
            <Grid container spacing={1}>
			     	  <Grid item xs={12} sm={12} md={6}>
                <span>출발지 : {props.checkParameter[0].pol_name}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].pol_wgs84_x !== null && props.checkParameter[0].pol_wgs84_y){props.onSelectShip(props.checkParameter[0].pol_wgs84_y,props.checkParameter[0].pol_wgs84_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
						 </Grid>
						 
             <Grid item xs={12} sm={12} md={6} >
                <span>목적지 : {props.checkParameter[0].pod_name}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].pod_wgs84_x !== null && props.checkParameter[0].pod_wgs84_y){props.onSelectShip(props.checkParameter[0].pod_wgs84_y,props.checkParameter[0].pod_wgs84_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
             </Grid>
		        </Grid>
		      </Grid>




          <div style={{width:'100%',textAlignLast:'center'}}>
              <h5>국내 정보</h5>
          </div>
          <Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
          {props.checkParameter[0].ie_type ==="I"?(
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
			     	<Grid container spacing={1}>
			     	  <Grid item xs={12} sm={12} md={12}>
               <span> 양하지 : {props.checkParameter[0].unload_name!==null?props.checkParameter[0].unload_name:"Unknown"}</span>
               <IconButton style={{height:25,width:25}} color="primary" onClick ={() =>{if(props.checkParameter[0].unload_y !== null && props.checkParameter[0].unload_x){props.onSelectShip(props.checkParameter[0].unload_y,props.checkParameter[0].unload_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
						  </Grid>
              <Grid item xs={12} sm={12} md={12}>
               <span> 풀컨반출지 : {props.checkParameter[0].full_outgate_name!==null?props.checkParameter[0].full_outgate_name:"Unknown"}</span>
               <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].full_outgate_y !== null && props.checkParameter[0].full_outgate_x){props.onSelectShip(props.checkParameter[0].full_outgate_y,props.checkParameter[0].full_outgate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
			     	  <Grid item xs={12} sm={12} md={12}>
               <span> 공컨반입지 : {props.checkParameter[0].mt_ingate_name!==null?props.checkParameter[0].mt_ingate_name:"Unknown"}</span>
               <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].mt_ingate_y !== null && props.checkParameter[0].mt_ingate_x){props.onSelectShip(props.checkParameter[0].mt_ingate_y,props.checkParameter[0].mt_ingate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
					  </Grid>
          </Grid>):
          (
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={12} md={12}>
                <span> 공컨반출지 : {props.checkParameter[0].mt_outgate_name!==null?props.checkParameter[0].mt_outgate_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].mt_outgate_y !== null && props.checkParameter[0].mt_outgate_x){props.onSelectShip(props.checkParameter[0].mt_outgate_y,props.checkParameter[0].mt_outgate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span> 풀컨반입지 : {props.checkParameter[0].full_ingate_name!==null?props.checkParameter[0].full_ingate_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].full_ingate_y !== null && props.checkParameter[0].full_ingate_x){props.onSelectShip(props.checkParameter[0].full_ingate_y,props.checkParameter[0].full_ingate_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={12}>
                <span> 선적지 : {props.checkParameter[0].load_name!==null?props.checkParameter[0].load_name:"Unknown"}</span>
                <IconButton style={{height:25,width:25}} color="primary" onClick ={() => {if(props.checkParameter[0].load_y !== null && props.checkParameter[0].load_x){props.onSelectShip(props.checkParameter[0].load_y,props.checkParameter[0].load_x,15)}}}>
                  <YoutubeSearchedFor style={{height:25,width:25}}></YoutubeSearchedFor>
                </IconButton>
             </Grid>
            </Grid>
          </Grid>)}



          <div style={{width:'100%',textAlignLast:'center'}}>
              <h5>화면 설정</h5>
          </div>
          <Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
          <Grid item xs={12} sm={12} md={12} style={{marginTop:20, padding:10}}>
            <Grid container spacing={1}>
              <Grid item xs={12} sm={3} md={4}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.vesselToggleChange(props.toggleVessel)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'13px'}}>선박</span>}
                  labelPlacement="start">

                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.terminalToggleChange(props.toggleTerminal)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'13px'}}>터미널</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={3} md={4}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.portToggleChange(props.togglePort)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'13px'}}>포트</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.carToggleChange(props.toggleCarTracking)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'11px'}}>차량 이동경로</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.shipToggleChange(props.toggleShipTracking)} color="primary" defaultChecked/>}
                  label={<span style={{fontSize:'11px'}}>선박 이동경로</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.carTimeStampChange(props.toggleCarTimeStamp)} color="primary"/>}
                  label={<span style={{fontSize:'13px'}}>차량<br></br>TIMESTAMP</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <FormControlLabel
                  value="start"
                  control={<Checkbox onChange={() => props.shipTimeStampChange(props.toggleShipTimeStamp)} color="primary"/>}
                  label={<span style={{fontSize:'13px'}}>선박<br></br>TIMESTAMP</span>}
                  labelPlacement="start">
                </FormControlLabel>
              </Grid>
            </Grid>
          </Grid>
          
        </Paper>
        </Collapse>
        
          

      </MapControl>

      ):null}

      <MapControl position = {window.google.maps.ControlPosition.RIGHT_TOP}>    
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
    {props.shipList.length !== 0 ? ( props.shipList.map((data, index) => {
      if(data.position != null) {
        return(
          <Marker 
            key = {index}
            draggable = {false}
            visible={props.toggleVessel}
            position={{lat:data.position.latitude, lng:data.position.longitude}} // 마커 위치 설정 {lat: ,lng: }   
            onClick={() => {props.onToggleOpen(data.shipId, data.nationCode)} }
            icon= {{
              url:require('assets/img/MapSprite1.png'),
              size:{
                width
                :(data.position.courseOverGround >0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.width
                :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.width
                :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.width
                :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.width
                :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.width
                :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.width
                :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.width
                :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.width
                :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.width
                :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.width
                :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.width
                :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.width
                :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.width
                :(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.width
                :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.width
                :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.width
                :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.width
                :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.width
                :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.width
                :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.width
                :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.width
                :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.width
                :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.width
                :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.width
                :props.shipRotate.rotate0.width,
                height
                :(data.position.courseOverGround >0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.height
                :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.height
                :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.height
                :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.height
                :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.height
                :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.height
                :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.height
                :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.height
                :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.height
                :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.height
                :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.height
                :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.height
                :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.height
                :(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.height
                :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.height
                :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.height
                :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.height
                :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.height
                :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.height
                :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.height
                :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.height
                :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.height
                :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.height
                :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.height
                :props.shipRotate.rotate0.height,
              },
              origin:{
                x
                :(data.position.courseOverGround >0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.x
                :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.x
                :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.x
                :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.x
                :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.x
                :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.x
                :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.x
                :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.x
                :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.x
                :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.x
                :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.x
                :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.x
                :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.x
                :(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.x
                :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.x
                :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.x
                :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.x
                :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.x
                :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.x
                :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.x
                :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.x
                :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.x
                :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.x
                :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.x
                :props.shipRotate.rotate0.x,
                y
                :(data.position.courseOverGround >0 && data.position.courseOverGround <= 15)?props.shipRotate.rotate1.y
                :(data.position.courseOverGround > 15 && data.position.courseOverGround <= 30)?props.shipRotate.rotate2.y
                :(data.position.courseOverGround > 30 && data.position.courseOverGround <= 45)?props.shipRotate.rotate3.y
                :(data.position.courseOverGround > 45 && data.position.courseOverGround <= 60)?props.shipRotate.rotate4.y
                :(data.position.courseOverGround > 60 && data.position.courseOverGround <= 75)?props.shipRotate.rotate5.y
                :(data.position.courseOverGround > 75 && data.position.courseOverGround <= 90)?props.shipRotate.rotate6.y
                :(data.position.courseOverGround > 90 && data.position.courseOverGround <= 105)?props.shipRotate.rotate7.y
                :(data.position.courseOverGround > 105 && data.position.courseOverGround <= 120)?props.shipRotate.rotate8.y
                :(data.position.courseOverGround > 120 && data.position.courseOverGround <= 135)?props.shipRotate.rotate9.y
                :(data.position.courseOverGround > 135 && data.position.courseOverGround <= 150)?props.shipRotate.rotate10.y
                :(data.position.courseOverGround > 150 && data.position.courseOverGround <= 165)?props.shipRotate.rotate11.y
                :(data.position.courseOverGround > 165 && data.position.courseOverGround <= 180)?props.shipRotate.rotate12.y
                :(data.position.courseOverGround > 180 && data.position.courseOverGround <= 195)?props.shipRotate.rotate13.y
                :(data.position.courseOverGround < 195 && data.position.courseOverGround <= 210)?props.shipRotate.rotate14.y
                :(data.position.courseOverGround > 210 && data.position.courseOverGround <= 225)?props.shipRotate.rotate15.y
                :(data.position.courseOverGround > 225 && data.position.courseOverGround <= 240)?props.shipRotate.rotate16.y
                :(data.position.courseOverGround > 240 && data.position.courseOverGround <= 255)?props.shipRotate.rotate17.y
                :(data.position.courseOverGround > 255 && data.position.courseOverGround <= 270)?props.shipRotate.rotate18.y
                :(data.position.courseOverGround > 270 && data.position.courseOverGround <= 285)?props.shipRotate.rotate19.y
                :(data.position.courseOverGround > 285 && data.position.courseOverGround <= 300)?props.shipRotate.rotate20.y
                :(data.position.courseOverGround > 300 && data.position.courseOverGround <= 315)?props.shipRotate.rotate21.y
                :(data.position.courseOverGround > 315 && data.position.courseOverGround <= 330)?props.shipRotate.rotate22.y
                :(data.position.courseOverGround > 330 && data.position.courseOverGround <= 345)?props.shipRotate.rotate23.y
                :(data.position.courseOverGround > 345 && data.position.courseOverGround <= 360)?props.shipRotate.rotate24.y
                :props.shipRotate.rotate0.y,
              }}}>
                  {props.isOpen && data.shipId === props.shipId && (
                              <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                                <Draggable>
                                  <Card style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>  
                                    <CardHeader 
                                      avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>{data.nationCode}</Avatar>}
                                      title={data.imoNo}
                                      subheader={data.shipName}
                                      action={
                                        <IconButton onClick={() => props.onToggleOpen(data.shipId)}>
                                          <Close/>
                                        </IconButton>
                                      }>
                                    </CardHeader>
                                    <CardContent>
                                      <AppBar position="static" color="default">
                                        <Tabs
                                          value={props.value}
                                          onChange={(e, v) => props.handleChange(v)}
                                          indicatorColor="primary"
                                          textColor="primary"
                                          aria-label="scrollable force tabs example">
                                            <Tab style={{width:'50%'}} label="Zoom"></Tab>
                                            <Tab style={{width:'50%'}} label="Info"></Tab>
                                        </Tabs>

                                      </AppBar>
                                      <TabPanel value={props.value} index={0} style={{height:'250px'}}>
                                          <SubMap parameter={data} gubun={"ship"}/>
                                      </TabPanel>
                                      <TabPanel value={props.value} index={1} style={{height:'250px'}}>
                                        <h4>IMO : {data.imoNo}</h4>
                                        <h4>SHIP NAME : {data.shipName}</h4>
                                        <h4>SHIP TYPE : {data.shipType}</h4>
                                        <h4>Destination : {data.destination}</h4>
                                        <h4>nation : {props.nationInfo !==null?props.nationInfo[0].nation_kname+'('+data.nationCode+')':data.nationCode}</h4>
                                      </TabPanel>
                                    </CardContent>
                                  </Card>
                                </Draggable>
                              </MapControl>
                                
                           
                          )} 

          </Marker> 
        )
      }else {
        return null;
      }})):null}
        {/* pol Marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
          if(data.pol != null && data.pol_wgs84_x !== null && data.pol_wgs84_y != null) {
            return(
              <Marker
                key={data.pol}
                draggable = {false} 
                visible={props.togglePort}
                position={{lat:data.pol_wgs84_y, lng:data.pol_wgs84_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.port.width,
                    height:props.shipRotate.port.height
                  },
                  origin:{
                    x:props.shipRotate.port.x,
                    y:props.shipRotate.port.y
                  }
                }}
                onClick={() => props.onPortToggle(data.pol)}>
                {props.isPortOver && data.pol === props.portCode && (
                  <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                    <Card  style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>
                      <CardHeader 
                        avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>KR</Avatar>}
                        title={props.nationEname}
                        subheader={props.nationName}
                        action={
                          <IconButton onClick={() => props.onPortMouseOut(data.pol)}>
                            <Close/>
                          </IconButton>
                        }>
                      </CardHeader>
                      <CardContent>
                        <div>
                          
                          <SubMap parameter={{wgs84_x:data.pol_wgs84_x,wgs84_y:data.pol_wgs84_y}} gubun={"port"}/>
                        </div>  
                          <span>Port : {props.portCode}<br></br></span>
                          <span> Port Nation : {props.nationCode}<br></br></span>
                          <span> Port EngName : {props.portEname}<br></br></span>
                          <span>Port Name : {props.portName}<br></br></span>
                      </CardContent>
                   </Card>
                 </MapControl>
                )}    
              </Marker>
            )
          }
        })):null}
        {/* pod Marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
          if(data.pod != null && data.pod_wgs84_x !== null && data.pod_wgs84_y != null) {
            return(
              <Marker
                key={data.pod}
                draggable = {false} 
                visible={props.togglePort}
                position={{lat:data.pod_wgs84_y, lng:data.pod_wgs84_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.port.width,
                    height:props.shipRotate.port.height
                  },
                  origin:{
                    x:props.shipRotate.port.x,
                    y:props.shipRotate.port.y
                  }
                }}
                onClick={() => props.onPortToggle(data.pod)}>
                {props.isPortOver && data.pod === props.portCode && (
                  <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                    <Card  style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>
                      <CardHeader 
                        avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>KR</Avatar>}
                        title={props.nationEname}
                        subheader={props.nationName}
                        action={
                          <IconButton onClick={() => props.onPortMouseOut(data.pod)}>
                            <Close/>
                          </IconButton>
                        }
                        >
                      </CardHeader>
                      <CardContent>
                        <div>
                          <SubMap parameter={{wgs84_x:data.pod_wgs84_x,wgs84_y:data.pod_wgs84_y}} gubun={"port"}/>
                        </div>  
                          <span>Port : {props.portCode}<br></br></span>
                          <span> Port Nation : {props.nationCode}<br></br></span>
                          <span> Port EngName : {props.portEname}<br></br></span>
                          <span>Port Name : {props.portName}<br></br></span>
                      </CardContent>
                   </Card>
                 </MapControl>
                )}    
                </Marker>
            )
          }
        })):null}
        {/* 선적지 marker  */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
           if(data.load_x !== null && data.load_y != null) {
            return(
              <Marker
                key={"load"}
                draggable = {false} 
                visible={props.toggleTerminal}
                position={{lat:data.load_y, lng:data.load_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.terminal.width,
                    height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
                
            )
          }
        })):null}
        {/* 양하지 marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
           
           if(data.unload_x != null && data.unload_y !== null) {
            return(
              <Marker
                key={"unload"}
                draggable = {false} 
                visible={props.toggleTerminal}
                position={{lat:data.unload_y, lng:data.unload_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.terminal.width,
                    height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
            )
          }
        })):null}
        {/* 풀컨반출지 marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
           
           if(data.full_outgate_x != null && data.full_outgate_y !== null) {
            return(
              <Marker
                key={"full_out"}
                draggable = {false} 
                visible={props.toggleTerminal}
                position={{lat:data.full_outgate_y, lng:data.full_outgate_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.terminal.width,
                    height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
            )
          }
        })):null}
        {/* 풀컨반입지 marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
           
           if(data.full_ingate_x != null && data.full_ingate_y !== null) {
            return(
              <Marker
                key={"full_in"}
                draggable = {false} 
                visible={props.toggleTerminal}
                position={{lat:data.full_ingate_y, lng:data.full_ingate_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.terminal.width,
                    height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
            )
          }
        })):null}
        {/* 공컨반입지 marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
           if(data.mt_ingate_x != null && data.mt_ingate_y !== null) {
            return(
              <Marker
                key={"mt_in"}
                draggable = {false} 
                visible={props.toggleTerminal}
                position={{lat:data.mt_ingate_y, lng:data.mt_ingate_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.terminal.width,
                    height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
            )
          }
        })):null}
        {/* 공컨반출지 marker */}
        {props.checkParameter.length !== 0 ? (props.checkParameter.map((data,index) => {
           if(data.mt_outgate_x != null && data.mt_outgate_y !== null) {
            return(
              <Marker
                key={"mt_out"}
                draggable = {false} 
                visible={props.toggleTerminal}
                position={{lat:data.mt_outgate_y, lng:data.mt_outgate_x}}
                icon={{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width:props.shipRotate.terminal.width,
                    height:props.shipRotate.terminal.height
                  },
                  origin:{
                    x:props.shipRotate.terminal.x,
                    y:props.shipRotate.terminal.y
                  }
                }}>
                </Marker>
            )
          }
        })):null}


      {/* 선박 timestamp*/}
    {props.shipPositions.length !== 0 ? (props.shipPositions.map((data,index) => {
      if(data.latitude != null && data.longitude !== null) {
        return(
          <Marker
            key={index}
            visible={props.toggleShipTimeStamp}
            draggable = {false} 
            position={{lat:data.latitude, lng:data.longitude}}
            title={data.timestamp}
            icon={require("assets/img/point.png")}>
            </Marker>
        )
      }
    })):null}
    {/* 차량 timestamp Tracking*/}
    {props.containerPositions.length !== 0 ? (props.containerPositions.map((data,index) => {
         if(data.latitude != null && data.longitude !== null) {
            return(
              <Marker
              
                key={index}
                visible={props.toggleCarTimeStamp}
                draggable = {false} 
                position={{lat:data.latitude, lng:data.longitude}}
                title={data.trace_date}
                icon={require("assets/img/point.png")}>
                </Marker>
            )
          }
        })):null}

    <Polyline
            path={props.positions}
            geodesic={false}
            visible={props.toggleShipTracking}
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
            }}/>

    <Polyline
      path={props.trackingPositions}
      geodesic={false}
      visible={props.toggleCarTracking}
      options={{
        strokeColor: '#FF00FF',
        strokeOpacity: 3,
        strokeWeight: 3,
        geodesic:false,
        icons:[{
          icon:{
            path : 1,
            strokeColor: '#0000FF'
          },
        offset: '2',
        repeat: '50px'}]
    }}/>
    </GoogleMap>
));

export default class DemDetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      paramCntr: props.location,
      setStyle: [], // GoogleMap 스킨 상태
      locationlat:0, // 현재 마우스 위치 Latitude 좌표
      locationlng:0, // 현재 마우스 위치 Longitude 좌표
      token: userService.GetItem()?userService.GetItem().token:null, // 토큰
      portCode:"", //Port상세보기 파라메터
      shipList:[], // 선박데이터
      positions:[], // 선박의 이동경로 
      shipPositions:[], // 선박 이동경로 TIME
      trackingPositions:[], // 내륙 이동경로
      containerPositions:[], //내륙 이동경로 TIME
      menuDisplay1: "none", // 1번메뉴 show hide
      keyword:"", //ContainerNumber키워드
      value:0, // 선박 상세보기 탭메뉴 밸류
      shipId:"", // 선박 상세보기를 위한 파라메터
      isOpen:false, // 선박 상세보기를 위한 플래그
      nationInfo:null, //선박의 국가정보 
      checkParameter:[], // 컨번호 조회 RESPONSE 
      severity:"", // Alert 메시지 상태
      alertOpen:false, // Alert Show hide 플래그
      toggleVessel:true, // 선박 마커 Show hide 플래그
      toggleTerminal:true, //터미널 마커 Show hide 플래그
      togglePort:true,  //포트 마커 Show hide 플래그
      toggleCarTracking:true, //차량 폴리라인 Show hide 플래그
      toggleShipTracking:true, //선박 폴리라인 Show hide 플래그
      toggleCarTimeStamp:false, // 차랑 타임스탬프 Show hide 마커 플래그 
      toggleShipTimeStamp:false, // 선박 타임스탬프 Show hide 마커 플래그
      checked:true,    //조회 상세정보 show hide 플래그
      isPortOver:false, // 포트 상세보기 Show hide 플래그
      errMessage:"", //Alert 에러메시지 내용
      nationCode:"", //포트 국가코드
      nationName:"", //포트 국가명
      nationEname:"", // 국가 영문명
      portEname:"", // 포트 국가영문명
      portName:"",  //포트명
      cntrList:[], // 유저컨테이너목록
      //ImageSprite 선박 회전율에 따른 이미지
      shipRotate: {
        port:{x:5,y:5,width:15,height:17},
        terminal:{x:5,y:32,width:16,height:26},
        rotate0:{x:5,y:68,width:16,height:13},
        rotate1:{x:5,y:91,width:14,height:23},
        rotate2:{x:5,y:124,width:16,height:22},
        rotate3:{x:5,y:156,width:21,height:21},
        rotate4:{x:5,y:187,width:22,height:16},
        rotate5:{x:5,y:213,width:23,height:14},
        rotate6:{x:5,y:237,width:22,height:10},
        rotate7:{x:5,y:257,width:23,height:13},
        rotate8:{x:5,y:280,width:22,height:17},
        rotate9:{x:5,y:307,width:21,height:20},
        rotate10:{x:5,y:337,width:16,height:23},
        rotate11:{x:5,y:370,width:14,height:24},
        rotate12:{x:5,y:404,width:10,height:22},
        rotate13:{x:5,y:436,width:13,height:24},
        rotate14:{x:5,y:470,width:17,height:23},
        rotate15:{x:5,y:503,width:20,height:20},
        rotate16:{x:5,y:533,width:23,height:17},
        rotate17:{x:5,y:560,width:24,height:13},
        rotate18:{x:5,y:583,width:22,height:10},
        rotate19:{x:5,y:603,width:24,height:14},
        rotate20:{x:5,y:627,width:23,height:16},
        rotate21:{x:5,y:653,width:20,height:21},
        rotate22:{x:5,y:684,width:17,height:22},
        rotate23:{x:5,y:716,width:13,height:23},
        rotate24:{x:5,y:749,width:16,height:13},
    }
    };
  }

  componentWillMount() {
    if((this.state.paramCntr.state ===null || this.state.paramCntr.state === undefined)){
      if(this.state.paramCntr.search !== "") {
        const findText = "?cntr_no=";
        if(this.state.paramCntr.search.indexOf(findText) !== -1) {
          this.onSearch(this.state.paramCntr.search.replace(findText,""))
        }else {
        
        }
      }
    }else {
      this.onSearch(this.state.paramCntr.state.param)
    } 
    
  }
  onMenuDisplay = (param1) => {
    this.setState(state => ({
      menuDisplay1: param1,
    }))
  }
  
  onSetMapStyle = (param1) => {
    this.setState(state => ({
      setStyle: param1
    }))
  }
  onMouseMove = (param1,param2) => {
    this.setState(state => ({
      locationlat:param1,
      locationlng:param2
    }));
  }
  onToggleOpen = (param1, param2) => {
    if(param2 !== undefined) {
      axios.post("/com/getNationName",{nationCode: param2},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
        res=> {
          if( res.data.length !== 0) {
            this.setState(state => ({
              nationInfo: res.data
            }))
          } 
        }
      )
    }
    
    this.setState({
      isOpen:!this.state.isOpen,
      shipId: param1
    })
  }


  onSetMapStyle = (param1) => {
    this.setState(state => ({
      setStyle: param1
    }))
  }
  setKeyword = (param) => {
    this.setState(state => ({
      keyword:param
    }))
  }  
  
  handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
      return;
    }
    this.setState(state => ({
      alertOpen:false
    }))
  }
  onSearch = (param) => { 
    if(param === "") {
      this.setState(state => ({
        errMessage:"Container 번호를 입력해주세요.",
        severity:"error",
        alertOpen:true}));
      return;
    }
    axios.post("/loc/checkCntrNumber", {param: param},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
      res=> {
        if(res.data.length !== 0) {
          this.setState(state => ({
            checkParameter:res.data
          }))
          axios.post("/loc/getContainerMovement",{param:res.data},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
            res => {
              if(res.data.sendMessage==="SUCCESS" && res.data.result.length !== 0 ) {
                let tempLocation = [];
                
                res.data.result.forEach(element => {
                         
                  tempLocation.push({lat:element.latitude, lng:element.longitude})
                })
                this.setState(state => ({
                  containerPositions:res.data.result,
                  trackingPositions:tempLocation,
                }))
              }else {
                this.setState(state => ({
                  containerPositions:[],
                  trackingPositions:[]
                }))
              }
            }
          )
          axios.post('/com/searchship',{param:res.data[0].vsl_name},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
            res => {
              if(res.data.length !== 0 ) {
                let endDate = moment(this.state.checkParameter[0].end_date).format('YYYY-MM-DDT23:59:59') + 'Z'
                let startDate = moment(this.state.checkParameter[0].start_date).format('YYYY-MM-DDT00:00:00')+ 'Z'
                let tempLocation = [];
                  
                  
                axios.post('/com/searchTrack',{ship:res.data.response[0].shipId,toD:endDate,fromD:startDate},{headers:{'Authorization':'Bearer '+this.state.token}}).then(res=> {
                  if(res.data.length !== 0 ) {
                    if(res.data.response.trackData != null) {
                      res.data.response.trackData.forEach(element => {
                         
                          tempLocation.push({lat:element.latitude, lng:element.longitude})
                      })
                      this.setState(state => ({
                        shipPositions:res.data.response.trackData,
                        positions:tempLocation,
                        errMessage:"조회가 완료되었습니다.",
                        severity:"success",
                        alertOpen:true,
                      }))
                    }
                  }else {
                    this.setState(state => ({
                      errMessage:"해당 선박의 이동 경로를 찾을 수 없습니다.",
                      severity:"error",
                      alertOpen:true,
                      positions:[],
                      shipPositions:[]
                    }));
                  }
                }).catch(err => {
                  this.setState(state => ({
                    errMessage:err,
                    severity:"error",
                    alertOpen:true}));
                });
                this.setState(state => ({
                  shipList: res.data.response
                }))
               
              }else {
                this.setState(state => ({
                  errMessage:"등록 되어있는 선박 정보를 찾을 수 없습니다.",
                  severity:"error",
                  alertOpen:true,
                  shipList:[],
                }));
              }
              
            })
            
        }else {
          this.setState(state => ({
            errMessage:"등록 되어있는 컨테이너 번호가 없습니다.",
            severity:"error",
            alertOpen:true,
            checkParameter:[],
          
          }));
        }

    })
    
  }

  onInit = () => {
    this.setState(state => ({
      portCode:"", //Port상세보기 파라메터
      shipList:[], // 선박데이터
      positions:[], // 선박의 이동경로 
      shipPositions:[], // 선박 이동경로 TIME
      trackingPositions:[], // 내륙 이동경로
      containerPositions:[], //내륙 이동경로 TIME
      menuDisplay1: "none", // 1번메뉴 show hide
      keyword:"", //ContainerNumber키워드
      value:0, // 선박 상세보기 탭메뉴 밸류
      shipId:"", // 선박 상세보기를 위한 파라메터
      isOpen:false, // 선박 상세보기를 위한 플래그
      nationInfo:null, //선박의 국가정보 
      checkParameter:[], // 컨번호 조회 RESPONSE 
      severity:"", // Alert 메시지 상태
      alertOpen:false, // Alert Show hide 플래그
      toggleVessel:true, // 선박 마커 Show hide 플래그
      toggleTerminal:true, //터미널 마커 Show hide 플래그
      togglePort:true,  //포트 마커 Show hide 플래그
      toggleCarTracking:true, //차량 폴리라인 Show hide 플래그
      toggleShipTracking:true, //선박 폴리라인 Show hide 플래그
      toggleCarTimeStamp:false, // 차랑 타임스탬프 Show hide 마커 플래그 
      toggleShipTimeStamp:false, // 선박 타임스탬프 Show hide 마커 플래그
      checked:true,    //조회 상세정보 show hide 플래그
      cntrChecked:true, //컨번 리스트 show hide 플래그
      isPortOver:false, // 포트 상세보기 Show hide 플래그
      errMessage:"", //Alert 에러메시지 내용
      nationCode:"", //포트 국가코드
      nationName:"", //포트 국가명
      nationEname:"", // 국가 영문명
      portEname:"", // 포트 국가영문명
      portName:"",  //포트명
    }))
  }
  vesselToggleChange = (param) => {
    this.setState(state => ({
      toggleVessel:!param
    }))
  }
  terminalToggleChange = (param) => {
    this.setState(state => ({
      toggleTerminal:!param
    }))
  }
  shipToggleChange = (param) => {
    this.setState(state => ({
      toggleShipTracking:!param
    }))
  }
  carToggleChange = (param) => {
    this.setState(state => ({
      toggleCarTracking:!param
    }))
  }
  portToggleChange = (param) => {
    this.setState(state => ({
      togglePort:!param
    }))
  }
  toggleChecked = (param) => {
    this.setState(state => ({
      checked:!param
    }))
  }
  cntrToggleChecked = (param) => {
    this.setState(state => ({
      cntrChecked:!param
    }))
  }
  carTimeStampChange = (param) => {
    this.setState(state => ({
      toggleCarTimeStamp:!param
    }))
  }
  shipTimeStampChange = (param) => {
    this.setState(state => ({
      toggleShipTimeStamp:!param
    }))
  }

  onPortMouseOut = (param) => {
    this.setState(state => ({
      isPortOver: false,
      portCode: param,
      nationCode:"",
      nationName:"",
      portEname:"",
      portName:"",
      nationEname:"",

    }))
  }
  onPortToggle =(param) => {
    this.setState(state=>({
      isPortOver:!this.state.isPortOver,
      portCode:param
    }))
    if(param !== undefined){
      axios.post("/com/getPortLocation",{portCode:param},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
        res=> {
          if(res) {
            this.setState(state => ({
              nationCode:res.data[0].nation_code,
              nationName:res.data[0].nation_kname,
              nationEname:res.data[0].nation_ename,
              nationKname:res.data[0].nation_kname,
              portEname:res.data[0].port_ename,
              portName:res.data[0].port_name,
            }))
          }
          
        }
      )
    }
  }
  
  handleChange =(param) => {
    this.setState(state => ({
      value: param
    }))
  }
  render() {
    return (
      <div>
        <MyMapComponent
          setStyle={this.state.setStyle}
          shipList={this.state.shipList}
          onLocation={this.onMouseMove}
          onSetMapStyle={this.onSetMapStyle}
          onMenuDisplay={this.onMenuDisplay}
          menuDisplay1={this.state.menuDisplay1}
          locationlat={this.state.locationlat}
          locationlng={this.state.locationlng}
          setKeyword={this.setKeyword}
          keyword={this.state.keyword}
          onSearch={this.onSearch}
          positions={this.state.positions}
          shipRotate={this.state.shipRotate}
          checkParameter={this.state.checkParameter}
          trackingPositions={this.state.trackingPositions}
          onInit={this.onInit}
          toggleVessel={this.state.toggleVessel}
          vesselToggleChange={this.vesselToggleChange}
          terminalToggleChange={this.terminalToggleChange}
          toggleTerminal={this.state.toggleTerminal}
          shipToggleChange={this.shipToggleChange}
          carToggleChange={this.carToggleChange}
          portToggleChange={this.portToggleChange}
          togglePort={this.state.togglePort}
          toggleCarTracking={this.state.toggleCarTracking}
          toggleShipTracking={this.state.toggleShipTracking}
          checked={this.state.checked}
          cntrChecked={this.state.cntrChecked}
          toggleChecked={this.toggleChecked}
          cntrToggleChecked={this.cntrToggleChecked}
          onPortToggle={this.onPortToggle}
          isPortOver={this.state.isPortOver}
          portCode={this.state.portCode}
          nationCode={this.state.nationCode}
          nationName={this.state.nationName}
          portEname={this.state.portEname}
          portName={this.state.portName}
          nationEname={this.state.nationEname}
          onPortMouseOut={this.onPortMouseOut}
          onToggleOpen={this.onToggleOpen}
          handleChange={this.handleChange}
          value={this.state.value}
          isOpen={this.state.isOpen}
          shipId={this.state.shipId}
          nationInfo={this.state.nationInfo}
          containerPositions={this.state.containerPositions}
          shipPositions={this.state.shipPositions}
          carTimeStampChange={this.carTimeStampChange}
          shipTimeStampChange={this.shipTimeStampChange}
          toggleCarTimeStamp={this.state.toggleCarTimeStamp}
          toggleShipTimeStamp={this.state.toggleShipTimeStamp}
          cntrList={this.state.cntrList}
          />

        <Snackbar open={this.state.alertOpen} autoHideDuration={6000} onClose={this.handleAlertClose}>
          <Alert 
            onClose={this.handleAlertClose}
            severity={this.state.severity}>
              {this.state.errMessage}
          </Alert>
        </Snackbar>

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

    