import React, {useState, useEffect, useReducer} from 'react';
import * as firestore from '../services/firestore';
import {Typography, IconButton, Box, Fade, Grid} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import {Edit, Delete} from '@material-ui/icons';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import MiniTable from './MiniTable';
import AddMiniTable from './AddMiniTable';
import TableDialog from './TableDialog';
import ChangeUserDialog from './ChangeUserDialog';
import AddTableDialog from './AddTableDialog';

const ExpansionPanel = withStyles({
  root: {
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    }
  },
  expanded: {},
})(MuiExpansionPanel);

const ExpansionPanelSummary = withStyles({
  root: {
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    margin: 0,
    minHeight: 56,
    padding: '0 0 0 10px',
    '&$expanded': {
      minHeight: 56,
    },
    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, .05)',
    }
  },
  content: {
    display: 'flex', 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    margin: 0,
    '&$expanded': {
      margin: 0
    }
  },
  expanded: {},
})(MuiExpansionPanelSummary);

const ExpansionPanelDetails = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiExpansionPanelDetails);

const userReducer = (state, action) => {
  switch(action.type){
    case 'ADD_TABLE':
      return {...state, table_ids: [...state.table_ids, action.payload]};
    case 'DELETE_TABLE':
      const table_ids = state.table_ids;
      table_ids.splice(table_ids.indexOf(action.payload), 1);
      return {...state, table_ids: table_ids};
    case 'UPDATE_USER_NAME':
      return {...state, name: action.payload};
    default:
      return state;
  }
};

function UserItem({userData, expand, onSelect}) {
  const [user, setUser] = useState(userData);
  const [nextUser, dispatchNextUser] = useReducer(userReducer, {name: userData.name, table_ids: userData.table_ids});
  const [tables, setTables] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null);
  
  const [hovered, setHovered] = useState('');
  const [openTableDialog, setOpenTableDialog] = useState(false);
  const [openUserDialog, setUserDialog] = useState(false);
  const [openAddTableDialog, setOpenAddTableDialog] = useState(false);
  
  // Firestore real-time listener for user document
  useEffect(() => {
    console.log('streamTablesWithUserID hook');
    const unsubscribe = firestore.streamTablesWithUserID(user.id, {
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
  },[user.id]);

  // Update firestore user
  useEffect(() => {
    firestore.updateUser(user.id, nextUser)
    .then(() => {
      console.log('user updated succesfully');
      setUser(prevUser => ({...prevUser, ...nextUser}));
    })
    .catch(err =>{
      console.log('error updating user', err);
    });
  }, [nextUser, user.id]);

  return ( 
    user ?
    <div>
      <ExpansionPanel square expanded={expand} onChange={onSelect(user.id)}>
        <ExpansionPanelSummary onMouseEnter={() => setHovered(user.id)} onMouseLeave={() => setHovered('')}>
          <Typography>{user.name}</Typography>
          <Fade in={hovered === user.id} timeout={100}>
            <Box>
              <IconButton onClick={(e) => {e.stopPropagation();setUserDialog(true)}}>
                <Edit/>
              </IconButton>
              <IconButton>
                <Delete/>
              </IconButton>
            </Box> 
          </Fade>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container style={{flexGrow: 1}} spacing={4}>
              { 
                tables.map(table => {
                  return (
                    <MiniTable 
                      key={table.id}
                      table={table} 
                      handleClick={() => {
                        setSelectedTable(table);
                        setOpenTableDialog(true)
                      }} 
                    />)
                  })
              }
            <AddMiniTable handleClick={() => setOpenAddTableDialog(true)}/>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>

      <TableDialog 
        table={selectedTable}
        open={openTableDialog} 
        handleClose={() => setOpenTableDialog(false)} 
        handleRemoveTable={(table) => dispatchNextUser({type: 'DELETE_TABLE', payload: table})} 
      />

      <ChangeUserDialog 
        user={user}
        open={openUserDialog} 
        handleClose={() => setUserDialog(false)} 
        handleUpdateUser={(name) => dispatchNextUser({type: 'UPDATE_USER_NAME', payload: name})}
      />

      <AddTableDialog 
        open={openAddTableDialog} 
        handleClose={() => setOpenAddTableDialog(false)} 
        handleAddTable={(table) => dispatchNextUser({type: 'ADD_TABLE', payload: table})}
      />
    </div>
    : null
  );
}

export default UserItem;