import React, { useState} from "react"; 
import Dropzone from 'react-dropzone';
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";

import { ExcelRenderer } from "react-excel-renderer";
import TablePaging from "views/Pages/TestPage/ExcelListTable.js";
import BackupOutLinedIcon from '@material-ui/icons/BackupOutlined'
import {Assignment} from "@material-ui/icons";
import Button from "components/CustomButtons/Button.js";
import MuiAlert from '@material-ui/lab/Alert';
import axios from 'axios';
import Filesaver from 'file-saver';
import ArrowFoward from '@material-ui/icons/ArrowForwardIos';
import IconError from '@material-ui/icons/Error';
import { Promise } from "core-js";
import cx from "classnames";
import {userService} from 'views/Pages/Login/Service/Service.js';
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";
import {Dialog,DialogContent,Modal,Snackbar,CircularProgress,makeStyles,IconButton,Tooltip,Table,TableFooter,TableBody,TableCell,TableHead,TableRow,Box,Collapse,Typography} from "@material-ui/core";


function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const tableStyles = makeStyles(styles);

const useRowStyles = makeStyles({
	  root: {
	    '& > *': {
	      borderBottom: 'unset',
	    },
	  },
	});

const useStyles = makeStyles(theme => ({
  root: {
'& >*': {
  width:200,
}  
},
  uploadDiv: {
    borderStyle:'solid',
    color:'#7FFFFF'
  },
  uploadComponent: {
    margin:'0 auto',
    textAlign:'center',
    textAlignLast:'center',
  },
  putComponent:{
    margin:'0 auto',
    textAlign:'center',
    textAlignLast:'center',
  },
  putDiv: {
    borderStyle:'dotted',
    color:'#36B8CF'
  },
  wrapButton: {
    marginTop:'10px'
  },
  iconSize: {
    width:50,
    height:50
  },
  arrowIconSize: {
    width:15,
    height:15
  },
  titleName: {
    fontWeight:'bold',
    fontSize:'17px'
  },
  progressStyle: {
    marginTop:'50px',
    textAlign:'center',
    textAlignLast:'center',
  },
  tableMainHeaderCell: {
      textAlign: 'left',
      backgroundColor: '#f2fefd',      
    },
    tableMainDtlCell: {
        textAlign: 'left',
        padding:'7px',   
      },
  tableDtlHeaderCell: {
	  textAlign: 'center',
	  paddingTop:'0',
	  paddingBottom:'0',
	  backgroundColor: '#f2fefd',
	  border:'1px solid silver' 
  },
  tableDtlBodyCell: {
	  backgroundColor: 'white',
	  paddingTop:'0',
	  paddingBottom:'0',
	  border:'1px solid silver' 
  }, 
  


  
}));

export default function Excelupload(props) {

  const {token} = props;
  const classes = useStyles();
  const lineCode = props.params;
  const [rows, setRows] = useState([]);
  const [saveRows, setSaveRows] = useState([]);
  const [originData, setOriginData] = useState([]);
  const [originData2, setOriginData2] = useState([]);
  const [errRows, setErrRows] = useState([]);
  const [errMessage, setErrmessage] = useState("");
  const [severity, setSeverity] = useState("");
  const [alertOpen, setAlertOpen] = useState(false);
  const [open,setOpen] = React.useState(false);  
  const [uploadFlag,setUploadFlag] = useState(false);
  const [fileName,setFileName] = useState(false);
  const [sucessCnt, setSucessCnt] = useState("0");
  const [failCnt, setFailCnt] = useState("0");
  const [nextPageCnt, setNextPageCnt] = useState("0");
  const [colPageCnt, setColPageCnt] = useState(1);
  const [saveDataStatus, setSaveDataStatus] = useState(false); 
  const [progress,setProgress] = useState(false);
  
  const handleAlertClose = (event, reason) => {
		if(reason ==='clickaway') {
			return;
		}
		setAlertOpen(false);
	  }


  const fileHandler = (fileList) => {
    //console.log("file list :",fileList);
	setProgress(true);
    let fileObj = fileList[0]; 
      if (!fileObj) {
    	 setUploadFlag(false);
         AlertMessage('No file uploaded!','success');
         return false; 
      } else {
    	  setUploadFlag(true);
    	  setFileName(fileList[0].name);
      }
      
    if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) ) { 
      setUploadFlag(false);
      AlertMessage('Unknown file format. Only Excel files are uploaded!','error');
    return false; 
    }
    //just pass the fileObj as parameter 
    ExcelRenderer(fileObj, (err, resp) => {
      //console.log("data:",resp);
      setErrRows([]);
      setRows([]);
      if (err) { 
        alert(err); 
      } else {
        let newRows = [];
        let newerrRows = [];
        resp.rows.slice(2).forEach((row, index) => {
          if (row && row !== "undefined") {
        	 //필수 입력체크 
            if(row[1] !== undefined && row[3] !== undefined && row[4] !== undefined && row[5] !== undefined && row[7] !== undefined && 
            		row[9] !== undefined && row[11] !== undefined && row[12] !== undefined && row[13] !== undefined && row[14] !== undefined) {
            	
          /*  	if(newRows.length > 0 ) {
	            	newRows.forEach((newdata,index)=> {
	            		if (row == newdata) {
	            			newerrRows.push(row);
	            		} else {
	            			newRows.push(row);
	            		}
	            	});
            	} else {
            		newRows.push(row);
            	}*/
            	newRows.push(row);
            	
            }else {
                newerrRows.push(row);
            }
          }
        });

        let tableRows1 = [];
        let tableRows2 = [];
        
        newRows.map((row, index) => {
        	if(index <10) {
        		tableRows1.push(row);
        	} else {
        		tableRows2.push(row);
        	}
        });
        setSaveRows(newRows);
        setRows(tableRows1);
        setOriginData(tableRows2);
        setSucessCnt(newRows.length);
        setFailCnt(newerrRows.length);
        setNextPageCnt(Math.ceil(newRows.length/10));
        setColPageCnt(1);
        AlertMessage('Excel RowData Upload Success!','success');
        setProgress(false);
      }
    });
    return false; 
  };   
  
  const addRows = () => {
	  setColPageCnt(colPageCnt+1);
	  
	  let tableRows1 = [];
      let tableRows2 = [];
      
	  originData.map((row, index) => {
      	if(index <10) {
      		tableRows1.push(row);
      	} else {
      		tableRows2.push(row);
      	}
      });
	  
	  setRows([...rows,...tableRows1]);
	  setOriginData(tableRows2);
  
  }
  
  const handleReset = async (e) => {

	  if(sucessCnt < 1 && failCnt < 1) {
		  AlertMessage('초기화 할 대상이 없습니다.','error');
		  return false;
	  } else {
		  setRows([]);
		  setSaveRows([]);
		  setOriginData([]);
		  setSucessCnt("0");
		  setFailCnt("0");
		  setUploadFlag(false);
    	  setFileName("");
    	  setNextPageCnt(0);
    	  setColPageCnt(1);
    	  setSaveDataStatus(false);
    	  AlertMessage('DataSet Resetting Success!','success');
	  }
  }
  
  const AlertMessage = (message,icon) => {
		setErrmessage(message)
		setSeverity(icon)
		setAlertOpen(true);
	}
  

  const handleSubmit = async (e) => {
	  
    let dataRows = saveRows;
    const token =  userService.GetItem()?userService.GetItem().token:null;
    if(token) {
    	setProgress(true);
	    if(dataRows.length != 0) {
	    	console.log(">>>>");
	      axios.post("/com/setExcelData", { dataRows:dataRows },{headers:{'Authorization':'Bearer '+token}})
	      .then(response => {
	        //e.preventDefault();
			//setRows([]);
			//setUploadFlag(false);
	    	//setFileName("");
	        setSaveDataStatus(true);
	        setProgress(false);
	    	AlertMessage(response.data,'success');
	      })
	      .catch(error => {
	        AlertMessage('DB ERROR','error');
	        setSaveDataStatus(false);
	        setProgress(false);
	      });
	    } else {
	    	setSaveDataStatus(false);
	    	setProgress(false);
	    	AlertMessage('저장할 데이터가 존재하지 않습니다.','error');
	    }
    
	  } else {
		  props.openLogin();
	  }
    
  };

  const handleClick = (event) => {
	  const anchor = document.querySelector('#scroll_top');
	  if(anchor) {
		  anchor.scrollIntoView();
	  }
  };

  return(
    <Card >
	<CardHeader color="info" icon id="scroll_top">
		<CardIcon color="info" style={{padding:'0'}}>
			<Assignment />
		</CardIcon>
	<h5 style={{color:'black'}}>Excel Upload </h5>			
	</CardHeader>
    <CardBody >
    <Modal
	  	open={progress}
	    onClose={progress}
    	style={{top:'50%',left:'50%'}}
	  >
	   <CircularProgress />   
	  </Modal>
      <div> 데이터 업로드 </div>
     {!uploadFlag? 
    <Dropzone
      onDrop={(file, text) => fileHandler(file)}
      multiple
      size={8000000}
    >
      {({getRootProps,getInputProps,isDragActive}) => (
        
        isDragActive? 
        (
        <div {...getRootProps()}
          className={classes.putDiv}
          style={{height:'100px'}}>
          <input {...getInputProps()}/>
          
              <div className={classes.wrapButton}>
            
              <div className={classes.putComponent} style={{textAlignLast:'center'}}>
              <IconButton style={{borderRadius:'unset'}}>
                <BackupOutLinedIcon className={classes.iconSize}/>Put File Here
              </IconButton>
              </div>
            </div>
        </div>
        )
        :
        (
          <div {...getRootProps()}
            className={classes.uploadDiv}
            style={{height:'100px'}}>
            <input {...getInputProps()}/>
            
                <div className={classes.wrapButton}>
              
                <div className={classes.uploadComponent} style={{textAlignLast:'center'}}>
                <IconButton style={{borderRadius:'unset'}}>
                  <BackupOutLinedIcon  className={classes.iconSize}/>
                  		<span style={{fontSize:'17px'}}> Click And Select File / Drag And Drop File</span>
                </IconButton>
                </div>
              </div>
          </div>          
        )
        
      )}

    </Dropzone>:<div className={classes.uploadDiv}> <p style={{color:'black'}}>upload File Name: {fileName} </p> </div>}
    <div style={{textAlignLast:'right'}}>
    	<Button color="info"  onClick={(e) => handleReset(e)} size="sm"> reset </Button>
    	<Button color="info"  onClick={(e) => handleSubmit(e)} size="sm"> Submit Data </Button>
    </div>
    
    <Snackbar open={alertOpen} autoHideDuration={1000} onClose={handleAlertClose}>
	<Alert 
		onClose={handleAlertClose}
		severity={severity}>
			{errMessage}
	</Alert>
	</Snackbar>
    
    <div> 데이터 로드 결과: ( 성공:&nbsp;{sucessCnt} &nbsp;&nbsp;/&nbsp; 실패:&nbsp;{failCnt}&nbsp;) {saveDataStatus?<font color="red" style={{fontWeight:'bold'}}>* {sucessCnt}건 DB SAVE SUCCESS.</font>:null}</div>
      <CustomTable
        tableHeaderColor="info"
        tableData={rows}
        tableRownum = {colPageCnt}
        tablePageCnt = {nextPageCnt}
        onClickHandle ={addRows}
      />     
      {colPageCnt > 1?
		            <div className={"fixed-plugin"} style={{top:'85%',width:'45px',right:'2%',borderRadius:'8px'}}>
					    <div onClick={handleClick}>
					    	<Tooltip title="Scroll Top">
					    		<i className="fa fa-angle-double-up fa-3x" style={{color:'white'}}/>
					    	</Tooltip>
					    </div>
					</div>:null
		}
    </CardBody>
    </Card>

  )

}



function CustomTable(props) {
	  const tableStyle = tableStyles();
	  const classes = useStyles();
	  const {
	    tableHead,
	    tableData,
	    tableHeaderColor,
	    hover,
	    colorsColls,
	    coloredColls,
	    customCellClasses,
	    customClassesForCells,
	    striped,
	    tableShopping,
	    customHeadCellClasses,
	    customHeadClassesForCells,
	    tableRownum,
	    tablePageCnt
	  } = props;
	  
	  //console.log("loading status:",loading);
	  //console.log("table Data:",tableData);
	  
	  const tableCellClasses =
	      classes.tableHeadCell +
	      " " +
	      classes.tableCell;
	  
	  //console.log("table data:",tableData);
	  
	  function  BodyData() {
		      
    		  return ( 
    				  tableData.map((prop, key) => ( 
    				  <RowTable key={key} row={prop} />
              ))
              );
	  }
	  
	  const handleAddFunction = () => {
		    props.onClickHandle();
		  }  
	  
	  return (
	    <div className={tableStyle.tableResponsive}>
	      <Table className={tableStyle.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
	          <TableHead>
	            <TableRow >
	                  <TableCell className={classes.tableMainHeaderCell} >순번</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >업체명</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >공표번호</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >공표일</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >발효일</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >수출입</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >선적지</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >양하지</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >양륙지</TableCell>
	                  <TableCell className={classes.tableMainHeaderCell} >환적여부</TableCell>
	            </TableRow>
	          </TableHead>
	         <TableBody>
	          	<BodyData />
	         </TableBody>
	         {(tablePageCnt > 1 ?
	        	        <TableFooter >
	        	        	<TableRow  >
	        	        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={10}>
	        	        		<Button
	        					    color="info"
	        						onClick={handleAddFunction}
	        	        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
	        					>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tablePageCnt}&nbsp;)</Button>
	        			    </TableCell>
	        	        	</TableRow>
	        	        </TableFooter>: null )}
	      </Table>
	    </div>
	  );
	}

function RowTable(props: { row: ReturnType<typeof createData> }) {
	  const { row } = props;
	  const [open, setOpen] = React.useState(false);
	  const classes = useStyles();
	  const tableClasses = tableStyles();

	  return (
	    <React.Fragment>
	      <TableRow onClick={() => setOpen(!open)}>
	        <TableCell className={classes.tableMainDtlCell}>{row[0]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[1]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[2]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[3]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[4]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[6]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[7]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[8]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[9]}</TableCell>
	        <TableCell className={classes.tableMainDtlCell}>{row[10]}</TableCell>
	      </TableRow>
	      <TableRow>
	        <TableCell style={{ paddingBottom: 0, paddingTop: 0, backgroundColor:'#f5f5f5' }} colSpan={10}>
	          <Collapse in={open} timeout="auto" unmountOnExit>
	            <Box margin={1}>
	              <Typography variant="h6" gutterBottom component="div">
	                Container Info.
	              </Typography>
	                <div>
	                <Table className={tableClasses.table}>
	                <TableHead>
	                  <TableRow>
	                    <TableCell className={classes.tableDtlHeaderCell} >항로</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell} >컨테이너소유</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell} >컨테이너종류</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell} >컨테이너크기</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell} >화물품목</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell} >운송단위</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell} >설명</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell} >비고</TableCell>         	
	                  </TableRow>
	                </TableHead>
	                <TableBody>
	                    <TableRow >
	                      <TableCell className={classes.tableDtlBodyCell}>{row[5]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[11]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[12]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[13]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[14]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[15]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[40]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[41]}</TableCell>
	                    </TableRow>
	                </TableBody>
	              </Table>
	              </div>
	              <Typography variant="h6" gutterBottom component="div">
	                Transportation Cost.
	              </Typography>
	                <div className={tableClasses.tableResponsive}>
	      	      <Table className={tableClasses.table}>
	                <TableHead>
	                  <TableRow>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>O/F</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>BAF</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>CAF</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>LSS</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>EBS</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>O/THC</TableCell>
	                  </TableRow>
	                  <TableRow>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                      	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>          	
	                  </TableRow>
	                </TableHead>
	                <TableBody>
	                    <TableRow >
	                      <TableCell className={classes.tableDtlBodyCell}>{row[16]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[17]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[18]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[19]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[20]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[21]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[22]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[23]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[24]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[25]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[26]}</TableCell>
	                      <TableCell className={classes.tableDtlBodyCell}>{row[27]}</TableCell>
	                    </TableRow>

	                </TableBody>
	                <TableHead>
	                  <TableRow>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>D/THC</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>서류발급비</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>화물인도 지시서요금</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>부두사용료</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>컨테이너봉인료</TableCell>
	                    <TableCell colSpan={2} className={classes.tableDtlHeaderCell}>기타</TableCell>
	                  </TableRow>
	                  <TableRow>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                    	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                    	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                    	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                    	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                    	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell>
	                  	<TableCell className={classes.tableDtlHeaderCell}>화폐</TableCell>
                    	<TableCell className={classes.tableDtlHeaderCell}>금액</TableCell> 
	                  </TableRow>
	                </TableHead>
	                <TableBody>
	                    <TableRow >
                    	<TableCell className={classes.tableDtlBodyCell}>{row[28]}</TableCell>
	                  	<TableCell className={classes.tableDtlBodyCell}>{row[29]}</TableCell>
                    	<TableCell className={classes.tableDtlBodyCell}>{row[30]}</TableCell>
	                  	<TableCell className={classes.tableDtlBodyCell}>{row[31]}</TableCell>
                    	<TableCell className={classes.tableDtlBodyCell}>{row[32]}</TableCell>
	                  	<TableCell className={classes.tableDtlBodyCell}>{row[33]}</TableCell>
                    	<TableCell className={classes.tableDtlBodyCell}>{row[34]}</TableCell>
	                  	<TableCell className={classes.tableDtlBodyCell}>{row[35]}</TableCell>
                    	<TableCell className={classes.tableDtlBodyCell}>{row[36]}</TableCell>
	                  	<TableCell className={classes.tableDtlBodyCell}>{row[37]}</TableCell>
                    	<TableCell className={classes.tableDtlBodyCell}>{row[38]}</TableCell>
                    	<TableCell className={classes.tableDtlBodyCell}>{row[39]}</TableCell>
	                    </TableRow>
	                </TableBody>
	              </Table>
	              </div>
	            </Box>
	          </Collapse>
	        </TableCell>
	      </TableRow>
	    </React.Fragment>
	  );
	}