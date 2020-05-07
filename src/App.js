import React, {useEffect, useState} from 'react';
import * as FirestoreService from './services/firestore';
import './App.css';
import Table from './components/Table';
import CreateTableForm from './components/CreateTableForm';
import Admin from './containers/Admin';
import backImg from './images/back3.jpg';

function App() {

  const [tables, setTables] = useState([]);
  // useEffect(() => {
  //   console.log('effect hook tables');
  //   FirestoreService.getTables()
  //   .then((snapshot) => {
  //     let data = [];
  //     snapshot.forEach(doc => {
  //       data.push({...doc.data(), id: doc.id});
  //     });
  //     setTables(data);
  //   })
  //   .catch(err => {
  //     console.log('Error getting table documents', err);
  //   })
  // },[]);

  return (
    <div className="App" style={{backgroundImage: `url(${backImg})`, height: '100vh'}}>
       {/* <div className="App" style={{backgroundColor: '#15243D', height: '100vh'}}>  */}
      {/* {tables.map(table => {
        return <Table key={table.id} table={table}/>
      })} */}
      {/* <CreateTableForm/> */}
      <Admin/>
    </div>
  );
}

export default App;
