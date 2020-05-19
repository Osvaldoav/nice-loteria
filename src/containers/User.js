import React, {useState, useEffect, Fragment} from 'react';
import * as firestore from '../services/firestore';
import {Card, Typography, Divider, GridList, GridListTile, Box, Snackbar} from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import MuiAlert from '@material-ui/lab/Alert';
import MiniCardListItem from '../components/MiniCardListItem';
import Table from '../components/Table';

const style = {
  cardContainer: {
    marginTop: '20px',
    padding: '10px',
    borderRadius: '10px'
  }
};

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function User(props) {
  const xs = useMediaQuery('(max-width: 600px)');
  const md = useMediaQuery('(min-width: 601px) and (max-width: 900px)');

  const listWidthStyle = xs ? {width: '300px'} : md ? {width: '500px'} : {width: '850px'};
  const listCols= xs ? 4 : md ? 8 : 13;

  const [tables, setTables] = useState([]);
  useEffect(() => {
    console.log('streamTablesWithUserID hook');
    const unsubscribe = firestore.streamTablesWithUserID(props.match.params.userID, {
      next: snapshot => {
        let data = [];
        snapshot.forEach(doc => {
          data.push({...doc.data(), id: doc.id});
        })
        setTables(data);
      },
      error: err => console.log('Error getting table document with user id', err)
    })
    return unsubscribe;
  },[props.match.params.userID]);

  const [currentRound, setCurrentRound] = useState('');
  useEffect(() => {
    console.log('streamCurrentGameDetails hook');
    const unsubscribe = firestore.streamCurrentGameDetails({
      next: doc => {
        setCurrentRound(doc.data().round);
      },
      error: err => console.log('Error getting current round', err)
    })
    return unsubscribe;
  },[]);

  const [roundInfo, setRoundInfo] = useState('');
  useEffect(() => {
    console.log('streamCurrentGameDetails hook');
    if(currentRound){
      const unsubscribe = firestore.streamRoundWithID(currentRound, {
        next: doc => {
          setRoundInfo(doc.data());
        },
        error: err => console.log('Error getting current round', err)
      })
      return unsubscribe;
    }
  },[currentRound]);

  const [openSnack, setOpenSnack] = useState(false);
  const [snackHist, setSnackHist] = useState(false);
  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
    setSnackHist(true);
  };

  if(roundInfo.status === 'finished' && !openSnack && !snackHist) setOpenSnack(true);
  if(roundInfo.status === 'active' && snackHist) setSnackHist(false);

  return (
    <Fragment>
      <Card style={style.cardContainer}>
        {
          roundInfo ?
          <>
            <Box>
              <Typography variant="h6" align="center">
                Ronda {currentRound}
              </Typography>
            </Box>
            <Divider/>
            {
              roundInfo.status === 'active' ? 
              <Typography variant="h6" style={{color: 'green', fontWeight: 500}}>Ronda activa</Typography>
              :
              roundInfo.status === 'finished' ? 
              <Typography variant="h6" style={{color: 'gray', fontWeight: 500}}>Ronda terminada</Typography>
              :
              roundInfo.status === 'tie' ? 
              <Typography variant="h6" style={{color: 'red', fontWeight: 500}}>Empate</Typography>
              :
              <Typography variant="h6" style={{color: 'blue', fontWeight: 500}}>Desempate</Typography>
            }
            <Typography variant="subtitle1" align="left" style={{fontWeight: 500}}>Lista de Cartas</Typography>
            <GridList cellHeight="auto" cols={listCols} style={{...listWidthStyle, flexWrap: 'nowrap', transform: 'translateZ(0)', minHeight: '90px'}}>
              {roundInfo.cardList.slice(0).reverse().map(card => (
                <GridListTile key={card}>
                  <MiniCardListItem card={card}/>
                </GridListTile>
              )
              )}
            </GridList>
            <Divider style={{margin: '10px 0'}}/>
            {
              tables.map(table => <Table table={table}/>)
            }
          </>
          : null
        }
      </Card>
      {
        roundInfo ?
        <Snackbar open={openSnack} autoHideDuration={5000} onClose={handleCloseSnack}>
          {
            roundInfo.winners.some(winner => tables.map(table => table.id).includes(winner.doc)) ?
            <Alert onClose={handleCloseSnack} severity="success">
              Has ganado!
            </Alert>
            :
            <Alert onClose={handleCloseSnack} severity="error">
              Alguien más ha ganado!
            </Alert>
          }
        </Snackbar>
        :
        null
      }
    </Fragment>
  )
}

export default User;