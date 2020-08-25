import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import {Grid, TextField, Paper, Table, TableBody, TableRow, TableCell, TableHead, Radio} from '@material-ui/core';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
import axios from 'axios';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import {Snackbar,Tooltip} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import SearchIcon from '@material-ui/icons/Search';
import Assignment from "@material-ui/icons/Assignment";
import CustomInput from "components/CustomInput/CustomInput.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import Moment from 'moment';

const useStyless = makeStyles(theme => ({

  headerCell: {
    backgroundColor: "#f2fefd",
    width:'30%',
  padding:'7px',
  textAlign:'right'
  },
  bodyCell: {
    textAlign: "left",
  padding:'7px',
  },
  tableHeaderCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
    backgroundColor:'#f2fefd',
    width:'15%'
  },tableCellStyle: {
    borderStyle:'solid',
    borderColor:'#dbdbdb',
    borderWidth:'1px',
    padding:'7px',
  }
}));
function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function PostNoPrCstmSgnQry(props) {
  const [severity, setSeverity] = useState("");
  const {store} =props;
  const classes = useStyless();
  const [cntrList, setCntrList] = useState([]);
  const [gubunCode, setGubunCode] = useState("A01");
  const [baseDt, setBaseDt] = useState(new Date());
  const [jrsdPsno, setJrsdPsno] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [errMessage, setErrmessage] = useState("");
  const [gridData, setGridData] = useState([]);
  
  React.useEffect(() => {
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  const handleAlertClose = (event, reason) => {
    if(reason ==='clickaway') {
      return;
    }
    setAlertOpen(false);
  }
  const AlertMessage = (message,icon) => {
    setErrmessage(message);
    setSeverity(icon);
    setAlertOpen(true);
  }

  const handleClick = (event) => {
	  const anchor = document.querySelector('#api031_top');
	  if(anchor) {
		  anchor.scrollIntoView();
	  }
  };
  
  const onSubmit = () => {
	  if(!jrsdPsno) {
		  AlertMessage("HS코드 값은 필수 입력값입니다.","error");
		  return;
	  }
	  if(store.token) {

		    axios.post("/com/uniPassApiPostNoPrCstmSgnQry",{param1:jrsdPsno}, 
		    		{headers:{'Authorization':'Bearer '+store.token}}).then(
		      res => {
		        if(res.data.message == "SUCCESS") {
		          setGridData(res.data.infoData.data);
		        }else if (res.data.message == "NO_DATA") {
		          AlertMessage(res.data.errMsg,"error");
		        }else {
		          AlertMessage(res.data.errMsg,"error")
		        }
		      }
		    ).catch(err => {
	            if(err.response.status === 401) {
		        	props.openLogin();
		        }
	            });
		 } else {
			props.openLogin();
		 }
  }
  return (
    <div id="api031_top">
    <Card>
      <CardBody style={{paddingTop:'0',paddingBottom:'0'}}>
      <Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1} justify="space-between">
			     	<Grid item xs={12} md={3}>
				     		<CustomInput
					            labelText={
					              <span>
					              <font size="2">우편번호</font>
					              </span>
					            }
					            id="jrsdPsno"
					            formControlProps={{
					              fullWidth: true
					            }}
					            inputProps={{
					            	onChange: event => setJrsdPsno(event.target.value)
					            }}   
				          	/>	
			     		</Grid>
              <Grid item xs={2} sm={2} md={2} style={{textAlignLast:'right', paddingTop:"20px"}}>
                <Button color="info" onClick = {onSubmit} endIcon={<SearchIcon/>} >SEARCH</Button>
              </Grid>
            </Grid>
      </Grid>
      </CardBody>
      </Card>
      <Card>
        <CardHeader color="info" stats icon >
	        <CardIcon color="info" style={{padding:'0'}}>
	        <Assignment />
	      </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000", paddingTop:"10px"}}><b>우편번호별 관할세관 정보조회</b></h4>
        </CardHeader>
        <CardBody>
	        <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7',borderCollapse:'unset'}}>
		          {
		              gridData.map((element,key,index) => {
		                  return(
		                   <TableBody key={key}>
		                    <TableRow>
		                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>관할지역 세관부호</TableCell>
		                      <TableCell className={classes.tableCellStyle}>{element.jrsdCstmSgn._text}</TableCell>
		                      <TableCell className={classes.tableHeaderCellStyle} style={{width:'10%'}}>관할지역 세관 한글명칭</TableCell>
		                      <TableCell className={classes.tableCellStyle}>{element.jrsdCstmSgnNm._text}</TableCell>
		                    </TableRow>
		                    </TableBody>
		                  )
		                  })
		          }
	        </Table>
          </CardBody>
        </Card>
        {gridData.length > 10?
	            <div className={"fixed-plugin"} style={{top:'85%',width:'45px',right:'2%',borderRadius:'8px'}}>
				    <div onClick={handleClick}>
				    	<Tooltip title="Scroll Top">
				    		<i className="fa fa-angle-double-up fa-3x" style={{color:'white'}}/>
				    	</Tooltip>
				    </div>
				</div>:null
	            }
    <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
		<Alert 
			onClose={handleAlertClose}
			severity={severity}>
				{errMessage}

		</Alert>
	</Snackbar>
  </div>
  );
}
