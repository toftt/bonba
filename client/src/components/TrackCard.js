import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles(() => ({
  card: {
    display: 'flex',
    width: '100%'
  },
  cover: {
    flex: '0 0 72px'
  },
  content: {
    flex: '1 1 auto',
    minWidth: '0px',
    padding: '6px',
    paddingLeft: '20px'
  },
  typography: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}));

function TrackCard({ title, artist, image }) {
  const classes = useStyles();

  return (
    <Card elevation={1} className={classes.card}>
      <CardContent className={classes.content}>
        <Typography className={classes.typography} component="h6" variant="h6">
          {title}
        </Typography>
        <Typography
          className={classes.typography}
          variant="subtitle1"
          color="textSecondary"
        >
          {artist}
        </Typography>
      </CardContent>
      <CardMedia
        className={classes.cover}
        image={image}
        title={`cover for ${title} by ${artist}`}
      />
    </Card>
  );
}

export default TrackCard;
