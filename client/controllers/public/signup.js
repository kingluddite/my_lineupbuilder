/*
  Controller: Signup
  Template: /client/views/public/signup.html
 */
Template.Signup.created = function() {};

Template.Signup.rendered = function() {
  return $('#application-signup').validate({
    rules: {
      emailAddress: {
        required: true,
        email:    true
      },
      password: {
        required:  true,
        minlength: 6
      },
      betaToken: {
        required:  true
      }
    },
    messages: {
      emailAddress: {
        required:  "Please enter your email address to sign up.",
        email:     "Please enter a valid email address."
      },
      password: {
        required:  "Please enter a password to sign up.",
        minlength: "Please use at least six characters."
      },
      betaToken: {
        required:  "A valid beta token is required to sign up."
      }
    },

    submitHandler: function() {
      var user;

      // create a user object and stuff it with the email/pw and token?
      user = {
        email:     $('[name="emailAddress"]').val().toLowerCase(),
        password:  $('[name="password"]').val(),
        betaToken: $('[name="betaToken"]').val()
      };
      // call a server method and pass the object we just created
      return Meteor.call('validateBetaToken', user, function(error) {
        if (error) {
          return alert(error.reason);
        } else {
          // no errors? cool, login with email and pw
          return Meteor.loginWithPassword(user.email, user.password, function(error) {
            if (error) {
              return alert(error.reason);
            } else {
              // logged in, no errors and send them to dashboard
              return Router.go('/dashboard');
            }
          });
        }
      });
    }
  });
};

Template.Signup.helpers({
  // gives us access to the betaToken
  // so when the user clicks link in email, they'll come
  // to our signup page and their betaToken will be magically
  //  stored in our session
  betaToken: function() {
    return Session.get('betaToken');
  }
});

Template.Signup.events({
  
  'submit form': function(evt, template) {
    return evt.preventDefault();
  }
});
