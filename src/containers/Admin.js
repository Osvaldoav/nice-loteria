import React, {Fragment} from 'react';
import {CssBaseline, Container, Card, Typography, Divider, IconButton, Box} from '@material-ui/core';
import TitleHeader from '../components/TitleHeader';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';

const style = {
  cardContainer: {
    marginTop: '20px', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '10px'
  },
  sectionTitle: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center'
  }
};

function Admin() {
  return (
    <Fragment>
      <CssBaseline />
      <Container maxWidth="md">
        <TitleHeader/>
        <Card style={style.cardContainer}>
          <Box style={style.sectionTitle}>
            <Typography variant="h6" align="left">
              Participantes
            </Typography>
            <Box>
              <IconButton>
                <Add/>
              </IconButton>
              <IconButton>
                <Delete/>
              </IconButton>
            </Box>
          </Box>
          <Divider/>
        </Card>
      </Container>
    </Fragment>
  )
}

export default Admin;