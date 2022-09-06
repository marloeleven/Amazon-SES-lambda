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

## Endpoint
To Send Bulk Email, send a post message to this lambda function
__POST__ - _supports sending of bulk email_
   - fromName - Email Sender Display name
   - recipients - Array of valid email addresses
   - subject - Email Subject
   - html - Email Body

### Building
rollup --config

- build will be in `bundle/index.js` and then upload it.
