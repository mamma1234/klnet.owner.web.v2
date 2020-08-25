import React,{ useState, useEffect } from "react";
// @material-ui/core components
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
//core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
//import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";
// core components
import Icon from "@material-ui/core/Icon";
import CardIcon from "components/Card/CardIcon.js";
import styles from "assets/jss/material-dashboard-pro-react/components/tableStyle.js";
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import CalendarBox from "components/CustomInput/CustomCalendar.js";
import { observer, inject} from 'mobx-react'; // 6.x
import Moment from 'moment'

const useStyles = makeStyles(styles);
let numCnt =1;

function ScrapResultTable(props) {
	

  const classes = useStyles();
  const { tableHead,tableData, tableHeaderColor, tableRownum, tableTotalPage } = props;

  const handleAddFunction = () => {
    props.onClickHandle();
  }

  return (
    <div className={classes.tableResponsive} style={{marginTop:'0px'}}>
    	<Table className={classes.table} style={{borderTop:'2px solid #00b1b7', borderBottom:'2px solid #00b1b7'}}>
    	{tableHead !== undefined ? (
    	          <TableHead className={classes[tableHeaderColor + "TableHeader"]} style={{padding:'5px'}} id="scroll_top">
    	            <TableRow className={classes.tableHeadRow}>
    	              {tableHead.map((prop, key) => {
    	                return (
    	                  <TableCell
    	                    className={classes.tableHeaderCellStyle}
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
                //   return (
                //     <TableRows key={key} index={key + 1} data={prop} color={tableHeaderColor} />
				//   );
                return (
					<TableRow key={key} style={{borderBottom:'1px solid',borderColor:'#dddddd'}}>
					  {prop.map((prop, key) => {
						return (
						  <TableCell className={classes.trackingtableCell} key={key} style={{textAlignLast:'center'}}>
							{prop}
						  </TableCell>
						);
					  })}
					</TableRow>
				  );
                })}
           
        </TableBody>
        {(tableData.length >= 10 ?
        <TableFooter >
        	<TableRow  >
        	<TableCell style={{textAlignLast:'center',paddingTop:'0',paddingBottom:'0'}} colSpan={15}>
        		<Button
				    color="info"
					onClick={handleAddFunction}
        		    style={{paddingLeft:'60px',paddingRight:'60px'}}
				>MORE&nbsp;(&nbsp;{tableRownum}&nbsp;/&nbsp;{tableTotalPage}&nbsp;)</Button>
		    </TableCell>
        	</TableRow>
        </TableFooter>: null )}
      </Table>
    </div>
  );
}

const ScrapResultList = inject('userStore', 'trackStore')(observer(({ userStore, trackStore, ...props }) => { 	

	const {store} =props;

	const [scrapLineCodeList,setScrapLineCodeList] = useState([]);
	const [scrapLineCode,setScrapLineCode] = useState([]);
	const [scrapDate,setScrapDate] = useState(new Date());
	const [scrapingLineResultData,setScrapingLineResultData] = useState([]);
	const [lineTableHeader, setLineTableHeader] = useState([]);
	const [lineTableHeaderKeys, setLineTableHeaderKeys] = useState([]);
	const [totPage, setTotPage] = useState("");

	const onScrapLineCode = (e) => {
		// const values = e.target.value;
		if(store.token) {
			axios.post("/loc/getScrapLineCodeList",{ },{headers:{'Authorization':'Bearer '+store.token}})
			.then(setScrapLineCodeList([]))
			.then(res => setScrapLineCodeList(res.data))
			.catch(err => {
				// if(err.response.status === 403||err.response.status === 401) {
				// 	props.openLogin();
				// }
			});
		} else {
			props.openLogin();
		}
	}

	useEffect(() => {
		onScrapLineCode();
		return () => {
		};
	  },[]);

  const onSubmit = () => {
	  console.log( lineTableHeader );
	if ( lineTableHeader.length < 1 ) {
		alert(" 조회 가능한 선사를 선택하세요. ");
		return false;
	}
	numCnt=1;
	axios.post("/loc/getLineScrapingResultData",
			{
				num:numCnt
				,table_name:scrapLineCode.table_name
				,scrapDate:Moment(scrapDate).format('YYYYMMDD')
				,column_list:lineTableHeader
			},
			{headers:{'Authorization':'Bearer '+userStore.token}})
				.then(setScrapingLineResultData([]))
				// .then(res => setScrapingLineResultData(res.data))
				.then(res => {
					// console.log(res.data);
					const rowList = [];
					// console.log( row );
					res.data.map( dataRow => {
						const columnList = [];
						// console.log( "dataRow",dataRow )
						setTotPage(dataRow.tot_page)
						Object.keys(dataRow).map( key => {
							// console.log( "dataRow",key )
								lineTableHeaderKeys.map( headerRow => {
									// console.log( ">>dataRow",key, headerRow.column_name )
								if ( key == headerRow.column_name ){
									// console.log("MMMMMMM", dataRow[key]);
									columnList.push(dataRow[key]);
								}
							})
							// console.log("clolumnList", columnList);
						})
						rowList.push(columnList);
						// columnList.push( row.column_name );
					});
					setScrapingLineResultData(rowList);
					// res.data.map( row => {
					// 	// columnList.push(row);
					// 	columnList.push( row.column_name );
					// });
					// console.log( rowList );
					// setLineTableHeader(columnList);
				})
			    .catch(err => {
			    	// alert(err);
			    });
  }
  
  const handleAddRow = () => {
	if ( lineTableHeader == [] ) {
		alert(" 조회 가능한 선사를 선택하세요. ");
		return false;
	}
//     //page ++
	    numCnt=numCnt+1;
	    
		axios.post("/loc/getLineScrapingResultData"
			,{
				num:numCnt
				,table_name:scrapLineCode.table_name
				,scrapDate:Moment(scrapDate).format('YYYYMMDD')
				,column_list:lineTableHeader
			},
	    		{headers:{'Authorization':'Bearer '+userStore.token}})
			//   .then(res => setScrapingLineResultData([...scrapingLineResultData,...res.data]))
			  .then(res => {
				// console.log(res.data);
				const rowList = [];
				// console.log( row );
				res.data.map( dataRow => {
					const columnList = [];
					// console.log( "dataRow",dataRow )
					Object.keys(dataRow).map( key => {
						// console.log( "dataRow",key )
							lineTableHeaderKeys.map( headerRow => {
								// console.log( ">>dataRow",key, headerRow.column_name )
							if ( key == headerRow.column_name ){
								// console.log("MMMMMMM", dataRow[key]);
								columnList.push(dataRow[key]);
							}
							
						})
						// console.log("clolumnList", columnList);
					})
					rowList.push(columnList);
					// columnList.push( row.column_name );
				});
				setScrapingLineResultData([...scrapingLineResultData,...rowList])
			})
	   	      .catch(err => {
	            if(err.response.status === 403 || err.response.status === 401) {
		        	//setOpenJoin(true);
		        	//props.openLogin();
		        }
	            });
   
  };

  	const onBlurLineCode=(e,data)=>{
		setScrapingLineResultData([]);
		// const values = e.target.value;
		if ( null != data ) {
			setScrapLineCode(data);
			// console.log( data.scrap_yn );
			if ( data == {} ) {
				alert("선택을 하시기 바랍니다.");
				setLineTableHeader([]);
				return false;
			}
			if( "N" == data.web_scrap_yn ) {
				alert("웹스크래핑 중지된 선사 입니다. 조회 불가합니다.");
				setLineTableHeader([]);
				return false;
			}
			if( "D" == data.web_scrap_yn ) {
				alert("웹스크래핑 중지되어 DEM DET 적용 선사 입니다. 조회 불가합니다.");
				setLineTableHeader([]);
				return false;
			}
			
			if(store.token) {
				axios.post("/loc/getHeaderForLine",{ 
					table_name:data.table_name}
					,{headers:{'Authorization':'Bearer '+store.token}})
				.then(setLineTableHeader([]))
				.then(res => {
					// console.log(res.data);

					setLineTableHeaderKeys(res.data);
					const columnList = [];
					res.data.map( row => {
						// columnList.push(row);
						columnList.push( row.column_name );
					});
					console.log( columnList );
					setLineTableHeader(columnList);
				})
				.catch(err => {
					// if(err.response.status === 403||err.response.status === 401) {
					// 	props.openLogin();
					// }
				});
			} else {
				props.openLogin();
			}
		}


	}


  
  const classes = useStyles();
  
  return (
	<GridContainer>
		<GridItem xs={12} sm={12} md={12}>
			<Card style={{marginBottom:'0px'}}>
				<CardHeader color="info" stats icon style={{paddingBottom:'2px'}}>
					<CardIcon color="info" style={{height:'26px'}}>
						<Icon style={{width:'26px',fontSize:'20px',lineHeight:'26px'}}>content_copy</Icon>
					</CardIcon>
					<h4 className={classes.cardTitleBlack}>Search To Tacking Info </h4>
				</CardHeader>
			<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
				<Grid item xs={12} sm={3} md={12}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={4}>
							<Autocomplete
								options = {scrapLineCodeList}
								// getOptionDisabled={options => options.web_scrap_yn=='N' || options.web_scrap_yn=='D'}
								getOptionLabel = { options => "["+options.customs_line_code+"] "+options.line_code}
								id="scrap_line_code"
								// onChange={(e,data)=>setScrapLineCode(data)}
								onChange={onBlurLineCode}
								noOptionsText="Please Check Line ..."
								// onInputChange={onScrapLineCode}
								// onBlur={onBlurLineCode}
								// getOptionSelected={onBlurLineCode}
								renderInput={params => (
								<TextField {...params} id="text_line" label="LINE"  //variant="outlined" size="small" 
								fullWidth />
								)}
							/>
						</Grid>
						<Grid item xs={12} md={4}>
							<CalendarBox
								labelText ="SCRAPING DATE"
								id="scrapDate"
								format="yyyy-MM-dd"
								setValue={scrapDate}
								onChangeValue={date => setScrapDate(date)}
								formControlProps={{fullWidth: true}}/>
						</Grid>
						<Grid item xs={12} md={4}>
							<Button color="info" onClick = {onSubmit} fullWidth>Search</Button>							
						</Grid>
					</Grid>
				</Grid>
			</CardBody>
		</Card>
		</GridItem>
		<GridItem xs={12}>
		<Card style={{marginBottom:'0px'}}>
		<CardBody style={{paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
		<ScrapResultTable 
			tableHeaderColor="info"
			tableHead={lineTableHeader}
			tableData={scrapingLineResultData}
			tableRownum={numCnt}
			tableTotalPage={totPage}
			onClickHandle ={handleAddRow}
		/>
		</CardBody>
		</Card>
		</GridItem>
	</GridContainer>
  );
}
))
export default ScrapResultList;



class TableRows extends React.Component {
	render() {
		const { data } = this.props;
		return [
			<TableRow  key={this.props.index} className={this.staterowStyle} style={{borderCollapse:'separate',borderSpacing:'2px 2px',paddingTop:'5px'}} >
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.web_seq}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.line_code}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.bl_no}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_date}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_code}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.start_route_name}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_date}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_code}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.end_route_name}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.eta}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.eta_time}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.etd}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.etd_time}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.ts_yn}</TableCell>
				<TableCell style={{padding:'8px ',textAlignLast:'left',borderBottomWidth:'3px',width:'20%'}}>{data.insert_date}</TableCell>
			</TableRow>
		];
	}
}
