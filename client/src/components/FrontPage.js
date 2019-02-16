import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/styles';

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

  const [nickname, setNickname] = useState('');

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
    </div>
  );
}

export default FrontPage;
