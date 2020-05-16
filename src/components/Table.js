import React, {useState, useEffect} from 'react';
import { Typography } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';

const maiz = require('../images/maiz2.png');
const initialSelectedState = {0:false,1:false,2:false,3:false,4:false,5:false,6:false,7:false,8:false,9:false,10:false,11:false,12:false,13:false,14:false,15:false};

const style = {
  table: {
    lineHeight: 0,
    display: 'inline-flex',
    flexDirection: 'column',
    border: '1px solid black',
    borderRadius: '5px',
  }, 
  row: {
    display: 'flex',
    flexDirection: 'row'
  },
  card: {
    width: '74px',
    height: '116px',
    margin: '3px',
    border: '1px solid black',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  cardContent: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    backgroundImage: `url(${maiz})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 8px'
  },
  title: {
    fontWeight: 500
  },
  logo: {
    width: '72px',
    height: '18px',
    marginLeft: '18px'
  }
};



function Table({table, disabled}) {
  const cards = table.cards;

  const [selected, setSelected] = useState(initialSelectedState);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(cards.map(card => require(`../images/cards/${card}.jpg`)));
  },[cards]);
  
  return (
    <div style={style.table}>
      <div style={style.header}> 
        <div></div>
        <img src={require(`../images/nice-logo.png`)} alt="nice logo" style={style.logo}/>
        <Typography varian="h6" style={style.title}>#{table.id} </Typography>
      </div>
      <div style={style.row}>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[0]}`}} onClick={() => setSelected({...selected, 0: !selected[0]})} disabled={disabled}>
          {selected[0] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[1]}`}} onClick={() => setSelected({...selected, 1: !selected[1]})} disabled={disabled}>
          {selected[1] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[2]}`}} onClick={() => setSelected({...selected, 2: !selected[2]})} disabled={disabled}>
          {selected[2] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[3]}`}} onClick={() => setSelected({...selected, 3: !selected[3]})} disabled={disabled}>
          {selected[3] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
      </div>
      <div style={style.row}>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[4]}`}} onClick={() => setSelected({...selected, 4: !selected[4]})} disabled={disabled}>
          {selected[4] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[5]}`}} onClick={() => setSelected({...selected, 5: !selected[5]})} disabled={disabled}>
          {selected[5] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[6]}`}} onClick={() => setSelected({...selected, 6: !selected[6]})} disabled={disabled}>
          {selected[6] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[7]}`}} onClick={() => setSelected({...selected, 7: !selected[7]})} disabled={disabled}>
          {selected[7] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
      </div>
      <div style={style.row}>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[8]}`}} onClick={() => setSelected({...selected, 8: !selected[8]})} disabled={disabled}>
          {selected[8] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[9]}`}} onClick={() => setSelected({...selected, 9: !selected[9]})} disabled={disabled}>
          {selected[9] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[10]}`}} onClick={() => setSelected({...selected, 10: !selected[10]})} disabled={disabled}>
          {selected[10] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[11]}`}} onClick={() => setSelected({...selected, 11: !selected[11]})} disabled={disabled}>
          {selected[11] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
      </div>
      <div style={style.row}>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[12]}`}} onClick={() => setSelected({...selected, 12: !selected[12]})} disabled={disabled}>
          {selected[12] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[13]}`}} onClick={() => setSelected({...selected, 13: !selected[13]})} disabled={disabled}>
          {selected[13] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[14]}`}} onClick={() => setSelected({...selected, 14: !selected[14]})} disabled={disabled}>
          {selected[14] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
        <CardActionArea style={{...style.card, backgroundImage: `url(${images[15]}`}} onClick={() => setSelected({...selected, 15: !selected[15]})} disabled={disabled}>
          {selected[15] ? <div style={style.cardContent}/> : null}
        </CardActionArea>
      </div>  
    </div>
  )
}

export default Table;