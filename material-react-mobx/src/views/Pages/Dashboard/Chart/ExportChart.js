import React from 'react';
import Chart, {
	CommonSeriesSettings,
	Series,
	ValueAxis,
	Export,
	Legend,
	Tooltip,
	Grid,Point,Margin} from 'devextreme-react/chart';
import axios from 'axios';
	
export default function ExportChart(props) {

	const [stats,setStats] = React.useState([]);
	var datapoint = [];
	  React.useEffect(() => {
		  axios.post("/com/getExportStatInfo",{},{headers:{'Authorization':'Bearer '+props.token}})
	  	  .then(setStats([]))
		    .then(res => {console.log("ex data:",res.data);
		    res.data.map((data) =>
		    datapoint.push({month:data.month,load:parseInt(data.load),dem:parseInt(data.dem),det:parseInt(data.det),osc:parseInt(data.osc),total:parseInt(data.total)}));
		    setStats(datapoint);
		    });
		    return () => {
		      console.log('cleanup');
		     // window.removeEventListener("touchmove",handleTouchMove);
		    };
		    
		    
	}, []);
 
/*  const popilationData = [{month:'JAN',load:200,dem:50,det:5,osc:9,total:67},
                          {month:'FEB',load:150,dem:10,det:22,osc:5,total:98},
                          {month:'MAR',load:200,dem:41,det:23,osc:8,total:81},
                          {month:'APR',load:250,dem:30,det:28,osc:5,total:94},
                          {month:'MAY',load:250,dem:12,det:9,osc:5,total:49},
                          {month:'JUN',load:140,dem:10,det:8,osc:3,total:43},
                          {month:'JUL',load:0,dem:0,det:0,osc:0,total:0},
                          {month:'AUG',load:0,dem:0,det:0,osc:0,total:0},
                          {month:'SEP',load:0,dem:0,det:0,osc:0,total:0},
                          {month:'OCT',load:0,dem:0,det:0,osc:0,total:0},
                          {month:'NOV',load:0,dem:0,det:0,osc:0,total:0},
                          {month:'DEC',load:0,dem:0,det:0,osc:0,total:0},
                          ];*/
  
  const cntrStat = [{value:'load',name:'LOAD'},{value:'dem',name:'DEMURRAGE'},{value:'det',name:'DETENTION'},{value:'osc',name:'OSC'}];

  return (
    <Chart
    	id="chart"
    	dataSource={stats}
    >
    <CommonSeriesSettings
    	argumentField="month"
    	type="bar"
    >
    <Point size="0" />
    </CommonSeriesSettings>	
    <Margin top={20} bottom={20} />
    {cntrStat.map(function(item){
		return <Series key={item.value} valueField={item.value} name={item.name} />
		})
	}

      <Series
    	type="line"
    	valueField="total"
    	name="total"
    	/>
    	   	
    	<ValueAxis position="left">
    		<Grid visible={true} />
    	</ValueAxis>
    
        <Legend
    		verticalAlignment="bottom"
    		horizontalAlignment="center"
    	/>
    	
    	<Export enabled={false} />
    	<Tooltip
    		enabled={true}
    	/>	
    
    </Chart>
    
    );
}