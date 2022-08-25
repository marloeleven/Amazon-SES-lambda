export const HTTP_CODES = {
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED_REQUEST: 401,
  SUCESS: 200,
};

/**
 * @typedef Response
 * @prop {number} statusCode
 * @prop {any} body
 *
 * @typedef {Object.<string, (body: string) => Promise<Response>>} EndPoint
 */

export const DEFAULT_RESPONSE = Promise.resolve({
  statusCode: 404,
  body: 'Unsupported Endpoint',
});

/**
 * @template T
 *
 * @param {string} jsonStr
 * @param {T | any} defaultValue
 * @returns
 */
export function safeParseString(jsonStr, defaultValue = {}) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return defaultValue;
  }
}

/**
 * @param {string[]} array
 * @param {number} size
 * @returns {string[][]}
 */
export function chunk(array, size) {
  const newArray = [];
  for (let i = 0; i < array.length; i += size) {
    newArray.push(array.slice(i, i + size));
  }
  return newArray;
}
