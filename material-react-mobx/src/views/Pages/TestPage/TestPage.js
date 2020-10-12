import React from 'react';
import MaterialTable from 'material-table';
/*
interface Row {
  name: string;
  surname: string;
  birthYear: number;
  birthCity: number;
}

interface TableState {
  columns: Array<Column<Row>>;
  data: Row[];
}*/

export default function MaterialTableDemo() {
	//const [state, setState] = React.useState([{columns: [],data: []}]);
  const [columns, setColumns] = React.useState([
      { title: 'Name', field: 'name' },
      { title: 'Surname', field: 'surname' },
      { title: 'Birth Year', field: 'birthYear', type: 'numeric' },
      { title: 'Birth Place',field: 'birthCity',
        lookup: { 34: 'İstanbul', 63: 'Şanlıurfa' },
      },
    ]);
  
  const [data,setData] = React.useState([
      { name: 'Mehmet', surname: 'Baran', birthYear: 1987, birthCity: 63 },
      { name: 'Zerya Betül',surname: 'Baran',birthYear: 2017,birthCity: 34},
    ]);

  return (
    <MaterialTable
      title="Editable Example"
      columns={columns}
      data={data}
	  options={{
	   	search:false,
	   	sorting:false,
	   	showTitle:false,
	   	paging:false,
	   	isLoading:true,
	   	paginationType:"stepped"
	  }}
       
       
       
      cellEditable={{ 
    	  cellStyle:{},
    	  onCellEditApproved:(newValue,oldValue,rowData,columnDef) => {
    		  return new Promise((resolve,reject) => {
    			  console.log("newVAlue:"+newValue);
    			  setTimeout(resolve,1000);
    		  });
    	  }
      }}
      /*editable={{
        onRowAdd: (newData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.push(newData);
                return { ...prevState, data };
              });
            }, 600);
          }),
        onRowUpdate: (newData, oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              if (oldData) {
                setState((prevState) => {
                  const data = [...prevState.data];
                  data[data.indexOf(oldData)] = newData;
                  return { ...prevState, data };
                });
              }
            }, 600);
          }),
        onRowDelete: (oldData) =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve();
              setState((prevState) => {
                const data = [...prevState.data];
                data.splice(data.indexOf(oldData), 1);
                return { ...prevState, data };
              });
            }, 600);
          }),
      }}*/
    />
  );
}
