import React from 'react';
import alts from '../images/cards/alts.json';

function Table({table}) {
  
  const cards = table.cards;
  
  return (
    <div>
      Table {table.id}
      <div>
        <img src={require(`../images/cards/${cards[0]}.jpg`)} alt={alts[cards[0]]}/>
        <img src={require(`../images/cards/${cards[1]}.jpg`)} alt={alts[cards[1]]}/>
        <img src={require(`../images/cards/${cards[2]}.jpg`)} alt={alts[cards[2]]}/>
        <img src={require(`../images/cards/${cards[3]}.jpg`)} alt={alts[cards[3]]}/>
      </div>
      <div>
        <img src={require(`../images/cards/${cards[4]}.jpg`)} alt={alts[cards[4]]}/>
        <img src={require(`../images/cards/${cards[5]}.jpg`)} alt={alts[cards[5]]}/>
        <img src={require(`../images/cards/${cards[6]}.jpg`)} alt={alts[cards[6]]}/>
        <img src={require(`../images/cards/${cards[7]}.jpg`)} alt={alts[cards[7]]}/>
      </div>
      <div>
        <img src={require(`../images/cards/${cards[8]}.jpg`)} alt={alts[cards[8]]}/>
        <img src={require(`../images/cards/${cards[9]}.jpg`)} alt={alts[cards[9]]}/>
        <img src={require(`../images/cards/${cards[10]}.jpg`)} alt={alts[cards[10]]}/>
        <img src={require(`../images/cards/${cards[11]}.jpg`)} alt={alts[cards[11]]}/>
      </div>
      <div>
        <img src={require(`../images/cards/${cards[12]}.jpg`)} alt={alts[cards[12]]}/>
        <img src={require(`../images/cards/${cards[13]}.jpg`)} alt={alts[cards[13]]}/>
        <img src={require(`../images/cards/${cards[14]}.jpg`)} alt={alts[cards[14]]}/>
        <img src={require(`../images/cards/${cards[15]}.jpg`)} alt={alts[cards[15]]}/>
      </div>
    </div>
  )
}

export default Table;