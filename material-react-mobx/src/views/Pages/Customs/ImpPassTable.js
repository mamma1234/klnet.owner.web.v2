import React,{ useState, useEffect } from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import { Table, TableCell, TableBody, TableRow } from '@material-ui/core';

const styles = {
    headerCell: {
      textAlign: "left",
      backgroundColor: "#f2fefd",
      width:'150px',
      padding:'7px'
    },
    dataCell: {
      textAlign: "left",
      padding:'7px'
    }
  };

const useStyles = makeStyles(styles);
  
export default function ImpPassTable(props) {
    
  const classes = useStyles();  
  return (
    <Table style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
        <TableBody>
            <TableRow>
              <TableCell className={classes.headerCell}>화물관리번호</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.cargMtNo}</TableCell>
              <TableCell className={classes.headerCell}>M-B/L</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.mblNo}</TableCell>
              <TableCell className={classes.headerCell}>H-B/L</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.hblNo}</TableCell>
              <TableCell className={classes.headerCell}>선사</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.shcoFlco}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>항차</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.vydf}</TableCell>
              <TableCell className={classes.headerCell}>선사(대리점)</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.agnc}</TableCell>
              <TableCell className={classes.headerCell}>선박국적</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.shipNat_text}</TableCell>
              <TableCell className={classes.headerCell}>선박명</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.shipNm}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>화물구분</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.cargTp}</TableCell>
              <TableCell className={classes.headerCell}>B/L타입</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.blPtNm}</TableCell>
              <TableCell className={classes.headerCell}>총중량(KG)</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.ttwg}</TableCell>
              <TableCell className={classes.headerCell}>총용적</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.msrm}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>품명</TableCell>
              <TableCell className={classes.dataCell} colSpan="7">{props.tableData.prnm}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>포장개수(단위)</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.pck_text}</TableCell>
              <TableCell className={classes.headerCell}>특수화물코드(KG)</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.spcnCargCd}</TableCell>
              <TableCell className={classes.headerCell}>컨개수/컨번호</TableCell>
              <TableCell className={classes.dataCell} colSpan="3">{props.tableData.cntr_text}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>적재항</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.ldpr_text}</TableCell>
              <TableCell className={classes.headerCell}>양하항</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.dspr_text}</TableCell>
              <TableCell className={classes.headerCell}>입항세관</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.etprCstm}</TableCell>
              <TableCell className={classes.headerCell}>입항일시</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.etprDt}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>화물상태</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.prgsStts}</TableCell>
              <TableCell className={classes.headerCell}>통관진행</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.csclPrgsStts}</TableCell>
              <TableCell className={classes.headerCell}>최종처리일시</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.prcsDttm}</TableCell>
              <TableCell className={classes.headerCell}>관리대상</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.mtTrgtCargYnNm}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className={classes.headerCell}>반출의무과태료</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.rlseDtyPridPassTpcd}</TableCell>
              <TableCell className={classes.headerCell}>신고지연가산세</TableCell>
              <TableCell className={classes.dataCell}>{props.tableData.dclrDelyAdtxYn}</TableCell>
              <TableCell className={classes.headerCell}></TableCell>
              <TableCell className={classes.dataCell}>{}</TableCell>
              <TableCell className={classes.headerCell}></TableCell>
              <TableCell className={classes.dataCell}>{}</TableCell>
            </TableRow>
        </TableBody>
    </Table>
  );
}
