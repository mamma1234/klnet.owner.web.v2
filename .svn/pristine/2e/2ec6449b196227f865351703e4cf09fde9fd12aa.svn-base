import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
	root: {
		maringLeft:'20px',
		maringRigth:'20px',
		},
	}));

const marks = [
	{ value:0,label:'0'},
	{ value:100,label:'100'},
];


export default function DiscreteSlider(props) {
	const classes = useStyles();
	
	return (
		<div>
			<Slider
				color="primary"
				defaultValue={0}
				step={10}
				value={80}
				marks={marks}
				disabled={true}
				valueLabelDisplay="off"
			/>
		</div>
	);
}