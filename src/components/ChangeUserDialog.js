import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ChangeUserDialog({open, handleClose, user, handleUpdateUser}) {
  const [userName, setUserName] = React.useState(user.name);
  const [currentUserName, setCurrentUserName] = React.useState(user.name);

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