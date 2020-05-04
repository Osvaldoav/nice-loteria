import React, {useState} from 'react';
import {createTable} from '../services/firestore';

const initialCards = {0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0,8:0,9:0,10:0,11:0,12:0,13:0,14:0,15:0};

function CreateTableForm() {
  
  const [id, setId] = useState('');
  const [cards, setCards] = useState(initialCards);
  
  const postTable = (e) => {
    e.preventDefault();

    const data = {
      cards: Object.values(cards).map(Number),
      user_id: ''
    };

    createTable(data, id)
      .then(() => {
        console.log('Document successfully written');
        setCards(initialCards);
        setId('');
      })
      .catch(err => {
        console.log('Error writing document', err);
      });

  };
  
  return (
    <div>
      <h2>Create New Table</h2>
      <form onSubmit={postTable}>
        <div>
          <input type="number" onChange={e => setCards({...cards, 0: e.target.value})} value={cards[0]}/>
          <input type="number" onChange={e => setCards({...cards, 1: e.target.value})} value={cards[1]}/>
          <input type="number" onChange={e => setCards({...cards, 2: e.target.value})} value={cards[2]}/>
          <input type="number" onChange={e => setCards({...cards, 3: e.target.value})} value={cards[3]}/>
        </div>
        <div>
          <input type="number" onChange={e => setCards({...cards, 4: e.target.value})} value={cards[4]}/>
          <input type="number" onChange={e => setCards({...cards, 5: e.target.value})} value={cards[5]}/>
          <input type="number" onChange={e => setCards({...cards, 6: e.target.value})} value={cards[6]}/>
          <input type="number" onChange={e => setCards({...cards, 7: e.target.value})} value={cards[7]}/>
        </div>
        <div>
          <input type="number" onChange={e => setCards({...cards, 8: e.target.value})} value={cards[8]}/>
          <input type="number" onChange={e => setCards({...cards, 9: e.target.value})} value={cards[9]}/>
          <input type="number" onChange={e => setCards({...cards, 10: e.target.value})} value={cards[10]}/>
          <input type="number" onChange={e => setCards({...cards, 11: e.target.value})} value={cards[11]}/>
        </div>
        <div>
          <input type="number" onChange={e => setCards({...cards, 12: e.target.value})} value={cards[12]}/>
          <input type="number" onChange={e => setCards({...cards, 13: e.target.value})} value={cards[13]}/>
          <input type="number" onChange={e => setCards({...cards, 14: e.target.value})} value={cards[14]}/>
          <input type="number" onChange={e => setCards({...cards, 15: e.target.value})} value={cards[15]}/>
        </div>
        <input type="text" placeholder="table id" onChange={e => setId(e.target.value)} value={id}/>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default CreateTableForm;