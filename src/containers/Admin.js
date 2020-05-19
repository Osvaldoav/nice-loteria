import React, {useState, useEffect} from 'react';
import * as firestore from '../services/firestore';
import Card from '@material-ui/core/Card';
import UserList from '../components/UserList';
import UserTitle from '../components/UserTitle';
import RoundsTitle from '../components/RoundsTitle';
import RoundsList from '../components/RoundsList';
import SignIn from './SignIn';

export const TablesContext = React.createContext();

const style = {
  cardContainer: {
    marginTop: '20px',
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

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    const unsubscribe = firestore.isAuth(user => setIsAuth(user));
    return unsubscribe;
  },[]);

  if(isAuth){
    return (
      <TablesContext.Provider value={tables}>
        <Card style={style.cardContainer}>
          <RoundsTitle/>
          <RoundsList/>
        </Card>
        <Card style={style.cardContainer}>
          <UserTitle/>
          <UserList/>
        </Card>
      </TablesContext.Provider>
    )
  }
  else {
    return <SignIn/>
  }
}

export default Admin;