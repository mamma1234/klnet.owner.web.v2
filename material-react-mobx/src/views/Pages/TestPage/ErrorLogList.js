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
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/TablePaging.js";
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


export default function ErrorLogList(props) {

  const {store} = props;
  console.log(">>>>admin:",store);
  //const [carrierCode,setCarrierCode] = useState("");
  const [seq,setSeq] = useState("");
  const [Num,setNum] = useState(1);
  const [excelSchLogData,setExcelSchLogData] = useState([]);
  const [errorLogData, setErrorLogData] = useState([]);
  const [eDate,setEDate] = useState(new Date());
  const setStartDate = new Date();
  const [sDate,setSDate] = useState(setStartDate.setDate(setStartDate.getDate()-30));
  const [openJoin,setOpenJoin] = useState(false);
  
  
  
  const onSubmit = () => {
            setNum(1);

            axios.post("/com/getErrorLogList",{
                seq:seq,
                startDate:moment(sDate).format('YYYYMMDD'),
                endDate:moment(eDate).format('YYYYMMDD'),
                num:Num
            },{headers:{'Authorization':'Bearer '+store.token}})
            .then(res => setErrorLogData(res.data))
            .catch(err => {
                if(err.response.status == "403" || err.response.status == "401") {
                    setOpenJoin(true);
                }
            });
        

  }
  const onMore = () => {
    if(Num != errorLogData[0].tot_page) {
        //page ++
        setNum(Num+1);

        axios.post("/com/getErrorLogList",{
            seq:seq,
            startDate:moment(sDate).format('YYYYMMDD'),
            endDate:moment(eDate).format('YYYYMMDD'),
            num:Num
        },{headers:{'Authorization':'Bearer '+store.token}})
        .then(res => setErrorLogData([...errorLogData,...res.data]))
        .catch(err => {
            if(err.response.status == "403" || err.response.status == "401") {
                setOpenJoin(true);
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
				<h4 className={classes.cardTitleBlack}>Error Log Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} md={3}>
							 <CalendarBox
					        			labelText ="LOG DATE FROM"
					      				id="fromDate"
					      				format="yyyy-MM-dd"
					      				setValue={sDate}
					        			onChangeValue={date => setSDate(date)}
					        			formControlProps={{fullWidth: true}}
					        />
			     		</Grid>	
			     		<Grid item xs={12} md={3}>
						 <CalendarBox
					        			labelText ="LOG DATE TO"
					        			id="toDate"
					        			format="yyyy-MM-dd"
					        			setValue={eDate}
					        		    onChangeValue={
											date => setEDate(date)
										}
					        			formControlProps={{fullWidth: true}}
					        		/>
						 </Grid>
						 <Grid item xs={12} md={3}>
						 <TextField id="seq" label="SEQ" onChange={event => setSeq(event.target.value)} value={seq} fullWidth />
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
                  <TableHead style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>Error Date</TableCell>
                        <TableCell>Seq</TableCell>
                        <TableCell>Sql State</TableCell>
                        <TableCell>Message</TableCell>
                        <TableCell>Detail</TableCell>
                        <TableCell>Hint</TableCell>
                        <TableCell>Context</TableCell>
                        <TableCell>Name</TableCell>
                      </TableRow>               
                  </TableHead>

                  <TableBody>
                      {
                          errorLogData.map((element,key) => {
                              return(
                                <TableRow>    
                                    <TableCell>{element.error_date}</TableCell>
                                    <TableCell>{element.seq}</TableCell>
                                    <TableCell>{element.sql_state}</TableCell>
                                    <TableCell>{element.message}</TableCell>
                                    <TableCell>{element.detail}</TableCell>
                                    <TableCell>{element.hint}</TableCell>
                                    <TableCell>{element.context}</TableCell>
                                    <TableCell>{element.name}</TableCell>
                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                      errorLogData.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                            <Button
                                color="info"
                                onClick={onMore}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{errorLogData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
              
	      	 </CardBody>
        </Card>
		</GridItem>     
    </GridContainer>
  );
}



