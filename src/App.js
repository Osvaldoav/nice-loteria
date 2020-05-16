import React, {useState} from 'react';
import './App.css';
import Admin from './containers/Admin';
import CreateTableForm from './components/CreateTableForm';
import backImg from './images/back3.jpg';
import Routes from './Routes';

const style = {
  container: {
    backgroundImage: `url(${backImg})`, 
    backgroundAttachment: 'fixed', 
    minHeight: '100vh', 
    paddingBottom: '50px'
  }
}

function App() {

  return (
    <div className="App" style={style.container}>
      {/* <CreateTableForm/> */}
      <Routes/>
    </div>
  );
}

export default App;
