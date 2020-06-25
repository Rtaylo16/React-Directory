import React from 'react';
import './App.css';
import Table from 'react-bootstrap/Table'

const SortEdata = (Edatas, config = null) => {
const [sortConfig, setfilterconfig] = React.useState(config);

const filtereddata = React.useMemo(() => {
let filtereddata = [...Edatas];
if(sortConfig !== null){
  filtereddata.sort((x,y) => {
    if (x[sortConfig.key] < y[sortConfig.key]){
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    if (x[sortConfig.key] > y[sortConfig.key]){
      return sortConfig.direction === 'ascending' ? -1 : 1;
    }
    return 0;

  });
   
}
return filtereddata;
}, [Edatas,sortConfig]);

const requestSort = (key) =>{
  let direction = 'ascending';
  if (
    sortConfig &&
    sortConfig.key === key &&
    sortConfig.direction === 'ascending'
  ){
    direction = 'descending';
  }
  setfilterconfig({key, direction});

};
return {Edatas: filtereddata, requestSort, sortConfig};
}


const EmployTable = (props) => {
  const {Edatas, requestSort, sortConfig} = SortEdata(props.employeedata)
  const getClassNamesfor = (Employeenum) => {
    if(!sortConfig){
      return;
    }
    return sortConfig.key === Employeenum ? sortConfig.direction : undefined;
  };
  return (
<Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>
        <button type="button"
          onClick={()=>requestSort('Employeenum')}
          className={getClassNamesfor('Employeenum')}
          >
        Employee#
        </button>
        

      </th>
      <th>
      <button type="button"
          onClick={()=>requestSort('Frstname')}
          className={getClassNamesfor('Frstname')}
          >
        First Name
        </button>
        
        </th>
      <th>
      <button type="button"
          onClick={()=>requestSort('Lstname')}
          className={getClassNamesfor('Lstname')}
          >
        Last Name
        </button>
        </th>
      <th>
      <button type="button"
          onClick={()=>requestSort('Email')}
          className={getClassNamesfor('Email')}
          >
        Email
        </button>
        </th>
    </tr>
  </thead>
  <tbody>
    {Edatas.map(Edata => (
    <tr key={Edata.id}>
    <td>{Edata.Employeenum}</td>
    <td>{Edata.Frstname}</td>
    <td>{Edata.Lstname}</td>
    <td>{Edata.Email}</td>
    </tr>
    ))}
  </tbody>
</Table>
  );
};

export default function App(){
  return(
    <div>
      <EmployTable
      employeedata={[
        { id: 1, Employeenum:1, Frstname: 'Mark', Lstname: 'Smith', Email:'msmith@aol.com'},
        { id: 2, Employeenum:2, Frstname: 'Jacob', Lstname: 'Thornton', Email:'Jakobithort@yahoo.com'},
        { id: 3, Employeenum:3, Frstname: 'Tyler', Lstname: 'Wilk', Email:'TWilkz@gmail.com'},
        { id: 4, Employeenum:4, Frstname: 'Bronnie', Lstname: 'James', Email:'Bronzjae@gmail.com'},
        { id: 5, Employeenum:5, Frstname: 'Viry', Lstname: 'Blaque', Email:'Nojustice@gmail.com'},
        { id: 6, Employeenum: 6, Frstname: 'Moe', Lstname: 'Brown', Email:'June19th@gmail.com'},
        { id: 7, Employeenum: 7, Frstname: 'Santino', Lstname: 'Cruel', Email:'MandysJungle@aol.com'},
      ]}
      
      />
    </div>
  )
}

