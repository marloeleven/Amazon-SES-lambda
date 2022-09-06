# Simple Lambda SES Implementation

This allows you to send bulk email.

Features:

- Automatically creates a default template for sending bulk emails.
- Automatically fetches latest secrets manager value for verification

### Prerequisite:

Policy with the ff. actions:

- ses:SendEmail
- ses:GetTemplate
- ses:CreateTemplate
- ses:SendBulkTemplatedEmail

Labmda Function with CORS Enabled

 - Secret manager for the ff. required keys
   - AUTH_TOKEN: <token for verification>
   - ORIGIN_EMAIL: verified registered email sender
   - CHUNK_SIZE: (default `50` [optional]) - number of recepients per bulk email request

## Endpoint

To Send Bulk Email, send a post message to this lambda function
**POST** - _supports sending of bulk email_

- fromName - Email Sender Display name
- recipients - Array of valid email addresses
- subject - Email Subject
- html - Email Body

## Authentication Logic

Secret key for authentication are stored in AWS Secrets Manager. You have to create your own secret key and assign its name value to this config file `utils/config.js :: DEFAULT['SECRET_KEY']`

- SECRET_KEY: currently defaults to `SES-Secret`

  App will automatically fetch this value when it receives it's first POST request.

  POST request should have an `Authentication` Header with a value `Bearer <secret key value>` to pass the authentication process.

### Building

rollup --config

- build will be in `bundle/index.js` and then upload it.
