import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Card, CardMedia} from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    position: 'relative'
  },
  media: {
    height: '25vh'
  },
});

const style = {
  titleTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%', 
    transform: 'translate(-50%, -50%)',
    color: 'white',
    textShadow: '-2px 2px 4px rgba(120, 120, 120, 1)'
  },
  subTitleText: {
    marginTop: '10px'
  }
};

function TitleHeader() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardMedia
        component='img'
        className={classes.media}
        src={require('../images/title.jpg')}
        title="Contemplative Reptile"
      />
      <div style={style.titleTextContainer}>
        <Typography variant="h3">
          Loteria NICE
        </Typography>
        <Typography variant="h5" style={style.subTitleText}>
          Tere Valdez
        </Typography>
        
      </div>
    </Card>
  )
}

export default TitleHeader;