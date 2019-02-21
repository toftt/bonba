import React from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { members, tracks, audioUrl } from '../testData';
import ScoreBoard from './ScoreBoard';
import Player from './Player';
import TrackHistory from './TrackHistory';
import Chat from './Chat';

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-around',
    height: '100vh',
    width: '100vw',
    maxWidth: '1400px'
  },
  wrapper: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '2rem'
    }
  }
}));

function Main() {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <div className={classes.flexColumn}>
          <ScoreBoard members={members} />
          <TrackHistory tracks={tracks} />
        </div>
        <div className={classes.flexColumn}>
          <Player src={audioUrl} seekTime={0} />
          <TextField
            variant="outlined"
            label="Guess song title or artist name"
          />
        </div>
        <Chat />
      </div>
    </div>
  );
}

export default Main;
