import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "views/Pages/Tracking/Terminal/TrackingCntrDetailList.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import HighlightOff from '@material-ui/icons/HighlightOff';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';

/*const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));*/

const styles = {

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
};

const useStyles = makeStyles(styles);

export default function TableList(props) {
  const classes = useStyles();
  const {data,store,schData} = props;  
  const [cntrData,setCntrData] = useState([]);
  const [cospan,setCospan] = useState(1);
  //console.log(schData);
 /* const onClickDelete = () => {
	  confirm({description:'정말로 삭제 하시겠습니까?'}).then(()=>{});
	  console.log(">>>>>");
  };*/

  
  const handleClose = () => { // eslint-disable-line no-unused-vars
	//setOpen(false);  
  }; 
  
  useEffect(() => {
	  //console.log("blbkg:"+data.bl_bkg+"ietype:"+data.ie_type);
	   if (data.ie_type === "I") {
		   setCospan(10);
	   } else {
		   setCospan(11);
	   }
	  
    let eta = '';
    const act_terminal = schData.activity === "BERTHING"?schData.terminal:null;
    const act_date = schData.activity === "BERTHING"?schData.activity_date:null;
    if ( null != props.data.end_day) {
      eta = props.data.end_day.replace(/\//gi, '');
    }
		let etd = '';
		if ( null != props.data.start_day ) {
			etd = props.data.start_day.replace(/\//gi, '');
		}
    axios.post("/loc/getDemdetCntrList",
	    		{ 
            req_seq : props.data.req_seq,
            ie_type: props.data.ie_type,
            vsl_name :props.data.ie_type==="I"?props.data.max_vsl_name:props.data.vsl_name, 
            voyage_no:props.data.ie_type==="I"?null:props.data.voyage, 
            etd:etd,
            pol:props.data.pol_cd,
            eta:eta,
            pod:props.data.pod_cd,
            carrier_code:props.data.carrier_code,
            ie_type:props.data.ie_type,
            bl_bkg:props.data.bl_bkg,
            at_terminal:act_terminal,
            at_date:act_date
          }
	    ,{headers:{'Authorization':'Bearer '+store}}
	    )
	    .then(res => setCntrData(res.data))
	    //.then(res => console.log(JSON.stringify(res.data)));

	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  
  
  return (
		  <div>
		  <HighlightOff onClick={()=>props.onClose()} style={{color:'#7a7a7a',top:'2',right:'2',position:'absolute'}}/>
        <Card>
        	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
        		<CardIcon color="info" style={{padding:'0'}}>
        			<Icon>content_copy</Icon>
        		</CardIcon>
        		{/*<h4 className={classes.cardTitleBlack}>TERMINAL ACTIVITY HISTORY</h4>*/}
        		 <Typography variant="h6" style={{flexGrow:'1',textAlign:'start',color:'#7a7a7a'}}>TERMINAL ACTIVITY HISTORY</Typography>
        		 
            {data.ie_type =="I"?
            <p className={classes.cardTitleBlack}>-B/L NO:&nbsp;{data.mbl_no}&nbsp;&nbsp;&nbsp;&nbsp;-컨테이너 개수(TOTAL:{data.totalcnt},&nbsp;반출:{data.full_out},&nbsp;반입:{data.mt_in})</p>
            :
            <p className={classes.cardTitleBlack}>-B/K NO:&nbsp;{data.bkg_no}&nbsp;&nbsp;&nbsp;&nbsp;-컨테이너 개수(TOTAL:{data.totalcnt},&nbsp;반출:{data.mt_out},&nbsp;반입:{data.full_in})<br/>
                                                  -B/L NO:&nbsp;{data.mbl_no}
            </p>
            }
        	</CardHeader>
        	<CardBody style={{paddingBottom:'2px'}}> 

            <Table
	            tableHeaderColor="info"
	            tableData={cntrData}
                schData={schData}
            	colSpan={cospan}
            	{...props}
            />
          </CardBody>
        </Card></div>
  );
}
