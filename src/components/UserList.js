import React, {useEffect, useState} from 'react';
import UserItem from './UserItem';
import * as firestore from '../services/firestore';

function UserList () {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState('');
  
  const onSelect = (id) => (event, newSelected) => {
    setSelected(newSelected ? id : false);
  };

  useEffect(() => {
    console.log('effect hook users');
    firestore.getUsers()
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
        return <UserItem userData={user} key={user.id} onSelect={onSelect} expand={user.id === selected}/>
      })}
    </div>
  );
}

export default React.memo(UserList);