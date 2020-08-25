import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import FormControl from "@material-ui/core/FormControl";
//import InputLabel from "@material-ui/core/InputLabel";
//import Select from '@material-ui/core/Select';
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
	const [searchArea,setSearchArea] = useState("");
	const [searchDept,setSearchDept] = useState("");
	const [searchName,setSearchName] = useState("");
	const [searchCount, setSearchCount] = useState(0);
	const [store,setStore] = useState(props.store); // eslint-disable-line no-unused-vars
	const [selectData,setSelectData] = useState([]);
	useEffect(() => {
		axios.post("/sch/getPicCodeList",{},
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
		axios.post("/sch/getPicCodeList",{data:{line_code:searchLineCode, area:searchArea
			, dept:searchDept, name:searchName}},
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
					<h4 className={classes.cardTitleBlack}>PIC CODE</h4>
				</CardHeader>
				<CardBody style={{padding:'2px'}}>
					<GridItem>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="Carrier" label={"Carrier"} onChange={event => setSearchLineCode(event.target.value.toUpperCase())} value={searchLineCode} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
								<TextField id="Area" label={"Area"} onChange={event => setSearchArea(event.target.value)} value={searchArea} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
							<TextField id="Dept" label={"Dept"} onChange={event => setSearchDept(event.target.value)} value={searchDept} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}>
							<TextField id="Name" label={"Name"} onChange={event => setSearchName(event.target.value)} value={searchName} //variant="outlined" size="small" 
									fullWidth />
							</Grid>
							<Grid item xs={12} sm={12} md={2}></Grid>
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
						,{ width: '10%' ,title: 'Carrier', field: 'line_code', editable:'onAdd',  editComponent: (props) => (
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
									maxLength:3
								}}
							/>
							)}
							,{ width: '9%' ,title: 'Area', field: 'pic_area', editable:'onAdd', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										Area <small>(required)</small>
										</span>
									}
									id="pic_area"
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										onChange:event => props.onChange(event.target.value),
										value:props.value
									}}
								/>
								)}
							,{ width: '9%', title: 'Dept', field: 'pic_dept', editable:'onAdd', editComponent: (props) => (
								<CustomInput
									labelText={
										<span>
										Dept <small>(required)</small>
										</span>
									}
									id='pic_dept'
									formControlProps={{
									fullWidth: true
									}}
									inputProps={{
										onChange:event => props.onChange(event.target.value),
										value:props.value
									}}
								/>
								)}							
								,{ width: '10%', title: 'Name', field: 'pic_name', editable:'onAdd', editComponent: (props) => (
 									<CustomInput
										labelText={
											<span>
											Name <small>(required)</small>
											</span>
										}
										id='pic_name'
										formControlProps={{
										fullWidth: true
										}}
										inputProps={{
											onChange:event => props.onChange(event.target.value),
											value:props.value
										}}
									/>
								)}	
								,{ width: '11%', title: 'Tel', field: 'pic_tel', editComponent: (props) => (
									<CustomInput
									   labelText={
										   <span>
										   Tel
										   </span>
									   }
									   id='pic_tel'
									   formControlProps={{
									   fullWidth: true
									   }}
									   inputProps={{
										   onChange:event => props.onChange(event.target.value),
										   value:props.value
									   }}
								   />
							   )}
							   ,{ width: '19%', title: 'Email', field: 'pic_email', editComponent: (props) => (
								<CustomInput
								   labelText={
									   <span>
									   Email
									   </span>
								   }
								   id='pic_email'
								   formControlProps={{
								   fullWidth: true
								   }}
								   inputProps={{
									   onChange:event => props.onChange(event.target.value),
									   value:props.value
								   }}
							   />
						   )}
						   ,{ width: '11%', title: 'Cell', field: 'pic_cell', editComponent: (props) => (
							<CustomInput
							   labelText={
								   <span>
								   Cell
								   </span>
							   }
							   id='pic_cell'
							   formControlProps={{
							   fullWidth: true
							   }}
							   inputProps={{
								   onChange:event => props.onChange(event.target.value),
								   value:props.value
							   }}
						   />
							   )}
							   ,{ width: '16%', title: 'Remark', field: 'pic_remark', editComponent: (props) => (
								<CustomInput
								   labelText={
									   <span>
									   Remark
									   </span>
								   }
								   id='pic_remark'
								   formControlProps={{
								   fullWidth: true
								   }}
								   inputProps={{
									   onChange:event => props.onChange(event.target.value),
									   value:props.value
								   }}
							   />
								   )}
								
								]
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
									if ( typeof newData.line_code === 'undefined'|| '' === newData.line_code) {
										alert("Carrier를 입력해주세요.");
										return false;
									} else {
										if(newData.line_code.length != 3) {
											alert("Carrier는 3자리만 입력가능합니다.");
											return false;
										}
									}
									if ( typeof newData.pic_area === 'undefined'|| '' === newData.pic_area) {
										alert("Area를 입력해주세요.");
										return false;
									}
									if ( typeof newData.pic_dept === 'undefined'|| '' === newData.pic_dept) {
										alert("Dept를 입력해주세요.");
										return false;
									}
									if ( typeof newData.pic_name === 'undefined'|| '' === newData.pic_name) {
										alert("Name을 입력해주세요.");
										return false;
									}
									axios.post("/sch/getPicCodeList",{data:newData},{headers:{'Authorization':'Bearer '+store.token}}).then(res => {
										if ( res.data.length == 0) {
													axios.post("/sch/insertPicCode",{newData:newData},{headers:{'Authorization':'Bearer '+store.token}}).then(res => {
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
													alert("["+newData.line_code+"/"+newData.pic_area+"/"+newData.pic_dept+ "/"+newData.pic_name+"] 해당 담당자는 이미 존재합니다. 등록 불가합니다.");
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
									if ( typeof newData.line_code === 'undefined'|| '' === newData.line_code) {
										alert("Carrier를 입력해주세요.");
										return false;
									} else {
										if(newData.line_code.length != 3) {
											alert("Carrier는 3자리만 입력가능합니다.");
											return false;
										}
									}
									if ( typeof newData.pic_area === 'undefined'|| '' === newData.pic_area) {
										alert("Area를 입력해주세요.");
										return false;
									}
									if ( typeof newData.pic_dept === 'undefined'|| '' === newData.pic_dept) {
										alert("Dept를 입력해주세요.");
										return false;
									}
									if ( typeof newData.pic_name === 'undefined'|| '' === newData.pic_name) {
										alert("Name을 입력해주세요.");
										return false;
									}
									if (oldData) {
										axios.post("/sch/getPicCodeList",{data:newData},{headers:{'Authorization':'Bearer '+store.token}}).then(res => {
											// 수정 처리.
											if ( res.data.length == 0) {
												
												alert("["+newData.line_code+"/"+newData.pic_area+"/"+newData.pic_dept+ "/"+newData.pic_name+"] 해당 담당자가 존재하지 않습니다. 변경이 불가합니다.");
												// data[data.indexOf(newData)] = oldData;
												// return { ...prevState, data };
											} else {
												axios.post("/sch/updatePicCode",{ oldData:oldData, newData:newData},{headers:{'Authorization':'Bearer '+store.token}});
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
										axios.post("/sch/deletePicCode",{ oldData:oldData},{headers:{'Authorization':'Bearer '+store.token}})
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
