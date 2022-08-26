import { HTTP_CODES, MESSAGE, safeParseString } from '../utils';
import * as ses from '../utils/ses';
import { templateSchema } from '../utils/validation-schema';

/**
 * @typedef {Promise<import('../utils').Response>} Response
 *
 * @param {string} body
 * @returns {Response}
 */
export async function handleGetTemplate(body) {
  const data = safeParseString(body, false);

  if (!data) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: MESSAGE.BAD_REQUEST_NO_DATA,
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
  } = templateSchema.validate(data);

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
