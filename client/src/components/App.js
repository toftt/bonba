import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Root from './Root';

const theme = createMuiTheme();

const App = () => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <CssBaseline />
      <Root />
    </React.Fragment>
  </ThemeProvider>
);

export default App;
