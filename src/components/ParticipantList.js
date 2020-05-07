import React, {useEffect, useState} from 'react';
import ParticipantItem from './ParticipantItem';
import {getUsers} from '../services/firestore';

export default function ParticipantList() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');
  
  const onSelect = (id) => (event, newSelected) => {
    setSelected(newSelected ? id : false);
  };

  useEffect(() => {
    console.log('effect hook users');
    getUsers()
    .then((snapshot) => {
      let data = [];
      snapshot.forEach(doc => {
        data.push({...doc.data(), id: doc.id});
      });
      setUsers(data);
    })
    .catch(err => {
      console.log('Error getting table documents', err);
    })
  },[]);

  return (
    <div style={{marginTop: '10px'}}>
      {users.map(user => {
        return <ParticipantItem user={user} key={user.id} onSelect={onSelect} expand={user.id === selected}/>
      })}
    </div>
  );
}