import { HTTP_CODES } from './utils';
import { authCheck } from './utils/auth';
import { getEndpoints } from './routes';

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
