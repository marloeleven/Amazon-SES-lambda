import { CONFIG } from './utils/config';

const aws = require('aws-sdk');

const ses = new aws.SES({ region: 'us-west-2' });

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
  return ses.sendEmail({
    Destination: {
      ToAddresses: recipients,
    },
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
  });
}
