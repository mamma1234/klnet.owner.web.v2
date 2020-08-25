import React,{ useState, useEffect } from "react";
import Board from "./Board.js"

import axios from 'axios';

export default function BoardTest(props) {

    const [boardMode,setBoardMode] = useState("LIST");
    const [boardId,setBoardId] = useState();
    const [boardList,setBoardList] = useState([]);
    const [boardDetailData,setBoardData] = useState([]);

    const changeDataHandler = (boardMode, boardId) => {
        setBoardMode(boardMode);
        setBoardId(boardId)
    }

    const getBoardList = () => {
      axios.post("/com/getBoardList"
          )
        .then(res => {setBoardList(res.data)
          console.log(res.data)
        })
        .catch(err => {
          alert('오류가 발생했습니다.');
        });
    }

    const getBoardDetail = (boardId) => {
      console.log('effect');
      //search
      axios.post("/com/getBoardDetail", {board_id:boardId}
          )
        .then(res => {
          setBoardData(res.data[0]);
        })
        .catch(err => {
          alert('오류가 발생했습니다.');
        });
    }

    const deleteBoard = (boardId) => {
      //delete
      axios.post("/com/deleteBoard",{ board_id:boardId })
        .then(res => {
              alert("삭제되었습니다."); 
              setBoardMode("LIST");
            })
        .catch(err => {
          if(err.response.status === 403) {
            alert('오류가 발생했습니다.');
          }
        });
    }

    
    const saveBoard = (boardId, title, content) => {
      //save
      axios.post("/com/saveBoard",{ board_id:boardId, title:title, content:content})
        .then(res => {
            alert("게시글이 등록 되었습니다."); 
            setBoardMode("LIST")
          })
        .catch(err => {
          alert('오류가 발생했습니다.');
        });
    }

    return(
        <Board
            boardList = {boardList}
            boardData = {boardDetailData}
            boardMode = {boardMode}
            boardId = {boardId}
            onChangeData = {changeDataHandler}
            getBoardList = {getBoardList}
            getBoardDetail = {getBoardDetail}
            deleteBoard = {deleteBoard}
            saveBoard = {saveBoard}
        ></Board>
    );
}
