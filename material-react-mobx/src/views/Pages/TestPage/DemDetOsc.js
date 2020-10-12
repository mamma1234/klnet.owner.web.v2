import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
// core components
import {TextField,Table,TableHead, TableRow, TableBody, TableCell, TableContainer, TableFooter, Grid, Paper} from '@material-ui/core'



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

import {CircularProgress,Fade,Icon} from "@material-ui/core";
import CardIcon from "components/Card/CardIcon.js";

import tableStyles from "assets/jss/material-dashboard-pro-react/components/tableStyle";


const useStyles = makeStyles(tableStyles);

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    
    width: '100%',
    padding:'5px',
    marginBottom: theme.spacing(2),
  },gridContainer: {
    padding:'5px'
  }
}))

const useStyles2 = makeStyles({
	container: {
		maxHeight:590,
	}
});

export default function LineCode(props) {
  const classes = styles();
  const classes2 = useStyles();
  const classes3 = useStyles2();
  const {store} = props;
  const [lineCode, setLineCode] = useState("");
  const [id, setId] = useState("");
  const [cntrNo, setCntrNo] = useState("");
  const [fromData, setFromData] = useState([]);
  const [Num,setNum] = useState(1);
  const [loading,setLoading] = useState(false);
  
  const Loadinghandle = () => {
	  setLoading(true);
	  onSubmit();
  }
  
  
  const onSubmit = (param) => {
      setNum(1);

      axios.post("/com/getDemDetOsc",{cntrno:cntrNo,num:param},{headers:{'Authorization':'Bearer '+store.token}})
      .then(setLoading(true))
      .then(res => {setFromData(res.data); setLoading(false);})
      .catch(err => {
          if(err.response.status === 403 || err.response.status === 401) {
            //  setOpenJoin(true);
          }
      });


  }
  const onMore = (param) => {
  if(Num != fromData[0].tot_page) {
    //page ++
    setNum(param);

    axios.post("/com/getDemDetOsc",{cntrno:cntrNo,num:param},{headers:{'Authorization':'Bearer '+store.token}})
    .then(res => setFromData([...fromData,...res.data]))
    .catch(err => {
        if(err.response.status === 403 || err.response.status === 401) {
        //   setOpenJoin(true);
        }
    });
    }

  }

  
  return (
    <div >
    <GridContainer className={classes.gridContainer}>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>User Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
		      	<Grid item xs={12}>
		     	<Grid container spacing={1}>
		     		<Grid item xs={12} sm={9} md={4}>
		     			<TextField id="cntrNo" label="Container No." onChange={event => setCntrNo(event.target.value)} value={cntrNo} fullWidth />
		     		</Grid>	
		     		<Grid item xs={12} sm={9} md={6}></Grid>
					<Grid item xs={12} sm={12} md={2} >
						<Button color="info" onClick = {() => onSubmit(1)} 
						fullWidth>Search</Button>							
					</Grid>
	      		</Grid>
	      	</Grid>
	      	
		     </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
      <Paper className={classes.paper}>
      <div  className={classes2.tableResponsive} style={{marginTop:'0px'}}> 
      <TableContainer className={classes3.container} style={{overflow:'auto'}}>
      <Table stickyHeader className={classes2.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
                  <TableHead style={{padding:'5px'}}>
                  <TableRow>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}} rowSpan={3}>REQ_SEQ</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>BL_BKG</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>BKG_NO</TableCell>
                  <TableCell  style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>IE_TYPE</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>VOYAGE</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>POL</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ETA</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ETD_TIME</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ATD</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>FULL_INGATE_DATE</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>RET_DATE</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEM_AMOUNT</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DET_AMOUNT</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>COMBIN_AMOUNT</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>OSC_AMOUNT</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>UNLOAD_TERMINAL</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>FULL_INGATE_TERMINAL</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>POL_INGATE_TIME</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>UNLOAD_DATE</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEL_DATE</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEM_TARIFF</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DET_TARIFF</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>REMARK</TableCell>
                </TableRow> 
                <TableRow>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>USER_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>MBL_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>CNTR_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>VSL_CODE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>VOYAGE_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>POD</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ETA_TIME</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ATA</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ATD_TIME</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>MT_OUTGATE_DATE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEM_DATE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEM_VAT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DET_VAT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>COMBIN_VAT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>OSC_VAT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>LOAD_TERMINAL</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>MT_OUTGATE_TERMINAL</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>POL_INGATE_TERMINAL</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>UNLOAD_TERMINAL_REF_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEM_OVER_DAY</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>OSC_TARIFF</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>INSERT_DATE</TableCell>
                </TableRow>
                <TableRow>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>LINE_CODE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>HBL_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>TYPE_SIZE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>VSL_NAME</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>TER_REF_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEL_YN</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ETD</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>ATA_TIME</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>FULL_OUTGATE_DATE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>MT_INGATE_DATE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>OSC_DATE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DEM_UNIT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>DET_UNIT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>COMBIN_UNIT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>OSC_UNIT</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>FULL_OUTGATE_TERMINAL</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>MT_INGATE_TERMINAL</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>LOAD_DATE</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>LOAD_TERMINAL_REF_NO</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>OSC_OVER_DAY</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>PLISM_CHARGE_YN</TableCell>
	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',color:'#717172',border:'1px solid #717172'}}>UPDATE_DATE</TableCell>
                </TableRow>
                  </TableHead>
                  
                      {!loading?
                    	  fromData.map((element,key) => {
                              return(<TableBody key={key}>
                              <TableRow >
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}} rowSpan={3}>{element.req_seq}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.bl_bkg}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.bkg_no}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.ie_type}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.voyage}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.pol}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.eta}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.etd_time}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.atd}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.full_ingate_date}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.ret_date}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.dem_amount}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.det_amount}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.combin_amount}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.osc_amount}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.unload_terminal}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.full_ingate_terminal}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.pol_ingate_time}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.unload_date}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.del_date}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.dem_tariff}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.det_tariff}</TableCell>
                              <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.remark}</TableCell>
                            </TableRow>
                            <TableRow>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.user_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.mbl_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.cntr_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.vsl_code}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.voyage_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.pod}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.eta_time}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.ata}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.atd_time}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.mt_outgate_date}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.dem_date}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.dem_vat}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.det_vat}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.combin_vat}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.osc_vat}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.load_terminal}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.mt_outgate_terminal}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.pol_ingate_terminal}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.unload_terminal_ref_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.dem_over_day}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.osc_tariff}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.insert_date}</TableCell>
                            </TableRow>
                            <TableRow>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.line_code}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.hbl_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.type_size}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.vsl_name}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.ter_ref_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.del_yn}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.etd}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.ata_time}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.full_outgate_date}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.mt_ingate_date}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.osc_date}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.dem_unit}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.det_unit}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.combin_unit}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.osc_unit}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.full_outgate_terminal}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.mt_ingate_terminal}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.load_date}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.load_terminal_ref_no}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.osc_over_day}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.plism_charge_yn}</TableCell>
      	                      <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid #717172'}}>{element.update_date}</TableCell>
                            </TableRow>
                                    </TableBody>
                              )
                          }):(<TableBody><TableRow><TableCell colSpan={23} style={{textAlignLast:'center'}}><CircularProgress /></TableCell></TableRow></TableBody>)
                      }
                  {!loading?
                	  fromData.length >= 5 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} >
                            <Button
                                color="info"
                                onClick={() => onMore(Num + 1)}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{fromData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null:null
                      

                  }
              </Table>
              </TableContainer>
              </div>
          </Paper>
        </div>
  );
}



