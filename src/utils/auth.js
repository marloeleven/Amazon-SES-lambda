import { CONFIG } from './config';

/**
 * @param {string} authorization
 * @returns {boolean}
 */
export function authCheck(authorization) {
  const [_, token] = authorization.split(' ');

  return token === CONFIG.AUTH_TOKEN;
}
