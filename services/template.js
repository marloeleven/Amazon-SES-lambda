import { ses } from '../utils/ses';

export const TEMPLATES = {
  BASIC: 'BASIC_TEMPLATE',
};

export async function getTemplate() {
  try {
    const result = await ses
      .getTemplate({
        TemplateName: TEMPLATES.BASIC,
      })
      .promise();

    return {
      statusCode: '',
      body: result,
    };
  } catch (error) {
    console.error(error);

    return {
      statusCode: 400,
      body: `An error occured: ${JSON.stringify(error)}`,
    };
  }
}

export async function createTemplate({
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
      statusCode: '',
      body: result,
    };
  } catch (e) {}
}

export async function generateBasicTemplate() {
  try {
    await ses.getTemplate({
      TemplateName: TEMPLATES.BASIC,
    });
  } catch (err) {}
}
