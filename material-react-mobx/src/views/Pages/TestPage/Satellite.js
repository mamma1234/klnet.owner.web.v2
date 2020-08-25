
import React from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import dotenv from "dotenv";
dotenv.config();

const MyMapComponent = compose(
  withProps({
      googleMapURL: "https://maps.googleapis.com/maps/api/js?key="+process.env.REACT_APP_GOOGLE_MAPS_API_KEY+"&language=en&region=KR",
      loadingElement: <div style={{ height:`100%`}}/>,
      containerElement: <div style={{width:'100%', height: `20vh` }}/>,
      mapElement: <div style={{height:`100%` }}/>,
  }),
  withScriptjs,
  withGoogleMap
)(props => (
    <GoogleMap
    id = {props.map}
    defaultZoom={10}
    mapTypeId={window.google.maps.MapTypeId.HYBRID}
    defaultCenter={{lat:props.lat,lng:props.lng}}>
        {props.gubun==="ship"?
        <Marker 
                draggable = {false} 
                position={{lat:props.lat,lng:props.lng}} // 마커 위치 설정 {lat: ,lng: }   
                icon= {{
                  url:require('assets/img/MapSprite1.png'),
                  size:{
                    width
                    :(props.rotate >0 && props.rotate <= 15)?props.shipRotate.rotate1.width
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.width
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.width
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.width
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.width
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.width
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.width
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.width
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.width
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.width
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.width
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.width
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.width
                    :(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.rotate14.width
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.width
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.width
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.width
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.width
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.width
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.width
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.width
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.width
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.width
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.width
                    :props.shipRotate.rotate0.width,
                    height
                    :(props.rotate >0 && props.rotate <= 15)?props.shipRotate.rotate1.height
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.height
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.height
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.height
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.height
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.height
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.height
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.height
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.height
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.height
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.height
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.height
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.height
                    :(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.rotate14.height
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.height
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.height
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.height
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.height
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.height
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.height
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.height
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.height
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.height
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.height
                    :props.shipRotate.rotate0.height,
                  },
                  origin:{
                    x
                    :(props.rotate >0 && props.rotate <= 15)?props.shipRotate.rotate1.x
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.x
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.x
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.x
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.x
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.x
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.x
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.x
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.x
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.x
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.x
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.x
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.x
                    :(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.rotate14.x
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.x
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.x
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.x
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.x
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.x
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.x
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.x
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.x
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.x
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.x
                    :props.shipRotate.rotate0.x,
                    y
                    :(props.rotate >0 && props.rotate <= 15)?props.shipRotate.rotate1.y
                    :(props.rotate > 15 && props.rotate <= 30)?props.shipRotate.rotate2.y
                    :(props.rotate > 30 && props.rotate <= 45)?props.shipRotate.rotate3.y
                    :(props.rotate > 45 && props.rotate <= 60)?props.shipRotate.rotate4.y
                    :(props.rotate > 60 && props.rotate <= 75)?props.shipRotate.rotate5.y
                    :(props.rotate > 75 && props.rotate <= 90)?props.shipRotate.rotate6.y
                    :(props.rotate > 90 && props.rotate <= 105)?props.shipRotate.rotate7.y
                    :(props.rotate > 105 && props.rotate <= 120)?props.shipRotate.rotate8.y
                    :(props.rotate > 120 && props.rotate <= 135)?props.shipRotate.rotate9.y
                    :(props.rotate > 135 && props.rotate <= 150)?props.shipRotate.rotate10.y
                    :(props.rotate > 150 && props.rotate <= 165)?props.shipRotate.rotate11.y
                    :(props.rotate > 165 && props.rotate <= 180)?props.shipRotate.rotate12.y
                    :(props.rotate > 180 && props.rotate <= 195)?props.shipRotate.rotate13.y
                    :(props.rotate < 195 && props.rotate <= 210)?props.shipRotate.rotate14.y
                    :(props.rotate > 210 && props.rotate <= 225)?props.shipRotate.rotate15.y
                    :(props.rotate > 225 && props.rotate <= 240)?props.shipRotate.rotate16.y
                    :(props.rotate > 240 && props.rotate <= 255)?props.shipRotate.rotate17.y
                    :(props.rotate > 255 && props.rotate <= 270)?props.shipRotate.rotate18.y
                    :(props.rotate > 270 && props.rotate <= 285)?props.shipRotate.rotate19.y
                    :(props.rotate > 285 && props.rotate <= 300)?props.shipRotate.rotate20.y
                    :(props.rotate > 300 && props.rotate <= 315)?props.shipRotate.rotate21.y
                    :(props.rotate > 315 && props.rotate <= 330)?props.shipRotate.rotate22.y
                    :(props.rotate > 330 && props.rotate <= 345)?props.shipRotate.rotate23.y
                    :(props.rotate > 345 && props.rotate <= 360)?props.shipRotate.rotate24.y
                    :props.shipRotate.rotate0.y,
                  }
            
            }}>
        </Marker>
        :  
        <Marker 
        draggable = {false} 
        position={{lat:props.lat,lng:props.lng}} // 마커 위치 설정 {lat: ,lng: }   
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
          ></Marker>
        }
    </GoogleMap>
));


                          



export default class Satellite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      
      zoom: 8,
      map: 'map',
      lat:0,
      lng:0,
      gubun:props.gubun,
      parameter:props,
      rotate:0,
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
      if(this.state.parameter.gubun==="port") {
          this.setState(state => ({
              lat: this.state.parameter.parameter.wgs84_y, 
              lng: this.state.parameter.parameter.wgs84_x
          }))
      }else if(this.state.parameter.gubun==="ship") {
          this.setState(state => ({
              lat:this.state.parameter.parameter.position.latitude, 
              lng:this.state.parameter.parameter.position.longitude,
              rotate:this.state.parameter.parameter.position.courseOverGround
          }))
      }
  }
  render() {
    return (
      <div>
        <MyMapComponent
          zoom={this.state.zoom}
          centerPosition={this.state.centerPosition}
          gubun={this.state.gubun}
          lat={this.state.lat}
          lng={this.state.lng}
          rotate={this.state.rotate}
          shipRotate={this.state.shipRotate}
        />
      </div>
    );
  }
}




































