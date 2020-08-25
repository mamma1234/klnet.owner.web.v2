import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
// import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Icon from "@material-ui/core/Icon";
import Button from "components/CustomButtons/Button.js";
import Switch from '@material-ui/core/Switch';
//import Switch from 'react-switch';
import TextField from '@material-ui/core/TextField';
import Access from "@material-ui/icons/AccessAlarm";
// import Autocomplete from '@material-ui/lab/Autocomplete';
import CustomSelect from "components/CustomInput/CustomSelect.js";
import Grid from '@material-ui/core/Grid';
import Assign from "@material-ui/icons/AssignmentTurnedIn";
//import ToggleButton from 'react-toggle-button';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import InputLabel from "@material-ui/core/InputLabel";
// import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import CustomInput from "components/CustomInput/CustomInputDay.js";
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';

const borderRadiusStyle={borderRadius:2} // eslint-disable-line no-unused-vars

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
};

const useStyles = makeStyles(styles);

export default function UserSettingPage(props) {
  const classes = useStyles();
  const {store} =props;
  const [etaDayCnt,setEtaDayCnt] =React.useState(0);
  const [etdDayCnt,setEtdDayCnt] =React.useState(0);
  const [pol,setPol] = React.useState("KRPUS");
  const [pod,setPod] = React.useState("");
  const [etaYn,setEtaYn] = React.useState(false);
  const [selectPort,setSelectPort] = React.useState([]);
  
  const [switch1,setSwitch1] = React.useState(false); // eslint-disable-line no-unused-vars
  
  const topFilms = [ // eslint-disable-line no-unused-vars
	  ['test1@test.co.kr'],
	  ['test2@test.co.kr'],
	  ['test3@test.co.kr'],
  ];
  
  function InputCustom(props) {
	  return(
			  <CustomInput   
			    formControlProps={{
	              fullWidth: true,variant:'outlined',size:'small',style:{textAlignLast:'center',border:'1px',borderRadius:'4px',borderStyle:'outset',borderColor:'silver',height:'40px'}
	            }} 
			  labelProps={{style:{backgroundColor:'white'}}}
			  inputProps={{
				  style:{paddingBottom:'0',width:'45px'},
				  value:props.value
			  }}
			  handleadd={props.handleadd}
			  handleremove={props.handleremove}
			  id={props.id} labelText={props.text}/>
	 	);
  }

  const handleAdd = (event,name) => {
	  if(name === "eta"){
		  setEtaDayCnt(etaDayCnt+1);  
	  } else {
		  setEtdDayCnt(etdDayCnt+1);
	  }
  }
  
  const handleRemove = (event,name) => {

	  if(name === "eta"){
		  if(etaDayCnt > 0){
			  setEtaDayCnt(etaDayCnt-1);
		  } else {
			  setEtaDayCnt(0);
		  }
	  } else {
		  if(etdDayCnt > 0){
			  setEtdDayCnt(etdDayCnt-1);
		  } else {
			  setEtdDayCnt(0);
		  }
	  }
  }
  
  const onPortSearchValue = (e) => {
	    const values = e.target.value;
	    if(values != undefined && values != "" && values.length >= 2) {
		    	if(store.token) {
			    	axios.post("/com/getTrackingPortCode",{ portCode:values},{headers:{'Authorization':'Bearer '+store.token}})
			    	.then(setSelectPort([]))
				    .then(res => setSelectPort(res.data))
				    .catch(err => {
				        if(err.response.status === 403||err.response.status === 401) {
				        	props.openLogin();
						}
				    });
		    	} else {
		    		props.openLogin();
		    	}
	    }  
}
  
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={6}>
        <Card> 
        <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
			<CardIcon color="info" style={{height:'56px'}}>
				<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
			</CardIcon>
		<h4 className={classes.cardTitleBlack}>Tracking Setting </h4>
		<Button
		color="info"
			size="sm"
			//style={{width:'76px'}}
		//startIcon={<MapIcon/>}
		onClick={()=>alert('서비스 준비중입니다.')}
		>Save</Button>
	  </CardHeader>
          <CardBody>
          	<GridContainer>
          		<GridItem xs={12} sm={12} md={12}>
	          		<h4 className={classes.cardTitleBlack}><Assign style={{color:'#00acc1'}} />기본조회 설정 
	          		</h4>
          		</GridItem>
          		<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
          			<Grid container spacing={1}>
			          	<Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
			          	<Autocomplete
							options = {selectPort}
							getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
							id="POL"
							onChange={(e,data)=>setPol(!data?'':data.port_code)}
							noOptionsText="Please enter 2 characters ..."
							onInputChange={onPortSearchValue}
							renderInput={params => (
								<TextField {...params} label="POL"  variant="outlined" size="small" 
									value="test"fullWidth />	
							)}
						/>
			          	</Grid>
			          	<Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
			          		<Autocomplete
								options = {selectPort}
								getOptionLabel = { options => "["+options.port_code+"] "+options.port_name}
								id="POD"
								onChange={(e,data)=>setPod(!data?'':data.port_code)}
								noOptionsText="Please enter 2 characters ..."
								onInputChange={onPortSearchValue}
								renderInput={params => (
									<TextField {...params} label="POD"  variant="outlined" size="small" 
										fullWidth />
								)}
							/>
			          	</Grid>
				        <Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				        	 <InputCustom handleadd={(event)=>handleAdd(event,'eta')} handleremove={(event)=>handleRemove(event,'eta')} id="ETA" text="ETA" value={etaDayCnt}/>
			          	</Grid>
				        <Grid item xs={12} sm={12} md={6} style={{marginTop:'8px'}}>
				        	<InputCustom handleadd={(event)=>handleAdd(event,'etd')} handleremove={(event)=>handleRemove(event,'etd')} id="ETD" text="ETD" value={etdDayCnt}/>
			          	</Grid>
			        </Grid>
			     </GridItem>
			     <GridItem xs={12} sm={12} md={12}>  		
          			<h4 className={classes.cardTitleBlack}><Access style={{color:'#00acc1'}} />NOTICE</h4>
      			</GridItem>
			    <GridItem xs={12} sm={12} md={12}>  
			    	<Grid container spacing={1}>
			    		<Grid item xs={12} sm={12} md={6} >
				    		<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={3} >
					    		<Switch
								//checked={searchGb}
								//onChange={onHandleChange('USER')}
								inputProps={{'aria-label':'checkbox'}}
							/>
 							</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="ETA" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
			    		<Grid container spacing={1}>
				    		<Grid item xs={12} sm={12} md={3} >
								<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									inputProps={{'aria-label':'checkbox'}}
								/>
							</Grid>	
							<Grid item xs={12} sm={12} md={9} >
								<TextField id="etd" size="small" label="ETD" type="text" variant="outlined" fullWidth/>
							</Grid>
						</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
					    	<Grid container spacing={1}>
						   		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="DET" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
						<Grid item xs={12} sm={12} md={6}>
				    		<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={3} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')}
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={9} >
									<TextField id="etd" size="small" label="DEM" type="text" variant="outlined" fullWidth/>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
       			</GridItem>
			    <GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>  
			    	<Grid container spacing={1}>
			    		<Grid item xs={12} sm={12} md={6}>
						    		<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									inputProps={{'aria-label':'checkbox'}}
								/>관리대상			
						</Grid>
						<Grid item xs={12} sm={12} md={6} >
								<Switch
									//checked={searchGb}
									//onChange={onHandleChange('USER')}
									inputProps={{'aria-label':'checkbox'}}
								/>INSPECT OFF
						</Grid>
					</Grid>
				</GridItem>
				<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}> 
							<Grid container spacing={1}>
							   		<Grid item xs={12} sm={12} md={2} >
										<Switch
											//checked={searchGb}
											//onChange={onHandleChange('USER')}
											inputProps={{'aria-label':'checkbox'}}
										/>
									</Grid>	
									<Grid item xs={12} sm={12} md={10} >
										<TextField id="etd" size="small" label="EMAIL ADDRESS" type="text" variant="outlined" fullWidth/>
									</Grid>
							</Grid>
				</GridItem>
				<GridItem xs={12} sm={12} md={12} style={{marginTop:'8px'}}>
					<Grid container spacing={1}>
					    		<Grid item xs={12} sm={12} md={2} >
									<Switch
										//checked={searchGb}
										//onChange={onHandleChange('USER')} 
										inputProps={{'aria-label':'checkbox'}}
									/>
								</Grid>	
								<Grid item xs={12} sm={12} md={10}>
									<TextField id="etd" size="small" label="PHONE NUMBER" type="text" variant="outlined" fullWidth/>
								</Grid>
					 </Grid>
				</GridItem>
          	</GridContainer>
          </CardBody>
        </Card>
      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
      <Card>
      <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
		<CardIcon color="info" style={{height:'56px'}}>
			<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
		</CardIcon>
		<h4 className={classes.cardTitleBlack}>Dem & Det Setting </h4>
		<Button
		color="info"
			size="sm"
			//style={{width:'76px'}}
		//startIcon={<MapIcon/>}
				onClick={()=>alert('서비스 준비중입니다.')}
		>Save</Button>
	  </CardHeader>
        <CardBody>
          
        </CardBody>
      </Card>
    </GridItem>
    </GridContainer>
  );
}
