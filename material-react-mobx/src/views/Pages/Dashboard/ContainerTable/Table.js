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
import axios from 'axios';
import styles from "assets/jss/material-dashboard-react/components/tableStyle.js";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const { ietype, tableHead, tableHeaderColor } = props;
  const [tableData , setTableData] = React.useState([]);
  
  React.useEffect(() => {

		  axios.post("/com/getDemdetStatInfo",{ietype:ietype},{headers:{'Authorization':'Bearer '+props.token}})
	  	  .then(setTableData([]))
		  .then(res => {setTableData(res.data);});
	    return () => {
	      console.log('cleanup');
	     // window.removeEventListener("touchmove",handleTouchMove);
	    };
	    
}, []);
  
  return (
    <div className={classes.tableResponsive}>
      <Table className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
          <TableHead className={classes[tableHeaderColor]}>
          <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
                <TableCell  colSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>DEMMURAGE</TableCell>
                <TableCell  colSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>DETENTION</TableCell>
                <TableCell  colSpan={2} align='center' style={{paddingTop:'6px',paddingBottom:'6px',backgroundColor: "#f2fefd",borderRight:'1px solid silver'}}>OVER STORAGE CAHRGE</TableCell>
          </TableRow>
          <TableRow className={classes.tableRow + " " + classes.tableRowHead}>
	            <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>WITHIN D-3 DAYS</TableCell>
	            <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>OCCURING</TableCell>
	            <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>WITHIN D-3 DAYS</TableCell>
	            <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>OCCURING</TableCell>
	            <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>WITHIN D-3 DAYS</TableCell>
	            <TableCell align='center' style={{paddingTop:'6px',paddingBottom:'6px',fontSize:'10px',borderRight:'1px solid silver'}}>OCCURING</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {tableData.length?tableData.map((prop, key,index) => {
            return (
              <TableRow key={index+key} >
                {prop.map((prop, index,key) => {
                  return (
                    index === 0?
                    <TableCell style={{paddingTop:'8px',paddingBottom:'8px',fontSize:'12px',fontWeight:'bold',borderRight:'1px solid silver',borderLeft:'1px solid silver'}} key={key+index} align='center'>
                      {prop}
                    </TableCell>:
                    	<TableCell style={{paddingTop:'8px',paddingBottom:'8px',fontSize:'12px',fontWeight:'bold',borderRight:'1px solid silver'}} key={key+index} align='center' >
                    {prop}
                  </TableCell>
                  );
                })}
              </TableRow>
            );
          }) : (
        		  <TableRow> 
        		  	<TableCell colSpan={6} style={{textAlign:'center',paddingTop:'8px',paddingBottom:'8px',borderLeft:'1px solid silver',fontWeight:'bold',borderRight:'1px solid silver'}}> 
        		  	로그인 후 확인 가능합니다.
        		  	</TableCell>
        		  </TableRow>
        		)}
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
