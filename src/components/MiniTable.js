import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import alts from '../images/cards/alts.json';
import {Typography, Card, Grid} from '@material-ui/core';
import MuiCardActionArea from '@material-ui/core/CardActionArea';
import MuiBox from '@material-ui/core/Box';

const style = {
  miniCard: {
    height: '43px',
    widht: '28px'
  }
};

const Box = withStyles({
  root: {
    lineHeight: '1px'
  }
})(MuiBox);

const CardActionArea = withStyles({
  root: {
    width: 'auto'
  }
})(MuiCardActionArea);

function MiniTable({table, handleClick}) {
  const cards = table.cards;

  return (
    <Grid item onClick={() => handleClick()}>
      <CardActionArea>
        <Card>
          <Box>
            <img src={require(`../images/cards/${cards[0]}.jpg`)} alt={alts[cards[0]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[1]}.jpg`)} alt={alts[cards[1]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[2]}.jpg`)} alt={alts[cards[2]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[3]}.jpg`)} alt={alts[cards[3]]} style={style.miniCard}/>
          </Box>
          <Box>
            <img src={require(`../images/cards/${cards[4]}.jpg`)} alt={alts[cards[4]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[5]}.jpg`)} alt={alts[cards[5]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[6]}.jpg`)} alt={alts[cards[6]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[7]}.jpg`)} alt={alts[cards[7]]} style={style.miniCard}/>
          </Box>
          <Box>
            <img src={require(`../images/cards/${cards[8]}.jpg`)} alt={alts[cards[8]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[9]}.jpg`)} alt={alts[cards[9]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[10]}.jpg`)} alt={alts[cards[10]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[11]}.jpg`)} alt={alts[cards[11]]} style={style.miniCard}/>
          </Box>
          <Box>
            <img src={require(`../images/cards/${cards[12]}.jpg`)} alt={alts[cards[12]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[13]}.jpg`)} alt={alts[cards[13]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[14]}.jpg`)} alt={alts[cards[14]]} style={style.miniCard}/>
            <img src={require(`../images/cards/${cards[15]}.jpg`)} alt={alts[cards[15]]} style={style.miniCard}/>
          </Box>
        </Card>
      </CardActionArea>
      <Typography variant="body1" style={{marginTop: '4px'}}>#{table.id}</Typography>
    </Grid>
  )
}

export default React.memo(MiniTable);