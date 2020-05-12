import React, {useState, useEffect} from 'react';
import * as firestore from '../services/firestore';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {Typography, IconButton, Box, Fade, Grid} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import MiniTable from './MiniTable';
import AddMiniTable from './AddMiniTable';
import TableDialog from './TableDialog';
import ChangeUserDialog from './ChangeUserDialog';
import AddTableDialog from './AddTableDialog';

const ExpansionPanel = withStyles({
  root: {
    // borderBottom: '1px solid rgba(0, 0, 0, .125)',
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
    // backgroundColor: 'rgba(0, 0, 0, .03)',
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

function UserItem({userData, expand, onSelect}) {
  const [hovered, setHovered] = useState('');
  const [openTableDialog, setOpenTableDialog] = useState(false);
  const [openUserDialog, setUserDialog] = useState(false);
  const [openAddTableDialog, setOpenAddTableDialog] = useState(false);

  const [selectedTable, setSelectedTable] = useState(null);

  const [user, setUser] = useState(userData);
  const [tables, setTables] = useState([]);
  useEffect(() => {
    console.log('streamTablesWithUserID hook');
    const unsubscribe = firestore.streamTablesWithUserID(user.id, {
      next: snapshot => {
        console.log('received new data from streamtableswithuserid');
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

  const handleAddTable = (table) => {
    const userData = {...user, table_ids: [...user.table_ids, table]};
    firestore.updateUser(user.id, userData)
    .then(() => {
      console.log('user updated succesfully');
      setUser(userData);
    })
    .catch(err =>{
      console.log('error updating user', err);
    });
  };

  const handleRemoveTable = (table) => {
    const table_ids = user.table_ids;
    table_ids.splice(table_ids.indexOf(table), 1);
    const userData = {...user, table_ids: table_ids};
    console.log(userData);
    firestore.updateUser(user.id, userData)
    .then(() => {
      console.log('user updated succesfully');
      setUser(userData);
    })
    .catch(err =>{
      console.log('error updating user', err);
    });
  };

  return ( 
    user ?
    <div>
      <ExpansionPanel square expanded={expand} onChange={onSelect(user.id)}>
        <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" onMouseEnter={() => setHovered(user.id)} onMouseLeave={() => setHovered('')}>
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
            {tables.map(table => <MiniTable table={table} handleClick={() => {setSelectedTable(table);setOpenTableDialog(true)}} key={table.id}/>)}
            <AddMiniTable handleClick={() => setOpenAddTableDialog(true)}/>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <TableDialog open={openTableDialog} handleClose={() => setOpenTableDialog(false)} handleRemoveTable={handleRemoveTable} table={selectedTable}/>
      <ChangeUserDialog open={openUserDialog} handleClose={() => setUserDialog(false)} user={user}/>
      <AddTableDialog open={openAddTableDialog} handleClose={() => setOpenAddTableDialog(false)} handleAddTable={handleAddTable}/>
    </div>
    : null
  );
}

export default UserItem;