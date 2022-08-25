import { authCheck, chunk, parseFromString } from './utils';
import * as service from './service';
import { validate } from './utils/validator/validator';
import { CONFIG } from './utils/config';

const HTTP_CODES = {
  SERVER_ERROR: 500,
  BAD_REQUEST: 400,
  UNAUTHORIZED_REQUEST: 401,
  SUCESS: 200,
};

export const sendEmail = async ({ body, headers: { authorization } }) => {
  if (!authCheck(authorization)) {
    return {
      statusCode: HTTP_CODES.UNAUTHORIZED_REQUEST,
      body: `Unauthorized Request`,
    };
  }

  const { fromName, recipients, subject, html } = parseFromString(body, {
    fromName: 'Neptune Mutual Blog',
    recipients: ['marlo@neptunemutual.com'],
    subject: 'Default Subject',
    html: 'This is a sample email',
  });

  const errors = validate([
    {
      label: 'From',
      value: fromName,
      rules: 'email|required',
    },
    {
      label: 'To',
      value: recipients,
      rules: 'array|required',
    },
    {
      label: 'Subject',
      value: subject,
      rules: 'string|required',
    },
    {
      label: 'Body',
      value: html,
      rules: 'string|required',
    },
  ]);

  if (Array.isArray(errors)) {
    return {
      statusCode: HTTP_CODES.BAD_REQUEST,
      body: errors.join('\\n'),
    };
  }

  try {
    const recipientsArray = chunk(recipients, CONFIG.CHUNK_SIZE);

    for (const batch of recipientsArray) {
      await Promise.all(
        batch.map((email) => {
          return service.sendEmail({
            fromName,
            recipients: [email],
            subject,
            html,
          });
        })
      );
    }
    // await Promise.all(
    //   recipientsArray.map((batch) => {
    //     return service.sendEmail({
    //       fromName,
    //       recipients: batch,
    //       subject,
    //       html,
    //     });
    //   })
    // );
  } catch (error) {
    console.error(error);
  }

  return {
    statusCode: HTTP_CODES.SERVER_ERROR,
    body: `Server error occured`,
  };
};
