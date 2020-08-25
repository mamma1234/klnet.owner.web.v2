import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
// core components
///import Grid from '@material-ui/core/Grid';
//import GridItem from "components/Grid/GridItem.js";
//import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
//import icon
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
//import page
import Detail from "views/Pages/Tracking/Current/TrackingCurrentDetail.js";
import HighlightOff from '@material-ui/icons/HighlightOff';

import axios from 'axios';

/*const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));*/

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

export default function TableList(props) {
  const classes = useStyles();
  //const classess = useStyless();
  
  const {data,store} = props;
  
  const [selectData,setSelectData] = useState([]);

  //const [ietype,setIetype] = useState("");
  //const [open, setOpen] = useState(false);
  //const [delSeq, setDelSeq] = useState("");
  
 /* const onClickDelete = () => {
	  confirm({description:'정말로 삭제 하시겠습니까?'}).then(()=>{});
	  console.log(">>>>>");
  };*/

  
/*  const handleClose = () => {
	setOpen(false);  
  };*/
  
  useEffect(() => {
	    axios.post("/loc/getCntrList",
	    		{ reqseq: data.req_seq, carriercode:data.carrier_code,blbk: data.bl_bkg },
	    		{headers:{'Authorization':'Bearer '+store.token}}
	    ).then(res => setSelectData(res.data))
	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  
  
  return (
		<div style={{maxHeight:'600px',maxWidth:'840px'}}>
		<HighlightOff onClick={()=>props.onClose()} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>
	        <Card style={{marginTop:'26px',marginBottom:'0'}}>		
	        	<CardHeader color="info" stats icon style={{paddingBottom:'2px',height:'45px'}}>
	        		<CardIcon color="info" style={{padding:'4px'}}>
	        			<Icon>content_copy</Icon>
	        		</CardIcon>
	        		<h4 className={classes.cardTitleBlack}>Tracking Current List</h4>
	        		<p className={classes.cardTitleBlack}>-B/K No :&nbsp;{data.bkg_no}&nbsp;&nbsp; -B/L No :&nbsp;{data.mbl_no}</p>
	        	</CardHeader>
				<CardBody style={{paddingTop:'0',paddingLeft:'5px',paddingRight:'5px'}}>
			    	<Detail
			        	tableHeaderColor="info"
			        	tableHead={["no", "Container No", "TIME","EVENT","LOCATION","MORE"]}
			        	tableData={selectData}
			    		store={store}
			    	/>
		    	</CardBody>
	    	</Card>
      </div>
  );
}
