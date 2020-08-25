import React,{ useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
import { CircularProgress } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";


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
  },progressbar: {
	  display: 'flex',
	  '& > * + *': {
		  marginLeft: theme.spacing(2),
	  },
  }
  }));
    


export default function Teurank(props) {
	const classes = useStyles();
	const [store] = useState(props.param.store);
	const [getData, setGetData] = useState([])

	useEffect(() => {
		Axios.post('/com/teuApi',{},{headers:{'Authorization':'Bearer '+store.token}}).then(
			res => {
				setGetData(res.data);
			}
		)
		 return () => {
			 console.log('cleanup');
		   };
	   },[store.token]);
	return (	
		<div>
			{getData.length!==0?(
			<Table className={classes.table}>
				
				<TableHead>
					<TableRow>
						<TableCell align={'center'} rowSpan={2}>Operator</TableCell>
						<TableCell align={'center'} colSpan={2}>Total</TableCell>
						<TableCell align={'center'} colSpan={2}>Owned</TableCell>
						<TableCell align={'center'} colSpan={3}>Chartered</TableCell>
						<TableCell align={'center'} colSpan={3}>Orderbook</TableCell>
					</TableRow>
					<TableRow>
						<TableCell align={'center'}>TEU</TableCell>
						<TableCell align={'center'}>Ships</TableCell>
						<TableCell align={'center'}>TEU</TableCell>
						<TableCell align={'center'}>Ships</TableCell>
						<TableCell align={'center'}>TEU</TableCell>
						<TableCell align={'center'}>Ships</TableCell>
						<TableCell align={'center'}>(%)Chart</TableCell>
						<TableCell align={'center'}>TEU</TableCell>
						<TableCell align={'center'}>Ships</TableCell>
						<TableCell align={'center'}>(%)existing</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
				{getData[0].result.length !== 0 && (getData[0].result.map((data, index) => {
					return(
						<TableRow className={classes.tableBodyRow} >
							<TableCell align={'center'}>
							   {data.operator}
							</TableCell>
							<TableCell align={'center'}>
							   {data.totalTeu}
							</TableCell>
							<TableCell align={'center'}>
							   {data.totalShips}
							</TableCell>
							<TableCell align={'center'}>
							   {data.ownedTeu}
							</TableCell>
							<TableCell align={'center'}>
							   {data.ownedShips}
							</TableCell>
							<TableCell align={'center'}>
							   {data.chartTeu}
							</TableCell>
							<TableCell align={'center'}>
							   {data.chartShips}
							</TableCell>
							<TableCell align={'center'}>
							   {data.chartProcent}%
							</TableCell>
							<TableCell align={'center'}>
							   {data.orderTeu}
							</TableCell>
							<TableCell align={'center'}>
							   {data.orderShips}
							</TableCell>
							<TableCell align={'center'}>
							   {data.orderProcents}
							</TableCell>
						</TableRow> 
						
						);
					}))}
						
				</TableBody> 
				
			</Table>		
			):<div>
			<CircularProgress/>
		</div>}
		</div>		
	);
	
}