import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON } from '../helpers/api';
import { getClientsUrl } from "../selectors/urls";
import { clientInfoSelector } from "../selectors/clients";

const REQUEST_CLIENTS = 'REQUEST_CLIENTS';
const SUCCESS_CLIENTS = 'SUCCESS_CLIENTS';
const FAILURE_CLIENTS = 'FAILURE_CLIENTS';

const REQUEST_SAVE_CLIENT = 'REQUEST_SAVE_CLIENT';
const SUCCESS_SAVE_CLIENT = 'SUCCESS_SAVE_CLIENT';
const FAILURE_SAVE_CLIENT = 'FAILURE_SAVE_CLIENT';


const getClients = () => (dispatch, getState) => {
  const request = {
    endpoint: getClientsUrl(),
    types: [
      REQUEST_CLIENTS,
      {
        type: SUCCESS_CLIENTS,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_CLIENTS,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const saveClient = (data) => (dispatch, getState) => {
  const { id, ...other } = data;
  
  const request = {
    method: id ? 'PUT' : 'POST',
    endpoint: getClientsUrl(id),
    data: clientInfoSelector({ data: other }),
    types: [
      REQUEST_SAVE_CLIENT,
      {
        type: SUCCESS_SAVE_CLIENT,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_SAVE_CLIENT,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  REQUEST_CLIENTS,
  SUCCESS_CLIENTS,
  FAILURE_CLIENTS,
  REQUEST_SAVE_CLIENT, 
  SUCCESS_SAVE_CLIENT, 
  FAILURE_SAVE_CLIENT,
  getClients,
  saveClient,
};