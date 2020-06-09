import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON } from '../helpers/api';
import { getUsersUrl } from "../selectors/urls";

const REQUEST_USERS = 'REQUEST_USERS';
const SUCCESS_USERS = 'SUCCESS_USERS';
const FAILURE_USERS = 'FAILURE_USERS';

const REQUEST_SAVE_USER = 'REQUEST_SAVE_USER';
const SUCCESS_SAVE_USER = 'SUCCESS_SAVE_USER';
const FAILURE_SAVE_USER = 'FAILURE_SAVE_USER';


const getUsers = () => (dispatch, getState) => {
  const request = {
    endpoint: getUsersUrl(),
    types: [
      REQUEST_USERS,
      {
        type: SUCCESS_USERS,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_USERS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const saveUser = (data) => (dispatch, getState) => {
  const { id, ...other } = data;
  
  const request = {
    method: id ? 'PUT' : 'POST',
    endpoint: getUsersUrl(id),
    // data: clientInfoSelector({ data: other }),
    types: [
      REQUEST_SAVE_USER,
      {
        type: SUCCESS_SAVE_USER,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_SAVE_USER,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  REQUEST_USERS,
  SUCCESS_USERS,
  FAILURE_USERS,
  REQUEST_SAVE_USER, 
  SUCCESS_SAVE_USER, 
  FAILURE_SAVE_USER,
  getUsers,
  saveUser,
};