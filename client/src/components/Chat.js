import React from 'react';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    width: '400px',
    height: '600px',
    backgroundColor: 'orange'
  }
}));

function Chat() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <p>this is CHAT</p>
    </div>
  );
}

export default Chat;
