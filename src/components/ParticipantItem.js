import React, {useState} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MuiExpansionPanel from '@material-ui/core/ExpansionPanel';
import MuiExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import MuiExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import {Typography, IconButton, Box, Fade, Grid} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';
import MiniTable from './MiniTable';
import AddMiniTable from './AddMiniTable';

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

const table = {
  cards: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],
  id: "00"
};

function ParticipantItem({user, expand, onSelect}) {
  const [expanded, setExpanded] = useState('');
  const [hovered, setHovered] = useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <ExpansionPanel square expanded={expand} onChange={onSelect(user.id)}>
      <ExpansionPanelSummary aria-controls="panel1d-content" id="panel1d-header" onMouseEnter={() => setHovered(user.id)} onMouseLeave={() => setHovered('')}>
        <Typography>{user.name}</Typography>
        <Fade in={hovered === user.id} timeout={100}>
          <Box>
            <IconButton>
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
          <MiniTable table={table}/>
          <MiniTable table={table}/>
          <MiniTable table={table}/>
          <AddMiniTable/>
        </Grid>
      </ExpansionPanelDetails>
    </ExpansionPanel>
  );
}

export default ParticipantItem;