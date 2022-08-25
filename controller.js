import { authCheck, HTTP_CODES } from './utils';
import * as services from './services';

export const request = async (event) => {
  const {
    body,
    headers: { authorization },
    requestContext: {
      http: { method, path },
    },
  } = event;

  if (!authCheck(authorization)) {
    return {
      statusCode: HTTP_CODES.UNAUTHORIZED_REQUEST,
      body: `Unauthorized Request`,
    };
  }

  const endpoints = getEndpoints(method);

  if (endpoints.hasOwnProperty(path)) {
    return endpoints[path](body);
  }

  return {
    statusCode: HTTP_CODES.NOT_FOUND,
    body: 'Endpoint not found.',
  };
};

const ENDPOINTS = {
  EMAIL: '/email',
  TEMPLATE: '/template',
};

/**
 * @typedef Response
 * @prop {number} statusCode
 * @prop {any} body
 *
 * @typedef {Object.<string, (body: string) => Promise<Response>>} EndPoint
 */

const DEFAULT_RESPONSE = Promise.resolve({
  statusCode: 404,
  body: 'Unsupported Endpoint',
});

/**
 * @type {EndPoint}
 */
const POST_ENPOINTS = {
  [ENDPOINTS.EMAIL]: services.handleSendBulkEmail,
  [ENDPOINTS.TEMPLATE]: () => DEFAULT_RESPONSE,
};

/**
 * @type {EndPoint}
 */
const GET_ENDPOINTS = {
  [ENDPOINTS.TEMPLATE]: () => DEFAULT_RESPONSE,
};

/**
 *
 * @param {'POST' | 'GET'} method
 * @returns {EndPoint}
 */
function getEndpoints(method) {
  return method === 'POST' ? POST_ENPOINTS : GET_ENDPOINTS;
}
