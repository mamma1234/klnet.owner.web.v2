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
import TerminalIcon from "@material-ui/icons/HomeOutlined";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { tableHead, tableData, tableHeaderColor } = props;
  const handleClick=(event,value)=>{
	  props.handleCntr(value);
  }
  return (
    <div>
      <Table className={classes.table} style={{borderTop:'2px solid silver', borderBottom:'2px solid silver'}}>
      {tableHead !== undefined ? (
              <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
                <TableRow style={{borderTop:'1px solid',borderColor:'#dddddd'}}>
                  {tableHead.map((prop, key) => {
                    return (
                      <TableCell
                       style={{color:'#717172',textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',backgroundColor: "#f2fefd",borderRight:'1px solid silver',borderLeft:'1px solid silver'}}
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
        {tableData.length >=1?
          tableData.map((prop,index,key) => {
            return (
              <TableRow key={key+index} style={{borderBottom:'1px solid',borderColor:'#dddddd'}} >
            	<TableCell style={{textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>
              	{prop.terminal_name}<a target='blank' href={prop.terminal_url}><TerminalIcon style={{color:'#00acc1',verticalAlign:'bottom'}}/></a>
              	</TableCell>
              	<TableCell style={{textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',borderRight:'1px solid silver'}}> 
              	{prop.view_activity}
              	<ActListIcon style={{color:'#00acc1',verticalAlign:'bottom'}} onClick={(event)=>handleClick(event,index)}/>
              	</TableCell>
              </TableRow>
            );
          })
          :<TableRow style={{borderBottom:'1px solid',borderColor:'#dddddd'}} >
          	<TableCell style={{textAlignLast:'center',paddingTop:'3px',paddingBottom:'3px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}} colSpan="2">NO DATA</TableCell>
          	</TableRow>
        	  }
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
  //tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};
