import React,{useState} from "react";
// @material-ui/core components
// core components
//import Grid from '@material-ui/core/Grid';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/TablePaging.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
//import Icon from "@material-ui/core/Icon";
//import CardIcon from "components/Card/CardIcon.js";
import TextField from '@material-ui/core/TextField';
//import MenuItem from '@material-ui/core/MenuItem';
import Button from "components/CustomButtons/Button.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
//import Modal from '@material-ui/core/Modal';
//import JoinPage from "components/Form/Common/JoinPage.js";
import axios from 'axios';
import Draggable from 'react-draggable';


export default function TableList(props) {
  const [selectData,setSelectData] = useState([]);
  const [carrierName, setCarrierName] = useState("");
  const [carrierEName, setCarrierEName] = useState("");
  React.useEffect(() => {
	  axios.post("/com/getCarrierInfo",{knm:"", enm:""},{headers:{'Authorization':'Bearer '+props.token.token}}).then(res => setSelectData(res.data))
	    .catch(err => {
          if(err.response.status === 403||err.response.status === 401) {
						//props.openLogin();
					}
    });
    return () => {
    };
  }, [props.token.token]);
  
  
  const handleCarrierSearch = () => {
    axios.post("/com/getCarrierInfo",{knm:carrierName, enm:carrierEName},{headers:{'Authorization':'Bearer '+props.token.token}}).then(res => setSelectData(res.data))
	    .catch(err => {
           if(err.response.status === 403||err.response.status === 401) {
						//props.openLogin();
					}
        });
  }

  return (
    <Draggable>
    <Card style={{maxWidth:'700px'}}>
 		  <CardHeader color="info" stats icon >
		    <CardIcon color="info" style={{height:'55px'}}>
			    <IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
        </CardIcon>
          <h4 style={{textAlign: "left",color:"#000000"}}>CARRIER INFO</h4>
    </CardHeader>
          <CardBody>
	 	     	<GridItem>
	 	     		<GridContainer>
			  			<GridItem xs={12} sm={12} md={4}>
                    <TextField 
                      id="carrierKName" 
                      label="Korean Name"
                      onChange={event => setCarrierName(event.target.value)}
                      value={carrierName} />
			        	</GridItem>
                <GridItem xs={12} sm={12} md={5}>
                    <TextField 
                      id="carrierEName" 
                      label="English Name"
                      onChange={event => setCarrierEName(event.target.value)}
                      value={carrierEName} />
			        	</GridItem>
			        	<GridItem xs={12} sm={12} md={3}>
							    <Button onClick={handleCarrierSearch} color="info">SEARCH</Button>
			        	</GridItem>
			        </GridContainer>
			     </GridItem>
		         <GridItem>
				     <Table
				          tableHeaderColor="info"
				          tableHead={["Customs Code", "Line Code", "Korean Carrier Name","English Carrier Name"]}
				          tableData={selectData}
				        />
				     </GridItem>
          </CardBody>
        </Card>
        </Draggable>
  );
}
