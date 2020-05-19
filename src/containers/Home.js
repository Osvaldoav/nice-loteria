import React, {useState, useEffect} from 'react';
import * as firestore from '../services/firestore';
import { Link } from 'react-router-dom';
import {Button, Card, Typography, Divider, TextField, Box} from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

export const TablesContext = React.createContext();

const style = {
  cardContainer: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '10px'
  }
};

function Home() {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    console.log('effect hook tables');
    const unsubscribe = firestore.streamTablesWithAnyUserID({
      next: snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        setTables(data);
      },
      error: err => console.log('Error getting table documents with no user id', err)
    })
    return unsubscribe;
  },[]);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    console.log('effect hook users');
    const unsubscribe = firestore.streamUsers({
      next: (snapshot) => {
        let data = [];
        snapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        });
        setUsers(data);
      },
      error: err => console.log('Error getting table documents', err)
    })
    return unsubscribe;
  },[]);

  const path = selectedUser ? `/users/${selectedUser.id}` : "/";

  return (
    <TablesContext.Provider value={tables}>
      <Card style={style.cardContainer}>
        <Box>
          <Typography variant="h6" align="center">
            Bienvenido
          </Typography>
        </Box>
        <Divider/>
        <Typography variant="subtitle1" style={{color: 'gray', fontWeight: 500, fontSize: 16, margin: '10px 0 10px 0'}} align="left">
          Estás a punto de participar en la primera loteria virtual de NICE. Para jugar busca tu nombre en la lista y despues
          dale click en jugar. Diviértete y mucha suerte!
        </Typography>
        <Autocomplete
          options={users}
          getOptionLabel={option => option.name}
          value={selectedUser}
          onChange={(event, newUser) => {
            setSelectedUser(newUser);
          }}
          renderInput={(params) => (
            <TextField 
              {...params} 
              margin="normal" 
              label="Elige tu Nombre"
              InputLabelProps={{
                shrink: true,
              }}
              style={{width: '300px', margin: '25px 0'}}
            />
          )}
          autoHighlight
          disableClearable
        />
        <Button variant="contained" color="primary" style={{margin: '10px 0'}} size="large" component={Link} to={path} disabled={!selectedUser}>
          Jugar
        </Button>
      </Card>
    </TablesContext.Provider>
  )
}

export default Home;