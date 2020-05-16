import React, {useState, useEffect} from 'react';
import * as firestore from '../services/firestore';
import plays from '../services/plays';
import {
  DialogTitle, 
  FormControl, 
  Select, 
  MenuItem, 
  TextField, 
  Typography, 
  InputLabel, 
  Dialog, 
  Button
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    margin: theme.spacing(3),
    minWidth: 200,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function AddRoundDialog({open, handleClose, handleAddTable}) {
  const classes = useStyles();
  const [lastRound, setLastRound] = useState(0);
  const [selectedPlay, setSelectedPlay] = useState('');
  const [prize, setPrize] = useState('');
  const [playError, setPlayError] = useState(false);
  const [prizeError, setPrizeError] = useState(false);

  useEffect(() => {
    const unsubscribe = firestore.streamCurrentGameDetails({
      next: doc => {
        if(!doc.exists) 
          console.log('error, cannot find currenInfo document');
        else {
          setLastRound(Number(doc.data().round));
        }
      },
      error: err => console.log('Error getting currentInfo document', err)
    });
    return unsubscribe;
  },[]);

  const handleChange = (event) => {
    setSelectedPlay(event.target.value);
  };

  const handlePrizeChange = (event) => {
    if(event.target.value !== '')
      setPrizeError(false);

    setPrize(event.target.value);
  }

  const handleUpdate = () => {
    if(selectedPlay === '' ) setPlayError(true);
    if(prize === '' ) setPrizeError(true);

    if(selectedPlay !== '' && prize !== ''){
      const data = {
        cardList: [],
        prize: prize,
        status: "active",
        winCondition: selectedPlay,
        tiedList: [],
        winners: []
      };

      firestore.createRound((lastRound + 1).toString(), data)
      .then( () => {
        handleClose();
        setSelectedPlay('');
        setPrize('');
        console.log('round created!');
      })
      .catch(err => console.log('error creating round', err));
    }
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
      <DialogTitle id="customized-dialog-title" onClose={handleClose}>
        Nueva Ronda
      </DialogTitle>
      <DialogContent dividers>
        <div style={{width: '400px'}}/>
        <Typography variant="h6" align="center">Ronda {lastRound + 1}</Typography>
        <FormControl className={classes.formControl} error={playError}>
          <InputLabel shrink id="demo-simple-select-placeholder-label-label">
            Selecciona la jugada
          </InputLabel>
          <Select
            value={selectedPlay}
            onChange={handleChange}
            displayEmpty
            className={classes.selectEmpty}
          >
            {plays.map((play) => <MenuItem value={play} key={play}>{play}</MenuItem>)}
          </Select>

          <TextField
            label="Escribe el premio"
            // helperText="Escribe el premio"
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            value={prize}
            error={prizeError}
            onChange={handlePrizeChange}
          />
          {/* <FormHelperText>Selecciona la jugada</FormHelperText> */}
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleUpdate} color="primary" variant="contained">
          Crear
        </Button>
      </DialogActions>
    </Dialog>
  );
}