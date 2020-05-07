import React, {Fragment} from 'react';
import {Typography, Divider, IconButton, Box} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import ParticipantList from './ParticipantList';

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

function ParticipantFormController() {
  return (
    <Fragment>
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
      <ParticipantList/>
    </Fragment>
  )
}

export default ParticipantFormController;