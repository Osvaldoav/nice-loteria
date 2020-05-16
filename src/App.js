import React, {useState} from 'react';
import './App.css';
import Admin from './containers/Admin';
import backImg from './images/back3.jpg';

function App() {

  return (
    <div className="App" style={{backgroundImage: `url(${backImg})`, backgroundAttachment: 'fixed', minHeight: '100vh', paddingBottom: '50px'}}>
       {/* <div className="App" style={{backgroundColor: '#15243D', height: '100vh'}}>  */}
      {/* <CreateTableForm/> */}
      <Admin/>
    </div>
  );
}

export default App;
