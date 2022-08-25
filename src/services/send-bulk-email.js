import { ses } from '../utils/ses';
import { CONFIG } from '../utils/config';
import { emailSchema } from '../utils/validation-schema';
import { chunk, HTTP_CODES, safeParseString } from '../utils';
import { TEMPLATES } from './template';

/**
 * @typedef Destination
 * @prop {object} Destination
 * @prop {string[]} Destination.ToAddresses
 *
 * @param {string[]} toArray
 * @returns {Destination[]}
 */
function toBulkDestination(toArray) {
  return toArray.map((email) => ({
    Destination: {
      ToAddresses: [email],
    },
  }));
}

/**
 *
 * @param {object} param
 * @param {string} param.fromName
 * @param {string[]} param.recipients
 * @param {string} param.subject
 * @param {string} param.html
 * @param {string} [param.template]
 * @returns
 */
function sendBulkTemplatedEmail({
  fromName,
  recipients,
  subject,
  html,
  template = TEMPLATES.BASIC,
}) {
  return ses
    .sendBulkTemplatedEmail({
      Destinations: toBulkDestination(recipients),
      Template: template,
      DefaultTemplateData: JSON.stringify({ subject, html }),
      Source: `"${fromName}" <${CONFIG.ORIGIN_EMAIL}>`,
      ReplyToAddresses: [CONFIG.ORIGIN_EMAIL],
    })
    .promise();
}

/**
 *
 * @param {string} body
 */
export async function handleSendBulkEmail(body) {
  const data = safeParseString(body, false);

  if (!data) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: `No data received`,
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
      await sendBulkTemplatedEmail({
        fromName,
        recipients: batch,
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
    body: `Server error occured`,
  };
}
