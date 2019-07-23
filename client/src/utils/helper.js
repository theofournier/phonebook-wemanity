import moment from 'moment';

export function isEmpty(value) {
  return (
    value === undefined
    || value === null
    || (typeof value === 'object' && Object.keys(value).length === 0)
    || (typeof value === 'string' && value.trim().length === 0)
  );
}

export function isValidPhone(phone) {
  return phone.match('\\+[0-9]{2}\\s[0-9]{2}\\s[0-9]{6,}');
}

export function dateFormatting(dateStr) {
  return dateStr !== null && dateStr
    ? moment(dateStr).format('YYYY/MM/DD')
    : '';
}

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
