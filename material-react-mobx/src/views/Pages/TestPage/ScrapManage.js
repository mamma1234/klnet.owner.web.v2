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
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {userService} from 'views/Pages/Login/Service/Service.js';
import { observer, inject} from 'mobx-react'; // 6.x

const useStyles = makeStyles(styles);
let numCnt =1;

// function ScrapManageTable(props) {


//   const classes = useStyles();
//   const { tableHead,tableData, tableHeaderColor, tableRownum } = props;

//   const handleAddFunction = () => {
//     props.onClickHandle();
//   }


//   return (
//     <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
//     	<Table className={classes.table}>
//     	{tableHead !== undefined ? (
//     	          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
//     	            <TableRow className={classes.tableHeadRow}>
//     	              {tableHead.map((prop, key) => {
//     	                return (
//     	                  <TableCell
//     	                    className={classes.tableCell + " " + classes.tableHeadCell}
//     	                    key={key}
//     	                  >
//     	                    {prop}
//     	                  </TableCell>
//     	                );
//     	              })}
//     	            </TableRow>
//     	          </TableHead>
//     	        ) : null}
//         <TableBody>
//            {tableData.map((prop, key) => {
//                   return (
//                     <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
//                   );
//                 })}
           
//         </TableBody>
//         {(tableData.length >= 10 ?
//         <TableFooter >
//         	<TableRow  >
//         	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={15}>
//         		<Button
// 				    color="info"
// 					onClick={handleAddFunction}
//         		    style={{paddingLeft:'60px',paddingRight:'60px'}}
// 				>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableData[0].totalcnt}&nbsp;)</Button>
// 		    </TableCell>
//         	</TableRow>
//         </TableFooter>: null )}
//       </Table>
//     </div>
//   );
// }
export default function ScrapManageList(props) {
//const ScrapManageList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => {

	const [carrierCode,setCarrierCode] = useState("");
	const [schData,setSchData] = useState([]);
    
	const onSubmit = () => {
		numCnt=1;
		const token = userService.GetItem()?userService.GetItem().token:null;
		if(token) {
		axios.post("/loc/getScrapManageList",{num:numCnt,carriercode:carrierCode},
			{headers:{'Authorization':'Bearer '+token}})
			.then(setSchData([]))
			.then(res => setSchData(res.data))
			.catch(err => {
			alert(err);
		});
		} else {
			props.openLogin();
		}
	}
  
	const handleAddRow = () => {
	numCnt=numCnt+1;
	const token = userService.GetItem()?userService.GetItem().token:null;
	if(token) {
		axios.post("/loc/getScrapManageList",{num:numCnt,carriercode:carrierCode},
			{headers:{'Authorization':'Bearer '+token}})
			.then(res => setSchData([...schData,...res.data]))
			.catch(err => {
			if(err.response.status === 403 || err.response.status === 401) {

			}
		});
	} else {
		props.openLogin();
	}
	};
  
  const classes = useStyles();
  
	return (
		<div>
			<Card style={{marginBottom:'0px'}}>
				<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
				</CardHeader>
			<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
				<Grid item xs={12}>
					<Grid container spacing={1} justify="space-between">
					<Grid item xs={12} sm={2} md={2}>
						<TextField id="carrierCode" label="carrierCode" onChange={event => setCarrierCode(event.target.value)} value={carrierCode} fullWidth />
					</Grid>	
					<Grid item xs={12} sm={2} md={4}></Grid>	
					<Grid item xs={12} sm={12} md={2} >
						<Button color="info" onClick = {onSubmit} fullWidth>Search</Button>							
					</Grid>
				</Grid>
				</Grid>
			</CardBody>
			</Card>
			<Card style={{marginBottom:'0px'}}>
				<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
					<Table stickyHeader className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
						<TableHead  className={classes["grayTableHeader"]} style={{padding:'5px'}} id="scroll_top">
							<TableRow >
								<TableCell className={classes.tableHeaderCellStyle}>NO</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>LINE</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>CUSTOM LINE</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>ID</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>USE YN</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>LAST SEQ</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>SCRAP START DATE</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>SCRAP END DATE</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>INSERT USER</TableCell>
								<TableCell className={classes.tableHeaderCellStyle}>INSERT DATE</TableCell>
							</TableRow>
						</TableHead>
					<TableBody >
						{
							schData.map((prop, key) => {
							return (
							<TableRows key={key} index={key + 1} data={prop} 
							// store={store} 
							color="gray" />
							);
							})
						}
					</TableBody>
					{(schData.length >= 10 ?
						<TableFooter >
							<TableRow  >
								<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
									<Button
										color="info"
										onClick={handleAddRow}
										style={{paddingLeft:'60px',paddingRight:'60px'}}
										>MORE&nbsp;(&nbsp;{schData[schData.length-1].curpage}&nbsp;/&nbsp;{schData[0].totalcnt}&nbsp;)</Button>
								</TableCell>
							</TableRow>
						</TableFooter>: null )}
					</Table>
				</CardBody>
			</Card>
		</div>
	);
}
//))
//export default ScrapManageList;



class TableRows extends React.Component {
	  render() {
		const { data } = this.props;
	    return [
	      <TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'3%'}}>{data.no}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'6%'}}>{data.line_code}</TableCell>
			<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.customs_line_code}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.web_scrap_id}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'5%'}}>{data.web_scrap_yn}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.web_seq}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.job_start_date}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.job_end_date}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.insert_user}</TableCell>
	        <TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'10%'}}>{data.insert_date}</TableCell>
	      </TableRow>
	    ];
	  }
}
