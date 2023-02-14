/**
 * @description method to convert an object to a http request query, (e.g. pageNumber=1&pageSize=2&...)
 * @param {Object} obj Object containing the keys and values that need to be mapped
 * @returns {string} GET query endpoint like: pageNumber=1&pageSize=2&...
 */
export const getQueryParams = (obj: Object): string => {
  if (!obj || Object.entries(obj).length === 0) return "";

  return Object.entries(obj)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
};
