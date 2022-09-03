import { HTTP_CODES, MESSAGE } from '../utils';
import * as ses from '../utils/ses';

/**
 * @typedef {Promise<import('../utils').Response>} Response
 *
 * @returns {Response}
 */
export async function handleGetSecrets() {
  try {
    const data = ses.getSecrets();

    // if ('SecretString' in data) {
    //   // secret = data.SecretString;
    // }

    console.log(data);

  return {
    statusCode: HTTP_CODES.SUCESS,
    body: data
  }
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

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: MESSAGE.SERVER_ERROR
  }
}
