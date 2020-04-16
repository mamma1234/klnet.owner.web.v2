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

const useStyles = makeStyles(theme => ({
    root: {
      width: '780px',
      height: '640px'
    },
  }));
  
export default function ShipMap(props) {
    const classes = useStyles();
    const { vesselName } = props;
    const [inputValue, setInputValue] = useState("");
    const [linkUrl,setLinkUrl] = useState("http://dev.seavantage.com/#/tracking/ship?imoNo=" + vesselName);
    const [value, setValue] = React.useState(0);
    console.log(vesselName);
    useEffect(() => {
        console.log('호출....');
        setInputValue(vesselName);
    return () => {
        console.log('cleanup');
        };
    },[]);
    
    const appendUrl = (appendImo) => {

        if(appendImo != "") {
            setLinkUrl(linkUrl + "&imoNo="+appendImo);
            console.log(linkUrl);
            setInputValue("");
        }else {
            alert("imo입력");
        }
    }
  
return (
    <div className={classes.root}>
          
      <Card className={classes.cardStyle}>
          <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
                <CardIcon color="info" style={{height:'26px'}}>
                  <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
                </CardIcon>
          </CardHeader>
            <CardBody style={{paddingBottom:'2px'}}>
              <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
  
                          <Grid container spacing={4}>
                              <Grid item xs={12} sm={12} md={3}>
                  <CustomInput
                    labelText="IMO ..."
                    id="imoNum"
                    name="inputValue"
                    value={vesselName}
                    formControlProps={{fullWidth: true}}
                    inputProps={{
                      onChange: event => setInputValue(event.target.value),
                      value:inputValue }}
                    />
                              </Grid>
                              <Grid item xs={12} sm={12} md={3}>
                  <Button onClick={()=> { appendUrl(inputValue)}}>Search</Button>
                              </Grid>
                          </Grid>
                      </GridItem>
                </GridContainer>
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
  
  
  
  
  