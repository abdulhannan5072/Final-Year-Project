import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles({
  root: {
    minWidth: 270,
    height: 50,
    
  },
  bullet: {
    padding: '8px 10px 8px'
  },
  title: {
    fontSize: 14,
    display: 'inline-block',
    margin: '5px '
  },
  btn: {
    display: 'inline-block',
    float: 'right'
  },
});

export default function OutlinedCard({title}) {
  const classes = useStyles();
  // const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent className={classes.bullet} >
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          {title}
        </Typography>
        <IconButton size="small" className={classes.btn} >
          <ArrowForwardIcon/>
        </IconButton>
      </CardContent>
      
    </Card>
  );
}
