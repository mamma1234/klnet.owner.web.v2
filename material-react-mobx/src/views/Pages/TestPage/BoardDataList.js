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
    		<TableHead className={classes[tableHeaderColor + "TableHeader"]}>
    	           <TableRow className={classes.tableHeadRow}>
    	                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >BOARD ID</TableCell>
    	                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >TITLE</TableCell>
    	                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >CONTENT</TableCell>
    	                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >AUTHOR NAME</TableCell>
    	                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >HIT COUNT</TableCell>
    	                  <TableCell className={classes.tableCell + " " + classes.tableHeadCell} >INSERT DATE</TableCell>
    	            </TableRow>
 
    	   </TableHead>
        <TableBody>
           {tableData.map((prop, key) => {
                  return (
                    <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
                  );
                })
			}
				
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter >
        	<TableRow  >
        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={15}>
        		<Button
				    color="info"
					onClick={handleAddFunction}
        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
				>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData[0].tot_page}&nbsp;)</Button>
		    </TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
    </div>
  );
}
export default function BoardList(props) {
//const BoardList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
  const [boardId,setBoardId] = useState("");
  const [title,setTitle] = useState("");
  const [authorName,setAuthorName] = useState("");
  const [boardData,setBoardData] = useState([]);
    
  const onSubmit = () => {
	numCnt=1;
	axios.post("/com/getBoardDataList",{num:numCnt,boardId:boardId,title:title,authorName:authorName}, //num:numCnt,boardId:boardId,title:title,authorName:authorName
			{headers:{'Authorization':'Bearer '+props.token}})
				.then(setBoardData([]))
			    .then(res => setBoardData(res.data))
			    .catch(err => {
			    	alert(err);
			    });
  }
  
  const handleAddRow = () => {

    //page ++
	    
	    if(numCnt !== boardData[0].tot_page) {
	    	numCnt=numCnt+1;
		    axios.post("/com/getBoardDataList",{num:numCnt,boardId:boardId,title:title,authorName:authorName},
		    		{headers:{'Authorization':'Bearer '+props.token}})
				  .then(res => setBoardData([...boardData,...res.data]))
		   	      .catch(err => {
		            if(err.response.status === 403 || err.response.status === 401) {
			        	//setOpenJoin(true);
			        	//props.openLogin();
			        }
		            });
	    }
   
  };
  
  const classes = useStyles();
  
  return (
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>Board Data </h4>
				</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12}>
			     	<Grid container spacing={1}>
			     		<Grid item xs={12} sm={2} md={2}>
			     			<TextField id="boardId" label="board id" onChange={event => setBoardId(event.target.value)} value={boardId} fullWidth />
			     		</Grid>	
			     		<Grid item xs={12} sm={2} md={2}>
		     			<TextField id="title" label="title" onChange={event => setTitle(event.target.value)} value={title} fullWidth />
		     		</Grid>	
		     		<Grid item xs={12} sm={2} md={2}>
	     				<TextField id="authorName" label="author name" onChange={event => setAuthorName(event.target.value)} value={authorName} fullWidth />
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
	            tableHead={[]}
	            tableData={boardData}
	      		tableRownum={numCnt}
	      		onClickHandle ={handleAddRow}
	      	/>
	      	 </CardBody>
        </Card>
		</GridItem>
    </GridContainer>
  );
}
//))
//export default BoardList;



class TableRows extends React.Component {
	  render() {
	     const { data } = this.props;

	    return [
	      <TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'5%'}}>{data.board_id}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.title}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{
							data.content.map((data, key) => {
								return ( <span key={key}>{data}<br/></span> );
							})
						}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.author_name}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'5%'}}>{data.hit_count}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.insert_date}</TableCell>
	      </TableRow>
	    ];
	  }
}
