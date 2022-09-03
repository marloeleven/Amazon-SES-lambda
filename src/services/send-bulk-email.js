import * as ses from '../utils/ses';
import { CONFIG } from '../utils/config';
import { emailSchema } from '../utils/validation-schema';
import { chunk, HTTP_CODES, MESSAGE, safeParseString } from '../utils';

/**
 * @typedef {Promise<import('../utils').Response>} Response
 *
 * @param {string} body
 * @returns {Response}
 */
export async function handleSendBulkEmail(body) {
  const data = safeParseString(body, false);

  if (!data) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: MESSAGE.BAD_REQUEST_NO_DATA,
    };
  }

  const {
    error,
    value: { fromName, recipients, subject, html },
  } = emailSchema.validate(data);

  if (error) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: error.details,
    };
  }

  try {
    const recipientsArray = chunk(recipients, CONFIG.CHUNK_SIZE);

    for (const batch of recipientsArray) {
      await ses
        .sendBulkTemplatedEmail({
          fromName,
          recipients: batch,
          subject,
          html,
        })
        .catch((error) => {
          console.error(error);
          // catching error here will prevent the loop from stopping
        });
    }

    return {
      statusCode: HTTP_CODES.SUCESS,
      body: 'Email sent successfully.',
    };
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: MESSAGE.SERVER_ERROR,
  };
}
