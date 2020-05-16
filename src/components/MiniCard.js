import React from 'react';
import alts from '../images/cards/alts.json';
import {Typography, Grid, Card} from '@material-ui/core';
import Box from '@material-ui/core/Box';

const style = {
  card: {
    height: '172px',
    width: '112px'
  },
  emptyCard: {
    height: '168px',
    width: '108px',
    border: '2px dashed grey',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    lineHeight: '1px'
  }
};

function MiniCard({card}) {
  return (
    <Grid item>
      <Card style={{display: 'inline-flex', marginBottom: '5px'}}>
        {card ? 
          <img src={require(`../images/cards/${card}.jpg`)} alt={alts[card]} style={style.card}/>
          : 
          <Box style={style.emptyCard}>
            <Typography variant="body1" style={{color: 'grey'}}>Pendiente</Typography>
          </Box>
        }
      </Card>
    </Grid>
  )
}

export default React.memo(MiniCard);