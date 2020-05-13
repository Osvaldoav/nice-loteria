import React, {useState, useEffect} from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Typography, Grid, TextField, IconButton} from '@material-ui/core';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MiniCard from './MiniCard';
import { Send } from '@material-ui/icons';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    }
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    margin: 0,
    minHeight: 56,
    padding: '0 0 0 10px',
    '&$expanded': {
      minHeight: 56,
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .05)',
    }
  },
  content: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    margin: 0,
    '&$expanded': {
      margin: 0
    }
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

function RoundItem({round, expand, onSelect}) {
  const [card, setCard] = useState('');

  const onChangeCard = (e) => {
    const val = e.target.value;

    if(val === '' || (val <= 54 && val >= 1))
      setCard(val);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setCard('');
  }

  return (
    <ExpansionPanel square expanded={expand} onChange={onSelect(round.id)}>
    <ExpansionPanelSummary>
      <Typography>Ronda {round.id}</Typography>
    </ExpansionPanelSummary>
    <ExpansionPanelDetails>
      <Grid container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', flexGrow: 1, padding: '10px'}} spacing={4}>
        <MiniCard card={card}/>
        <form onSubmit={onSubmit} style={{marginLeft: '45px'}}>
          <TextField
            label="Carta"
            type="number"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            inputProps={{min: 0, style: { textAlign: 'center' }}}
            value={card}
            onChange={onChangeCard}
          />
          <IconButton color="primary" type="submit">
            <Send fontSize="large"/>
          </IconButton>
        </form>
      </Grid>
    </ExpansionPanelDetails>
  </ExpansionPanel>
  )
}

export default RoundItem;