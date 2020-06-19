import React,{useState,useEffect, Component} from "react";
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import { InfoWindow, Marker} from "react-google-maps";
import { Link} from "react-router-dom";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Grid from '@material-ui/core/Grid';

import Button from "components/CustomButtons/Button.js";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import {MAP} from 'react-google-maps/lib/constants';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { AppBar,Tabs,Tab } from "@material-ui/core";
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper'

function TabPanel(props) {
	const { children, value, index, ...other } = props;
  
	return (
	  <div
		role="tabpanel"
		hidden={value !== index}
		id={`scrollable-force-tabpanel-${index}`}
		aria-labelledby={`scrollable-force-tab-${index}`}
		{...other}
	  >
		{value === index && (
		  <Box p={3}>
			<Typography>{children}</Typography>
		  </Box>
		)}
	  </div>
	);
  }
  
  TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
  };
  
  function a11yProps(index) {
	return {
	  id: `scrollable-force-tab-${index}`,
	  'aria-controls': `scrollable-force-tabpanel-${index}`,
	};
  }

const styles = makeStyles((theme) => ({

	cardCategoryWhite: {
	  "&,& a,& a:hover,& a:focus": {
		color: "rgba(255,255,255,.62)",
		margin: "0",
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
	  marginTop: "0px",
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
	tableHeadRow: {
		"&,& a,& a:hover,& a:focus": {
		  color: "rgba(255,255,255,.62)",
		  fontSize: "20px",
		  },
		"& a,& a:hover,& a:focus": {
		  color: "#FFFFFF"
		}
	  

	},paper: {
		padding: theme.spacing(2),
		textAlign: 'center',
		color: theme.palette.text.secondary
	}
  }));
  

export default function TermianlList(props) {
	const classes = styles();
	const [value, setValue] = useState(0);
  
	const { port } = props; 
	const [usePort,setUsePort] = useState([]);


	useEffect(() => {
		console.log('호출....');
	    getdemdetIn();
		return () => {
			console.log('cleanup');
		  };
	 },[props.portCode]);
	const handleChange = (event, newValue) => {
		if (newValue == 0 ) {
			getdemdetIn();
		}else {
			getdemdetOut();
		}
		
		
		setValue(newValue);
		
	};		
	const getdemdetIn = () => {
		axios.post("/loc/getDemDetInTerminal",{ portCode:port.port},{headers:{'Authorization':'Bearer '+props.token}}).then(res => setUsePort(res.data));
	}
	const getdemdetOut = () => {
		axios.post("/loc/getDemDetOutTerminal",{ portCode:port.port},{headers:{'Authorization':'Bearer '+props.token}}).then(res => setUsePort(res.data));
	}
	return (
	  
		<MapControl position = {window.google.maps.ControlPosition.BOTTOM_CENTER}>
			{/* <div style={{backgroundColor: "#ffffff", width: "500px", height:"500px", borderRadius:"20px",marginBottom: "50px", overflow:'auto'}}>
				<Table className={classes.table}>
				
					<TableHead>
						<TableRow className={classes.tableHeadRow}>
							<TableCell align={'center'} style={{padding:"1px", fontSize: "10px"}}><span>{port.port_code}<br></br>{port.port_kname}</span></TableCell>
							<TableCell align={'center'} colSpan={'4'} style={{color:"blue", padding:"1px", fontSize: "10px"}}>IN</TableCell>
							<TableCell align={'center'} colSpan={'4'} style={{color:"red", padding:"1px", fontSize: "10px"}}>OUT</TableCell>
						</TableRow>
					
						<TableRow hover={true} className={classes.tableHeadRow}>
							<TableCell style={{padding:"1px", marginLeft:'5px',fontSize: "5px"}}>TERMINAL</TableCell>
							<TableCell style={{color:"blue", padding:"1px", fontSize: "5px"}}>DEM</TableCell>
							<TableCell style={{color:"blue", padding:"1px", fontSize: "5px"}}>DET</TableCell>
							<TableCell style={{color:"blue", padding:"1px", fontSize: "5px"}}>COMBINE</TableCell>
							<TableCell style={{color:"blue", padding:"1px", fontSize: "5px"}}>STO</TableCell>		
							<TableCell style={{color:"red", padding:"1px", fontSize: "5px"}}>DEM</TableCell>
							<TableCell style={{color:"red", padding:"1px", fontSize: "5px"}}>DET</TableCell>
							<TableCell style={{color:"red", padding:"1px", fontSize: "5px"}}>COMBINE</TableCell>
							<TableCell style={{color:"red", padding:"1px", fontSize: "5px"}}>STO</TableCell>
						</TableRow>
					</TableHead>
					
					<TableBody>
						{usePort.length !== 0 && (usePort.map((data, index) => {
						
						return (
							<TableRow key={index} className={classes.tableBodyRow} >
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}>
									{data.terminal}
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}>
									<a href="http://localhost:3000/own/demDet" className={classes.block}>
									1
									</a>
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}>
									<Link to={{
										pathname : `/svc/demDet/`,
										state : {param : data.terminal}}}>
										2
									</Link>
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}>
									3
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}> 
									4
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}> 
									5
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}> 
									6
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}> 
									7
								</TableCell>
								<TableCell align={'center'} className={classes.tableCell} style={{padding:"3px", fontSize: "5px"}}> 
									8
								</TableCell>
							</TableRow>
						);
						}))}
					</TableBody> 
				</Table>	
			</div> */}
			<div style={{backgroundColor: "#ffffff",  height:'400px',borderRadius:"20px",marginBottom: "50px", overflow:'auto',}}>
				<div style = {{marginLeft:'30px', height: '50px'}}>
					<span style={{fontWeight:'bold', fontSize:'20px'}}>{port.port}<br></br>{port.port_kname}</span>
				</div> 
				<div>
					<AppBar position="static" color="default">
						<Tabs
							value={value}
							onChange={handleChange}
							variant="scrollable"
							scrollButton="on"
							indicatorColor="primary"
							textColor="primary"
							aria-label="scrollable force tabs example">
								<Tab style={{width:'50%'}} label="In" icon={<ArrowBackIcon/>}></Tab>
								<Tab style={{width:'50%'}} label="Out" icon={<ArrowForwardIcon/>}></Tab>

						</Tabs>
					</AppBar>
					<TabPanel value={value} index={0}>
						<table>
						{/* <Paper className={classes.paper} style={{backgroundColor:'#00acc126'}}>
							<Grid container spacing={1}>
								<React.Fragment>
									<Grid container item xs={12} spacing={1}>
										<Grid item xs={3}>
											<Paper className={classes.paper}>Terminal</Paper>
										</Grid>
										<Grid item xs={2}>
											<Paper className={classes.paper}>Dem</Paper>
										</Grid>
										<Grid item xs={2}>
											<Paper className={classes.paper}>Det</Paper>
										</Grid>
										<Grid item xs={3}>
											<Paper className={classes.paper}>COMBINE</Paper>
										</Grid>
										<Grid item xs={2}>
											<Paper className={classes.paper}>STO</Paper>
										</Grid>
									</Grid>
								</React.Fragment>
							</Grid>
						</Paper> */}
						<tr>
							<th width="15%">Terminal<hr></hr></th>
							<th width="15%">Dem<hr></hr></th>
							<th width="15%">Det<hr></hr></th>
							<th width="15%">Combine<hr></hr></th>
							<th width="15%">Sto<hr></hr></th>
						</tr>
						
						{usePort.length !== 0 && (usePort.map((data, index) => {
							return (
									<tr>
										<td style={{textAlignLast:'center'}}>{data.terminal}<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.dem_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.dem_cnt}</Link>:data.dem_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.det_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.det_cnt}</Link>:data.det_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.combin_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.combin_cnt}</Link>:data.combin_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.osc_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.osc_cnt}</Link>:data.osc_cnt}	
										<hr></hr></td>
									</tr>
									
								
								);
							}))}
						</table>	
						{/* <Paper className={classes.paper}>
						
						{usePort.length !== 0 && (usePort.map((data, index) => {
							return (

								<Grid container spacing={1}>
									<React.Fragment>
										<Grid container item xs={12} spacing={1}>
											<Grid item xs={3}>
												<Paper className={classes.paper}>{data.terminal}</Paper>
											</Grid>
											<Grid item xs={2}>
												<Paper className={classes.paper}>{data.dem_cnt}</Paper>
											</Grid>
											<Grid item xs={2}>
												<Paper className={classes.paper}>{data.det_cnt}</Paper>
											</Grid>
											<Grid item xs={3}>
												<Paper className={classes.paper}>{data.combin_cnt}</Paper>
											</Grid>
											<Grid item xs={2}>
												<Paper className={classes.paper}>{data.osc_cnt}</Paper>
											</Grid>
										</Grid>
									</React.Fragment>
								</Grid>
								);
							}))}

						</Paper> */}
					</TabPanel>
					<TabPanel value={value} index={1}>
					{/* <Paper className={classes.paper} style={{backgroundColor:'#00acc126'}}>
							<Grid container spacing={1}>
								<React.Fragment>
									<Grid container item xs={12} spacing={1}>
										<Grid item xs={3}>
											<Paper className={classes.paper}>Terminal</Paper>
										</Grid>
										<Grid item xs={2}>
											<Paper className={classes.paper}>Dem</Paper>
										</Grid>
										<Grid item xs={2}>
											<Paper className={classes.paper}>Det</Paper>
										</Grid>
										<Grid item xs={3}>
											<Paper className={classes.paper}>COMBINE</Paper>
										</Grid>
										<Grid item xs={2}>
											<Paper className={classes.paper}>STO</Paper>
										</Grid>
									</Grid>
								</React.Fragment>
							</Grid>
						</Paper>
					
						
						<Paper className={classes.paper}>
						{usePort.length !== 0 && (usePort.map((data, index) => {
							return (

								<Grid container spacing={1}>
									<React.Fragment>
										<Grid container item xs={12} spacing={1}>
										<	Grid item xs={3}>
												<Paper className={classes.paper}>{data.terminal}</Paper>
											</Grid>
											<Grid item xs={2}>
												<Paper className={classes.paper}>{data.dem_cnt}</Paper>
											</Grid>
											<Grid item xs={2}>
												<Paper className={classes.paper}>{data.det_cnt}</Paper>
											</Grid>
											<Grid item xs={3}>
												<Paper className={classes.paper}>{data.combin_cnt}</Paper>
											</Grid>
											<Grid item xs={2}>
												<Paper className={classes.paper}>{data.osc_cnt}</Paper>
											</Grid>
										</Grid>
									</React.Fragment>
								</Grid>
								);
							}))}

						</Paper> */}
						<table>
						<tr>
							<th width="15%">Terminal<hr></hr></th>
							<th width="15%">Dem<hr></hr></th>
							<th width="15%">Det<hr></hr></th>
							<th width="15%">Combine<hr></hr></th>
							<th width="15%">Sto<hr></hr></th>
						</tr>
						
						{usePort.length !== 0 && (usePort.map((data, index) => {
							return (
									<tr>
										<td style={{textAlignLast:'center'}}>{data.terminal}<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.dem_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.dem_cnt}</Link>:data.dem_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.det_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.det_cnt}</Link>:data.det_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.combin_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.combin_cnt}</Link>:data.combin_cnt}	
										<hr></hr></td>
										<td style={{textAlignLast:'center'}}>
											{data.osc_cnt !=0?<Link to={{pathname : `/svc/demDet/`,state : {param : data}}}>{data.osc_cnt}</Link>:data.osc_cnt}	
										<hr></hr></td>
									</tr>
									
								
								);
							}))}
						</table>
					</TabPanel>

				</div>
			</div>






		</MapControl>

	);
}

class MapControl extends Component {
	
	static contextTypes = {
		[MAP] : PropTypes.object
	}
	
	componentWillMount() {
		
		this.map = this.context[MAP]
		this.controlDiv = document.createElement('div');
		this.map.controls[this.props.position].push(this.controlDiv);
	
	}
	
	componentWillUnmount() {
		
		const controlArray = this.map.controls[this.props.position].getArray()
		
		for (let index in controlArray) {
			if(controlArray[index] === this.controlDiv) {
				this.map.controls[this.props.position].removeAt(index);
			}
		}
	}

	render() {
		return createPortal(this.props.children,this.controlDiv)
	}
}