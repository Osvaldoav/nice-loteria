import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {Typography, Card, Grid} from '@material-ui/core';
import MuiCardActionArea from '@material-ui/core/CardActionArea';
import AddCircleOutline from '@material-ui/icons/AddCircleOutline';

const style = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: '#757575'
  }
};

const CardActionArea = withStyles({
  root: {
    width: '112px',
    height: '80%',
    minHeight: '172px'
  }
})(MuiCardActionArea);

function AddMiniTable({table, handleClick}) {

  return (
    <Grid item>
      <CardActionArea onClick={handleClick}>
        <Card style={style.card}>
          <AddCircleOutline style={style.icon} color="action" fontSize="large"/>
          <Typography variant="body1" style={style.text}>Añadir Carta</Typography>
        </Card>
      </CardActionArea>
    </Grid>
  )
}

export default React.memo(AddMiniTable);