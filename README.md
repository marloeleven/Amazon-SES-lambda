# Simple Lambda SES Implementation

This allows you to send bulk email, generate template and check if template exist for sending email with template.

### Prerequisite:
 Policy with the ff. actions:
 - ses:SendEmail
 - ses:GetTemplate
 - ses:CreateTemplate
 - ses:SendBulkTemplatedEmail

 Labmda Function with CORS Enabled

## Available Endpoints
__POST__ /email - _supports sending of bulk email_
   - fromName - Email Sender Display name
   - recipients - Array of valid email addresses
   - subject - Email Subject
   - html - Email Body


__POST__ /template- _create a template_
   - name - Template Unique name
   - subject - Email Subject template: ex. "My Subject: {{subject}}"
   - html - Email Body template: ex. "Smaple Body: {{html}}"


__GET__ /template - _check if template exists_
   - name - Template Unique name


This is a work inprogress :)
