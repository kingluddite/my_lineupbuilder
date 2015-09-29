/*
  Controller: Recover Password
  Template: /client/views/public/recover-password.html
 */
Template.RecoverPassword.created = function() {};

Template.RecoverPassword.rendered = function() {
  return $('#application-recover-password').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      }
    },
    messages: {
      emailAddress: {
        required: "Please enter your email address to recover your password.",
        email: "Please enter a valid email address."
      }
    },
    submitHandler: function() {
      var email;
      email = $('[name="emailAddress"]').val();
      return Accounts.forgotPassword({
        email: email
      }, function(error) {
        if (error) {
          return alert(error.reason);
        }
      });
    }
  });
};

Template.RecoverPassword.helpers({
  example: function() {}
});

Template.RecoverPassword.events({
  'submit form': function(evt) {
    return evt.preventDefault();
  }
});
