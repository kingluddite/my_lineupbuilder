/*
* Controller: Recover Password
* Template: /client/views/public/recover-password.html
*/

/*
* Created
*/

Template.RecoverPassword.onCreated(function(){
  // Code to run when template is created goes here.
});

/*
* Rendered
*/


Template.RecoverPassword.onRendered(function(){
  $('#recover-password-form').validate({
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
    submitHandler: function(){
      // Grab the user's email address.
      var email = $('[name="emailAddress"]').val();
      var user = Meteor.users.findOne({'emails.address':email});
      
      // Call the send reset password email method.
      Accounts.forgotPassword({email: email}, function(error){
        if(error){
          Bert.alert(error.reason, 'danger');
        } else {
          Bert.alert('Check your inbox for a reset link!', 'success');
        }
      });
    }
  });
});


/*
* Events
*/

Template.RecoverPassword.events({
  'submit #recover-password-form': function(evt, template){
    // Prevent form from submitting.
    
    evt.preventDefault();

    var forgotPasswordForm = $(evt.currentTarget),
        email = trimInput(forgotPasswordForm.find('#forgotPasswordEmail').val().toLowerCase());

    if (isNotEmpty(email) && isEmail(email)) {

      Accounts.forgotPassword({email: email}, function(error) {
        if (error) {
          if (error.message === 'User not found [403]') {
            console.log('This email does not exist.');
            Bert.alert('This email does not exist.', 'danger');
          } else {
            Bert.alert('We are sorry but something went wrong.', 'danger'); 
          }
        } else {
          Bert.alert('Email Sent. Check your mailbox.', 'success');
        }
      });

    }
    return false;
  }
});
