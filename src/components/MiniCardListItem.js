import React from 'react';
import alts from '../images/cards/alts.json';
import {Card} from '@material-ui/core';

const style = {
  card: {
    height: '86px',
    width: '56px'
  }
};

function MiniCardListItem({card}) {
  return (
    <Card style={{display: 'inline-flex'}}>
      <img src={require(`../images/cards/${card}.jpg`)} alt={alts[card]} style={style.card}/>
    </Card>
  )
}

export default React.memo(MiniCardListItem);