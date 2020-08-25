import React,{ useState, useEffect } from "react";
// @material-ui/core components

// @material-ui/icons

// core components
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import { Table, TableCell, TableBody, TableRow } from '@material-ui/core';

export default function BoardView(props) {
  var board_id;
  var board_content = "";
  if(props.board_id != undefined){
    board_id = props.board_id;
  }
  if(props.boardData['content'] != undefined){
    board_content = props.boardData['content'];
  }

  useEffect(() => {
    props.getBoardDetail(board_id);
    props.getBoardAttach(board_id);
  }, []);

  return (
    <GridContainer>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell colSpan="6">{props.boardData['title']}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{width:'100px'}}>작성자</TableCell>
            <TableCell>{props.boardData['author_name']}</TableCell>
            <TableCell style={{width:'100px'}}>작성일</TableCell>
            <TableCell>{props.boardData['insert_date']}</TableCell>
            <TableCell style={{width:'100px'}}>조회수</TableCell>
            <TableCell>{props.boardData['hit_count']}</TableCell>
          </TableRow>
          <TableRow>
            {
              props.boardAttachData.length>0?(
                <TableCell colSpan="6">{
                  props.boardAttachData.map( (prop, index) => {
                    return (<span key={index} onClick={() => {props.boardAttachDown(prop.file_name, prop.file_path)}} style={{textDecoration:"underline", cursor:"Pointer"}}>
                      {prop.file_name}<br/></span>)
                  })
                }</TableCell>
              ):null
            }
          </TableRow>
          <TableRow>
            <TableCell colSpan="6">{
              board_content.split('\n').map( (line, index) => {
                return (<span key={index}>{line}<br/></span>)
              })
            }</TableCell>
          </TableRow>
        </TableBody>
      </Table>
        <GridContainer >
          <GridItem xs={12} sm={12} md={12} style={{textAlignLast:'right'}}>
            <Button color="primary" onClick = {() => {props.onChangeData("WRITE", board_id);} }>수정</Button>
            <Button color="primary" onClick = {() => {props.deleteBoard(board_id);} }>삭제</Button>
            <Button color="primary" onClick = {() => {props.onChangeData("LIST");} }>목록</Button>
          </GridItem>
        </GridContainer>
      </GridContainer>
  );
}


