import moment from 'moment';
import { phoneRegex } from './config';

export function isEmpty(value) {
  return (
    value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0)
  );
}

export function isValidPhone(phone) {
  return phone.match(phoneRegex);
}

export function dateFormatting(dateStr) {
  return dateStr !== null && dateStr
    ? moment(dateStr).format('YYYY/MM/DD')
    : '';
}

// Check in an object, for each properties contained in searchKeys, if searchValue is contained in the properties
export function checkInclude(element, searchValue, searchKeys) {
  for (const k of searchKeys) {
    if (
      !isEmpty(element[k])
      && element[k]
        .toString()
        .toLowerCase()
        .includes(searchValue.toLowerCase())
    ) {
      return true;
    }
  }
  return false;
}

// Return a list filtered thanks to checkInclude function and a search value
export function search(listToSearch, searchValue, searchKeys) {
  try {
    const listTemp = [...listToSearch];
    if (searchValue && searchValue !== '') {
      return listTemp.filter((element) => checkInclude(element, searchValue, searchKeys));
    }
    return listTemp;
  } catch (error) {
    console.log(`Error on search : ${error}`);
    return listToSearch;
  }
}
