import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import TextField from '@material-ui/core/TextField';

import { members, tracks, audioUrl } from '../testData';
import { useSocket } from '../SocketContext';
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
  const socket = useSocket();

  const [src, setSrc] = useState(audioUrl);

  useEffect(() => {
    const handleSong = json => {
      const song = JSON.parse(json);
      setSrc(song.preview_url);
    };
    socket.on('give_song', handleSong);
    return () => socket.removeListener('give_song', handleSong);
  }, []);

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <div className={classes.flexColumn}>
          <ScoreBoard members={members} />
          <TrackHistory tracks={tracks} />
        </div>
        <div className={classes.flexColumn}>
          <Player src={src} seekTime={0} />
          <TextField
            variant="outlined"
            label="Guess song title or artist name"
          />
        </div>
        <Chat />
        <button type="submit" onClick={() => socket.emit('request_song')}>
          GIVE SONG
        </button>
      </div>
    </div>
  );
}

export default Main;
