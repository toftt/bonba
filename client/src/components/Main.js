import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, TextField } from '@material-ui/core';
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
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    '& > *': {
      margin: '5px 0px'
    }
  }
}));

function Main() {
  const classes = useStyles();
  const socket = useSocket();

  const [track, setTrack] = useState('');
  const [artist, setArtist] = useState('');

  const [correctTrack, setCorrectTrack] = useState(null);
  const [correctArtist, setCorrectArtist] = useState(null);

  const [src, setSrc] = useState(audioUrl);

  useEffect(() => {
    const handleSong = newSrc => {
      setSrc(newSrc);
      setTrack('');
      setArtist('');
      setCorrectArtist(null);
      setCorrectTrack(null);
    };
    socket.on('current_track', handleSong);
    socket.emit('current_track');
    return () => socket.removeListener('current_track', handleSong);
  }, []);

  useEffect(() => {
    const handleCorrectTrack = t => setCorrectTrack(t);
    const handleCorrectArtist = a => setCorrectArtist(a);

    socket.on('correct_track', handleCorrectTrack);
    socket.on('correct_artist', handleCorrectArtist);

    return () => {
      socket.removeListener('correct_track', handleCorrectTrack);
      socket.removeListener('correct_artist', handleCorrectArtist);
    };
  }, []);

  const handleSubmitArtist = e => {
    e.preventDefault();
    socket.emit('guess_artist', artist);
  };

  const handleSubmitTrack = e => {
    e.preventDefault();
    socket.emit('guess_track', track);
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.root}>
        <div className={classes.flexColumn}>
          <ScoreBoard members={members} />
          <TrackHistory tracks={tracks} />
        </div>
        <div className={classes.flexColumn}>
          <Typography component="h4" variant="h4">
            Guess the song and artist!
          </Typography>
          <div className={classes.inputContainer}>
            {correctTrack === null ? (
              <form onSubmit={e => handleSubmitTrack(e)}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Song name"
                  value={track}
                  onChange={e => setTrack(e.target.value)}
                />
              </form>
            ) : (
              <Typography component="h5" variant="h5">
                {correctTrack}
              </Typography>
            )}
            {correctArtist === null ? (
              <form onSubmit={e => handleSubmitArtist(e)}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Artist name"
                  value={artist}
                  onChange={e => setArtist(e.target.value)}
                />
              </form>
            ) : (
              <Typography component="h5" variant="h5">
                {correctArtist}
              </Typography>
            )}
          </div>
          <Player src={src} seekTime={0} />
        </div>
        <Chat />
      </div>
    </div>
  );
}

export default Main;
