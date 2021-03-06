import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import { Typography, TextField, InputAdornment } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import forEach from 'lodash/forEach';
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

  const [members, setMembers] = useState([])
  const [tracks, setTracks] = useState([]);

  const [playerInfo, setPlayerInfo] = useState({src: null, seek: null});

  useEffect(() => {
    const handleGameState = json => {
      const gameState = JSON.parse(json);
      console.log(gameState);
      const previewUrl = gameState.currentTrack;
      const seek = gameState.remainingTime;
      const newMembers = []
      forEach(gameState.users, (user) => newMembers.push(user));
      const newTracks = gameState.trackHistory;

      setPlayerInfo({src: previewUrl, seek})
      setTrack('');
      setArtist('');
      setCorrectArtist(null);
      setCorrectTrack(null);
      setMembers(newMembers);
      setTracks(newTracks);
    };
    socket.on('game_state', handleGameState);
    return () => socket.off('game_state', handleGameState);
  }, []);

  useEffect(() => {
    const handleUserUpdate = json => {
      const userObj = JSON.parse(json);
      const users = [];
      forEach(userObj, (user) => users.push(user));

      setMembers(users);
    }

    socket.on('user_update', handleUserUpdate);
    return () => socket.off('user_update', handleUserUpdate);
  });

  useEffect(() => {
    const handleCorrectTrack = t => setCorrectTrack(t);
    const handleIncorrectTrack = () => setTrack('');
    const handleCorrectArtist = a => setCorrectArtist(a.join(', '));
    const handleIncorrectArtist = () => setArtist('');

    socket.on('correct_track', handleCorrectTrack);
    socket.on('incorrect_track', handleIncorrectTrack);
    socket.on('correct_artist', handleCorrectArtist);
    socket.on('incorrect_artist', handleIncorrectArtist);

    return () => {
      socket.off('correct_track', handleCorrectTrack);
      socket.off('incorrect_track', handleIncorrectTrack);
      socket.off('correct_artist', handleCorrectArtist);
      socket.off('incorrect_artist', handleIncorrectArtist);
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
              <form onSubmit={e => handleSubmitTrack(e)}>
                <TextField
                  fullWidth
                  disabled={correctTrack !== null}
                  variant="outlined"
                  label="Song name"
                  value={correctTrack || track}
                  onChange={e => setTrack(e.target.value)}
                  InputProps={{
                    startAdornment:
                    correctTrack && <InputAdornment position="start">
                      <CheckIcon />
                    </InputAdornment>
                }}
                />
              </form>
              <form onSubmit={e => handleSubmitArtist(e)}>
                <TextField
                  fullWidth
                  disabled={correctArtist !== null}
                  variant="outlined"
                  label="Artist name"
                  value={correctArtist || artist}
                  onChange={e => setArtist(e.target.value)}
                  InputProps={{
                    startAdornment:
                    correctArtist && <InputAdornment position="start">
                      <CheckIcon />
                    </InputAdornment>
                }}
                />
              </form>
          </div>
          <Player src={playerInfo.src} seekTime={playerInfo.seek} />
        </div>
        <Chat />
      </div>
    </div>
  );
}

export default Main;
