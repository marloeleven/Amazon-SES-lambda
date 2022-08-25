import { CONFIG } from './config';

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
 * @param {string} base64EncodedBody
 * @returns {object}
 */
function toObject(base64EncodedBody) {
  const decodedStr = atob(base64EncodedBody);

  const urlParams = new URLSearchParams(decodedStr);
  const entries = urlParams.entries();

  const result = {};
  for (const [key, value] of entries) {
    result[key] = value;
  }
  return result;
}

/**
 * @template T
 *
 * @param {string} jsonStr
 * @param {T | any} defaultValue
 * @returns
 */
export function parseEncodedBody(jsonStr, defaultValue = {}) {
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    return defaultValue;
  }
}

/**
 * @param {string} authorization
 * @returns {boolean}
 */
export function authCheck(authorization) {
  const [_, token] = authorization.split(' ');

  return token === CONFIG.SECRET_KEY;
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
