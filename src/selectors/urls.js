const getApiRoot = () => __API_ROOT__;

const getClientsUrl = (id) => `${getApiRoot()}/clients${ id ? `/${id}` : ''}`;

const getServicesUrl = (id) => `${getApiRoot()}/services${ id ? `/${id}` : ''}`;

const getUsersUrl = (id) => `${getApiRoot()}/users${ id ? `/${id}` : ''}`;


export {
  getApiRoot,
  getClientsUrl,
  getServicesUrl,
  getUsersUrl,
};