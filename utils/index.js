import { CONFIG } from './config';

/**
 * @param {string} base64EncodedBody
 * @returns {object}
 */
export function toObject(base64EncodedBody) {
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
 * @param {string} base64EncodedBody
 * @param {T | any} defaultValue
 * @returns
 */
export function parseFromString(base64EncodedBody, defaultValue = {}) {
  try {
    return toObject(base64EncodedBody);
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
