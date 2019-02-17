import React, { useRef, useEffect, useState, useMemo } from 'react';
import throttle from 'lodash/throttle';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';

const useStyles = makeStyles(theme => ({
  root: {
    width: '400px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  wrapper: {
    width: '100%'
  },
  icon: {
    animation: 'dance 2500ms infinite',
    animationName: '$dance',
    color: theme.palette.primary
  },
  '@keyframes dance': {
    '12%': {
      transform: 'translate(10px, -5px) rotate(-20deg)'
    },
    '24%': {
      transform: 'translate(0px, 0px) rotate(0deg)'
    },
    '36%': {
      transform: 'translate(5px, -5px) rotate(-20deg)'
    },
    '48%': {
      transform: 'translate(0px, 0px) rotate(0deg)'
    },
    '60%': {
      transform: 'translate(-7px, -5px) rotate(20deg)'
    },
    '72%': {
      transform: 'translate(0px, 0px) rotate(0deg)'
    },
    '84%': {
      transform: 'translate(-5px, -5px) rotate(20deg)'
    },
    '96%': {
      transform: 'translate(0px, 0px) rotate(0deg)'
    }
  }
}));

function Player({ src, seekTime }) {
  const classes = useStyles();
  const audioEl = useRef(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const handleReady = () => {
    audioEl.current.currentTime = seekTime / 1000;
    audioEl.current.removeEventListener('canplay', handleReady);
  };

  const handleTimeUpdate = useMemo(
    () =>
      throttle(() => {
        const { duration, currentTime } = audioEl.current;
        const newProgress = (currentTime / duration) * 100;
        const newTimeLeft = Math.round(duration - currentTime);
        setTimeLeft(newTimeLeft);
        setProgress(newProgress);
      }, 1000),
    []
  );

  useEffect(() => {
    audioEl.current.addEventListener('canplay', handleReady);
    return () => {
      audioEl.current.removeEventListener('canplay', handleReady);
    };
  }, [src]);

  return (
    <div>
      <audio
        autoPlay
        ref={audioEl}
        preload="auto"
        onTimeUpdate={() => handleTimeUpdate()}
      >
        <track kind="captions" />
        <source src={src} type="audio/mp3" />
      </audio>
      <div className={classes.root}>
        <MusicNoteIcon className={classes.icon} fontSize="large" />
        <div className={classes.wrapper}>
          <LinearProgress variant="determinate" value={progress} />
        </div>
        <Typography align="center" variant="h2" component="h2">
          {timeLeft}
        </Typography>
      </div>
    </div>
  );
}

export default Player;
