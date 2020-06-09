import queryString from 'qs';
import { createAction } from 'redux-api-middleware';

const callApi = ({
  types,
  headers,
  endpoint,
  data,
  method = 'GET',
}) => createAction({
  endpoint: endpoint + (method === 'GET' && data ? `?${queryString.stringify(data, {
    skipNulls: true,
    arrayFormat: 'repeat',
  })}` : ''),
  method,
  headers: {
    ...headers,
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
  },
  body: method !== 'GET' ? queryString.stringify(data, {
    skipNulls: true,
    arrayFormat: 'repeat',
  }) : undefined,
  types: [
    (types && types[0]) || 'REQUEST',
    (types && types[1]) || 'SUCCESS',
    (types && types[2]) || {
      type: 'FAILURE',
      meta: (action, state, res) => {
        if (res && !res.ok) {
          return {
            failedAction: action,
          };
        }
        return {};
      },
    },
  ],
});

const callApiJSON = ({
  types,
  headers,
  endpoint,
  data,
  method = 'GET',
}) => createAction({
  endpoint: endpoint + (method === 'GET' && data ? `?${queryString.stringify(data, {
    skipNulls: true,
    arrayFormat: 'repeat',
  })}` : ''),
  method,
  headers: {
    ...headers,
    'Content-Type': 'application/json',
  },
  body: method !== 'GET' ? JSON.stringify(data) : undefined,
  types: [
    (types && types[0]) || 'REQUEST',
    (types && types[1]) || 'SUCCESS',
    (types && types[2]) || {
      type: 'FAILURE',
      meta: (action, state, res) => {
        if (res && !res.ok) {
          return {
            failedAction: action,
          };
        }
        return {};
      },
    },
  ],
});

const callAuthApiJSON = (configs) => {
  return {
    configs,
  };
};

export {
  callApi,
  callApiJSON,
  callAuthApiJSON,
};
