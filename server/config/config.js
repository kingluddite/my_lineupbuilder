// user name
// change @ to %40 in username
// after username add : and password
// add colon at end and add port number 587

process.env.MAIL_URL = 'smtp://' + Meteor.settings.private.mailgunurl;
Accounts.emailTemplates.from = 'no-reply@mysoccerlineupbuilder.com';
Accounts.emailTemplates.siteName = 'My Soccer Lineup Builder';

Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return 'Confirm Your Email Address';
};
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return 'Click on the following link to verify your email address: ' + url;
};

Accounts.config({
  sendVerificationEmail: true
});
