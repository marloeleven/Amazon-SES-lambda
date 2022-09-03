export const HTTP_CODES = {
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  UNAUTHORIZED_REQUEST: 401,
  SUCESS: 200,
};

export const MESSAGE = {
  SERVER_ERROR: 'An error occured',
  BAD_REQUEST_NO_DATA: 'No data received',
};

export const TEMPLATES = {
  BASIC: 'BASIC_TEMPLATE',
};

/**
 * @typedef Response
 * @prop {number} statusCode
 * @prop {any} body
 *
 * @typedef PostEndPointHandler
 * @prop {boolean} auth
 * @prop {(body: string) => Promise<Response>} handler
 *
 * @typedef GetEndPointHandler
 * @prop {boolean} auth
 * @prop {(param: object) => Promise<Response>} handler
 *
 * @typedef {Object.<string, PostEndPointHandler>} PostEndPoint
 * @typedef {Object.<string, GetEndPointHandler>} GetEndPoint
 *
 * @typedef {PostEndPoint | GetEndPoint} EndPoints
 */

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
