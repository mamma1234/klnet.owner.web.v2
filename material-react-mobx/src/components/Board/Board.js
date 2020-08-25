import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// core components
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import { CardContent, TextField } from "@material-ui/core";

import BoardList from "./BoardList.js";
import BoardView from "./BoardView.js";
import BoardWrite from "./BoardWrite";



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
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
    marginTop: "0px",
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
  }
};


const useStyles = makeStyles(styles);

export default function Board(props) {
  
	const {title} = props;
  const classes = useStyles();  
  let content = null;

  if (props.boardMode == "VIEW"){
    content = <BoardView
                board_id={props.boardId}
                boardData={props.boardData}
                boardAttachData={props.boardAttachData}
                onChangeData={
                  (boardMode, board_id) => {
                    props.onChangeData(boardMode, board_id);
                }}
                getBoardDetail={
                  (board_id) => {
                    props.getBoardDetail(board_id);
                }}
                deleteBoard={
                  (board_id) => {
                    props.deleteBoard(board_id);
                }}
                getBoardAttach={
                  (board_id) => {
                    props.getBoardAttach(board_id);
                }}
                boardAttachDown={
                  (fileName, filePath) => {
                    props.boardAttachDown(fileName, filePath);
                }}
              ></BoardView>;
  } else if (props.boardMode == "WRITE"){
    content = <BoardWrite
                board_id={props.boardId}
                boardData={props.boardData}
                boardAttachData={props.boardAttachData}
                store={props.store}
                onChangeData={
                  (boardMode, board_id) => {
                    props.onChangeData(boardMode, board_id);
                }}
                saveBoard={
                  (board_id, title, content, author_name, files, fileStateList) => {
                    props.saveBoard(board_id, title, content, author_name, files, fileStateList);
                }}
              ></BoardWrite>;
  } else { // LIST
    content = <BoardList 
                getBoardList = {
                  () => {
                    props.getBoardList();
                }}
                onChangeData={
                  (boardMode, board_id) => {
                    props.onChangeData(boardMode, board_id);
                  }}
                tableData={props.boardList}
    			returnUrl={props.returnUrl}
              ></BoardList>
  }

  return (
    <Card>
      <CardHeader color="info">
        <h4 className={classes.cardTitleWhite}>{title}</h4>
        {/*<p className={classes.cardCategoryWhite}>board</p>*/}
      </CardHeader>
      <CardBody>
      <CardContent className = {classes.card}>
        {content}
      </CardContent>
      </CardBody>
    </Card>
 );
}