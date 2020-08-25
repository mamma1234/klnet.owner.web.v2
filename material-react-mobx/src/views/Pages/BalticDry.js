import React,{ useState, useEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Axios from "axios";
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
}
}));


    


export default function Baltic(props) {
	const classes = useStyles();
	const [store] = useState(props.param.store);
	const [getData, setGetData] = useState([])

	useEffect(() => {
		Axios.post('/com/balticApi',{},{headers:{'Authorization':'Bearer '+store.token}}).then(
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
					<table>
						<tr>
							<th className={classes.th} style={{width:'5%'}}>Symbol</th>
							<th className={classes.th} style={{width:'15%'}}>Name</th>
							<th className={classes.th} style={{width:'20%'}}>Last</th>
							<th className={classes.th} style={{width:'20%'}}>Close</th>
							<th className={classes.th} style={{width:'20%'}}>DailyChange</th>
							<th className={classes.th} style={{width:'20%'}}>DailyPercentualChange</th>
						</tr>
						<tr>
							<td className={classes.th} style={{height:'40px'}}>{getData[0].Symbol}</td>
							<td className={classes.td} style={{height:'40px'}}>{getData[0].Name}</td>
							<td className={classes.td} style={{height:'40px'}}>{getData[0].Last}</td>
							<td className={classes.td} style={{height:'40px'}}>{getData[0].Close}</td>
							<td className={classes.td} style={{height:'40px'}}>{getData[0].DailyChange}</td>
							<td className={classes.td} style={{height:'40px'}}>{getData[0].DailyPercentualChange.toFixed(2)}%</td>
						</tr>

						<tr>
							<th className={classes.th} colSpan={2} style={{width:'20%'}}>WeeklyPercentualChange</th>
							<th className={classes.th} style={{width:'20%'}}>MonthlyPercentualChange</th>
							<th className={classes.th} style={{width:'20%'}}>YearlyPercentualChange</th>
							<th className={classes.th} style={{width:'20%'}}>YTDPercentualChange</th>
							<th className={classes.th} style={{width:'20%'}}>LastUpdate</th>
						</tr>
						<tr>
							<td className={classes.td} colSpan={2} style={{fontWeight:'bold'}}>{getData[0].WeeklyPercentualChange.toFixed(2)}%</td>
							<td className={classes.td}>{getData[0].MonthlyPercentualChange.toFixed(2)}%</td>
							<td className={classes.td}>{getData[0].YearlyPercentualChange.toFixed(2)}%</td>
							<td className={classes.td}>{getData[0].YTDPercentualChange.toFixed(2)}%</td>
							<td className={classes.td}>{getData[0].LastUpdate}</td>
						</tr>
						
					</table>	
				):
				(
					<div>
						<CircularProgress/>
					</div>
				)
				}
				
			</div>
	);
}