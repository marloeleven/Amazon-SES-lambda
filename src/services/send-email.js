import * as ses from '../utils/ses';
import { emailSchema } from '../utils/validation-schema';
import { HTTP_CODES, MESSAGE, safeParseString } from '../utils';

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
    for (const email of recipients) {
      await ses.sendEmail({
        fromName,
        recipients: [email],
        subject,
        html,
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
