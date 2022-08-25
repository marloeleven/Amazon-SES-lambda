import { authCheck, DEFAULT_RESPONSE, HTTP_CODES } from './utils';
import * as services from './services';

const ENDPOINTS = {
  EMAIL: '/email',
  TEMPLATE: '/template',
};

/**
 * @typedef {import('./utils').EndPoint} EndPoint
 *
 * @type {EndPoint}
 */
const POST_ENPOINTS = {
  [ENDPOINTS.EMAIL]: services.handleSendBulkEmail,
  [ENDPOINTS.TEMPLATE]: services.handleCreateTemplate,
};

/**
 * @type {EndPoint}
 */
const GET_ENDPOINTS = {
  [ENDPOINTS.TEMPLATE]: services.handleGetTemplate,
};

/**
 *
 * @param {'POST' | 'GET'} method
 * @returns {EndPoint}
 */
function getEndpoints(method) {
  return method === 'POST' ? POST_ENPOINTS : GET_ENDPOINTS;
}

/**
 *
 * @param {object} event
 * @param {string} event.body
 * @param {{ authorization: string }} event.headers
 * @param {{ http: { method: 'POST' | 'GET', path: string } }} event.requestContext
 *
 * @returns
 */
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
