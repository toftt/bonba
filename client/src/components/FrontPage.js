import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/styles';
import { useSocket } from '../SocketContext';

import logo from '../img/logo.png';

const useStyles = makeStyles(theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: '20rem'
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100vw',
    height: '100vh'
  }
}));

function FrontPage() {
  const classes = useStyles();
  const socket = useSocket();

  const [nickname, setNickname] = useState('');

  const handleClick = () => {
    socket.emit('nickname', nickname);
  };

  return (
    <div className={classes.container}>
      <img src={logo} alt="Bonba logo" />
      <TextField
        label="Nickname"
        className={classes.textField}
        value={nickname}
        onChange={e => setNickname(e.target.value)}
        margin="normal"
        variant="outlined"
      />
      <Button onClick={() => handleClick()} color="primary" variant="contained">
        Lets go!
      </Button>
    </div>
  );
}

export default FrontPage;
