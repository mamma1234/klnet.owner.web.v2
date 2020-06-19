import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Autocomplete from '@material-ui/lab/Autocomplete';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/TablePaging.js";
import { Tooltip } from "@material-ui/core";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import Grid from '@material-ui/core/Grid';
import CustomTabs from "components/CustomTabs/CustomTabs2.js";
import ExcelSchLogTable from "components/Table/TablePaging.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  },
  cardTitleBlack: {
	    textAlign: "left",
	    color: "#000000",
	    minHeight: "auto",
	    fontWeight: "300",
	    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
	    marginBottom: "3px",
	    textDecoration: "none",
	    "& small": {
	      color: "#777",
	      fontSize: "65%",
	      fontWeight: "400",
	      lineHeight: "1"
	    }
    },
    divStyle: {
      overflowX: "auto",
      overflowY: "scroll"
    }
};

const useStyles = makeStyles(styles);


export default function UserRequest(props) {

  const {store} = props;
  console.log(">>>>admin:",store);
  //const [carrierCode,setCarrierCode] = useState("");
  const [userno,setUserno] = useState("");
  const [lineCode,setLineCode] = useState("");
  const [blbkg,setBlbkg] = useState("");
  const [ieType,setIetype] = useState("");
  const [reqseq,setReqseq] = useState("");
  const [Num,setNum] = useState(1);
  const [userRequest, setUserRequest] = useState([]);
  const [openJoin,setOpenJoin] = useState(false);
  const [portData,setPortData] = useState([]);
  const [carrierCode, setCarrierCode] = useState("")
  
  useEffect(() => {
	  axios.post("/loc/getCustomLineCode",{},{headers:{'Authorization':'Bearer '+store.token}}
	  ).then(res => setLineCode(res.data));
	  // .then(res => console.log(JSON.stringify(res.data)));
	  return () => {
		  console.log('LINE CODE cleanup');
	  };
  }, []);
  const onCarrierChange = (e,data) => {
      if(data) {setCarrierCode(data.id);} else {setCarrierCode("");}
    }
  const onSubmit = () => {
            setNum(1);

            axios.post("/com/getUserRequest",{
              req_seq:reqseq,
              userno:userno,
              carrier_code:carrierCode,
              bl_bkg:blbkg,
              ie_type:ieType,
              num:Num,

            },{headers:{'Authorization':'Bearer '+store.token}})
            .then(res => {setUserRequest(res.data);console.log(res.data)})
            .catch(err => {
                if(err.response.status == "403" || err.response.status == "401") {
                    setOpenJoin(true);
                }
            });
        

  }
  const onMore = () => {
    if(Num != userRequest[0].tot_page) {
        //page ++
        setNum(Num+1);

        axios.post("/com/getUserRequest",{
          req_seq:reqseq,
          userno:userno,
          carrier_code:carrierCode,
          bl_bkg:blbkg,
          ie_type:ieType,
          num:Num,
        },{headers:{'Authorization':'Bearer '+store.token}})
        .then(res => setUserRequest([...userRequest,...res.data]))
        .catch(err => {
            if(err.response.status == "403" || err.response.status == "401") {
                setOpenJoin(true);
            }
        });
    }

  }
	const onSetIeType = (e) => {
		setIetype(e.target.value);
		
	}	

  const classes = useStyles();
  
  return (
    <div className={classes.divStyle}>
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>User Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
             <Grid item xs={12} md={3}>   
              <Autocomplete
                    options = {lineCode}
                    getOptionLabel = { option => option.id + '\n' +option.nm }
                    id="carrierCode"
                    onChange={onCarrierChange}
                    
                    renderInput={params => (
                      <TextField inputProps={{maxLength:4}} {...params} label="Carrier" fullWidth />
                    )}
                  />
					    </Grid>
              <Grid item xs={12} md={3}>   
                <TextField id="req_seq" label="REQ SEQ" onChange={event => setReqseq(event.target.value)} value={reqseq} fullWidth />
              </Grid>


						 <Grid item xs={12} md={3}>
						 <TextField id="userno" label="User no" onChange={event => setUserno(event.target.value)} value={userno} fullWidth />
						 </Grid>
             <Grid item xs={12} md={3}>
              <CustomSelect
                      id="ietype"
                      labelText = "I/E"
                      setValue = {ieType}
                      option = {["I","E"]}
                      inputProps={{onChange:onSetIeType}}
                      formControlProps={{fullWidth: true}}/>
              </Grid>
              <Grid item xs={12} md={3}>   
                <TextField id="
                " label="BL & BKG" onChange={event => setBlbkg(event.target.value)} value={blbkg} fullWidth />
              </Grid>
             
						<Grid item xs={12} md={3} >
							<Button color="info" onClick = {onSubmit}  
							fullWidth>Search</Button>							
						</Grid>
		      		</Grid>
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12}>
      	<Card style={{marginBottom:'0px'}}>
      		<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
              <Table className={classes.table}>
                  <TableHead className={classes.table} style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>REQ SEQ</TableCell>
                        <TableCell>User no</TableCell>
                        <TableCell>Carrier Code</TableCell>
                        <TableCell>BL BKG</TableCell>
                        <TableCell>IE TYPE</TableCell>
                        <TableCell>CNTR NO</TableCell>
                        <TableCell>MBL NO</TableCell>
                        <TableCell>HBL NO</TableCell>
                        <TableCell>BKG NO</TableCell>
                        <TableCell>TRACKING YN</TableCell>
                        <TableCell>TRACKING REMARK</TableCell>
                        <TableCell>DEM DET YN</TableCell>
                        <TableCell>DEM DET REMARK</TableCell>
                        <TableCell>BOOK MARK</TableCell>
                        <TableCell>CUSTOMS LINE CODE</TableCell>
                        <TableCell>CURRENT STATUS</TableCell>
                        <TableCell>SCRAP RESULT</TableCell>
                        <TableCell>SCRAP START DATE</TableCell>
                        <TableCell>SCRAP END DATE</TableCell>
                        <TableCell>SCRAP LOG</TableCell>
                        <TableCell>WEB SEQ</TableCell>
                        <TableCell>START DATE</TableCell>
                        <TableCell>TO ORACLE</TableCell>
                        <TableCell>DEL YN</TableCell>
                        <TableCell>CLOSE YN</TableCell>
                        <TableCell>INSERT DATE</TableCell>
                        <TableCell>INSERT USER</TableCell>
                        <TableCell>UPDATE DATE</TableCell>
                        <TableCell>UPDATE USER</TableCell>
                      </TableRow>               
                  </TableHead>

                  <TableBody>
                      {
                          userRequest.map((element,key) => {
                              return(
                                <TableRow>    
                                    <TableCell>{element.req_seq}</TableCell>
                                    <TableCell>{element.user_no}</TableCell>
                                    <TableCell>{element.carrier_code}</TableCell>
                                    <TableCell>{element.bl_bkg}</TableCell>
                                    <TableCell>{element.ie_type}</TableCell>
                                    <TableCell>{element.cntr_no}</TableCell>
                                    <TableCell>{element.mbl_no}</TableCell>
                                    <TableCell>{element.hbl_no}</TableCell>
                                    <TableCell>{element.bkg_no}</TableCell>
                                    <TableCell>{element.tracking_yn}</TableCell>
                                    <TableCell>{element.tracking_remark}</TableCell>
                                    <TableCell>{element.dem_det_yn}</TableCell>
                                    <TableCell>{element.dem_det_remark}</TableCell>
                                    <TableCell>{element.book_mark}</TableCell>
                                    <TableCell>{element.customs_line_code}</TableCell>
                                    <TableCell>{element.current_status}</TableCell>
                                    <TableCell>{element.scrap_result}</TableCell>
                                    <TableCell>{element.scrap_start_date}</TableCell>
                                    <TableCell>{element.scrap_end_date}</TableCell>
                                    <TableCell>{element.scrap_log}</TableCell>
                                    <TableCell>{element.web_seq}</TableCell>
                                    <TableCell>{element.start_date}</TableCell>
                                    <TableCell>{element.to_oracle}</TableCell>
                                    <TableCell>{element.del_yn}</TableCell>
                                    <TableCell>{element.close_yn}</TableCell>
                                    <TableCell>{element.insert_date}</TableCell>
                                    <TableCell>{element.insert_user}</TableCell>
                                    <TableCell>{element.update_date}</TableCell>
                                    <TableCell>{element.update_user}</TableCell>

                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                       userRequest.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                            <Button
                                color="info"
                                onClick={onMore}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{userRequest[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
              
	      	 </CardBody>
        </Card>
		</GridItem>     
    </GridContainer>
    </div>
  );
}



