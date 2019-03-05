import React, { useRef, useEffect, useState } from 'react';
import { Howl, Howler } from 'howler';
import { makeStyles } from '@material-ui/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import IconButton from '@material-ui/core/IconButton';
import Slider from '@material-ui/lab/Slider';

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
  slider: {
    padding: '24px 0px'
  },
  sliderRoot: {
    width: '30%'
  },
  volumeContainer: {
    display: 'flex',
    width: '100%',
    justifyContent: 'flex-end'
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
  const track = useRef(null);
  const [progress, setProgress] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [volume, setVolume] = useState(0.05);
  const [muted, setMuted] = useState(false);

  const handleTimeUpdate = () => {
    if (track.current.state() !== 'loaded') {
      setProgress(0);
      setTimeLeft(0);
      return;
    }

    const seek = track.current.seek();
    const duration = track.current.duration();

    const newProgress = (seek / duration) * 100;
    const newTimeLeft = Math.round(duration - seek);

    setProgress(newProgress);
    setTimeLeft(newTimeLeft);
  };

  useEffect(() => {
    if (src) {
      const howl = new Howl({
        src,
        volume,
        mute: muted,
        format: ['mp3'],
      });
      track.current = howl;

      howl.once('load', () => howl.seek(seekTime));
      howl.once('seek', () => howl.play());

      const id = setInterval(() => handleTimeUpdate(), 50);
      return () => {
        howl.unload();
        clearInterval(id);
      }
    }
    return () => {};
  }, [src, seekTime]);

  useEffect(() => {
    if (track.current) track.current.volume(volume);
  }, [volume]);

  useEffect(() => {
    if (track.current) track.current.mute(muted);
  }, [muted])

  return (
    <div>
      <div className={classes.root}>
        <MusicNoteIcon className={classes.icon} fontSize="large" />
        <div className={classes.wrapper}>
          <LinearProgress variant="determinate" value={progress} />
        </div>
        <div className={classes.volumeContainer}>
          <IconButton onClick={() => setMuted(!muted)}>
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
          <Slider
            className={classes.sliderRoot}
            classes={{ container: classes.slider }}
            value={volume}
            min={0}
            max={1}
            step={0.05}
            onChange={(_, value) => setVolume(value)}
          />
        </div>
        <Typography align="center" variant="h2" component="h2">
          {timeLeft}
        </Typography>
      </div>
    </div>
  );
}

export default Player;
