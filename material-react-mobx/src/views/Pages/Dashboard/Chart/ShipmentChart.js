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
	

const popilationData = [{year:'JAN',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'FEB',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'MAR',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'APR',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'MAY',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'JUN',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'JUL',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'AUG',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'SEP',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'OCT',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'NOV',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    {year:'DEC',carrier1:0,carrier2:0,carrier3:0,carrier4:0,carrier5:0,carrier6:0},
    ];

const carrier = [{value:'carrier1',name:'선사1'},{value:'carrier2',name:'선사2'},{value:'carrier3',name:'선사3'},{value:'carrier4',name:'선사4'},
	  {value:'carrier5',name:'선사5'},{value:'carrier6',name:'기타'}
    ];

export default function ShipmentChart(props) {

	
	 const [stats,setStats] = React.useState(popilationData);
	 const [carrierList,setCarrierList] = React.useState(carrier);
	 var datapoint = [];
	 
	  React.useEffect(() => {
		  axios.post("/com/getCarrierStatList",{},{headers:{'Authorization':'Bearer '+props.token}})
	  	    // .then(setCarrierList([]))
			.then(res => {
				console.log("data:",res.data);
				if ( typeof res.data.error === 'undefined' ) {
					setCarrierList(res.data);
				} else {
					setCarrierList([]);	
				}
			})
			.catch(err => {
				setCarrierList([]);
			});
		  
		  axios.post("/com/getCarrierStatInfo",{},{headers:{'Authorization':'Bearer '+props.token}})
	  	    // .then(setStats([]))
		    .then(res => {console.log("data carrier:",res.data);
		    //setStats(res.data);
			
				if ( typeof res.data.error === 'undefined' ) {
					res.data.map((data) => 
					datapoint.push({month:data.stat_month,carrier1:parseInt(data.carrier1),carrier2:parseInt(data.carrier2),carrier3:parseInt(data.carrier3),
						carrier4:parseInt(data.carrier4),carrier5:parseInt(data.carrier5),carrier6:parseInt(data.carrier6)}));
					setStats(datapoint);
				} else {
					setStats([]);	
				}
			})
			.catch(err => {
				setStats([]);
			});
		  
		    return () => {
		      console.log('cleanup');
		     // window.removeEventListener("touchmove",handleTouchMove);
		    };
	}, []);
	  
/*	function customizeTooltip(pointInfo) {
		const items=pointInfo.valueText.split('/n');
		const color = pointInfo.point.getColor();
		
		items.forEach((item,index) => {
			if(item.indexOf(pointInfo.seriesName) === 0) {
				const element = document.createElement('span');
				
				element.textContent = item;
				element.style.color = color;
				element.className = 'active';
				
				items[index] = element.outerHtml;
			}
			});
		
		return { text:items.join('\n') };
	}*/
 
  
  


  return (
    <Chart
    	id="chart"
    	dataSource={stats}
    >
    <CommonSeriesSettings
    	argumentField="month"
        hoverMode="allArgumentPoints"
        selectionMode="allArgumentPoints"	
    	type="line">
    <Point size="0" /> 
    </CommonSeriesSettings>
    		{carrierList.map(function(item,index){
    			return <Series type="line" key={"carrier_"+index} valueField={"carrier"+item.car_rank} name={item.k_name} />
    			})
    		}
    	<Margin top={20} bottom={20}/> 
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