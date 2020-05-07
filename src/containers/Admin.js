import React, {Fragment} from 'react';
import {CssBaseline, Container, Card} from '@material-ui/core';
import TitleHeader from '../components/TitleHeader';
import ParticipantFormController from '../components/ParticipantFormController';
import Table from '../components/Table';

const table = {
  cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
  id: "00"
};

const style = {
  cardContainer: {
    marginTop: '20px', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '10px'
  }
};

function Admin() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <TitleHeader/>
        <Card style={style.cardContainer}>
          <ParticipantFormController/>
        </Card>
        <Card style={style.cardContainer}>
          <Table table={table}/>
        </Card>
      </Container>
    </Fragment>
  )
}

export default Admin;