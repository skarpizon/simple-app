import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import clients from './clients';
import services from './services';
import users from './users';

const getRootReducer = (history) => {
  const reduxHistory = { ...history };
  const appReducer = combineReducers({
    reduxHistory: (state = reduxHistory) => ({
      ...reduxHistory,
      ...state,
    }),
    router: connectRouter(history),
    // Other reducers
    clients,
    services,
    users,
  });
  const rootReducer = (state, action) => appReducer(state, action);

  return rootReducer;
};

export default getRootReducer;
