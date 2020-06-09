import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import { apiMiddleware } from 'redux-api-middleware';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';
import createRootReducer from './reducers';
import authRequest from './middlewares/authRequest';

/* eslint-disable-next-line no-underscore-dangle */
const composeEnhancers =
  (__DEV__ &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export const history = createBrowserHistory();
  
export default function configureStore() {
  
  const store = createStore(
    createRootReducer(history),
    composeEnhancers(
      applyMiddleware(
        routerMiddleware(history), // for dispatching history actions
        thunk,
        apiMiddleware,
        authRequest,
      )
    )
  );

  return store;
}
