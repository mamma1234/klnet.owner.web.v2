
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
import axios from 'axios';
import MapSkin from 'components/Map/CustomMap';
import IconButton from '@material-ui/core/IconButton';
import FilterIcon from '@material-ui/icons/Filter';
import Button from "components/CustomButtons/Button.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import YoutubeSearchedForIcon from "@material-ui/icons/YoutubeSearchedFor"
import Replay from "@material-ui/icons/Replay"
import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
    Polyline,
    InfoWindow
  } from "react-google-maps";
import { compose, withStateHandlers, withProps, withHandlers, withState } from "recompose";
import CustomInput from "components/CustomInput/CustomInput.js";
import dotenv from "dotenv";
import moment from 'moment';
import DirectionsBoatIcon from '@material-ui/icons/DirectionsBoat'
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
  const portwgs84 = {lat: 36.431748, lng: 127.384496};
  let positions = []
  let shipList = [];
  useEffect(() => {
    return () => {
        console.log('cleanup');
      };
  },[]);
  const onPathChange = (value) => {
        shipList = []
        axios ({
            url:'http://ec2-54-180-192-69.ap-northeast-2.compute.amazonaws.com:8082/v1/ship/search?keyword='+value,
            method:'GET',
            headers: {
                'authorization':'Basic aGRraW1Aa2xuZXQuY28ua3I6a2xuZXQxMjM0'
            }
        }).then(res=> res.data.response.forEach(element => {
            shipList.push(element)
        })).then(
            console.log('shipList',shipList)
        )
        .catch(err => {
            alert(err)
        });
  }  
  const onTrackingSearch=(shipId, paramfromDate, paramtoDate) => {
        positions = [];
        let fromDate = moment(paramfromDate).format('YYYY-MM-DDTHH:mm:ss') + 'Z';
        let toDate = moment(paramtoDate).format('YYYY-MM-DDTHH:mm:ss')+ 'Z';
        axios ({
            url:'http://ec2-54-180-192-69.ap-northeast-2.compute.amazonaws.com:8082/v1/ship/'+shipId+'/pastTrack?endDateTime='+encodeURIComponent(toDate)+'&startDateTime='+encodeURIComponent(fromDate),
            method:'GET',
            headers: {
                'authorization':'Basic aGRraW1Aa2xuZXQuY28ua3I6a2xuZXQxMjM0'
            }
        }).then(res=> {
            if(res.data.response.trackData != null) {
                res.data.response.trackData.forEach(element => {
                    positions.push({lat:element.latitude, lng: element.longitude})
                })
            }
        })
        .catch(err => {
            alert(err+'err')
        });
  }

  const onInit = () => {
      console.log('init')
    positions = [];
    shipList = [];
  }

  const TestMap=compose(
    
    withProps({
  
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`100%`}}/>,
      containerElement: <div style={{width:'100%', height: `80vh` }}/>,
      mapElement: <div style={{height:`100%` }}/>,
    }),
    withStateHandlers(() => ({
      isOpen: false,
      shipId: "",
      centerPosition: portwgs84,
    }), 
    {
    onToggleOpen: ({ isOpen }) =>(shipId) => ({
      isOpen: !isOpen,
      shipId: shipId})
    
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
      
    }),
    withStateHandlers(() => ({
        keyword: []
      }),
      {
    setKeyword: () =>(value) => ({
        keyword: value
    }),
        
      }),    
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
    
    withStateHandlers(() => ({
        fromDate: null,
    }),
    {
    setFromDate: () =>(fromDate) => ({
        fromDate: fromDate,
    
    }),
    }), 
    withStateHandlers(() => ({
        toDate: null,
        
    }),
    {
    setToDate: () =>(toDate) => ({
        toDate: toDate,
    
    }),
    }),           


    withState('zoom','onZoomChange',3),
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
          <DirectionsBoatIcon/>
          </IconButton>
        </div>      
        <div style={{display:'inline-block', backgroundColor:"#ffffff", marginTop:"10px", marginRight:"5px", borderRadius:'10px'}}>
          <div style={{display:props.menuDisplay2, marginTop:"10px", marginLeft:"15px", marginRight:"15px", marginBottom:"5px"}}>
            <CustomInput
                    labelText={<span>Ship <small>Keyword</small> </span> }
                    id="searchKey"
                    value={props.keyword}
                    inputProps={{
                    onChange: event => props.setKeyword(event.target.value)
                    
                    }}
                />
                <IconButton onClick ={() =>onPathChange(props.keyword)}>
                    <YoutubeSearchedForIcon></YoutubeSearchedForIcon>
                </IconButton>
                <IconButton onClick ={() =>onInit()}>
                    <Replay></Replay>
                </IconButton>
          </div>    
        </div>
    </MapControl>  











        {shipList.length !== 0 && (shipList.map((data, index) => {
            if(data.position != null) {
                return(
                        <Marker 
                          key = {data.shipId}
                          draggable = {false} 
                          position={{lat:data.position.latitude, lng:data.position.longitude}} // 마커 위치 설정 {lat: ,lng: }   
                          icon={{
                            url:require("assets/img/vessel24.png")
                          }}dd
                          onClick={() => props.onToggleOpen(data.shipId) }>
                          {props.isOpen && data.shipId == props.shipId && (
                              <InfoWindow position = {{lat:data.position.latitude, lng:data.position.longitude}}>
                                <div>
                                    IMO : {data.imoNo}<br></br>
                                    SHIP NAME : {data.shipName}<br></br>
                                    SHIP TYPE : {data.shipType}<br></br>
                                    <CalendarBox
	    								labelText ="From"
	    								id="fromDate"
	    								variant="inline"
										format="yyyy-MM-dd"
										//inputVariant="outlined"
										//margin="dense"
	    								setValue={props.fromDate}
	    								autoOk={true}
                                        onChangeValue={date => props.setFromDate(date)}
	    							/><br></br>
                                    <CalendarBox
	    								labelText ="to"
	    								id="toDate"
	    								variant="inline"
										format="yyyy-MM-dd"
										//inputVariant="outlined"
										//margin="dense"
	    								setValue={props.toDate}
	    								autoOk={true}
                                        onChangeValue={date => props.setToDate(date)}
	    							/><br></br>
                                    <Button onClick = {() => onTrackingSearch(data.shipId,props.fromDate,props.toDate)}>Tracking Search</Button>

                                </div>
                               </InfoWindow>
                          )} 
                        </Marker>

                )
            }
        }))
        
        } 




        
        <Polyline
            path={positions}
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
    </div>
  )
  return (
      <div>
        
        
        <TestMap></TestMap>
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