import React from 'react';
import Chart, {
	CommonSeriesSettings,
	Series,
	ValueAxis,
	Export,
	Legend,
	Tooltip,
	Grid,Point,Margin } from 'devextreme-react/chart';
import axios from 'axios';
	
export default function ImportChart(props) {

	
	const [stats,setStats] = React.useState([]); 
	var datapoint = [];
	  React.useEffect(() => {
		  axios.post("/com/getImportStatInfo",{},{headers:{'Authorization':'Bearer '+props.store.token}})
	  	  .then(setStats([]))
		    .then(res => {
		    res.data.map((data) => 
		    datapoint.push({month:data.month,unload:parseInt(data.unload),dem:parseInt(data.dem),det:parseInt(data.det),osc:parseInt(data.osc),total:parseInt(data.total)}));
		    setStats(datapoint);
		    });
		    return () => {
		      console.log('cleanup');
		     // window.removeEventListener("touchmove",handleTouchMove);
		    };
		    
		    
	}, []);
 
/*  const popilationData = [{month:'JAN',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'FEB',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'MAR',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'APR',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'MAY',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'JUN',unload:'8368',dem:0,det:0,osc:0,total:'8368'},
                          {month:'JUL',unload:'5',dem:0,det:0,osc:0,total:'5'},
                          {month:'AUG',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'SEP',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'OCT',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'NOV',unload:'0',dem:0,det:0,osc:0,total:0},
                          {month:'DEC',unload:'0',dem:0,det:0,osc:0,total:0},
                          ];
*/
  
  const cntrStat = [{value:'unload',name:'UNLOAD'},{value:'dem',name:'DEMURRAGE'},{value:'det',name:'DETENTION'},{value:'osc',name:'OSC'}];

  return (
    <Chart
    	id="chart"
    	dataSource={stats}
    >
    <CommonSeriesSettings
    	argumentField="month"
    	type="bar"
    	hoverMode="allArgumentPoints"
    	selectionMode="allArgumentPoints"		
    >
    <Point size="0" /> 
    </CommonSeriesSettings>
    
    {cntrStat.map(function(item){
		return <Series key={item.value} valueField={item.value} name={item.name} />
		})
	}

      <Series
    	type="line"
    	valueField="total"
    	name="total"
    	/>
    	<Margin bottom={20} top={20} />   	
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
