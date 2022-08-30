import * as ses from '../utils/ses';
import { emailSchema } from '../utils/validation-schema';
import { chunk, HTTP_CODES, MESSAGE, safeParseString } from '../utils';
import { CONFIG } from '../utils/config';

/**
 *
 * @param {string} body
 */
export async function handleSendEmail(body) {
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

    await Promise.allSettled(
      recipientsArray.map((emails) =>
        ses.sendBulkTemplatedEmail({
          fromName,
          recipients: emails,
          subject,
          html,
        })
      )
    );

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
