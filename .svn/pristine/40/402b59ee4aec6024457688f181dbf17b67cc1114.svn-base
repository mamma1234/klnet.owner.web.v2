import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

const useStyless = makeStyles(theme => ({
	  root: {
	'& >*': {
		width:200,
	}  
  },
}));



export default function CntrNumRegist(props) {

    const [cntrNum,setCntrNum] = useState();
    const [selectData, setSelectData] = useState([]);
    const [blno, setBlno] = useState("");
    console.log(props);
    React.useEffect(() => {
            
            console.log('effect');
            setBlno(props.params);
            return () => {
            console.log('cleanup');
            };
        },[]);
        
    const handleCarrierSearch = () => {

        if (cntrNum != undefined) {
            if(cntrNum.length == 0) {
                alert("Container Number Did Not Enter!");
                return;
            }else if (cntrNum.length > 20) {
                alert("Container Number Too length");
                return;
            }
            const CntrNum = cntrNum;
            let cntrList = [];
            setCntrNum("");
            cntrList.push([CntrNum]);
            setSelectData((selectData) => [...selectData, cntrList ]);
        } else {
            alert("Container Number Did Not Enter!");
        }
    }
    const sendCntrList = (e) => {
        e.preventDefault();
        props.returnFunction(selectData);
    }

  return (
    <Card style={{width:'500px'}}>
        <CardHeader color="info" stats icon >
            <CardIcon color="info" style={{height:'26px'}}>
                <IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
            </CardIcon>
            <h4 style={{textAlign: "left",color:"#000000"}}>Regist Container Number</h4>
        </CardHeader>
        <CardBody>
            <GridItem>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <h4>BL NO : {blno}</h4>
			        </GridItem>
			    </GridContainer>
                <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                        <TextField 
                            id="cntrNum" 
                            label="Container Number"
                            onChange={event => setCntrNum(event.target.value.toUpperCase())}
                            value={cntrNum} />
			        </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Button onClick={handleCarrierSearch} color="info">ADD</Button>
                    </GridItem>
                    <GridItem xs={12} sm={12} md={3}>
                        <Button onClick={sendCntrList} color="info">SEND</Button>
                    </GridItem>
			    </GridContainer>
                
			</GridItem>
            <GridItem>
                <Table
                    tableHeaderColor="info"
                    tableHead={["CNTR NO"]}
                    tableData={selectData}/>
            </GridItem>
        </CardBody>
    </Card>
  );
}
