import { HTTP_CODES, parseEncodedBody } from '../utils';
import { ses } from '../utils/ses';
import { templateSchema } from '../utils/validation-schema';

/**
 * @typedef {Promise<import('../utils').Response>} Response
 */

export const TEMPLATES = {
  BASIC: 'BASIC_TEMPLATE',
};

/**
 *
 * @param {string} name
 * @returns {Response}
 */
async function getTemplate(name) {
  try {
    const result = await ses
      .getTemplate({
        TemplateName: name,
      })
      .promise();

    return {
      statusCode: HTTP_CODES.SUCESS,
      body: result,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: `An error occured`,
  };
}

/**
 * @param {string} body
 * @returns {Response}
 */
export async function handleGetTemplate(body) {
  const data = parseEncodedBody(body, false);

  if (!data) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: `No data received`,
    };
  }

  const {
    error,
    value: { name },
  } = templateSchema.validate({ name: data.name });

  if (error) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: error.details,
    };
  }

  return getTemplate(name);
}

/**
 * @param {object} param
 * @param {string} param.name
 * @param {string} param.subject
 * @param {string} param.html
 * @returns {Response}
 */
async function createTemplate({
  name,
  subject = '{{subject}}',
  html = '{{html}}',
}) {
  try {
    const result = await ses
      .createTemplate({
        Template: {
          TemplateName: name,
          HtmlPart: html,
          SubjectPart: subject,
        },
      })
      .promise();

    return {
      statusCode: HTTP_CODES.SUCESS,
      body: result,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: `An error occured`,
  };
}

/**
 * @param {string} body
 * @returns {Response}
 */
export async function handleCreateTemplate(body) {
  const data = parseEncodedBody(body, false);

  if (!data) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: `No data received`,
    };
  }

  const {
    error,
    value: { name, subject, html },
  } = templateSchema.validate(data);

  if (error) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: error.details,
    };
  }

  return createTemplate({ name, subject, html });
}
