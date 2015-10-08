// user name
// change @ to %40 in username
// after username add : and password
// add colon at end and add port number 587

process.env.MAIL_URL = 'smtp://postmaster%40sandboxcae008ae47c34078926740dcf3046605.mailgun.org:494l9rso5u63@smtp.mailgun.org:587';
Accounts.config({
  sendVerificationEmail: true
});

