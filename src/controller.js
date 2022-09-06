import { HTTP_CODES, TEMPLATES } from './utils';
import { authCheck } from './utils/auth';
import * as services from './services';

let initizalized = false;

async function ensureBasicTemplate() {
  try {
    return services.handleGetTemplate({ name: TEMPLATES.BASIC });
  } catch (error) {
    return services.handleCreateTemplate(
      JSON.stringify({
        name: TEMPLATES.BASIC,
        subject: '{{subject}}',
        html: '{{html}}',
      })
    );
  }
}

async function init() {
  return Promise.all([ensureBasicTemplate(), services.handleGetSecrets()]);
}

/**
 *
 * @param {object} event
 * @param {string} event.body
 * @param {{ authorization: string }} event.headers
 * @param {{ http: { method: 'POST' } }} event.requestContext
 * @param {object} [event.queryStringParameters]
 *
 * @returns
 */
export const request = async (event) => {
  const {
    body,
    headers: { authorization },
    requestContext: {
      http: { method },
    },
  } = event;

  if (!initizalized) {
    try {
      await init();
      initizalized = true;
      console.log('Initialization complete', initizalized);
    } catch (error) {
      console.error(error);
      return {
        statusCode: HTTP_CODES.SERVER_ERROR,
        body: `Unable to correctly initialized the server`,
      };
    }
  }

  if (method === 'POST') {
    if (!authCheck(authorization)) {
      return {
        statusCode: HTTP_CODES.UNAUTHORIZED_REQUEST,
        body: `Unauthorized Request`,
      };
    }

    console.log('Send Email', JSON.stringify(body));
    return services.handleSendBulkEmail(body);
  }

  return {
    statusCode: HTTP_CODES.NOT_FOUND,
    body: 'Endpoint not found.',
  };
};
