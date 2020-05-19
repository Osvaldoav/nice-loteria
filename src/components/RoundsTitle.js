import React, {Fragment, useState} from 'react';
import {Typography, Divider, IconButton, Box} from '@material-ui/core';
import {Add, Refresh} from '@material-ui/icons';
import AddRoundDialog from './AddRoundDialog';

const style = {
  sectionTitle: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingLeft: '5px'
  }
};

function RoundsTitle() {
  const [openUserDialog, setOpenUserDialog] = useState(false);

  return (
    <Fragment>
      <Box style={style.sectionTitle}>
        <Typography variant="h6" align="left">
          Rondas
        </Typography>
        <Box>
          <IconButton onClick={() => setOpenUserDialog(true)}>
            <Add/>
          </IconButton>
          <IconButton>
            <Refresh/>
          </IconButton>
        </Box>
      </Box>
      <Divider/>
      <AddRoundDialog open={openUserDialog} handleClose={() => setOpenUserDialog(false)}/>
    </Fragment>
  )
}

export default RoundsTitle;