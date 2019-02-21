import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import ScoreBoard from '../components/ScoreBoard';
import TrackHistory from '../components/TrackHistory';
import Player from '../components/Player';

storiesOf('Welcome', module).add('to Storybook', () => (
  <Welcome showApp={linkTo('Button')} />
));

storiesOf('Button', module)
  .add('with text', () => (
    <Button onClick={action('clicked')}>Hello Button</Button>
  ))
  .add('with some emoji', () => (
    <Button onClick={action('clicked')}>
      <span role="img" aria-label="so cool">
        😀 😎 👍 💯
      </span>
    </Button>
  ));

const members = [
  {
    nickname: 'Chris',
    points: 62
  },
  {
    nickname: 'Toft',
    points: 52
  },
  {
    nickname: 'James',
    points: 42
  }
];

storiesOf('ScoreBoard', module).add('normal', () => (
  <ScoreBoard members={members} />
));

const tracks = [
  {
    artist: 'Fanny Chan',
    title: 'KoKoKoKooooo',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  },
  {
    artist: 'The Boystreet backs',
    title: 'London Tomorrow',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  },
  {
    artist: 'The Boystreet backs',
    title: 'London Tomorrowwwwwwwwww',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  },
  {
    artist: 'The Boystreet backs',
    title: 'London Tomorrowbsbs',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  },
  {
    artist: 'The Boystreet backs',
    title: 'London ',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  },
  {
    artist: 'The Boystreet backs',
    title: 'London aa Tomorrow',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  },
  {
    artist: 'The Boystreet backs',
    title: 'London  IO Tomorrow',
    image: 'https://i.scdn.co/image/5a73a056d0af707b4119a883d87285feda543fbb'
  }
];

storiesOf('TrackHistory', module).add('spicy', () => {
  return <TrackHistory tracks={tracks} />;
});

const audioUrl =
  'https://p.scdn.co/mp3-preview/3eb16018c2a700240e9dfb8817b6f2d041f15eb1?cid=774b29d4f13844c495f206cafdad9c86';

storiesOf('Player', module).add('player', () => {
  return <Player src={audioUrl} seekTime={6020} />;
});
