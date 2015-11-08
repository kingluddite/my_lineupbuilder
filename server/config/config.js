// user name
// change @ to %40 in username
// after username add : and password
// add colon at end and add port number 587

process.env.MAIL_URL = 'smtp://' + Meteor.settings.private.mailgunurl;
Accounts.emailTemplates.from = 'no-reply@soccermatters.com';
Accounts.emailTemplates.siteName = 'Soccermatters';

Accounts.emailTemplates.verifyEmail.subject = function(user) {
  return 'Confirm Your Email Address';
};
Accounts.emailTemplates.verifyEmail.text = function(user, url) {
  return 'Click on the following link to verify your email address: ' + url;
};

Accounts.emailTemplates.resetPassword.from = function (user) {
    return user;
};

Accounts.emailTemplates.resetPassword.subject = function (user) {
    return "Message for ";
};

Accounts.emailTemplates.resetPassword.text = function (user, url) {
    // var signature = "MySite Bot";
    // var president = President.findOne();
    //return "I love you";
    // if (president)
    //     president = Meteor.users.findOne(president.presidentId);
    //     signature = president.profile.displayName + ", the MySite President.";

    return url;
    // "Dear " + user.profile.displayName + ",\n\n" +
        // "Click the following link to set your new password:\n" +
        // url + "\n\n" +
        // "Please never forget it again!!!\n\n\n";// +
        // "Cheers,\n" +
        // signature;
};

// Accounts.config({
      //   sendVerificationEmail: true
      // });

