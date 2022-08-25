import aws from 'aws-sdk';
import { TEMPLATES } from '../utils';
import { CONFIG } from './config';

const ses = new aws.SES({ region: 'us-west-2' });

/**
 * @typedef {Promise<import('../utils').Response>} Response
 */

/**
 *
 * @param {string} name
 */
export function getTemplate(name) {
  return ses
    .getTemplate({
      TemplateName: name,
    })
    .promise();
}

/**
 * @param {object} param
 * @param {string} param.name
 * @param {string} param.subject
 * @param {string} param.html
 */
export async function createTemplate({
  name,
  subject = '{{subject}}',
  html = '{{html}}',
}) {
  return ses
    .createTemplate({
      Template: {
        TemplateName: name,
        HtmlPart: html,
        SubjectPart: subject,
      },
    })
    .promise();
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
export function sendBulkTemplatedEmail({
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
