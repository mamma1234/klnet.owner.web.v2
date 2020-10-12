import React,{useState,useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import moment from 'moment';
// core components
import {TextField,Table,TableHead, TableRow, TableBody, TableCell, TableContainer, TableFooter, Grid, Paper} from '@material-ui/core'



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

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    
    width: '100%',
    padding:'5px',
    marginBottom: theme.spacing(2),
  },gridContainer: {
    padding:'5px'
  }
}))


export default function BoardData(props) {
  const classes = styles();
  const {store} = props;
  const [lineCode, setLineCode] = useState("");
  const [id, setId] = useState("");
  const [fromData, setFromData] = useState([]);
  const [Num,setNum] = useState(1);
  const onSubmit = (param) => {
      setNum(1);

      axios.post("/com/getBoardSearch",{num:param},{headers:{'Authorization':'Bearer '+store.token}})
      .then(res => {setFromData(res.data)})
      .catch(err => {
          if(err.response.status === 403 || err.response.status === 401) {
            //  setOpenJoin(true);
          }
      });


  }
  const onMore = (param) => {
  if(Num != fromData[0].tot_page) {
    //page ++
    setNum(param);

    axios.post("/com/getBoardSearch",{num:param},{headers:{'Authorization':'Bearer '+store.token}})
    .then(res => setFromData([...fromData,...res.data]))
    .catch(err => {
        if(err.response.status === 403 || err.response.status === 401) {
        //   setOpenJoin(true);
        }
    });
    }

  }




  
  
  return (
    <div >
    <GridContainer className={classes.gridContainer}>
    	<GridItem xs={12} sm={12} md={12}>
        	<Card style={{marginBottom:'0px'}}>
      			<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
				</CardIcon>
				<h4 className={classes.cardTitleBlack}>Board Page</h4>
	  		</CardHeader>
          	<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
          		<Grid item xs={12} sm={2} md={2}>
				<Button color="info" onClick = {() => onSubmit(1)} fullWidth>Search</Button>	
		      	</Grid>
		     </CardBody>
        </Card>
      </GridItem>
      </GridContainer>
      <Paper className={classes.paper}>
        <TableContainer>
          <Table>
                  <TableHead style={{padding:'5px'}}>
                      <TableRow>
                        <TableCell>BOARD_ID</TableCell>
                        <TableCell>USER_NO</TableCell>
                        <TableCell>TITLE</TableCell>
                        <TableCell>CONTENT</TableCell>
                        <TableCell>HIT_COUNT</TableCell>
                        <TableCell>AUTHOR_NAME</TableCell>
                        <TableCell>INSERT_DATE</TableCell>
                      </TableRow>               
                  </TableHead>
                  <TableBody>
                      {
                    	  fromData.map((element,key) => {
                              return(
                                <TableRow key={key}>    
                                    <TableCell>{element.board_id}</TableCell>
                                    <TableCell>{element.user_no}</TableCell>
                                    <TableCell>{element.title}</TableCell>
                                    <TableCell>{element.content}</TableCell>
                                    <TableCell>{element.hit_count}</TableCell>
                                    <TableCell>{element.author_name}</TableCell>
                                    <TableCell>{element.insert_date}</TableCell>
                                </TableRow>
                              )
                          })
                      }
                  </TableBody>
                  {
                	  fromData.length >= 10 ? (
                        <TableFooter >
                        <TableRow  >
                        <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={7}>
                            <Button
                                color="info"
                                onClick={() => onMore(Num + 1)}
                                style={{paddingLeft:'60px',paddingRight:'60px'}}
                            >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{fromData[0].tot_page}&nbsp;)</Button>
                        </TableCell>
                        </TableRow>
                      </TableFooter>):null
                      

                  }
              </Table>
              </TableContainer>
          </Paper>
        </div>
  );
}



