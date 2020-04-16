import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";

export default function BoardWrite(props) {
  var board_id; 
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  if(props.board_id != undefined){
    board_id = props.board_id;
  }

  useEffect(() => {
    if( board_id != undefined ){
      setTitle(props.boardData['title']);
      setContent(props.boardData['content']);
    }
  }, []);

  const chkData = () => {
    if(title == ""){
      alert("제목을 입력하세요.");
      return false;
    } else if(content == ""){
      alert("내용을 입력하세요.");
      return false;
    } else {
      return true;
    }
  }

  return (
      <GridContainer>
          <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                labelText="Title"
                id="title"
                formControlProps={{
                  fullWidth: true
                }}
                inputProps={{
                  value:title,
                  onChange:({target:{value} }) => setTitle(value)
                }}
              />
            </GridItem>
            <GridItem xs={12} sm={12} md={12}>
              <CustomInput
                labelText="Content"
                id="Content"
                formControlProps={{
                  fullWidth: true,
                }}
                inputProps={{
                  value:content,
                  multiline: true,
                  rows: 20,
                  onChange:({target:{value} }) => setContent(value)
                }}
              />
            </GridItem>
          </GridContainer>
        <GridContainer >
          <GridItem xs={12} sm={12} md={12} style={{textAlignLast:'right'}}>
            <Button color="primary" onClick = { () => { 
              if (chkData()) {
                props.saveBoard(board_id, title, content);
              }
            }}>저장</Button>
            <Button color="primary" onClick = { () => { props.onChangeData("LIST"); } }>목록</Button>
          </GridItem>
        </GridContainer>
      </GridContainer>
  );
}
