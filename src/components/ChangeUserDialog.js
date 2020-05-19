import React from 'react';
import {
  Button, 
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from '@material-ui/core';

export default function ChangeUserDialog({open, handleClose, user, handleUpdateUser}) {
  const [userName, setUserName] = React.useState(user.name);

  const handleClick = () => {
    handleClose();
    handleUpdateUser(userName);
  };

  const handleOnClose = () => {
    handleClose();
    setUserName(user.name);
  }

  return (
    <Dialog open={open} onClose={handleOnClose}>
      <DialogTitle id="form-dialog-title" style={{paddingBottom: 0}}>Editar Participante</DialogTitle>
      <DialogContent>
        <div style={{width: '500px', height: 0}}/>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nombre"
          type="email"
          fullWidth
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClick} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}