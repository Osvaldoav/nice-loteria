import React, {useEffect, useState} from 'react';
import * as firestore from '../services/firestore';
import RoundItem from './RoundItem';

function RoundsList () {
  const [rounds, setRounds] = useState([]);
  const [selected, setSelected] = useState('');
  
  const onSelect = (id) => (event, newSelected) => {
    setSelected(newSelected ? id : false);
  };

  useEffect(() => {
    console.log('effect hook rounds');
    const unsubscribe = firestore.streamRounds({
      next: (snapshot) => {
        let data = [];
        snapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        setRounds(data);
      },
      error: err => console.log('Error getting rounds documents', err)
    })
    return unsubscribe;
  },[]);

  return (
    <div style={{marginTop: '10px'}}>
      {rounds.map(round => {
        return <RoundItem round={round} key={round.id} onSelect={onSelect} expand={round.id === selected}/>
      })}
    </div>
  );
}

export default React.memo(RoundsList);