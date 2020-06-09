import { chunk, map, isNumber } from 'lodash-es';

const formatClient = (client) => { 
  const { name, surname, middle_name } = client;
  return {
    ...client, 
    firstLetter: surname ? surname[0] : '',
    title: `${surname? surname + ' ' : ''}${name && name[0]? name[0] + '. ' : ''}${middle_name && middle_name[0] ? middle_name[0] + '.' : ''}`,
  };
};

const parseClientFromOption = (option) => {
  if (!option) return null;
  const { middle_name, car_vin, ...other } = option;
  return {
    ...other,
    middleName: middle_name,
    carVin: car_vin,
  };
};

const formatNumber = (num, digits = 3) => {
  if (!isNumber(num)) {
    return '';
  }
  const [realPart, floatPart] = `${num}`.split('.');
  const chunks = chunk(`${realPart}`.split('').reverse(), digits);
  const realPartRes = map(chunks, x => x.reverse().join(''))
    .reverse()
    .join('\u2009');
  return `${realPartRes}${floatPart ? `,${floatPart}` : ''}`;
};

export {
  formatClient,
  parseClientFromOption,
  formatNumber,
};