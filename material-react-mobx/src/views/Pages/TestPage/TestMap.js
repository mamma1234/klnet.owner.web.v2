import PropTypes from 'prop-types';
  import React,{ Component } from "react";
  // @material-ui/core components
  import { createPortal } from 'react-dom';
  import {MAP} from 'react-google-maps/lib/constants'
  import axios from 'axios';
  import MapSkin from 'components/Map/CustomMap';
  import {Avatar, Card, CardHeader, IconButton, Switch, CardContent, AppBar, Tabs, Tab, Tooltip, Box, Grid, List,ListItem,ListItemText,Paper, InputBase,Divider, Collapse} from '@material-ui/core';
  import Button from "components/CustomButtons/Button.js";
  import CalendarBox from "components/CustomInput/CustomCalendar.js";
  import SubMap from './Satellite.js'
  import {withScriptjs, withGoogleMap, GoogleMap, Marker, Polyline,} from "react-google-maps";
  import Draggable from 'react-draggable';
  import { compose, withProps,withState,withHandlers } from "recompose";
  import CustomInput from "components/CustomInput/CustomInput.js";
  
  import moment from 'moment';
  import { red } from '@material-ui/core/colors';
  import SearchIcon from '@material-ui/icons/Search';
  import {Filter, DirectionsBoat, Replay, YoutubeSearchedFor, Close, FindInPage, ArrowDownward, ArrowUpward} from '@material-ui/icons';
  

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
        onSelectShip: ({onZoomChange, onCenterChange}) => (param1,param2) =>{
          onCenterChange({lat:param1,lng:param2});
          onZoomChange(14);
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
    style={{width:'100%', height: `400px` }}
    >
    {props.shipList.length !== 0 ? (
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
              <span style={{fontSize:'16px'}}>검색 결과</span>
            </div>
            <Divider style={{height:3, margin:5}} orientation="horizontal"></Divider>
            <List style={{maxWidth:500, maxHeight:400, backgroundColor:'white', overflow:'auto'}}>
                  {props.shipList.map((element,index) => {
                    if(element.position !== null) {
                      return( 
                        <ListItem key={index} role={undefined} dense button 
                                  onClick={() => props.onSelectShip(element.position.latitude,element.position.longitude)}>
                            <ListItemText id={index} primary={element.shipName}/>
                        </ListItem>
                      )
                    }else {
                      return( 
                        <ListItem key={index} role={undefined} dense button onClick={() => alert("No Search Vessel Position")}>
                            <ListItemText id={index} primary={element.shipName}/>
                        </ListItem>
                      )
                    }
                  })
                  
                }
              </List>

          </Paper>
        </Collapse>
      </MapControl>
    ):null}
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
            placeholder=" Ship Name & IMO No "
            inputProps={{
              onChange: event => props.setKeyword(event.target.value)}}>
                  
          </InputBase>
          <IconButton color="primary" onClick ={() => props.onPathChange(props.keyword)}>
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
          <Divider style={{height:28,margin:4}} orientation="vertical"></Divider>
          <Switch defaultChecked={true}
                    onChange={e => props.onMarkerVisible(e.target.checked)}
                    value="MapSwitch"/>    
          
        </Paper>
      </MapControl>
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
        {props.portLocation.length !== 0 ? (props.portLocation.map((data,index) => {
          return(
            <Marker
              key={data.port_code}
              draggable = {false} 
              defaultVisible={props.markerVisible}
              visible={props.markerVisible}
              position={{lat:data.wgs84_y, lng:data.wgs84_x}}
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
              onClick={() => props.onPortToggle(data.port_code)}
              >
              {props.isPortOver && data.port_code === props.portCode && (
                <MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
                  <Card  style={{marginBottom: "50px",minWidth:400,maxWidth:500}}>
                    <CardHeader 
                      avatar={<Avatar aria-label="recipe" style={{backgroundColor:red[500]}}>{data.nation_code}</Avatar>}
                      title={data.nation_ename}
                      subheader={data.nation_kname}
                      action={
                        <IconButton onClick={() => props.onPortMouseOut(data.port_code)}>
                          <Close/>
                        </IconButton>
                      }
                      >
                    </CardHeader>
                    <CardContent>
                      <div>
                        <SubMap parameter={data} gubun={"port"}/>
                        </div>  
                        <span>Port : {data.port_code}<br></br></span>
                        <span> Port Nation : {data.nation_code}<br></br></span>
                        <span> Port EngName : {data.port_ename}<br></br></span>
                        <span>Port Name : {data.port_name}<br></br></span>
                    </CardContent>
                  </Card>
                </MapControl>
              )}
              </Marker>
          )
        })):null}
        {props.shipList.length !== 0 ? ( props.shipList.map((data, index) => {
            if(data.position != null) {
                return(
                      //
                        <Marker 
                          key = {index}
                          draggable = {false}
                          position={{lat:data.position.latitude, lng:data.position.longitude}} // 마커 위치 설정 {lat: ,lng: }   
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
                            }
        
                          }}
                          title={data.shipName}
                          onClick={() => {props.onToggleOpen(data.shipId, data.nationCode); props.onMouseOut(data.shipId);} }>

                          
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
                                            <Tab style={{width:'33%'}} label="Zoom"></Tab>
                                            <Tab style={{width:'33%'}} label="Info"></Tab>
                                            <Tab style={{width:'33%'}} label="Track"></Tab>
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
                                      <TabPanel value={props.value} index={2} style={{height:'250px'}}>
                                        <Grid>
                                          <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={6}>
                                              <CalendarBox
                                                labelText ="From"
                                                id="fromDate"
                                                variant="inline"
                                                format="yyyy-MM-dd"
                                                //inputVariant="outlined"
                                                //margin="dense"
                                                setValue={props.fromDate}
                                                autoOk={true}
                                                onChangeValue={date => props.setFromDate(date)}/>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={6}>
                                            <CalendarBox
                                              labelText ="to"
                                              id="toDate"
                                              variant="inline"
                                              format="yyyy-MM-dd"
                                              style={{width:'40%'}}
                                              //inputVariant="outlined"
                                              //margin="dense"
                                              setValue={props.toDate}
                                              autoOk={true}
                                              onChangeValue={date => props.setToDate(date)}/>
                                              </Grid>
                                          </Grid>
                                          <Grid container spacing={2}>
                                            <Grid item xs={12} sm={12} md={12}>
                                              <Button onClick = {() => props.onTrackingSearch(data.shipId,props.fromDate,props.toDate)} style={{width:'100%'}}>Search</Button>
                                            </Grid>
                                          </Grid>  
                                        </Grid>
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
            }


        })):null}

{/* 
        {props.positions.length !==0 && ( props.positions.map((data, index) => {
          return(
            <Marker 
              key = {index}
              draggable = {false}
              position={data} // 마커 위치 설정 {lat: ,lng: }   
              icon=
              {{
                  path:"M ",
                  fillColor:'green',
                  fillOpacity:0.8,
                  scale:0.7,
                  strokeColor:'gold',
                  strokeWeight:0.264583

              }}/>
          )
        }))
        } */}


        
        <Polyline
            path={props.positions}
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
));

export default class DemDetMap extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      checked:false,
      setStyle: [],
      locationlat:0,
      locationlng:0,
      token: props.store.token,
      markerVisible: true,
      isOpen:false,
      isPortOver:false,
      port:"",
      portCode:"",
      portLocation:[],
      shipList:[],
      positions:[],
      menuDisplay1: "none",
      keyword:"",
      value:0,
      shipOverId:"",
      shipId:"",
      fromDate:null,
      toDate:null,
      nationInfo:null,
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
    axios.post("/com/getPortLocation", {portCode: ""},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
      res=> {
        if(res.data.length !== 0 ) {
          this.setState(state => ({
            portLocation: res.data
          }))  
        }
      });

      axios.post('/com/searchship',{param:"ship"},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
        res => {
          if(res.data.length !== 0 ) {
            this.setState(state => ({
              shipList: res.data.response
            }))
          }
        })
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
  onMenuDisplay = (param) => {
    this.setState(state => ({
      menuDisplay1: param,
    }))
  }
  
  onPathChange = (param) => {
    axios.post('/com/searchship',{param:param},{headers:{'Authorization':'Bearer '+this.state.token}}).then(
      res => {
        if(res.data.length === 0 ) {
        
        }else {
          this.setState(state => ({
            shipList: res.data.response
          }))
        }
        
      }
    )
  }
  onInit = () => {
    this.setState(state => ({
      shipList: [],
      positions: []
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



  onTrackingSearch = (shipId, paramfromDate, paramtoDate) => {
    this.setState(state => ({
      positions:[]
    }))
    console.log(paramfromDate, ' ', paramtoDate)
    let fromDate = moment(paramfromDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
    let toDate = moment(paramtoDate).format('YYYY-MM-DDTHH:mm:ss')+ 'Z';
    let tempLocation = [];
    axios.post('/com/searchTrack',{ship:shipId,toD:toDate,fromD:fromDate},{headers:{'Authorization':'Bearer '+this.state.token}}).then(res=> {
      console.log(res)
      if(res.data.response.trackData != null) {
       res.data.response.trackData.forEach(element => {
          tempLocation.push({lat:element.latitude, lng:element.longitude})
       })
       this.setState(state => ({
        positions:tempLocation
      }))
      }
    }).catch(err => {
        alert(err+'err')
    });
  }
  setKeyword = (param) => {
    this.setState(state => ({
      keyword:param
    }))
  }
  onMarkerVisible = (param) => {
    this.setState(state => ({
      markerVisible: param
    }))
  }
  onPortToggle =(param) => {
    this.setState(state=>({
      isPortOver:!this.state.isPortOver,
      portCode:param
    }))
  }
  onSetMapStyle = (param1) => {
    this.setState(state => ({
      setStyle: param1
    }))
  }
  
  onPortMouseOut = (param) => {
    this.setState(state => ({
      isPortOver: false,
      portCode: param
    }))
  }

  onMouseOut = (param) => {
    this.setState(state=> ({
      isOpenOver: false,
      shipOverId: param
    }))
    
  }
  handleChange =(param) => {
    this.setState(state => ({
      value: param
    }))
  }
  setFromDate = (param) => {
    this.setState(state => ({
      fromDate: param
    }))
  }
  setToDate = (param) => {
    this.setState(state => ({
      toDate: param
    }))
  }
  toggleChecked = (param) => {
    this.setState(state => ({
      checked:!param
    }))
  }
  
  render() {
    return (
      <div>
        <MyMapComponent
          map={this.state.map}
          onPathChange={this.onPathChange}
          onTrackingSearch={this.onTrackingSearch}
          portLocation={this.state.portLocation}
          setStyle={this.state.setStyle}
          shipList={this.state.shipList}
          classes={this.state.classes}
          onLocation={this.onMouseMove}
          setKeyword={this.setKeyword}
          onMarkerVisible={this.onMarkerVisible}
          markerVisible={this.state.markerVisible}
          onPortToggle={this.onPortToggle}
          isPortOver={this.state.isPortOver}
          portCode={this.state.portCode}
          onToggleOpen={this.onToggleOpen}
          onSetMapStyle={this.onSetMapStyle}
          onMenuDisplay={this.onMenuDisplay}
          menuDisplay1={this.state.menuDisplay1}
          onInit={this.onInit}
          locationlat={this.state.locationlat}
          locationlng={this.state.locationlng}
          onPortMouseOut={this.onPortMouseOut}
          keyword={this.state.keyword}
          onMouseOut={this.onMouseOut}
          isOpen={this.state.isOpen}
          shipId={this.state.shipId}
          value={this.state.value}
          handleChange={this.handleChange}
          fromDate={this.state.fromDate}
          toDate={this.state.toDate}
          setFromDate={this.setFromDate}
          setToDate={this.setToDate}
          positions={this.state.positions}
          nationInfo={this.state.nationInfo}
          shipRotate={this.state.shipRotate}
          checked={this.state.checked}
          toggleChecked={this.toggleChecked}
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

    