import React, {useState} from 'react';
import * as firestore from '../services/firestore';
import {
  Button, 
  TextField, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle
} from '@material-ui/core';

export default function AddUserDialog({open, handleClose}) {

  const [userName, setUserName] = useState('');

  const handleClick = () => {
    firestore.createUser({name: userName, table_ids: []})
    .then( () => console.log('user added successfully'))
    .catch(err => console.log('error adding a new user', err));
    setUserName('');
    handleClose();
  };

  const handleOnClose = () => {
    handleClose();
    setUserName('');
  }

  return (
    <Dialog open={open} onClose={handleOnClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title" style={{paddingBottom: 0}}>Agregar Participante</DialogTitle>
      <DialogContent>
        <div style={{width: '500px', height: 0}}/>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre"
          type="email"
          value={userName}
          onChange={e => setUserName(e.target.value)}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          Agregar
        </Button>
      </DialogActions>
    </Dialog>
  );
}