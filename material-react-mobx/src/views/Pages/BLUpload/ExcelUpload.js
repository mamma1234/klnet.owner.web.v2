import React, { Component,useState, useCallback} from "react"; 
import Dropzone from 'react-dropzone';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardIcon from "components/Card/CardIcon.js";
import IconM from "@material-ui/core/Icon";
import { ExcelRenderer } from "react-excel-renderer";
import { setConstantValue } from "typescript";
import TablePaging from "views/Pages/BLUpload/UploadTable.js";
import BackupOutLinedIcon from '@material-ui/icons/BackupOutlined'
import classNames from 'classnames/bind'
import IconButton from '@material-ui/core/IconButton'
import Button from "components/CustomButtons/Button.js";
import Tooltip from '@material-ui/core/Tooltip';
import axios from 'axios';
import Filesaver from 'file-saver';
import ArrowFoward from '@material-ui/icons/ArrowForwardIos';
import IconError from '@material-ui/icons/Error';
import { Promise } from "core-js";
import CircularProgress from '@material-ui/core/CircularProgress'
const useStyles = makeStyles(theme => ({
  root: {
'& >*': {
  width:200,
}  
},
  uploadDiv: {
    borderStyle:'dotted',
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
  }
  
}));

export default function Excelupload(props) {
  const classes = useStyles();
  const [errorMessage,setErrorMessage] = useState("");
  const lineCode = props.params;
  const [rows, setRows] = useState([]);
  const [errRows, setErrRows] = useState([]);
  const [userStore, setUserStore] = useState(props.token);
  const [progress,setProgress] = useState(false);
  React.useEffect(() => {
    //.then(res => console.log(JSON.stringify(res.data)));
    console.log(userStore.token)
    return () => {
      console.log('cleanup');
    };
  }, []);


  
  const checkFile = (file) => {
    let errorMessage = ""; 
    if (!file || !file[0]) { 
      return; 
    } 
    const isExcel = file[0].type === "application/vnd.ms-excel" || file[0].type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"; 
    if (!isExcel) { 
      errorMessage = "You can only upload Excel file!";
    }
    const isLt2M = file[0].size / 1024 / 1024 < 2; 
    if (!isLt2M) { 
      errorMessage = "File must be smaller than 2MB!";
    } 
    return errorMessage; 
  } 






  const fileHandler = (fileList) => {
    
    let fileObj = fileList[0]; 
      if (!fileObj) {
         setErrorMessage("No file uploaded!");
         return false; 
      }; 
      
    if (!(fileObj.type === "application/vnd.ms-excel" || fileObj.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ) ) { 
      setErrorMessage("Unknown file format. Only Excel files are uploaded!");
    return false; 
    }
    //just pass the fileObj as parameter 
    ExcelRenderer(fileObj, (err, resp) => {
      setErrRows([]);
      setRows([]);
      if (err) { 
        console.log(err); 
      } else {
        let newRows = [];
        let newerrRows = [];
        resp.rows.slice(2).map((row, index) => {
          if (row && row !== "undefined") {
            console.log('row[0]',row[0])
            if(row[0] != undefined) {



              if((row[0] != 'I' && row[0] != 'E')) {
                
                console.log("수출입 구분을 확인 해주십시요.", row[0])
                newerrRows.push([<span>{row[0]}<Tooltip title={"수출입 구분을 확인 해주십시요."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[1],row[2],row[3],row[4]]);
              }else {
                console.log('test')
                let checkLine = false;
                lineCode.forEach(element => {
                  if (element.id == row[1]) {
                    checkLine = true;
                    return;
                  }
                });
                if(checkLine) {
                    if(row[0] != undefined) {
                      if(row[0] > 2) {
                        newerrRows.push([<span>{row[0]}<Tooltip title={"I/E Type 형식이 맞지않습니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[1],row[2],row[3],row[4]]);
                        return;
                      }
                    }
                    if((row[2] == undefined) && (row[3] == undefined)) {
                      newerrRows.push([row[0],row[1],<span>{row[2]}<Tooltip title={"B/L No. 혹은 B/K No. 가 입력되지 않았습니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,<span>{row[3]}<Tooltip title={"B/L No. 혹은 B/K No. 가 입력되지 않았습니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[4]]);
                      return;  
                    }

                    if(row[2] != undefined) {
                      if(row[2].length > 35) {
                        newerrRows.push([row[0],row[1],<span>{row[2]}<Tooltip title={"B/L No.길이가 너무 큽니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[3],row[4]]);
                        return;
                      }
                    }
                    if(row[3] != undefined) {
                      if(row[3].length > 35) {
                        newerrRows.push([row[0],row[1],row[2],<span>{row[3]}<Tooltip title={"B/K No.길이가 너무 큽니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[4]]);
                        return;
                      }
                    }
                    if(row[4] != undefined) {
                      if(row[4].length > 20) {
                        newerrRows.push([row[0],row[1],row[2],row[3],<span>{row[4]}<Tooltip title={"Container Number 길이가 너무 큽니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>]);
                        return;
                      }
                    } 
                    
                  newRows.push([row[0],row[1],row[2],row[3],row[4]]);
                }else {
                  newerrRows.push([row[0],<span>{row[1]}<Tooltip title={"CARRIER CODE가 맞지 않거나 이용하지 않는 CODE입니다."} arrow><IconError color={'error'}></IconError></Tooltip></span>,row[2],row[3],row[4]]);
                }
                
                
              }
            
            }else {
              if(row[1] != undefined) {
                newerrRows.push([<span>{row[0]}<Tooltip title={"수출입 구분이 입력되지 않았습니다."} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[1],row[2],row[3],row[4]]);
              }
            }
          }
        });

    
        if (newRows.length == 0) {
          setRows([]);
          if( newerrRows.length == 0) {
            setErrRows([]);
  
          }else {
            setErrRows(newerrRows);
          }
          return false; 
        } 
        else {
          setProgress(true) 
          const newSelecteds = [];
          const newErrSelecteds= [];
            
            newRows.map(element => {
              checkPk(element).then(param => {
                if(param[5]) {
                  param.splice(5)
                  newSelecteds.push(param)
                }else {
                  param.splice(5)
                  newErrSelecteds.push(param)
                }
              })
            })
            
           setTimeout(function() {
            console.log('newErrSelecteds',newErrSelecteds)
            const newErr = newerrRows.concat(newErrSelecteds)
           
            console.log('newSelecteds2',newSelecteds)
            console.log('errRows',newErr)
            setRows(newSelecteds);
            setErrRows(newErr);
            setProgress(false)

            
          },3000)
          
        }
        
      }
    });
   

    // console.log('newRows',newRows,'newerrRows',newerrRows)
    // if(newRows.length > 0 ) {
    //   let bl_bkg = "";

    //   if(rows[2] != undefined && rows[3] != undefined) {
    //     bl_bkg = rows[2];
    //   }else if(rows[3] != undefined && rows[2] == undefined) {
    //     bl_bkg = rows[3];
    //   }else if(rows[2] != undefined && rows[3] == undefined) {
    //     bl_bkg = rows[2];
    //   }
      
    // }else {

    // }

    return false; 
  };   

  const checkPk = (row) => {
   
    return new Promise(function(resolve,reject) {

    
    let bl_bkg = "";
    
    let ieType = row[0];
    let carrierCode = row[1];
    let blNo = row[2];
    let bkgNo = row[3];
    let cntrNo = row[4];
    
    console.log('checkPk', ieType, carrierCode, blNo, bkgNo, cntrNo)
    if(blNo != undefined && bkgNo != undefined) {
      bl_bkg = blNo;
    }else if(bkgNo != "" && blNo == "") {
      bl_bkg = bkgNo;
    }else if(blNo != "" && bkgNo == "") {
      bl_bkg = bkgNo;
    }
    axios.post("/loc/getPkMyBlList",
      {carrierCode:carrierCode,
                   ie_type:ieType,
                   bl_bkg:bl_bkg,
                   cntrNumber:cntrNo},{headers:{'Authorization':'Bearer '+userStore.token}}).then(res => {
        if(res.data.length > 0) {
          const returnValue = [<span>{row[0]}<Tooltip title={" 이미 등록 되어있는 B/L 번호"} arrow><IconError color={'error'}></IconError></Tooltip> </span>,row[1],row[2],'이미 저장된','B/L번호입니다.',false]
          

          resolve(returnValue);
        
        }else {
          const returnValue = [row[0],row[1],row[2],row[3],row[4],true]
          

          resolve(returnValue);
        }
      })

    })  
  }
  const dupliRowClick =(e,row) => {
    e.preventDefault();
    // props.returnMessage('정상처리 되었습니다.','success');
     props.returnFunction();
     props.searchFunction(row);
    //props.
  }

  const handleDown = () => {
    
    axios.get("/loc/downloadExcel",{responseType:"arraybuffer",headers:{'Authorization':'Bearer '+userStore.token}}).
    then(res => {
      console.log(res.data);
      Filesaver.saveAs(new Blob([res.data]),"BLUploadFormat.xlsx")});
  }
  const handleSubmit = async (e) => { 
    // console.log("submitting: ", this.state.rows);
    let dataRows = rows;
    if(dataRows.length != 0) {
      axios.post("/loc/saveBlList", { dataRows:dataRows },{headers:{'Authorization':'Bearer '+userStore.token}})
      .then(response => {
        e.preventDefault();
        props.returnMessage('정상처리 되었습니다.','success');
        props.returnFunction();
        props.returnState();
        setRows([]);
        setErrRows([]);
      })
      .catch(error => {
        console.log(error)
        alert(error);
      })
      //props.handleClose();
    }else {
      
      
    }
    //submit to API 
    //if successful, banigate and clear the data 
    //this.setState({ rows: [] }) 
  };

  return(
    <Card style={{width:'700px'}}>
    <CardHeader color="info" stats icon >
     <CardIcon color="info" style={{height:'55px'}}>
       <IconM style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</IconM>
     </CardIcon>
       <h4 style={{textAlign: "left",color:"#000000"}}>Excel Upload</h4>
       <Button style={{width:"200px"}} style={{width:'300px'}} color="info" size="sm" onClick={() => handleDown()}>SAMPLE DOWNLOAD</Button>
    </CardHeader>
       <CardBody>
      
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
              <IconButton>
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
                <IconButton>
                  <BackupOutLinedIcon  className={classes.iconSize}/><span style={{fontSize:'17px'}}>Click And Select File <br></br>Drag And Drop File</span>
                </IconButton>
                </div>
              </div>
              

            
          </div>          
        )
        
      )}

    </Dropzone>
    {
      progress?
    (<div className ={classes.progressStyle} style={{textAlignLast:'center'}}>
    <CircularProgress/>
    </div>):null
    }
     {rows.length > 0 ? (
        <div>
        <ArrowFoward className={classes.arrowIconSize}/><span className={classes.titleName}>Success</span>
        <TablePaging
            
        tableHeaderColor="info"
        tableHead={["I/E","CARRIER","B/L No.", "B/K No.","Container No."]}
        tableData={rows}/>
        </div>
      ):null}
      {errRows.length>0?(
        <div>
        <ArrowFoward className={classes.arrowIconSize}/><span className={classes.titleName}>Error</span>
        <TablePaging
        style={{marginLeft:'10px'}}
        tableHeaderColor="info"
        tableHead={["I/E","CARRIER","B/L No.", "B/K No.","Container No."]}
        tableData={errRows}/>
        </div>
      ):null}
       {rows.length>0?(
        <Button style={{width:'100%'}} color="info"  onClick={(e) => handleSubmit(e)} size="sm"> Submit Data </Button>
      ):null}
    </CardBody>
    </Card>

  )

}