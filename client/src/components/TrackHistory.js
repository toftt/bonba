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
  const reverseTracks = tracks.slice().reverse();

  return (
    <Paper elevation={4} className={classes.root}>
      <Scrollbars autoHeight autoHeightMax={380}>
        <List
          dense
          subheader={<ListSubheader disableSticky>TRACK HISTORY</ListSubheader>}
        >
          {reverseTracks.map(({ round, track: { name, artists, image, preview_url: previewUrl }}) => (
            <ListItem key={previewUrl + round}>
              <TrackCard title={name} artist={artists.join(', ')} image={image} />
            </ListItem>
          ))}
        </List>
      </Scrollbars>
    </Paper>
  );
}

export default TrackHistory;
