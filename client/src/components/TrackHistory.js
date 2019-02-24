import React from 'react';
import { makeStyles } from '@material-ui/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import { Scrollbars } from 'react-custom-scrollbars';

import TrackCard from './TrackCard';

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: '400px',
    overflow: 'auto'
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
            <ListItem key={title + artist}>
              <TrackCard title={title} artist={artist} image={image} />
            </ListItem>
          ))}
        </List>
      </Scrollbars>
    </Paper>
  );
}

export default TrackHistory;
