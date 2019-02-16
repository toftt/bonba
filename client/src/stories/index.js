import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import MemberList from '../components/MemberList';
import TrackList from '../components/TrackHistory';
import TrackHistory from '../components/TrackHistory';

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

storiesOf('MemberList', module).add('normal', () => (
  <MemberList members={members} />
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
