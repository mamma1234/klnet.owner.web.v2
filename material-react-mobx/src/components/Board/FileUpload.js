import React, { Component,useState, useCallback} from "react"; 
import Dropzone from 'react-dropzone';
import { makeStyles } from "@material-ui/core/styles";
import Card from "components/Card/Card.js";
import BackupOutLinedIcon from '@material-ui/icons/BackupOutlined'
import IconButton from '@material-ui/core/IconButton'
import MaterialTable from 'material-table';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
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

export default function Fileupload(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  React.useEffect(() => {
    if(props.boardId != undefined){
      if(props.boardAttachData != undefined){
        let tmpRows = [];
        let tmpFileStateList = [];
        props.boardAttachData.map(file => {
          let fileObj = {
            file_name : file.file_name
          };
          tmpRows.push(fileObj);
          fileObj = {
            file_name : file.file_name,
            file_path : file.file_path,
            state : "SELECT"
          };
          tmpFileStateList.push(fileObj);
        })
        setRows(tmpRows);
        props.setFileStateList(tmpFileStateList);
      }
    }
    return () => {
      console.log('cleanup');
    };
  }, []);

  const fileHandler = (fileList) => {
    
    if (!fileList) {
        alert("선택된 파일이 없습니다.");
        return false; 
    }; 
    let tmpList = rows;
    let tmpFileStateList = props.fileStateList;
    let tmpFiles = [];
    if(props.files != undefined){
      props.files.map(file => {
        tmpFiles.push(file);
      })
    }
    fileList.map(file => {

      let fileObj;
      let tmpFile;
      
      fileObj = {
        file_name : file.name
      };
      tmpList.push(fileObj);
      tmpFiles.push(file);

      const fileIndex = tmpFileStateList.findIndex(element => {
        return element.file_name == file.name;
      });

      if (fileIndex > -1){
        tmpFile = tmpFileStateList.splice(fileIndex, 1);
      }

      if(tmpFile != undefined && tmpFile[0].state != "INSERT"){

        fileObj = {
          file_name : file.name,
          state : "UPDATE"
        };
        tmpFileStateList.push(fileObj);
      } else {
        fileObj = {
          file_name : file.name,
          state : "INSERT"
        };
        tmpFileStateList.push(fileObj);
      }

    });
    setRows(tmpList);
    props.setFiles(tmpFiles);
    props.setFileStateList(tmpFileStateList);
      
    return false; 
  };

  const onFileDeleteClick = (rowData) => {
    props.setFileStateList(prevState => {
      let data = [...prevState];
      const tmpFile = data.splice( data.findIndex(element => {
        return element.file_name == rowData.file_name
      }) , 1);
      if(tmpFile[0].state == "SELECT"){
        const fileObj = {
          file_name : tmpFile[0].file_name,
          file_path : tmpFile[0].file_path,
          state : "DELETE"
        };
        data.push(fileObj);
      }
      return data;
    });
    setRows(prevState => {
      const data = [...prevState];
      
      data.splice( data.findIndex(element => {
        return element.file_name == rowData.file_name
      }) , 1);
      return data;
    });
    props.setFiles(prevState => {
      const data = [...prevState];
      data.splice( data.findIndex(element => {
        return element.file_name == rowData.file_name
      }) , 1);
      return data;
    });
  }

  return(
    <Card>
      
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
     {rows.length > 0 ? (
        /*<MaterialTable
                  options={{actionsColumnIndex: -1, textAlign:'left', search:false, paging:false, toolbar:false,}}
                  columns={
                    [{title: '파일명', field: 'file_name', editable:'never' }]
                  }
                  actions={[
                    {
                      icon:'delete',
                      onClick: (event, rowData) => onFileDeleteClick(rowData)
                    }
                  ]}
                  data={rows}
                />*/
          <Table className={classes.table} >
          <TableHead>
            <TableRow>
                  <TableCell style={{textAlignLast:'left'}}>파일명</TableCell>
                  <TableCell style={{textAlignLast:'right'}}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((prop, key) => {
              return (
                <TableRow  key={key} index={key + 1}>
                      <TableCell style={{textAlignLast:'left'}}>{prop.file_name}</TableCell>
                      <TableCell style={{color:'red', textAlignLast:'right'}} onClick={ () => onFileDeleteClick(prop)} >X</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ):null}
    </Card>

  )

}