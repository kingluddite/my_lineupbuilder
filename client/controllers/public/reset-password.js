/*
* Controller: Reset Password
* Template: /client/views/public/reset-password.html
*/

/*
* Created
*/

Template.ResetPassword.onCreated(function(){
  // Code to run when template is created goes here.
});

/*
* Rendered
*/

Template.ResetPassword.onRendered(function(){
  $('#reset-password-form').validate({
    rules: {
      newPassword: {
        required: true,
        minlength: 6
      },
      repeatNewPassword: {
        required: true,
        minlength: 6,
        equalTo: "[name='newPassword']"
      }
    },
    messages: {
      newPassword: {
        required: "Please enter a new password.",
        minlength: "Please use at least six characters."
      },
      repeatNewPassword: {
        required: "Please repeat your new password.",
        equalTo: "Your password do not match. Please try again."
      }
    },
    submitHandler: function(){
      // Grab the user's reset token and new password.
      var token    = Session.get('resetPasswordToken'),
          password = $('[name="newPassword"]').val();

      // Reset the user's password.
      Accounts.resetPassword(token, password, function(error){
        if(error){
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Password successfully reset!', 'success');
          Session.set('resetPasswordToken', null);
        }
      });
    }
  });
});

if (Accounts._resetPasswordToken) {
  Session.set('sResetPassword', Accounts._resetPasswordToken);
}

/*
* Helpers
*/

Template.ResetPassword.helpers({
 sResetPassword: function(){
  return Session.get('sResetPassword');
 }
});

/*
* Events
*/

Template.ResetPassword.events({
  'submit #reset-password-form': function(evt, template){
    // Prevent form from submitting.
    evt.preventDefault();

    var resetPasswordForm = $(evt.currentTarget),
        password = resetPasswordForm.find('#new-password').val(),
        passwordConfirm = resetPasswordForm.find('#confirm-new-password').val();

    if (isNotEmpty(password) && areValidPasswords(password, passwordConfirm)) {
      Accounts.resetPassword(Session.get('sResetPassword'), password, function(error) {
        if (error) {
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Your password has been changed. Welcome back!', 'success');
          Session.set('sResetPassword', null);
        }
      });
    }
    return false;
  }
});
