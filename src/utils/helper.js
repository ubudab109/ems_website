import { MONTH_LIST } from "./constant"

/**
 * Set localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  return window.localStorage.setItem(name, content)
}

/**
 * Get localStorage
 */
export const getStore = (name) => {
  if (!name) return
  return localStorage.getItem(name)
}

/**
 * Clear localStorage
 */
export const removeItem = (name) => {
  if (!name) return
  return window.localStorage.removeItem(name)
}

/**
 * Clearr All Storage
 */
export const clearAllItem = () => {
  return window.localStorage.clear();
}

/**
 * Validate Email address
 */
export const isValidEmail = (value) => {
  return !(value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value))
}

/**
 * Format Phone Number
 */
export const formatPhoneNumber = (value) => {
  if (!value) return
  const currentValue = value.replace(/[^\d]/g, '');
  const mobileNoLength = currentValue.length;
  if (mobileNoLength >= 7) {
    if (mobileNoLength < 4) return currentValue;
    if (mobileNoLength < 7) return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3)}`;
    return `(${currentValue.slice(0, 3)}) ${currentValue.slice(3, 6)}-${currentValue.slice(6, 10)}`;
  } else {
    return currentValue;
  }
}


/**
 * Rupiah Format
 */

export const rupiah = (number) => {
  if (number) {
    var rupiah = "";
    var numberrev = number.toString().split("").reverse().join("");
    for (var i = 0; i < numberrev.length; i++)
      if (i % 3 === 0) rupiah += numberrev.substr(i, 3) + ".";
    return (
      "Rp. " + rupiah.split("", rupiah.length - 1).reverse().join("")
    );
  } else {
    return number;
  }
}

/**
 * Uppercase first letter
 */
export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Unique Array On Concat
 */
export const arrayUnique = (array) => {
  var a = array.concat();
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j])
        a.splice(j--, 1);
    }
  }

  return a;
}

/**
 * Helper method for creating a range of numbers
 * range(1, 5) => [1, 2, 3, 4, 5]
 */
export const range = (from, to, step = 1) => {
  let i = from;
  const range = [];

  while (i <= to) {
    range.push(i);
    i += step;
  }

  return range;
}

/**
 * check if value is string or not
 * @param {any} value 
 * @returns {Boolean}
 */
export const isString = (value) => {
  if (typeof value === 'string' || value instanceof String) {
    return true;
  }
  return false;
}

/**
 * Check if current role has permission to access some menu
 * @param {Array} permission 
 * @param {String} permissionName 
 * @returns {Boolean}
 */
export const isActionAllowed = (permission, permissionName) => {
  let permissionIndex = permission.filter(e => e.name === permissionName)[0];
  if (permissionIndex !== null) {
    return permissionIndex.is_assigned;
  } else {
    return false;
  }
}

/**
 * Sum value integer in array
 * @param {Array} array 
 * @returns {Integer}
 */
export const sumArray = (array) => {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }
  return sum;
}


/**
 * Set Error Messages
 * @param {number} status 
 * @returns 
 */
export const setMessageError = (status) => {
  let messages;
  if (status === 404) {
    messages = 'Data Not Found. Please Refresh Your Page To Get Freshly Data';
  } else if (status === 500) {
    messages = 'Internal Server Error. Please Try Again Later';
  } else if (status === 422) {
    messages = 'Form Invalid. Please Check Your Input';
  }

  return messages;
}

/**
 * Replace the first letter of each word with its uppercase equivalent.
 * @param {string} - The string to be converted.
 * @returns the string with the first letter of each word capitalized.
 */
export const ucwords = (str) => {
  return (str + '').replace(/^([a-z])|\s+([a-z])/g, function ($1) {
      return $1.toUpperCase();
  });
}


/**
 * It returns an array of objects with the value and label properties set to the same value as the
 * index of the array.
 * @param {any} - the name of the select box
 * @returns An array of objects.
 */
export const datePerMonth = (name = null) => {
  let date = [];
  for (let i = 1; i <= 31; i++) {
    if (name !== null) {
      date.push({
        name: name,
        value: i,
        label : i,
      });
    } else {
      date.push({
        value: i,
        label : i,
      });
    }
  }

  return date;
}

/**
 * It takes a name and a total number of days and returns an array of objects with the name, value, and
 * label properties.
 * @param {any} - the name of the object
 * @param {number} - The total number of days you want to generate.
 * @returns An array of objects.
 */
export const daysForCuts = (total, keyData = null, name = null) => {
  let days = [];
  for (let i = 1; i <= total; i++) {
    if (name !== null && keyData !== null) {
      days.push({
        name: name,
        keyData: keyData,
        value: i,
        label: i + ' days',
      });
    } else {
      days.push({
        value: i,
        label: i + ' days',
      });
    }
  }

  return days;
}

/**
 * It takes an array of arrays, and returns the sum of all the numbers in the array
 */
export const arraySum = arr => arr.reduce((partialSum, array) => partialSum + array, 0);

/**
 * Check whether the data is null or not
 * @param {any} data 
 * @returns 
 */
export const isNull = data => data === null;

/**
 * It takes a string date, converts it to a Date object, gets the day, month and year, and returns a
 * string with the day, month and year.
 * @returns A string with the day, month and year.
 */
export const formatedDate = stringDate => {
  const date = new Date(stringDate);
  const dayNumber = date.getDate();
  let day;
  if (dayNumber < 10) {
    day = `0${dayNumber}`;
  } else {
    day = dayNumber;
  }
  const month = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${MONTH_LIST[month].label_en} ${year}`;
}

/**
 * It takes a string of time in the format of "HH:MM" and returns a string of time in the format of
 * "HH.MM"
 * @param {string} stringTime
 * @returns A function that takes a string and returns a string.
 */
export const formatingTime = stringTime => {
  const arrString = stringTime.split(":");
  return `${arrString[0]}.${arrString[1]}`;
}

/**
 * conver string to time
 * @param {string} stringTime 
 * @returns A function that takes a string and returns a string.
 */
export const strToTime = stringTime => {
  const arrString = stringTime.split(":");
  return `${arrString[0]}:${arrString[1]}`;
}


/**
 * It creates an array of objects with the value and label properties set to the current year and the
 * current year plus 70.
 * @returns An array of objects.
 */
export const yearsOption = () => {
  const date = new Date();
  const currentYear = date.getFullYear() - 4;
  const latestYearData = currentYear + 70;
  let data = [];
  for (let i = currentYear; i < latestYearData; i++) {
    let option = {
      value: i,
      label: i,
    };

    data.push(option);
  }
  return data;
}