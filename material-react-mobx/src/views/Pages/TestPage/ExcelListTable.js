import React from "react";
import cx from "classnames";
import PropTypes from "prop-types";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
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
    customHeadClassesForCells
  } = props;
  
  const tableCellClasses =
      classes.tableHeadCell +
      " " +
      classes.tableCell;
  
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor]}>
            <TableRow >
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} rowSpan={2}>순번</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} rowSpan={2}>업체명</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} rowSpan={2}>공표번호</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >공표일</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >발효일</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >항로</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >수출입</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >선적지</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >양하지</TableCell>
                  <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >양륙지</TableCell>
            </TableRow>
            <TableRow >
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >환적여부</TableCell>
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >컨테이너소유</TableCell>
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >컨테이너종류</TableCell>
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >화물품목</TableCell>
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >운송단위</TableCell>
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >설명</TableCell>
	            <TableCell style={{paddingTop:'0',paddingBottom:'0',border:'1px solid silver'}} >비고</TableCell>
	         </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            var rowColor = "";
            var rowColored = false;
            if (prop.color !== undefined) {
              rowColor = prop.color;
              rowColored = true;
              prop = prop.data;
            }
            const tableRowClasses = cx({
              [classes.tableRowBody]: true,
              [classes.tableRowHover]: hover,
              [classes[rowColor + "Row"]]: rowColored,
              [classes.tableStripedRow]: striped && key % 2 === 0
            });
            if (prop.total) {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={classes.tableCell + " " + classes.tableCellTotal}
                  >
                    Total
                  </TableCell>
                  <TableCell
                    className={
                      classes.tableCell + " " + classes.tableCellAmount
                    }
                  >
                    {prop.amount}
                  </TableCell>
                  {tableHead.length - (prop.colspan - 0 + 2) > 0 ? (
                    <TableCell
                      className={classes.tableCell}
                      colSpan={tableHead.length - (prop.colspan - 0 + 2)}
                    />
                  ) : null}
                </TableRow>
              );
            }
            if (prop.purchase) {
              return (
                <TableRow key={key} hover={hover} className={tableRowClasses}>
                  <TableCell
                    className={classes.tableCell}
                    colSpan={prop.colspan}
                  />
                  <TableCell
                    className={classes.tableCell + " " + classes.right}
                    colSpan={prop.col.colspan}
                  >
                    {prop.col.text}
                  </TableCell>
                </TableRow>
              );
            }
            return (
              <TableRow
                key={key}
                hover={hover}
                className={classes.tableRow + " " + tableRowClasses}
              >
                {prop.map((prop, key) => {
                  const tableCellClasses =
                    classes.tableCell +
                    " " +
                    cx({
                      [classes[colorsColls[coloredColls.indexOf(key)]]]:
                        coloredColls.indexOf(key) !== -1,
                      [customCellClasses[customClassesForCells.indexOf(key)]]:
                        customClassesForCells.indexOf(key) !== -1
                    });
                  return (
                    <TableCell className={tableCellClasses} key={key}>
                      {prop}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray",
  hover: false,
  colorsColls: [],
  coloredColls: [],
  striped: false,
  customCellClasses: [],
  customClassesForCells: [],
  customHeadCellClasses: [],
  customHeadClassesForCells: []
};

CustomTable.propTypes = {
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  // Of(PropTypes.arrayOf(PropTypes.node)) || Of(PropTypes.object),
  tableData: PropTypes.array,
  hover: PropTypes.bool,
  coloredColls: PropTypes.arrayOf(PropTypes.number),
  // Of(["warning","primary","danger","success","info","rose","gray"]) - colorsColls
  colorsColls: PropTypes.array,
  customCellClasses: PropTypes.arrayOf(PropTypes.string),
  customClassesForCells: PropTypes.arrayOf(PropTypes.number),
  customHeadCellClasses: PropTypes.arrayOf(PropTypes.string),
  customHeadClassesForCells: PropTypes.arrayOf(PropTypes.number),
  striped: PropTypes.bool,
  // this will cause some changes in font
  tableShopping: PropTypes.bool
};
