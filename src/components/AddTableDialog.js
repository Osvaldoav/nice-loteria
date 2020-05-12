import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle, FormControl, Select, MenuItem, FormHelperText} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import MiniTable from './MiniTable';
import {TablesContext} from '../containers/Admin';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddTableDialog({open, handleClose, handleAddTable}) {
  const classes = useStyles();
  const tables = useContext(TablesContext);
  const [selectedTable, setSelectedTable] = useState('');

  const handleChange = (event) => {
    setSelectedTable(event.target.value);
  };

  const handleUpdate = () => {
    if(selectedTable !== ''){
      handleAddTable(selectedTable.id);
      handleClose();
      setSelectedTable('');
    }
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Agregar Carta
      </DialogTitle>
      <DialogContent dividers>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '400px'}}>
          <MiniTable table={selectedTable} noText/>
          <FormControl className={classes.formControl}>
            <Select
              value={selectedTable}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              {tables.map((table) => <MenuItem value={table} key={table.id}>{table.id}</MenuItem>)}
            </Select>
            <FormHelperText>Selecciona la carta</FormHelperText>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleUpdate} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}