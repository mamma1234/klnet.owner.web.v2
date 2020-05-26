import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "views/Pages/Tracking/Terminal/TrackingCntrDetailList.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import axios from 'axios';

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

  const {data,store} = props;
  
  //console.log(blNo);
  
  const [cntrData,setCntrData] = useState([]);
  const [headerData,setHeaderData] = useState([]);
  const [cospan,setCospan] = useState(1);
  
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
		   setHeaderData(["no", "Container No", "SZ/TP","접안터미널","접안(예정)일시","양하일시","OSC D-DAY","반출기한","반출일시","반납기한","반납일시"]); 
		   setCospan(10);
	   } else {
		   setHeaderData(["no", "Container No", "SZ/TP","반출지","반출기한","반출일시","반입지","반입기한","반입일시","OSC","선적지","선적지반입일시","선적일시"]);
		   setCospan(13);
	   }
	  
	  
	    axios.post("/loc/getDemdetCntrList",
	    		{ blbkg:data.bl_bkg,ietype: data.ie_type}
	    		,{headers:{'Authorization':'Bearer '+store.token}}
	    )
	    .then(res => setCntrData(res.data))
	    //.then(res => console.log(JSON.stringify(res.data)));

	    return () => {
	      console.log('cleanup');
	    };
	  }, []);
  
  
  
  return (
        <Card>
        	<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
        		<CardIcon color="info">
        			<Icon>content_copy</Icon>
        		</CardIcon>
        		<h4 className={classes.cardTitleBlack}>TERMINAL ACTIVITY HISTORY</h4>
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
	            tableHead={headerData}
	            tableData={cntrData}
            	colSpan={cospan}
            	{...props}
            />
          </CardBody>
        </Card>
  );
}
