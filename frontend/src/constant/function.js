export const Gender = (value) => {
  let gender;
  if (value === 1) {
    gender = 'Men';
  } else if (value === 2) {
    gender = 'Women';
  } else {
    gender = 'Kid';
  }
  return gender;
};

export const DateType = (date) => {
  return new Date(date).getFullYear() + '-' + (new Date(date).getMonth() + 1) + '-' + new Date(date).getDate();
};
export const exceptionValue = (param) => {
  if (param) {
    return JSON.parse(param) ? JSON.parse(param) : [];
  }
};
export const arrayToStringValue = (param) => {
  if (param) {
    return JSON.stringify(param) ? JSON.stringify(param) : [];
  }
};
export const splitValue = (param) => {
  return Number(param?.split(',')) || '';
};

export const removeDuplicates = (array, key) => {
  let lookup = {};
  array.forEach((element) => {
    lookup[element[key]] = element;
  });
  return Object.keys(lookup).map((key) => lookup[key]);
};
