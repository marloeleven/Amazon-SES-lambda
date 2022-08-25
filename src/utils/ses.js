import aws from 'aws-sdk';

export const ses = new aws.SES({ region: 'us-west-2' });

