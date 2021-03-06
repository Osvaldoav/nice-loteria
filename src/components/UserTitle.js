import React, {Fragment, useState} from 'react';
import {Typography, Divider, IconButton, Box} from '@material-ui/core';
import Add from '@material-ui/icons/Add';
import AddUserDialog from './AddUserDialog';

const style = {
  sectionTitle: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingLeft: '5px'
  }
};

function UserTitle() {
  const [openUserDialog, setOpenUserDialog] = useState(false);

  return (
    <Fragment>
      <Box style={style.sectionTitle}>
        <Typography variant="h6" align="left">
          Participantes
        </Typography>
        <Box>
          <IconButton onClick={() => setOpenUserDialog(true)}>
            <Add/>
          </IconButton>
        </Box>
      </Box>
      <Divider/>
      <AddUserDialog open={openUserDialog} handleClose={() => setOpenUserDialog(false)}/>
    </Fragment>
  )
}

export default UserTitle;