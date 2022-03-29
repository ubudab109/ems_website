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