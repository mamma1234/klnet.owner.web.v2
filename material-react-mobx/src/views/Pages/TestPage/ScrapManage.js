import React,{ useState } from "react";
// @material-ui/core components
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
//core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// core components
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import { observer, inject} from 'mobx-react'; // 6.x

const useStyles = makeStyles(styles);
let numCnt =1;

function ScheduleTable(props) {


  const classes = useStyles();
  const { tableHead,tableData, tableHeaderColor, tableRownum } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }


  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
    	<Table className={classes.table}>
    	{tableHead !== undefined ? (
    	          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
    	            <TableRow className={classes.tableHeadRow}>
    	              {tableHead.map((prop, key) => {
    	                return (
    	                  <TableCell
    	                    className={classes.tableCell + " " + classes.tableHeadCell}
    	                    key={key}
    	                  >
    	                    {prop}
    	                  </TableCell>
    	                );
    	              })}
    	            </TableRow>
    	          </TableHead>
    	        ) : null}
        <TableBody>
           {tableData.map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
                  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter >
        	<TableRow  >
        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={15}>
        		<Button
				    color="info"
					onClick={handleAddFunction}
        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
				>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData[0].totalcnt}&nbsp;)</Button>
		    </TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
    </div>
  );
}

const ScheduleList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 	
//export default function ScheduleList() {


  //const [carrierCode,setCarrierCode] = useState("");
  const [carrierCode,setCarrierCode] = useState("");
  const [pol,setPol] = useState("");
  const [pod,setPod] = useState("");
  const [schData,setSchData] = useState([]);
    
  const onSubmit = () => {
	numCnt=1;
	axios.post("/sch/getScheduleSample",{num:numCnt,carriercode:carrierCode,pol:pol,pod:pod},
			{headers:{'Authorization':'Bearer '+userStore.token}})
				.then(setSchData([]))
			    .then(res => setSchData(res.data))
			    .catch(err => {
			    	alert(err);
			    });
  }
  
  const handleAddRow = () => {

    //page ++
	    numCnt=numCnt+1;
	    
	    axios.post("/sch/getScheduleSample",{num:numCnt,carriercode:carrierCode,pol:pol,pod:pod},
	    		{headers:{'Authorization':'Bearer '+userStore.token}})
			  .then(res => setSchData([...schData,...res.data]))
	   	      .catch(err => {
	            if(err.response.status === "403" || err.response.status === "401") {
		        	//setOpenJoin(true);
		        	//props.openLogin();
		        }
	            });
   
  };
  
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} sm={2} md={2}>
			     			<TextField id="carrierCode" label="carrierCode" onChange={event => setCarrierCode(event.target.value)} value={carrierCode} fullWidth />
			     		</Grid>	
			     		<Grid item xs={12} sm={2} md={2}>
		     			<TextField id="pol" label="pol" onChange={event => setPol(event.target.value)} value={pol} fullWidth />
		     		</Grid>	
		     		<Grid item xs={12} sm={2} md={2}>
	     				<TextField id="pod" label="pod" onChange={event => setPod(event.target.value)} value={pod} fullWidth />
	     			</Grid>	
		     		<Grid item xs={12} sm={2} md={4}></Grid>	
						<Grid item xs={12} sm={12} md={2} >
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
	      	<ScheduleTable 
	      		tableHeaderColor="info"
	            tableHead={["LINE_CODE", "VSL_NAME", "VOYAGE", "START_ROUTE_DATE", "START_ROUTE_CODE", "END_ROUTE_DATE", "END_ROUTE_CODE", "START_ROUTE_NAME", "END_ROUTE_NAME", "ETA", "ETA_TIME", "ETD", "ETD_TIME", "TS_YN", "INSERT_DATE"]}
	            tableData={schData}
	      		tableRownum={numCnt}
	      		onClickHandle ={handleAddRow}
	      	/>
	      	 </CardBody>
        </Card>
		</GridItem>
    </GridContainer>
  );
}
))
export default ScheduleList;



class TableRows extends React.Component {
	  render() {
	     const { data } = this.props;

	    return [
	      <TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.line_code}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.vsl_name}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.voyage}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_date}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_code}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_name}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_date}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_code}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_name}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.eta}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.eta_time}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.etd}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.etd_time}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.ts_yn}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.insert_date}</TableCell>
	      </TableRow>
	    ];
	  }
}
