import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(() => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: '15px'
  },
  list: {
    width: '100%'
  },
  position: {
    alignItems: 'flex-start'
  }
}));

function MemberList({ members }) {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <List dense disablePadding className={classes.list}>
        {members.map(({ nickname, points }, index) => (
          <ListItem key={nickname}>
            <p>{index + 1}</p>
            <ListItemText primary={nickname.toUpperCase()} />
            <ListItemSecondaryAction>
              <b>{points}</b>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
}

export default MemberList;
