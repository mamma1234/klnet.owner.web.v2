import { makeStyles, withStyles } from '@material-ui/core/styles';
import React,{ useState, useEffect} from "react";
// @material-ui/core components
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import HighlightOff from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles(theme => ({
    root: {
      width: '780px',
      height: '640px'
    },
  }));
  
export default function ShipMap(props) {
    const classes = useStyles();
    const { params } = props;
    const [linkUrl,setLinkUrl] = useState("http://dev.seavantage.com/#/tracking/cargo?schedule=%5B%7B%22shipName%22%3A%22HYUNDAI%20UNITY%22,%22pol%22%3A%22KRINC%22,%22pod%22%3A%22MYPKG%22%7D,%7B%22shipName%22%3A%22EMIRATES%20SANA%22,%22pol%22%3A%22MYPKG%22,%22pod%22%3A%22AEJEA%22%7D%5D");
    const [value, setValue] = React.useState(0);
    const [store,setStore] = useState(props.store);
    useEffect(() => {
        console.log('호출....');
        
        axios.post("/loc/getTsTracking",{reqseq:props.parameter.req_seq, carrierCode:props.parameter.carrier_code},{headers:{'Authorization':'Bearer '+store.token}})
        .then(res => {
          let url = "http://dev.seavantage.com/#/tracking/cargo?schedule=";
          if(res.data != []) {
            let appendUrl = '['
            res.data.forEach(element =>{
              appendUrl +='{shipName:'+encodeURIComponent(element.vessel)+',';
              appendUrl += 'pol:'+encodeURIComponent(element.pol)+',';
              appendUrl += 'pod:'+encodeURIComponent(element.pod)+'},';
              
            })
            appendUrl += ']'
            setLinkUrl(url+appendUrl)
          }
        })
    return () => {
        console.log('cleanup');
        };
    },[]);
    
  
return (
    <div className={classes.root}>
    <HighlightOff onClick={()=>props.onClose()} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>
      <Card className={classes.cardStyle}>
          <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
                <CardIcon color="info" style={{height:'26px'}}>
                  <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
                </CardIcon>
          </CardHeader>
            <CardBody style={{paddingBottom:'2px'}}>
                  <Grid item item xs={12} sm={12} md={12}>
                      <form target="maplink"> 
                          <iframe name="maplink" src={linkUrl}  width="100%" height="600" display='block' border='none' position="absolute" frameBorder="0" scrolling="auto" allowFullScreen></iframe>
                      </form>
                  </Grid>
                </CardBody>
          </Card> 
    </div>
  );
}
  
  
  
  
  