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
  
const ImpPassLcaDetail = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 
  const classes = useStyles();  

  const [lcaInfoData,setLcaInfoData] = useState([]);

  useEffect(() => {
  
	if(props.dclrNo == undefined || props.dclrNo.length < 5){
		alert("신고번호가 올바르지 않습니다");
		return;
	}
	const searchData = {
        lcaSgn: props.dclrNo.substring(0,5)
      };
	axios.post("/com/uniPassApiSelectLcaInfo",searchData, {headers:{'Authorization':'Bearer '+userStore.token}})
	.then(res => {
		if(res.data.message == "SUCCESS"){
			setLcaInfoData(res.data.infoData);
		} else if(res.data.message == "NO_DATA"){
			alert("조회결과가 없습니다");
		} else {
			alert(res.data.errMsg);
		}
	})
	.catch(err => {
		console.log(err);
	});
  },[]);


  return (
    <Card style={{width:'700px'}}>
 		<CardHeader color="info" stats icon >
		    <CardIcon color="info" style={{height:'40px'}}>
			    <IconM style={{width:'20px',fontSize:'20px',lineHeight:'15px'}}>content_copy</IconM>
        	</CardIcon>
          	<h4 style={{textAlign: "left",color:"#000000"}}>관세사 상세조회</h4>
  		</CardHeader>
		<CardBody>
			<GridItem>
				<Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
					<TableBody>
						<TableRow>
						<TableCell className={classes.headerCell}>관세사명</TableCell>
						<TableCell className={classes.bodyCell}>{lcaInfoData.lcaConm!=undefined?lcaInfoData.lcaConm:""}</TableCell>
						<TableCell className={classes.headerCell}>관할세관</TableCell>
						<TableCell className={classes.bodyCell}>{lcaInfoData.jrsdCstmNm!=undefined?lcaInfoData.jrsdCstmNm:""}</TableCell>
						</TableRow>
						<TableRow>
						<TableCell className={classes.headerCell}>주소</TableCell>
						<TableCell className={classes.bodyCell} colSpan="3">{lcaInfoData.addr!=undefined?lcaInfoData.addr:""}</TableCell>
						</TableRow>
						<TableRow>
						<TableCell className={classes.headerCell}>전화번호</TableCell>
						<TableCell className={classes.bodyCell} colSpan="3">{lcaInfoData.telno!=undefined?lcaInfoData.telno:""}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</GridItem>
		</CardBody>
	</Card>
  );
}
))
export default ImpPassLcaDetail;