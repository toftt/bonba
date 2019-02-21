import React from 'react';
import { configure, addDecorator } from '@storybook/react';

import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

function loadStories() {
  require('../src/stories');
}

const theme = createMuiTheme();

addDecorator(story => <ThemeProvider theme={theme}>{story()}</ThemeProvider>);

configure(loadStories, module);
