import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Button, Dialog} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import DeleteIcon from '@material-ui/icons/Delete';
import Table from './Table';

// const table = {
//   cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
//   id: "00"
// };

const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
    '&:first-child': {
      paddingTop: '0'
    }
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: '5px',
    display: 'flex',
    justifyContent: 'center'
  },
}))(MuiDialogActions);

export default function TableDialog({open, handleClose, handleRemoveTable, table}) {

  const handleClick = () => {
    handleRemoveTable(table.id);
    handleClose();
  }

  return (
    <Dialog onClose={() => handleClose()} aria-labelledby="customized-dialog-title" open={open}>
      <DialogContent>
        <Table table={table} disabled/>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClick} color="secondary" variant="contained" startIcon={<DeleteIcon/>}>
          Eliminar carta
        </Button>
      </DialogActions>
    </Dialog>
  );
}