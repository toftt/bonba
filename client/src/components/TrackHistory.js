import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';
import { Scrollbars } from 'react-custom-scrollbars';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '400px',
    overflow: 'auto'
  },
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

function TrackHistory({ tracks }) {
  const classes = useStyles();

  return (
    <Paper elevation={4} className={classes.root}>
      <Scrollbars autoHeight autoHeightMax={380}>
        <List
          dense
          subheader={<ListSubheader disableSticky>TRACK HISTORY</ListSubheader>}
        >
          {tracks.map(({ title, artist, image }) => (
            <ListItem>
              <Card elevation={1} className={classes.card} key={title + artist}>
                <CardContent className={classes.content}>
                  <Typography
                    className={classes.typography}
                    component="h6"
                    variant="h6"
                  >
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
            </ListItem>
          ))}
        </List>
      </Scrollbars>
    </Paper>
  );
}

export default TrackHistory;
