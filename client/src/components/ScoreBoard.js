import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: '15px',
    fontFamily: 'Montserrat',
    fontSize: '1.2rem'
  },
  list: {
    width: '100%'
  },
  position: {
    alignItems: 'flex-start'
  },
  textLeft: {
    width: '2rem'
  },
  title: {
    textAlign: 'center'
  }
}));

function ScoreBoard({ members }) {
  const classes = useStyles();
  const sortedMembers = members.sort((a, b) => b.score - a.score);

  return (
    <Paper className={classes.root}>
      <Typography
        className={classes.title}
        variant="h5"
        component="h5"
        gutterBottom
      >
        Scores
      </Typography>
      <List dense disablePadding className={classes.list}>
        {sortedMembers.map(({ nickname, score }, index) => (
          <div key={nickname}>
            <ListItem>
              <span className={classes.textLeft}>{index + 1}</span>
              <ListItemText primary={nickname.toUpperCase()} />
              <ListItemSecondaryAction>{score}</ListItemSecondaryAction>
            </ListItem>
            {index !== members.length - 1 && <Divider variant="fullWidth" />}
          </div>
        ))}
      </List>
    </Paper>
  );
}

export default ScoreBoard;
