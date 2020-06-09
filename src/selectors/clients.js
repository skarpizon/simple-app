import { createSelector } from 'reselect';
import { sortBy } from 'lodash-es';
import { formatClient } from '../helpers/utils';

const getItems = ({ items }) => items;
const getData = ({ data }) => data;

const clientsSelector = createSelector(
  getItems,
  (items) => {
    if (!items || !items.length)
      return [];
    
    return sortBy(
      items.map((item) => formatClient(item)), 
      (item) => { return item.surname; }
    );
  }
);

const clientInfoSelector = createSelector(
  getData,
  (data) => {
    const { name, surname, middleName, phone, email, car, carVin } = data;
    return {
      name,
      surname,
      middle_name: middleName,
      phone,
      email,
      car,
      car_vin: carVin
    };
  }
);

export {
  clientsSelector,
  clientInfoSelector,
};