import React, {useEffect, useState} from 'react';
import * as FirestoreService from './services/firestore';
import './App.css';
import Table from './components/Table';

function App() {

  const [tables, setTables] = useState([]);
  useEffect(() => {
    console.log('effect hook tables');
    FirestoreService.getTables()
    .then((snapshot) => {
      let data = [];
      snapshot.forEach(doc => {
        data.push({...doc.data(), id: doc.id});
      });
      setTables(data);
    })
    .catch(err => {
      console.log('Error getting table documents', err);
    })
  },[]);

  return (
    <div className="App">
      <h2>Home</h2>
      {tables.map(table => {
        return <Table key={table.id} table={table}/>
      })}
    </div>
  );
}

export default App;
