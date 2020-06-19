import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Autocomplete from '@material-ui/lab/Autocomplete';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
import CustomTable from "components/Table/TablePaging.js";
import { Tooltip } from "@material-ui/core";
//import CardIcon from "components/Card/CardIcon.js";
// other import
import axios from 'axios';
//import moment from 'moment';

import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";

import Grid from '@material-ui/core/Grid';
import CustomTabs from "components/CustomTabs/CustomTabs2.js";
import ExcelSchLogTable from "components/Table/TablePaging.js";
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import CustomSelect from "components/CustomInput/CustomSelect.js";
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
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
    divStyle: {
      
    }
};

const useStyles = makeStyles(styles);


export default function LineCode(props) {
  const classes = useStyles();
  const {store} = props;
  const [lineCode, setLineCode] = useState("");
  const [id, setId] = useState("");
  const [codeCuship, setCodeCuship] = useState([]);
  const [Num,setNum] = useState(1);
  const onSubmit = () => {
      setNum(1);

      axios.post("/com/getCodecuship",{
        id:id,
        lineCode:lineCode,
        num:Num
      },{headers:{'Authorization':'Bearer '+store.token}})
      .then(res => {setCodeCuship(res.data)})
      .catch(err => {
          if(err.response.status == "403" || err.response.status == "401") {
            //  setOpenJoin(true);
          }
      });


  }
  const onMore = () => {
  if(Num != codeCuship[0].tot_page) {
  //page ++
  setNum(Num+1);

  axios.post("/com/getCodecuship",{
      id:id,
      lineCode:lineCode,
      num:Num
  },{headers:{'Authorization':'Bearer '+store.token}})
  .then(res => setCodeCuship([...codeCuship,...res.data]))
  .catch(err => {
      if(err.response.status == "403" || err.response.status == "401") {
       //   setOpenJoin(true);
      }
  });
  }

  }




  
  
  return (
    <div className={classes.divStyle}>
    <GridContainer>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>User Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={9} md={12}>
			     	<Grid container spacing={1}>
             <Grid item xs={12} md={3}>
						 <TextField id="id" label="ID" onChange={event => setId(event.target.value)} value={id} fullWidth />
						 </Grid>	
						 <Grid item xs={12} md={3}>
						 <TextField id="lineCode" label="LINE CODE" onChange={event => setLineCode(event.target.value)} value={lineCode} fullWidth />
						 </Grid>
						<Grid item xs={12} md={3} >
							<Button color="info" onClick = {onSubmit}  
							fullWidth>Search</Button>							
						</Grid>
		      		</Grid>
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>

      <Table className={classes.table}>
                  <TableHead className={classes.table} style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>NM</TableCell>
                        <TableCell>KLNET ID</TableCell>
                        <TableCell>NM KOR</TableCell>
                        <TableCell>LINE CODE</TableCell>
                        <TableCell>IMAGE YN</TableCell>
                        <TableCell>URL</TableCell>
                        <TableCell>VIEW YN</TableCell>
                      </TableRow>               
                  </TableHead>
                  <TableBody>
                      {
                          codeCuship.map((element,key) => {
                              return(
                                <TableRow>    
                                    <TableCell>{element.id}</TableCell>
                                    <TableCell>{element.nm}</TableCell>
                                    <TableCell>{element.klnet_id}</TableCell>
                                    <TableCell>{element.nm_kor}</TableCell>
                                    <TableCell>{element.line_code}</TableCell>
                                    <TableCell>{element.image_yn}</TableCell>
                                    <TableCell>{element.url}</TableCell>
                                    <TableCell>{element.view_yn}</TableCell>
                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                       codeCuship.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={28}>
                            <Button
                                color="info"
                                onClick={onMore}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{codeCuship[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
       
      </GridContainer>
    </div>
  );
}



