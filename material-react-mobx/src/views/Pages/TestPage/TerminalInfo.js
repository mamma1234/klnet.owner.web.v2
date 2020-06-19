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
  const classes = useStyles();
  const {store} = props;
  const [terminalInfo, setTerminalInfo] = useState([]);
  const [terminal, setTerminal] = useState("");
  const [Num,setNum] = useState(1);
  const onSubmit = () => {
      setNum(1);

      axios.post("/com/getTerminalInfo",{
        terminal:terminal,
          num:Num
      },{headers:{'Authorization':'Bearer '+store.token}})
      .then(res => {setTerminalInfo(res.data)})
      .catch(err => {
          if(err.response.status == "403" || err.response.status == "401") {
            //  setOpenJoin(true);
          }
      });


  }
  const onMore = () => {
  if(Num != terminalInfo[0].tot_page) {
  //page ++
  setNum(Num+1);

  axios.post("/com/getTerminalInfo",{
      terminal:terminal,
      num:Num
  },{headers:{'Authorization':'Bearer '+store.token}})
  .then(res => setTerminalInfo([...terminalInfo,...res.data]))
  .catch(err => {
      if(err.response.status == "403" || err.response.status == "401") {
       //   setOpenJoin(true);
      }
  });
  }

  }




  
  
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
						 <TextField id="terminal" label="Terminal" onChange={event => setTerminal(event.target.value)} value={terminal} fullWidth />
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

      <Table className={classes.table}>
                  <TableHead className={classes.table} style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>TERMINAL</TableCell>
                        <TableCell>TERMINAL KNAME</TableCell>
                        <TableCell>TERMINAL ENAME</TableCell>
                        <TableCell>POST NO</TableCell>
                        <TableCell>ADDR1</TableCell>
                        <TableCell>ADDR2</TableCell>
                        <TableCell>URL1</TableCell>
                        <TableCell>URL2</TableCell>
                        <TableCell>BOSE PLACE CODE</TableCell>
                        <TableCell>BOSE SPECIAL AREA</TableCell>
                        <TableCell>NATION CODE</TableCell>
                        <TableCell>LOCATION CODE</TableCell>
                        <TableCell>XPOS</TableCell>
                        <TableCell>YPOS</TableCell>
                        <TableCell>WGS84 X</TableCell>
                        <TableCell>WGS84 Y</TableCell>
                        <TableCell>USE YN</TableCell>
                        <TableCell>INSERT DATE</TableCell>
                        <TableCell>INSERT USER</TableCell>
                        <TableCell>UPDATE DATE</TableCell>
                        <TableCell>UPDATE USER</TableCell>
                        <TableCell>INFO TYPE</TableCell>
                        <TableCell>ODCY USE</TableCell>
                        <TableCell>TERMINAL ID</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>CAL YN</TableCell>
                        <TableCell>CAL LIST TER NM</TableCell>
                        <TableCell>CAL TER NM</TableCell>
                      </TableRow>               
                  </TableHead>
                  <TableBody>
                      {
                          terminalInfo.map((element,key) => {
                              return(
                                <TableRow>    
                                    <TableCell>{element.terminal}</TableCell>
                                    <TableCell>{element.terminal_kname}</TableCell>
                                    <TableCell>{element.terminal_ename}</TableCell>
                                    <TableCell>{element.post_no}</TableCell>
                                    <TableCell>{element.addr1}</TableCell>
                                    <TableCell>{element.addr2}</TableCell>
                                    <TableCell>{element.url1}</TableCell>
                                    <TableCell>{element.url2}</TableCell>
                                    <TableCell>{element.bose_plase_code}</TableCell>
                                    <TableCell>{element.bose_special_area}</TableCell>
                                    <TableCell>{element.nation_code}</TableCell>
                                    <TableCell>{element.location_code}</TableCell>
                                    <TableCell>{element.xpos}</TableCell>
                                    <TableCell>{element.ypos}</TableCell>
                                    <TableCell>{element.wgs84_x}</TableCell>
                                    <TableCell>{element.wgs84_y}</TableCell>
                                    <TableCell>{element.use_yn}</TableCell>
                                    <TableCell>{element.insert_date}</TableCell>
                                    <TableCell>{element.insert_user}</TableCell>
                                    <TableCell>{element.update_date}</TableCell>
                                    <TableCell>{element.update_user}</TableCell>
                                    <TableCell>{element.info_type}</TableCell>
                                    <TableCell>{element.odcy_use}</TableCell>
                                    <TableCell>{element.terminal_id}</TableCell>
                                    <TableCell>{element.url}</TableCell>
                                    <TableCell>{element.cal_yn}</TableCell>
                                    <TableCell>{element.cal_list_ter_nm}</TableCell>
                                    <TableCell>{element.cal_ter_nm}</TableCell>
                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                       terminalInfo.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={28}>
                            <Button
                                color="info"
                                onClick={onMore}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{terminalInfo[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
       
      </GridContainer>
    </div>
  );
}



