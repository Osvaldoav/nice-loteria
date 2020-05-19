import React from 'react';
import './App.css';
import TittleHeader from './components/TitleHeader';
import backImg from './images/back3.jpg';
import Routes from './Routes';
import { Container } from '@material-ui/core';

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
      <Container maxWidth="md">
        <TittleHeader/>
        <Routes/>
      </Container>
    </div>
  );
}

export default App;
