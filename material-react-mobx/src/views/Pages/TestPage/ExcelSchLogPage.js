import React,{ useState } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import TextField from '@material-ui/core/TextField';

// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

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
};

const useStyles = makeStyles(styles);


export default function ScheduleList(props) {

  const {store} = props;
  console.log(">>>>admin:",store);
  //const [carrierCode,setCarrierCode] = useState("");
  const [seq,setSeq] = useState("");
  const [tapNum,setTapNum] = useState(0);
  const [excelSchLogData,setExcelSchLogData] = useState([]);
  const [eDate,setEDate] = useState(new Date());
  const setStartDate = new Date();
  const [sDate,setSDate] = useState(setStartDate.setDate(setStartDate.getDate()-30));
  //const [openJoin,setOpenJoin] = useState(false);
  
  
  const handleTapsClick = (e) => {
	  setTapNum(e);
	  if(setSeq) {
		  onSubmit(); 
	  }
  }
  
  const onSubmit = () => {
	  
		  if(tapNum===0) {

			  axios.post("/com/getExcelSchLogList",{
				  seq:seq,
				  startDate:moment(sDate).format('YYYYMMDD'),
				  endDate:moment(eDate).format('YYYYMMDD')
				},{headers:{'Authorization':'Bearer '+store.token}})
				.then(setExcelSchLogData([]))
			    .then(res => setExcelSchLogData(res.data))
			    .catch(err => {
			        if(err.response.status === 403) {
			        	//setOpenJoin(true);
			        }
			    });

		  }
  }
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>Excel Sch Log</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} md={3}>
							 <CalendarBox
					        			labelText ="LOG DATE FROM"
					      				id="portDate"
					      				format="yyyy-MM-dd"
					      				setValue={sDate}
					        			onChangeValue={date => setSDate(date)}
					        			formControlProps={{fullWidth: true}}
					        />
			     		</Grid>	
			     		<Grid item xs={12} md={3}>
						 <CalendarBox
					        			labelText ="LOG DATE TO"
					        			id="portDate"
					        			format="yyyy-MM-dd"
					        			setValue={eDate}
					        		    onChangeValue={
											date => setEDate(date)
										}
					        			formControlProps={{fullWidth: true}}
					        		/>
						 </Grid>
						 <Grid item xs={12} md={3}>
						 <TextField id="cntrNo" label="SEQ" onChange={event => setSeq(event.target.value)} value={seq} fullWidth />
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
	      <CustomTabs headerColor="info"
	    	  handleTapsClick={handleTapsClick}
	          tabs={[
	          {
	              tabName: "Excel Sch Log"
	              //,tabIcon: Face
	              ,tabContent: (
	                  <ExcelSchLogTable
	                      tableHeaderColor="info"
	                      tableHead={[  "LOG_DATE","SEQ","NAME","MESSAGE"]}
	                      tableData={excelSchLogData}
	                  />
	              )
	          }]}>     
      </CustomTabs>
		</GridItem>
    </GridContainer>
  );
}
