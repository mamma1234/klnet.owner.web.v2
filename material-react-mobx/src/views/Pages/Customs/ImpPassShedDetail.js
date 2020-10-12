import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableCell, TableBody, TableRow } from '@material-ui/core';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
import GridItem from "components/Grid/GridItem.js";
import axios from 'axios';
import { observer, inject} from 'mobx-react'; // 6.x
import {userService} from 'views/Pages/Login/Service/Service.js';
const styles = {
    headerCell: {
      backgroundColor: "#f2fefd",
      width:'30%',
	  padding:'7px',
	  textAlign:'right'
    },
    bodyCell: {
      textAlign: "left",
	  padding:'7px',
    },
  };

const useStyles = makeStyles(styles);
  
//const ImpPassShedDetail = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => {
export default function ImpPassShedDetail(props) {
  const classes = useStyles();  
  const token = userService.GetItem()?userService.GetItem().token:null;
  const [shedInfoData,setShedInfoData] = useState([]);

  useEffect(() => {
    
	const searchData = {
        snarSgn: props.snarSgn
      };
	if(token) {
	axios.post("/com/uniPassApiSelectShedInfo",searchData, {headers:{'Authorization':'Bearer '+token}})
	.then(res => {
		if (res.data.message == "SUCCESS"){
			setShedInfoData(res.data.infoData);
		} else if(res.data.message == "NO_DATA"){
			alert("조회결과가 없습니다");
		} else{
			alert(res.data.errMsg);
		}
	}).catch(err => {
        if(err.response.status === 401) {
        	props.openLogin();
        }
        });
	} else {
		props.openLogin();
	}
  },[]);


  return (
    <Card style={{width:'700px'}}>
 		<CardHeader color="info" stats icon >
		    <CardIcon color="info" style={{height:'40px'}}>
			    <IconM style={{width:'20px',fontSize:'20px',lineHeight:'15px'}}>content_copy</IconM>
        	</CardIcon>
          	<h4 style={{textAlign: "left",color:"#000000"}}>장치장 상세조회</h4>
  		</CardHeader>
		<CardBody>
			<GridItem>
				<Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
					<TableBody>
						<TableRow>
						<TableCell className={classes.headerCell}>장치장명</TableCell>
						<TableCell className={classes.bodyCell}>{shedInfoData.snarNm!=undefined?shedInfoData.snarNm:""}</TableCell>
						</TableRow>
						<TableRow>
						<TableCell className={classes.headerCell}>주소</TableCell>
						<TableCell className={classes.bodyCell}>{shedInfoData.snarAddr!=undefined?shedInfoData.snarAddr:""}</TableCell>
						</TableRow>
						<TableRow>
						<TableCell className={classes.headerCell}>전화번호</TableCell>
						<TableCell className={classes.bodyCell}>{shedInfoData.snartelno!=undefined?shedInfoData.snartelno:""}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</GridItem>
		</CardBody>
	</Card>
  );
}
//))
//export default ImpPassShedDetail;