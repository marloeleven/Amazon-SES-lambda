import { HTTP_CODES } from './utils';
import { authCheck } from './utils/auth';
import { getEndpoints } from './routes';

/**
 *
 * @param {object} event
 * @param {string} event.body
 * @param {{ authorization: string }} event.headers
 * @param {{ http: { method: 'POST' | 'GET', path: string } }} event.requestContext
 * @param {object} [event.queryStringParameters]
 *
 * @returns
 */
export const request = async (event) => {
  const {
    body,
    headers: { authorization },
    queryStringParameters,
    requestContext: {
      http: { method, path },
    },
  } = event;

  const endpoints = getEndpoints(method);

  if (endpoints.hasOwnProperty(path)) {
    const { handler, auth } = endpoints[path];

    if (auth) {
      if (!authCheck(authorization)) {
        return {
          statusCode: HTTP_CODES.UNAUTHORIZED_REQUEST,
          body: `Unauthorized Request`,
        };
      }
    }

    return handler(body || queryStringParameters);
  }

  return {
    statusCode: HTTP_CODES.NOT_FOUND,
    body: 'Endpoint not found.',
  };
};
