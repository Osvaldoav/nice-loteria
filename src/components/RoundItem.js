import React, {useState, Fragment, useEffect, useRef} from 'react';
import * as firestore from '../services/firestore';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Send from '@material-ui/icons/Send';
import {
  Typography, 
  Grid, 
  TextField, 
  IconButton, 
  GridListTile, 
  GridList, 
  Divider, 
  Button, 
  useMediaQuery
} from '@material-ui/core';
import MiniCard from './MiniCard';
import MiniCardListItem from './MiniCardListItem';

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
    backgroundColor: 'rgb(250, 250, 250)',
    margin: 0,
    minHeight: 56,
    padding: '0 0 0 10px',
    '&$expanded': {
      minHeight: 56,
      backgroundColor: 'rgba(0, 0, 0, .08)'
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .08)',
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
  const [error, setError] = useState(false);

  // const inputRef = useRef(null);
  // useEffect(() => {
  //   if(expand){
  //     console.log('expanded!');
  //     inputRef.current.focus();
  //   }
  // }, [expand]);


  const xs = useMediaQuery('(max-width: 600px)');
  const md = useMediaQuery('(min-width: 601px) and (max-width: 900px)');

  const listWidthStyle = xs ? {width: '300px'} : md ? {width: '500px'} : {width: '850px'};
  const listCols= xs ? 4 : md ? 8 : 13;

  const onChangeCard = (e) => {
    const val = e.target.value;
    
    if(val === '' || (val <= 54 && val >= 1)){
      setCard(val);
      setError(round.cardList.includes(Number(val)));
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if(card !== '' && !error){
      const roundData = {cardList: [...round.cardList, Number(card)]};
      delete roundData.id;
      firestore.updateRound(round.id, roundData)
      .then(() => {
        setCard('');
        console.log('card added round');
      })
      .catch(err => console.log('error adding card to round', err));
    }
  }

  return (
    <Fragment>
      <ExpansionPanel square expanded={expand} onChange={onSelect(round.id)}>
        <ExpansionPanelSummary>
          <Typography>Ronda {round.id}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', flexGrow: 1, padding: '10px'}} spacing={4}>
            {
              round.status === 'active' ? 
              <Typography variant="h6" style={{color: 'green', fontWeight: 500}}>Ronda activa</Typography>
              :
              round.status === 'finished' ? 
              <Typography variant="h6" style={{color: 'gray', fontWeight: 500}}>Ronda terminada</Typography>
              :
              round.status === 'tie' ? 
              <Typography variant="h6" style={{color: 'red', fontWeight: 500}}>Empate</Typography>
              :
              <Typography variant="h6" style={{color: 'blue', fontWeight: 500}}>Desempate</Typography>
            }
            {
              round.status === 'untie' ? 
              <Typography style={{fontWeight: 500, marginTop: '5px'}} align="left">Jugadores al desempate:</Typography>
              :
              <Typography style={{fontWeight: 500, marginTop: '5px'}} align="left">Ganadores:</Typography>
            }
            {
              round.status === 'untie' ? 
              round.tiedList.map(tied => <Typography style={{color: 'green'}} key={tied.doc} align="left">{tied.user} con la carta #{tied.doc}</Typography>)
              :
              round.winners.map(winner => <Typography style={{color: 'green'}} key={winner.doc} align="left">{winner.user} con la carta #{winner.doc}</Typography>)
            }
            <Divider style={{margin: '10px 0'}}/>
            <Typography style={{fontWeight: 500, marginTop: '5px'}} align="left">Premio:</Typography>
            <Typography style={{color: 'green'}} align="left">{round.prize}</Typography>
            <Divider style={{margin: '10px 0'}}/>
            <Typography variant="subtitle1" align="left" style={{fontWeight: 500}}>Lista de Cartas</Typography>
            <GridList cellHeight="auto" cols={listCols} style={{...listWidthStyle, flexWrap: 'nowrap', transform: 'translateZ(0)', minHeight: '90px'}}>
              {round.cardList.slice(0).reverse().map(card => (
                <GridListTile key={card}>
                  <MiniCardListItem card={card}/>
                </GridListTile>
              )
              )}
            </GridList>
            <Divider style={{margin: '10px 0'}}/>
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
                error={error}
                disabled={round.status !== 'active' && round.status !== 'untie'}
                autoFocus
              />
              <IconButton color="primary" type="submit" disabled={round.status !== 'active' && round.status !== 'untie'}>
                <Send fontSize="large"/>
              </IconButton>
            </form>
            <Divider style={{margin: '10px 0'}}/>
            <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}> 
              <Button 
                variant="contained" 
                color="primary" 
                style={{margin: '0 5px'}} 
                disabled={round.status !== 'tie'}
                onClick={() => {firestore.updateRound(round.id, {cardList: [], status: 'untie', tiedList: round.winners, winners: []})}}
              >
              Desempate
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                style={{margin: '0 5px'}} 
                disabled={round.status !== 'tie'}
                onClick={() => {firestore.updateRound(round.id, {status: 'finished'})}}
              >
              Terminar
              </Button>
            </div>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Fragment>
  )
}

export default React.memo(RoundItem);