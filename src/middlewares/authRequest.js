import { callApiJSON } from "../helpers/api";

const requestMiddleware = ({ getState, dispatch }) => {
  return next => action => {
    if (action.type)
      return next(action);
    const { configs } = action;

    // const { user } = getState();
    // const { tokenType, token } = user;
    const tokenType = 'Bearer';
    const token = '...';

    dispatch(callApiJSON({
      ...configs,
      headers: {
        ...configs.headers,
        Authorization: `${tokenType} ${token}`,
      }
    }))
    
  }
}

export default requestMiddleware;