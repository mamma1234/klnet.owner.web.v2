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
import Collapse from '@material-ui/core/Collapse';
import Grid from '@material-ui/core/Grid';
import ExpandMore from "@material-ui/icons/ExpandMore";
import ExpandLess from "@material-ui/icons/ExpandLess";

const useStyles = makeStyles(styles);

export default function CustomTable(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { tableHead, tableData, tableHeaderColor } = props;
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
        {tableData.map((prop, key) => {
            if(tableData.length < 2 ) {
              if (prop[1] == "관세청 유니패스 바로가기")
              {
                return (
                  <TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}}>
                    <TableCell className={classes.trackingtableCell} key={key+2} style={{textAlignLast:'center',paddingTop:'1px',paddingBottom:'1px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>{prop[0]}</TableCell>
                    <TableCell className={classes.trackingtableCell} key={key+5} style={{textAlignLast:'center', textDecoration:'underline',paddingTop:'1px',paddingBottom:'1px',borderRight:'1px solid silver'}}><font color="blue"><a href="https://unipass.customs.go.kr" target="_blank">{prop[1]}</a></font></TableCell>
                    <TableCell className={classes.trackingtableCell} key={key+10} style={{textAlignLast:'center',paddingTop:'1px',paddingBottom:'1px',borderRight:'1px solid silver'}}>{prop[2]}</TableCell>
                  </TableRow>
                );
              }
              else{
                return (
                  <TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}}>
                    {prop.map((prop, key) => {
                      return (
                        <TableCell className={classes.trackingtableCell} key={key} style={{textAlignLast:'center',paddingTop:'1px',paddingBottom:'1px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              }
            } else {
              // 단건인 경우 
              if ( key == 0 ) {
                return (
                  <TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}}>
                    {prop.map((prop, key) => {
                      return (
                        <TableCell className={classes.trackingtableCell} key={key} style={{textAlignLast:'center',paddingTop:'1px',paddingBottom:'1px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>
                          {prop}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              } else {
                // 다건인 경우에는 확장 이벤트 발생 시 펼쳐준다.
                if (expanded) {
                  return (
                    <TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}}>
                      {prop.map((prop, key) => {
                        return (
                          <TableCell className={classes.trackingtableCell} key={key} style={{textAlignLast:'center',paddingTop:'1px',paddingBottom:'1px',borderRight:'1px solid silver',borderLeft:'1px solid silver'}}>
                            {prop}
                            <Collapse in={expanded} timeout="auto" unmountOnExit style={{width:'100%'}}>
                            </Collapse>
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                }
              }

            }
          })}
        </TableBody>
      </Table>
      {(tableData.length < 2 ?
      null:
      <Grid style={{textAlignLast:'center',height:'30px',paddingTop:'5px'}}>
          {expanded?<ExpandLess onClick = {handleExpandClick} style={{color:'#00acc1'}}/>:<ExpandMore onClick = {handleExpandClick} style={{color:'#00acc1'}}/>}
      </Grid>
      )}
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
