# AI Privacy Gateway

## High-level requirement

Build an AI Privacy Gateway that protects sensitive information before it is sent to an AI model. The gateway must detect personal and confidential data—such as email addresses, phone numbers, account numbers, Social Insurance Numbers (SINs), and credit-card numbers—and replace each detected value with a secure token.

The AI model must receive and process only the tokenized content, not the original sensitive values. When the response needs to include original values, the gateway may restore them from their tokens only for an authenticated and authorized user. Unauthorized users must not be able to access or restore the original information.
