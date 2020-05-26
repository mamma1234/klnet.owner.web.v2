import React from 'react';
import {withStyles} from '@material-ui/core/styles';
//import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

/*const useStyles = makeStyles(theme => ({
	root: {
		maringLeft:'20px',
		maringRigth:'20px',
		},
	}));*/

const marks = [
	{ value:0},{ value:25},{ value:50},{ value:75},{ value:100},
];

const PrettoSlider = withStyles({
	root: {
		color: '#00b8ce',
		height: 8,
		paddingBottom: '0',
	},
	thumb: {
		height: 34,
		width: 34,
		backgroundColor: '#fff',
		border: '2px solid currentColor',
		marginTop: -14,
		marginLeft:-12,
		'&:focus,&:hover,&$active': {
			boxShadow:'inherit',
		},
	},
	active:{},
	valueLabel: {
		//left: 'calc(-50% + 4px)',
		top:-22,
		'& *': {
			background:'transparent',
			color:'#000',
		},
	},
	track: {
		color:'#00acc1',
		height:4,
	},
	rail:{
		height:4,
	},
})(Slider);


export default function DiscreteSlider(props) {
	//const classes = useStyles();
	
	return (
		<div>
			<PrettoSlider
				color="primary"
				defaultValue={0}
				step={10}
				value={props.data}
				marks={marks}
				disabled={true}
				valueLabelDisplay="on"
			/>
		</div>
	);
}