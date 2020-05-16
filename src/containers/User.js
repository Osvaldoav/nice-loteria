import React from 'react';
import {Container, Card} from '@material-ui/core';
import TitleHeader from '../components/TitleHeader';

const style = {
  cardContainer: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '10px'
  }
};

function User(props) {
  console.log(props.match.params.userID);
  return (
    <Container maxWidth="md">
      <TitleHeader/>
      <Card style={style.cardContainer}>
      </Card>
    </Container>
  )
}

export default User;