import { HTTP_CODES, MESSAGE, safeParseString } from '../utils';
import * as ses from '../utils/ses';
import {
  createTemplateSchema,
  getTemplateSchema,
} from '../utils/validation-schema';

/**
 * @typedef {Promise<import('../utils').Response>} Response
 *
 * @param {{ name: string }} queryStringParameters
 * @returns {Response}
 */
export async function handleGetTemplate(queryStringParameters) {
  if (!queryStringParameters.name) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: MESSAGE.BAD_REQUEST_NO_DATA,
    };
  }

  const {
    error,
    value: { name },
  } = getTemplateSchema.validate({ name: queryStringParameters.name });

  if (error) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: error.details,
    };
  }

  try {
    const result = await ses.getTemplate(name);

    return {
      statusCode: HTTP_CODES.SUCESS,
      body: result,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: MESSAGE.SERVER_ERROR,
  };
}

/**
 * @param {string} body
 * @returns {Response}
 */
export async function handleCreateTemplate(body) {
  const data = safeParseString(body, false);

  if (!data) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: MESSAGE.BAD_REQUEST_NO_DATA,
    };
  }

  const {
    error,
    value: { name, subject, html },
  } = createTemplateSchema.validate(data);

  if (error) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: error.details,
    };
  }

  try {
    const result = await ses.createTemplate({ name, subject, html });
    return {
      statusCode: HTTP_CODES.SUCESS,
      body: result,
    };
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: MESSAGE.SERVER_ERROR,
  };
}
