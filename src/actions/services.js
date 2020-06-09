import { getServicesUrl } from "../selectors/urls";
import { getJSON } from 'redux-api-middleware';
import { callAuthApiJSON } from '../helpers/api';
import { formatServicesData } from '../helpers/data';

const REQUEST_SERVICES = 'REQUEST_SERVICES';
const SUCCESS_SERVICES = 'SUCCESS_SERVICES';
const FAILURE_SERVICES = 'FAILURE_SERVICES';

const REQUEST_SAVE_SERVICE = 'REQUEST_SAVE_SERVICE';
const SUCCESS_SAVE_SERVICE = 'SUCCESS_SAVE_SERVICE';
const FAILURE_SAVE_SERVICE = 'FAILURE_SAVE_SERVICE';


const getServices = () => (dispatch, getState) => {
  const request = {
    endpoint: getServicesUrl(),
    types: [
      REQUEST_SERVICES,
      {
        type: SUCCESS_SERVICES,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => formatServicesData(json));
        },
      },
      FAILURE_SERVICES,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

const saveService = (data) => (dispatch, getState) => {
  const { id, ...other } = data;
  
  const request = {
    method: id ? 'PUT' : 'POST',
    endpoint: getServicesUrl(id),
    // data: clientInfoSelector({ data: other }),
    types: [
      REQUEST_SAVE_SERVICE,
      {
        type: SUCCESS_SAVE_SERVICE,
        payload: (action, s, res) => {
          return getJSON(res)
            .then(json => json);
        },
      },
      FAILURE_SAVE_SERVICE,
    ],
  };
  return dispatch(callAuthApiJSON(request));
};

export {
  REQUEST_SERVICES,
  SUCCESS_SERVICES,
  FAILURE_SERVICES,
  REQUEST_SAVE_SERVICE, 
  SUCCESS_SAVE_SERVICE, 
  FAILURE_SAVE_SERVICE,
  getServices,
  saveService,
};