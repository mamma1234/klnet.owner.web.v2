import React,{useState} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import TextField from '@material-ui/core/TextField';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Icon from "@material-ui/core/Icon";
import Grid from '@material-ui/core/Grid';
import { Paper } from "@material-ui/core";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import Button from "components/CustomButtons/Button.js";
// other import
import axios from 'axios';

const styles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    padding:'15px',
    width: '100%',
    height: '80vh',
    marginBottom: theme.spacing(2),
    overflow:'scroll'
  },gridContainer: {
    padding:'15px'
  }
}))

export default function VslTypeList(props) {
  const classes = styles();
  const {store} = props;
  const [vsltype,setVsltype] = useState("");
  const [Num,setNum] = useState(1);
  const [vslTypeData, setVslTypeData] = useState([]);
  const [setOpenJoin] = useState(false);
  
  const onSubmit = (param) => {
    setNum(1);

    axios.post("/com/getVslTypeList",{
      vsltype:vsltype,
      num:param
    },{headers:{'Authorization':'Bearer '+store.token}})
    .then(res => {setVslTypeData(res.data);console.log(res.data)})
    .catch(err => {
        if(err.response.status === 403 || err.response.status === 401) {
            setOpenJoin(true);
        }
    });
  }

  const onMore = (param) => {
    if(Num !== vslTypeData[0].tot_page) {
        //page ++
        setNum(param);

        axios.post("/com/getVslTypeList",{
            vsltype:vsltype,
            num:param
        },{headers:{'Authorization':'Bearer '+store.token}})
        .then(res => setVslTypeData([...vslTypeData,...res.data]))
        .catch(err => {
            if(err.response.status === 403 || err.response.status === 401) {
                setOpenJoin(true);
            }
        });
    }

  }
  
  return (
    <div>
    <GridContainer className={classes.gridContainer}>
    	<GridItem xs={12} sm={12} md={12}>
        <Card style={{marginBottom:'0px'}}>
          <CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
            <CardIcon color="info" style={{height:'55px'}}>
              <Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
            </CardIcon>
          </CardHeader>
          <CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
            <Grid item xs={12} sm={9} md={12}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={3}>
                  <TextField id="vsltype" label="Vessel Type" onChange={event => setVsltype(event.target.value)} value={vsltype} fullWidth />
                </Grid>
                <Grid item xs={12} md={3} >
                  <Button color="info" onClick = {() => onSubmit(1)} fullWidth>Search</Button>							
                </Grid>
              </Grid>
            </Grid>
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
    <Paper className={classes.paper}>
      <Table>
        <TableHead style={{padding:'5px'}}>
          <TableRow>
            <TableCell>Vsl Type</TableCell>
            <TableCell>Vsl Type Kname</TableCell>
            <TableCell>Vsl Type Ename</TableCell>
            <TableCell>Use Yn</TableCell>
            <TableCell>Insert Date</TableCell>
            <TableCell>Insert User</TableCell>
            <TableCell>Update Date</TableCell>
            <TableCell>Update User</TableCell>
          </TableRow>               
        </TableHead>
        <TableBody>
          {
            vslTypeData.map((element,key) => {
              return(
                <TableRow>    
                  <TableCell>{element.vsl_type}</TableCell>
                  <TableCell>{element.vsl_type_kname}</TableCell>
                  <TableCell>{element.vsl_type_ename}</TableCell>
                  <TableCell>{element.use_yn}</TableCell>
                  <TableCell>{element.insert_date}</TableCell>
                  <TableCell>{element.insert_user}</TableCell>
                  <TableCell>{element.update_date}</TableCell>
                  <TableCell>{element.update_user}</TableCell>
                </TableRow>
              )
            })
          }
        </TableBody>
          {
            vslTypeData.length >= 10 ? (
            <TableFooter>
              <TableRow>
                <TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={8}>
                  <Button color="info" 
                          onClick={() => onMore(Num + 1)}
                          style={{paddingLeft:'60px',paddingRight:'60px'}}
                  >MORE&nbsp;(&nbsp;{Num}&nbsp;/&nbsp;{vslTypeData[0].tot_page}&nbsp;)</Button>
                </TableCell>
              </TableRow>
            </TableFooter>):null
          }
      </Table>
    </Paper> 
    </div>
  );
}



