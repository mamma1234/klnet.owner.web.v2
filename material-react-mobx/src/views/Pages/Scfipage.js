import React,{ useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import { CircularProgress } from "@material-ui/core";
  const useStyles = makeStyles((theme) => ({
	root: {
	  position: 'fixed',
	  bottom: theme.spacing(2),
	  right: theme.spacing(2),
	},
	paper: {
	  padding: theme.spacing(2),
	  textAlign: 'center',
	  color: theme.palette.text.secondary
  },th:{
	  backgroundColor: '#5B9BD5',
	  textAlignLast:'center',
	  color:'white'
  },td:{
	  backgroundColor: '#D2DEEF',
	  textAlignLast:'center',
	  width:'60px'
  },progressbar: {
	  display: 'flex',
	  '& > * + *': {
		  marginLeft: theme.spacing(2),
	  },
  }
  }));

export default function Scfipage(props) {
	const classes = useStyles();
	const [store] = useState(props.param.store);
	const [getData, setGetData] = useState([]);
	useEffect(() => {
		Axios.post('/com/scfiApi',{},{headers:{'Authorization':'Bearer '+store}}).then(
			res => {
				setGetData(res.data.data);
			}
		)
		 return () => {
			 console.log('cleanup');
		   };
	   },[store.token]);

	return (	
		<div>
		{getData.length !== 0?(
		<Table className={classes.table}>
				
				<TableHead>
					<TableRow hover={true}>
						<TableCell align={'center'}>Description</TableCell>
						<TableCell align={'center'}>Unit</TableCell>
						<TableCell align={'center'}>Weighting</TableCell>
						<TableCell align={'center'}><span>Previous Index<br></br>{getData.length !== 0 ? getData.lastDate:""}</span></TableCell>
						<TableCell align={'center'}><span>Current Index<br></br>{getData.length !== 0? getData.currentDate:""}</span></TableCell>		
						<TableCell align={'center'}>Compare With Last</TableCell>
					</TableRow>
				</TableHead>
				
				<TableBody>
				{getData.lineDataList.length !== 0 && (getData.lineDataList.map((data, index) => {
					return(
						<TableRow className={classes.tableBodyRow} >
							<TableCell align={'center'}>
							   {data.properties.lineName_EN}
							</TableCell>
							<TableCell align={'center'}>
							   {data.properties.unit_ZH}
							</TableCell>
							<TableCell align={'center'}>
							   {data.properties.weighting_EN}
							</TableCell>
							<TableCell align={'center'}>
							   {data.lastContent}
							</TableCell>
							<TableCell align={'center'}>
							   {data.currentContent}
							</TableCell>
							<TableCell align={'center'}>
							   {data.absolute}
							</TableCell>
						</TableRow> 
						);
							}))}
				</TableBody> 
			</Table>	
		):(
			<div>
				<CircularProgress/>
			</div>
		)}
		</div>

	);
}		