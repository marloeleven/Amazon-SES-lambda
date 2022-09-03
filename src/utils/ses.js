import aws from 'aws-sdk';
import { TEMPLATES } from '../utils';
import { CONFIG } from './config';

const region = 'us-west-2';
const ses = new aws.SES({ region });
const sm = aws.SecretsManager({
  region,
  apiVersion: CONFIG.SECRET_MANAGER_API_VERSION,
});

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

export async function getSecrets() {
  try {
    const data = await sm.getSecretValue({
      para,
    });

    if ('SecretString' in data) {
      // secret = data.SecretString;
    }

    console.log(data);
  } catch (error) {
    if (error.code === 'DecryptionFailureException')
      // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw error;
    else if (error.code === 'InternalServiceErrorException')
      // An error occurred on the server side.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw error;
    else if (error.code === 'InvalidParameterException')
      // You provided an invalid value for a parameter.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw error;
    else if (error.code === 'InvalidRequestException')
      // You provided a parameter value that is not valid for the current state of the resource.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw error;
    else if (error.code === 'ResourceNotFoundException')
      // We can't find the resource that you asked for.
      // Deal with the exception here, and/or rethrow at your discretion.
      throw error;
  }
}
