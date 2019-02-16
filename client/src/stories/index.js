import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import MemberList from '../components/MemberList';

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
