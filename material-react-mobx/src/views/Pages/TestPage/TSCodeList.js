import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from '@material-ui/core/Select';
// core components
import GridItem from "components/Grid/GridItem.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";
import Grid from '@material-ui/core/Grid';
import BackupIcon from "@material-ui/icons/Backup";
import SearchButton from "components/CustomButtons/Button.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import MaterialTable from 'material-table';
const styles = {
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
    gridStyle1: {
    	paddingTop:'1px',
    	paddingBottom:'1px',
    },
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
	const classes = useStyles();
	const [searchLineCode,setSearchLineCode] = useState("");
	const [searchStartPort,setSearchStartPort] = useState("");
	const [searchEndPort,setSearchEndPort] = useState("");
	const [searchCount, setSearchCount] = useState(0);
	const [store,setStore] = useState(props.store); // eslint-disable-line no-unused-vars
	const [selectData,setSelectData] = useState([]);
	useEffect(() => {
		axios.post("/sch/getTSCodeList",{},
				{headers:{'Authorization':'Bearer '+store.token}}
		).then(res => {
			setSelectData(res)
			setSearchCount(res.data.length);
		});
		return () => {
			console.log('LINE CODE cleanup');
		};
	}, []);

	const onSubmit = () => {
		axios.post("/sch/getTSCodeList",{data:{line_code:searchLineCode, start_port_code:searchStartPort, end_port_code:searchEndPort}},
				{headers:{'Authorization':'Bearer '+store.token}}
		).then(res => {
			setSelectData(res)
			setSearchCount(res.data.length);
		});
	}

	return (	
		<div>
			<Card style={{marginBottom:'1px'}}>
				<CardHeader color="info" stats icon >
					<CardIcon color="info" style={{height:'55px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>T/S CODE</h4>
				</CardHeader>
				<CardBody style={{padding:'2px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="Carrier" label={"Carrier"} onChange={event => setSearchLineCode(event.target.value.toUpperCase())} value={searchLineCode} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="Origin" label={"Origin"} onChange={event => setSearchStartPort(event.target.value.toUpperCase())} value={searchStartPort} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
							<TextField id="Destination" label={"Destination"} onChange={event => setSearchEndPort(event.target.value.toUpperCase())} value={searchEndPort} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={4}></Grid>
							<Grid item  xs={12} sm={12} md={2}>
								<SearchButton color="info" fullWidth onClick={onSubmit} >Search</SearchButton>
							</Grid>
							</Grid>
					</GridItem>
					
				</CardBody>
			</Card>
			<Grid item xs={12}>
				<MaterialTable
					totalCount={10}
					options={{actionsColumnIndex: -1}}
					title=""
					columns={
						[{ width: '5%' ,title: 'No', field: 'num', editable:'never' }
						,{ width: '25%' ,title: 'Carrier', field: 'line_code', editable:'onAdd',  editComponent: (props) => (
							<CustomInput
								labelText={
									<span>
									Carrier <small>(required)</small>
									</span>
								}
								id="lineCode"
								formControlProps={{
								fullWidth: true
								}}
								inputProps={{
									onChange:event => props.onChange(event.target.value.toUpperCase()),
									value:props.value,
									maxLength:4
								}}
							/>
							)}
							,{ width: '30%' ,title: 'Origin', field: 'start_port_code', editable:'onAdd', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										Origin <small>(required)</small>
										</span>
									}
									id="start_port_code"
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										onChange:event => props.onChange(event.target.value.toUpperCase()),
										value:props.value,
										maxLength:5
									}}
								/>
								)}
							,{ width: '30%', title: 'Destination', field: 'end_port_code', editable:'onAdd', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										Destination <small>(required)</small>
										</span>
									}
									id='end_port_code'
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										onChange:event => props.onChange(event.target.value.toUpperCase()),
										value:props.value,
										maxLength:5
									}}
								/>
								)}							
								,{ width: '10%', title: 'T/S', field: 'ts', editComponent: (props) => (
/* 									<CustomInput
										labelText={
											<span>
											T/S <small>(required)</small>
											</span>
										}
										id='ts'
										formControlProps={{
										fullWidth: true
										}}
										inputProps={{
											maxLength:10,
											onChange:event => props.onChange(event.target.value),
											value:props.value
										}}
									/> */
									<FormControl fullWidth>
									<InputLabel >T/S</InputLabel>
									<Select 
									native
									id = "tS"
									value={props.value?props.value:props.onChange("DIRECT")}
									label=""
									onChange={event => props.onChange(event.target.value)}
									>
									<option value="DIRECT">DIRECT</option>
									<option value="T/S">T/S</option>
									<option value="Undefined">Undefined</option>
									</Select>
									</FormControl>
									)}	]
					}
					data={selectData.data}
					components={{
						Toolbar: props => (
								<GridItem>
									<Grid item xs={12} sm={12} md={12}>
										<Grid>
										<Button
											variant="contained"
											color="info"
											size="sm"
											style={{lineHeight:"1",marginRight: 5}}
											onClick={() => props.actions[0].onClick()}
											startIcon={<BackupIcon/>}
											>add
										</Button>
											<label  style={{float:'right', padding:'5px'}}> Total : {searchCount}</label>
										</Grid>
										</Grid>
									</GridItem>
								
						)
					}}
					editable={{
						onRowAdd: newData =>
							
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									// if ( undefined == newData.line_code || '' == newData.line_code) {
									if ( typeof newData.line_code === 'undefined'|| '' === newData.line_code) {
										alert("Carrier를 입력해주세요.");
										return false;
									} else {
										if(newData.line_code.length != 3) {
											alert("Carrier는 3자리만 입력가능합니다.");
											return false;
										}
									}
									// if ( undefined == newData.port_name || '' == newData.port_name ) {
									if ( typeof newData.start_port_code === 'undefined' || '' === newData.start_port_code ) {
										alert("Origin을 입력해주세요.");
										return false;
									} else {
										if(newData.start_port_code.length != 5) {
											alert("Origin은 5자리만 입력가능합니다.");
											return false;
										}
									}
									// if (undefined == newData.iso_port_code || '' == newData.iso_port_code) {
									if ( typeof newData.end_port_code === 'undefined' || '' === newData.end_port_code) {
										alert("Destination을 입력해주세요.");
										return false;
									} else {
										if(newData.start_port_code.length != 5) {
											alert("Destination은 5자리만 입력가능합니다.");
											return false;
										}
									}
									axios.post("/sch/getTSCodeList",{data:newData},{headers:{'Authorization':'Bearer '+store.token}}).then(res => {
										if ( res.data.length == 0) {
													axios.post("/sch/insertTSCode",{newData:newData},{headers:{'Authorization':'Bearer '+store.token}}).then(res => {
														setSelectData(prevState => {
															let data = [];
															
															if( 0 < prevState.length ) {
																data = [...prevState.data];
															}
															data.push(newData);

															setSearchCount(data.length);
															return { ...prevState, data };
														});		
													})
												}else {
													alert("["+newData.line_code+"/"+newData.start_port_code+"/"+newData.end_port_code+"] 해당 구간은 이미 존재합니다. 등록 불가합니다.");
													// data[data.indexOf(newData)] = oldData;
													// return { ...prevState, data };
												}
												
											
											
									});
								}, 600);
						}),
						onRowUpdate: (newData, oldData) =>
								
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									// if ( undefined == newData.line_code || '' == newData.line_code) {
									if ( typeof newData.line_code === 'undefined' || '' === newData.line_code) {
										alert("Carrier를 입력해주세요.");
										return false;
									}
									// if ( undefined == newData.port_name || '' == newData.port_name ) {
									if ( typeof newData.start_port_code === 'undefined' || '' === newData.start_port_code ) {
										alert("Origin을 입력해주세요.");
										return false;
									}
									// if (undefined == newData.iso_port_code || '' == newData.iso_port_code) {
									if (typeof newData.end_port_code === 'undefined' || '' === newData.end_port_code) {
										alert("Destination을 입력해주세요.");
										return false;
									}
									if (oldData) {
										axios.post("/sch/getTSCodeList",{data:newData},{headers:{'Authorization':'Bearer '+store.token}}).then(res => {
											// 수정 처리.
											if ( res.data.length == 0) {
												
												alert("["+newData.line_code+ "/" +newData.start_port_code+ "/" +newData.end_port_code+"] 해당 구간이 존재하지 않습니다. 변경이 불가합니다.");
												// data[data.indexOf(newData)] = oldData;
												// return { ...prevState, data };
											} else {
												axios.post("/sch/updateTSCode",{ oldData:oldData, newData:newData},{headers:{'Authorization':'Bearer '+store.token}});
												setSelectData(prevState => {
													let data = [...prevState.data];
													
													data[data.indexOf(oldData)] = newData;
													return { ...prevState, data };
												});
											}
										});
									}
									
								}, 600);
							}),
						onRowDelete: oldData =>
							new Promise(resolve => {
								setTimeout(() => {
									resolve();
									setSelectData(prevState => {
										const data = [...prevState.data];
										data.splice(data.indexOf(oldData), 1);
										// 삭제 처리.
										axios.post("/sch/deleteTSCode",{ oldData:oldData},{headers:{'Authorization':'Bearer '+store.token}})
										setSearchCount(data.length);
										return { ...prevState, data };
									});
								}, 600);
						}),
					}}
				/>
			</Grid>
		</div>   
  );
}
