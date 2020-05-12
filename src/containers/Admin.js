import React, {useState, useEffect} from 'react';
import {CssBaseline, Container, Card} from '@material-ui/core';
import * as firestore from '../services/firestore';
import TitleHeader from '../components/TitleHeader';
import UserSection from '../components/UserSection';

export const TablesContext = React.createContext();

const style = {
  cardContainer: {
    marginTop: '20px', 
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '10px'
  }
};

function Admin() {
  const [tables, setTables] = useState([]);
  useEffect(() => {
    console.log('effect hook tables');
    const unsubscribe = firestore.streamTablesWithNoUserID({
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

  return (
    <TablesContext.Provider value={tables}>
      {/* <CssBaseline /> */}
      <Container maxWidth="md">
        <TitleHeader/>
        <Card style={style.cardContainer}>
          <UserSection/>
        </Card>
      </Container>
    </TablesContext.Provider>
  )
}

export default Admin;