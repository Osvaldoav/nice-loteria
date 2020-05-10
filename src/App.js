import React, {useState} from 'react';
import './App.css';
import Admin from './containers/Admin';
import backImg from './images/back3.jpg';

function App() {

  return (
    <div className="App" style={{backgroundImage: `url(${backImg})`, height: '100vh'}}>
       {/* <div className="App" style={{backgroundColor: '#15243D', height: '100vh'}}>  */}
      {/* <CreateTableForm/> */}
      <Admin/>
    </div>
  );
}

export default App;
