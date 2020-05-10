import React, {useState, useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import {DialogTitle, FormControl, InputLabel, Select, MenuItem, FormHelperText} from '@material-ui/core';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import MiniTable from './MiniTable';
import {TablesContext} from '../containers/Admin';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

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

export default function AddTableDialog({open, handleClose}) {
  const classes = useStyles();
  const tables = useContext(TablesContext);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleChange = (event) => {
    setSelectedTable(event.target.value);
    // console.log(event.target.value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Agregar Carta
      </DialogTitle>
      <DialogContent dividers>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', width: '400px'}}>
          <MiniTable table={selectedTable} noText/>
          {/* <MiniTable /> */}
          <FormControl className={classes.formControl}>
            <Select
              value={selectedTable}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
            >
              {tables.map((table) => <MenuItem value={table} key={table.id}>{table.id}</MenuItem>)}
              {/* <MenuItem value={'01'}>01</MenuItem>
              <MenuItem value={'02'}>02</MenuItem>
              <MenuItem value={'03'}>03</MenuItem> */}
            </Select>
            <FormHelperText>Selecciona la carta</FormHelperText>
          </FormControl>
        </div>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary" variant="contained">
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
}