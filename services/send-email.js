import { CONFIG } from '../utils/config';
import { ses } from '../utils/ses';

/**
 *
 * @param {object} param
 * @param {string} param.fromName
 * @param {string[]} param.recipients
 * @param {string} param.subject
 * @param {string} param.html
 * @returns
 */
export function sendEmail({ fromName, recipients, subject, html }) {
  return ses
    .sendEmail({
      Destination: {
        ToAddresses: recipients,
      },
      ReplyToAddresses: [CONFIG.ORIGIN_EMAIL],
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: html,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
      },
      Source: `"${fromName}" <${CONFIG.ORIGIN_EMAIL}>`,
    })
    .promise();
}
