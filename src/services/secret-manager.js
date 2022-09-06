import { HTTP_CODES, MESSAGE, safeParseString } from '../utils';
import { CONFIG } from '../utils/config';
import * as ses from '../utils/ses';

/**
 * @typedef {Promise<import('../utils').Response>} Response
 *
 * @returns {Response}
 */
export async function handleGetSecrets() {
  try {
    const data = await ses.getSecrets();

    if ('SecretString' in data) {
      const result = safeParseString(data.SecretString, false);

      if (result) {
        CONFIG.AUTH_TOKEN = result.AUTH_TOKEN;
        CONFIG.CHUNK_SIZE = result.CHUNK_SIZE;
        CONFIG.ORIGIN_EMAIL = result.ORIGIN_EMAIL;

        return {
          statusCode: HTTP_CODES.SUCESS,
          body: 'Secret keys are updated',
        };
      }

      return {
        statusCode: HTTP_CODES.SERVER_ERROR,
        body: 'Unable to parse Secret value',
      };
    }

    return {
      statusCode: HTTP_CODES.SERVER_ERROR,
      body: 'Unable to fetch secret keys',
    };
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: MESSAGE.SERVER_ERROR,
  };
}
