import React,{ useState, useEffect } from "react";

// @material-ui/core components
import { makeStyles, useTheme } from "@material-ui/core/styles";
import PropTypes from 'prop-types';
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Pagination from '@material-ui/lab/Pagination';
import { Button, IconButton,ButtonGroup, Grid, Paper, TextField, Select, MenuItem, FormControl, InputLabel } from "@material-ui/core";
import CustomButton from "components/CustomButtons/Button.js";
import axios from 'axios';
const styles = {
    main:{
        width:'520px'
    },
    cardTitleBlack: {
        textAlign: "left",
        color: "#000000",
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
export default function SelectPort(props) {
    const classes = useStyles();
    const [port,setPort] = useState([]);
    const [newPort,setNewPort] = useState([]);
    const [count, setCount] = useState(10);
    const [arrayIndex, setArrayIndex] = useState(1);
    const [sPort, setSPort] = useState("");
    const [ePort, setEPort] = useState("");
    const [sPortFlag, setSPortFlag] = useState(false);
    const [ePortFlag, setEPortFlag] = useState(false);
    const [nationCode, setNationCode] = useState("ALL");
    const [nation, setNation] = useState([]);
    useEffect(() => {
        axios.post("/sch/getPortCodeInfo",{ portCode:"", check:"1"},{headers:{'Authorization':'Bearer '+props.token}}).then(res => {
            setPort(res.data);
            setNewPort(res.data);
            setCount(Math.ceil(res.data.length / 21))
        })
        axios.post("/com/getNationName",{nationCode:""},{headers:{'Authorization':'Bearer '+props.token}}).then(
            res=> {
                setNation(res.data)
            }
          )
        
	    return () => {
	    };
    }, []);

    const handleNationChange = (e) => {
        if(e.target.value !=="ALL"){
            let newPort = port.filter(it => new RegExp('\^'+e.target.value).test(it.nation_code));
            setNewPort(newPort);
            setCount(Math.ceil(newPort.length / 21));
        }else {
            setNewPort(port);
            setCount(Math.ceil(port.length / 21));
        }
        
        setArrayIndex(1)
        setNationCode(e.target.value)
    }
    const searchPort = (char) => {
        
        let newPort = port.filter(it => new RegExp('\^'+char).test(it.port_name));
        setNewPort(newPort);
        setCount(Math.ceil(newPort.length / 21));
        setArrayIndex(1);
        setNationCode('ALL');

    }
    
    
    const handleChange = (e,v) => {
        setArrayIndex(v);
        
    }

    const portSetting = (port) => {
        if(port !== "") {
            if(sPortFlag === false && ePortFlag === false) {
                setSPort(port);
                setSPortFlag(true);
            }else if(sPortFlag === true && ePortFlag === false) {
                if(port === sPort) {
                    setSPort("");
                    setSPortFlag(false);    
                }else {
                    setEPortFlag(true);
                    setEPort(port);
                    // props.onClose(sPort,port);
                }
                
            }else if(sPortFlag ===true && ePortFlag ===true) {
                if(port ===ePort) {
                    setEPortFlag(false);
                    setEPort("");
                }
            }
        }
        
    }
    return (
        <div>
            <Card style={{marginTop:'10px',paddingBottom: '0px',paddingTop: '10px',paddingLeft: '15px',paddingRight: '15px'}}>
                <CardBody>
                    <GridItem xs={12}>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <GridContainer spacing={1}>
                                    <GridItem xs={4} sm={4} md ={4}>
                                        <TextField disabled label="Origin"  value={sPort}></TextField>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md ={4}>
                                        <TextField disabled label="Destination" value={ePort}></TextField>
                                    </GridItem>
                                    <GridItem xs={4} sm={4} md ={4}>
                                        <FormControl>
                                            <InputLabel>Nation</InputLabel>
                                            <Select
                                                value={nationCode}
                                                onChange={handleNationChange}>
                                            <MenuItem style={{maxWidth:'200px'}} value="ALL">전체</MenuItem>        
                                            {nation.map((element,index) => {
                                                return(
                                                <MenuItem style={{maxWidth:'200px'}} key={index} value={element.nation_code}>[{element.nation_kname}] {element.nation_ename}</MenuItem>
                                                )
                                            })}
                                            </Select>
                                        </FormControl>
                                    </GridItem>
                                </GridContainer>
                            </GridItem>
                        </GridContainer>
                    </GridItem>    

                               
                    <GridItem xs={12}>
			      	    <GridContainer>
                            {(sPortFlag ===true && ePortFlag === true)?(
                                    <GridContainer spacing={1}>
                                        <GridItem xs={6} sm={6} md ={6}>
                                            <CustomButton color="info" onClick = {() => props.onClose(sPort,ePort)} fullWidth>Apply</CustomButton>
                                        </GridItem>
                                        <GridItem xs={6} sm={6} md ={6}>
                                            <CustomButton color="info" fullWidth onClick ={() => {
                                                setSPort("")
                                                setEPort("")
                                                setSPortFlag(false)
                                                setEPortFlag(false)
                                            }}>Reset</CustomButton>
                                        </GridItem>
                                    </GridContainer>
                                    ):(
                                <div>
                                <ButtonGroup style={{width:'520px'}} size="small" variant="text" color="primary">
                                    <Button size="small" onClick={() => searchPort('A')}>A</Button>
                                    <Button size="small" onClick={() => searchPort('B')}>B</Button>
                                    <Button size="small" onClick={() => searchPort('C')}>C</Button>
                                    <Button size="small" onClick={() => searchPort('D')}>D</Button>
                                    <Button size="small" onClick={() => searchPort('E')}>E</Button>
                                    <Button size="small" onClick={() => searchPort('F')}>F</Button>
                                    <Button size="small" onClick={() => searchPort('G')}>G</Button>
                                    <Button size="small" onClick={() => searchPort('H')}>H</Button>
                                    <Button size="small" onClick={() => searchPort('I')}>I</Button>
                                    <Button size="small" onClick={() => searchPort('J')}>J</Button>
                                    <Button size="small" onClick={() => searchPort('K')}>K</Button>
                                    <Button size="small" onClick={() => searchPort('L')}>L</Button>
                                    <Button size="small" onClick={() => searchPort('M')}>M</Button>
                                </ButtonGroup>
                                <ButtonGroup style={{width:'520px'}}  size="small" variant="text" color="primary">    
                                    <Button size="small" onClick={() => searchPort('N')}>N</Button>
                                    <Button size="small" onClick={() => searchPort('O')}>O</Button>
                                    <Button size="small" onClick={() => searchPort('P')}>P</Button>
                                    <Button size="small" onClick={() => searchPort('Q')}>Q</Button>
                                    <Button size="small" onClick={() => searchPort('R')}>R</Button>
                                    <Button size="small" onClick={() => searchPort('S')}>S</Button>
                                    <Button size="small" onClick={() => searchPort('T')}>T</Button>
                                    <Button size="small" onClick={() => searchPort('U')}>U</Button>
                                    <Button size="small" onClick={() => searchPort('V')}>V</Button>
                                    <Button size="small" onClick={() => searchPort('W')}>W</Button>
                                    <Button size="small" onClick={() => searchPort('X')}>X</Button>
                                    <Button size="small" onClick={() => searchPort('Y')}>Y</Button>
                                    <Button size="small" onClick={() => searchPort('Z')}>Z</Button>
                                </ButtonGroup>
                                </div>
                            )}
			      	    </GridContainer>
                    </GridItem>
                  
            </CardBody>
            
               
            </Card>
            <Paper style={{marginLeft:'30px',marginRight:'30px'}}>
                {newPort.length !==0?(
                    <Grid>
                        <ButtonGroup>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 0]!==undefined?newPort[((arrayIndex-1) * 21) + 0].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 0]!==undefined?newPort[((arrayIndex-1) * 21) + 0].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 0]===undefined?"":newPort[((arrayIndex-1) * 21) + 0].port_code)}>
                                <span>{newPort[((arrayIndex-1) * 21) + 0]!==undefined?newPort[((arrayIndex-1) * 21) + 0].port_name:""}</span>
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 1]!==undefined?newPort[((arrayIndex-1) * 21) + 1].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 1]!==undefined?newPort[((arrayIndex-1) * 21) + 1].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 1]===undefined?"":newPort[((arrayIndex-1) * 21) + 1].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 1]!==undefined?newPort[((arrayIndex-1) * 21) + 1].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 2]!==undefined?newPort[((arrayIndex-1) * 21) + 2].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 2]!==undefined?newPort[((arrayIndex-1) * 21) + 2].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 2]===undefined?"":newPort[((arrayIndex-1) * 21) + 2].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 2]!==undefined?newPort[[((arrayIndex-1) * 21) + 2]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 3]!==undefined?newPort[((arrayIndex-1) * 21) + 3].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 3]!==undefined?newPort[((arrayIndex-1) * 21) + 3].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 3]===undefined?"":newPort[((arrayIndex-1) * 21) + 3].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 3]!==undefined?newPort[[((arrayIndex-1) * 21) + 3]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 4]!==undefined?newPort[((arrayIndex-1) * 21) + 4].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 4]!==undefined?newPort[((arrayIndex-1) * 21) + 4].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 4]===undefined?"":newPort[((arrayIndex-1) * 21) + 4].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 4]!==undefined?newPort[[((arrayIndex-1) * 21) + 4]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 5]!==undefined?newPort[((arrayIndex-1) * 21) + 5].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 5]!==undefined?newPort[((arrayIndex-1) * 21) + 5].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 5]===undefined?"":newPort[((arrayIndex-1) * 21) + 5].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 5]!==undefined?newPort[[((arrayIndex-1) * 21) + 5]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 6]!==undefined?newPort[((arrayIndex-1) * 21) + 6].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 6]!==undefined?newPort[((arrayIndex-1) * 21) + 6].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 6]===undefined?"":newPort[((arrayIndex-1) * 21) + 6].port_code)}>
                                <span>{newPort[((arrayIndex-1) * 21) + 6]!==undefined?newPort[[((arrayIndex-1) * 21) + 6]].port_name:""}</span>
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 7]!==undefined?newPort[((arrayIndex-1) * 21) + 7].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 7]!==undefined?newPort[((arrayIndex-1) * 21) + 7].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 7]===undefined?"":newPort[((arrayIndex-1) * 21) + 7].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 7]!==undefined?newPort[[((arrayIndex-1) * 21) + 7]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 8]!==undefined?newPort[((arrayIndex-1) * 21) + 8].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 8]!==undefined?newPort[((arrayIndex-1) * 21) + 8].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 8]===undefined?"":newPort[((arrayIndex-1) * 21) + 8].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 8]!==undefined?newPort[[((arrayIndex-1) * 21) + 8]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 9]!==undefined?newPort[((arrayIndex-1) * 21) + 9].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 9]!==undefined?newPort[((arrayIndex-1) * 21) + 9].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 9]===undefined?"":newPort[((arrayIndex-1) * 21) + 9].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 9]!==undefined?newPort[[((arrayIndex-1) * 21) + 9]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 10]!==undefined?newPort[((arrayIndex-1) * 21) + 10].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 10]!==undefined?newPort[((arrayIndex-1) * 21) + 10].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 10]===undefined?"":newPort[((arrayIndex-1) * 21) + 10].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 10]!==undefined?newPort[[((arrayIndex-1) * 21) + 10]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 11]!==undefined?newPort[((arrayIndex-1) * 21) + 11].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 11]!==undefined?newPort[((arrayIndex-1) * 21) + 11].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 11]===undefined?"":newPort[((arrayIndex-1) * 21) + 11].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 11]!==undefined?newPort[[((arrayIndex-1) * 21) + 11]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 12]!==undefined?newPort[((arrayIndex-1) * 21) + 12].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 12]!==undefined?newPort[((arrayIndex-1) * 21) + 12].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 12]===undefined?"":newPort[((arrayIndex-1) * 21) + 12].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 12]!==undefined?newPort[[((arrayIndex-1) * 21) + 12]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 13]!==undefined?newPort[((arrayIndex-1) * 21) + 13].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 13]!==undefined?newPort[((arrayIndex-1) * 21) + 13].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 13]===undefined?"":newPort[((arrayIndex-1) * 21) + 13].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 13]!==undefined?newPort[[((arrayIndex-1) * 21) + 13]].port_name:""}
                            </Button>
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 14]!==undefined?newPort[((arrayIndex-1) * 21) + 14].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 14]!==undefined?newPort[((arrayIndex-1) * 21) + 14].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 14]===undefined?"":newPort[((arrayIndex-1) * 21) + 14].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 14]!==undefined?newPort[[((arrayIndex-1) * 21) + 14]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 15]!==undefined?newPort[((arrayIndex-1) * 21) + 15].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 15]!==undefined?newPort[((arrayIndex-1) * 21) + 15].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 15]===undefined?"":newPort[((arrayIndex-1) * 21) + 15].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 15]!==undefined?newPort[[((arrayIndex-1) * 21) + 15]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 16]!==undefined?newPort[((arrayIndex-1) * 21) + 16].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 16]!==undefined?newPort[((arrayIndex-1) * 21) + 16].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 16]===undefined?"":newPort[((arrayIndex-1) * 21) + 16].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 16]!==undefined?newPort[[((arrayIndex-1) * 21) + 16]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 17]!==undefined?newPort[((arrayIndex-1) * 21) + 17].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 17]!==undefined?newPort[((arrayIndex-1) * 21) + 17].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 17]===undefined?"":newPort[((arrayIndex-1) * 21) + 17].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 17]!==undefined?newPort[[((arrayIndex-1) * 21) + 17]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 18]!==undefined?newPort[((arrayIndex-1) * 21) + 18].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 18]!==undefined?newPort[((arrayIndex-1) * 21) + 18].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 18]===undefined?"":newPort[((arrayIndex-1) * 21) + 18].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 18]!==undefined?newPort[[((arrayIndex-1) * 21) + 18]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 19]!==undefined?newPort[((arrayIndex-1) * 21) + 19].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 19]!==undefined?newPort[((arrayIndex-1) * 21) + 19].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 19]===undefined?"":newPort[((arrayIndex-1) * 21) + 19].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 19]!==undefined?newPort[[((arrayIndex-1) * 21) + 19]].port_name:""}
                            </Button>
                            <Button style={{width:'75px', height:'80px', backgroundColor: sPort===(newPort[((arrayIndex-1) * 21) + 20]!==undefined?newPort[((arrayIndex-1) * 21) + 20].port_code:"1")?'#018acf':ePort===(newPort[((arrayIndex-1) * 21) + 20]!==undefined?newPort[((arrayIndex-1) * 21) + 20].port_code:"1")?'#ff0011':''}} 
                                onClick={()=> portSetting(newPort[((arrayIndex-1) * 21) + 20]===undefined?"":newPort[((arrayIndex-1) * 21) + 20].port_code)}>
                                {newPort[((arrayIndex-1) * 21) + 20]!==undefined?newPort[[((arrayIndex-1) * 21) + 20]].port_name:""}
                            </Button>
                        </ButtonGroup>
                    </Grid>
                ):(
                    <h4>No Result</h4>
                )}
                <Grid>
                    <Pagination count={count} page={arrayIndex} onChange={handleChange} siblingCount={3}></Pagination>
                </Grid>
            </Paper>
        </div>
	);
}