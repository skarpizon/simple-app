import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import ScopedCssBaseline from '@material-ui/core/ScopedCssBaseline';
import configureStore from './configureStore';
import App from './containers/App';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import scssVars from './styles/variables.scss';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: scssVars.colorPrimaryMain,
      dark: scssVars.colorPrimaryDark,
      contrastText: scssVars.colorPrimaryMainContrast,
    },
  },
});

const store = configureStore();
const { reduxHistory } = store.getState();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={reduxHistory}>
      <ScopedCssBaseline>
        <ThemeProvider theme={theme}>
          <App />
        </ThemeProvider>
      </ScopedCssBaseline>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
