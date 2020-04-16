import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
// core components
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import ActListIcon from "@material-ui/icons/ListAlt";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  return (
    <div>
      <Table className={classes.table}>
      {tableHead !== undefined ? (
              <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                <TableRow style={{borderTop:'1px solid',borderColor:'#dddddd'}}>
                  {tableHead.map((prop, key) => {
                    return (
                      <TableCell
                        className={classes.trackingtableCell + " " + classes.tableHeadCell} style={{textAlignLast:'center'}}
                        key={key}
                      >
                        {prop}
                      </TableCell>
                    );
                  })}
                </TableRow>
              </TableHead>
        ) : null}
        <TableBody>
          {tableData.map((prop, key) => {
            return (
              <TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}}>
              	<TableCell className={classes.trackingtableCell} style={{textAlignLast:'center'}}> {prop[0]}</TableCell>
              	<TableCell className={classes.trackingtableCell} style={{textAlignLast:'center'}}> {prop[1]}<ActListIcon style={{color:'#00acc1',verticalAlign:'bottom'}} onClick={props.handleCntr}/></TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
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
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
