/*
  Controller: Login
  Template: /client/views/public/login.html
 */
Template.Login.created = function() {};

Template.Login.rendered = function() {
  return $('#application-login').validate({
    rules: {
      emailAddress: {
        required: true,
        email: true
      },
      password: {
        required: true
      }
    },
    messages: {
      emailAddress: {
        required: "Please enter your email address to login.",
        email: "Please enter a valid email address."
      },
      password: {
        required: "Please enter your password to login."
      }
    },
    submitHandler: function() {
      var user;
      user = {
        email: $('[name="emailAddress"]').val(),
        password: $('[name="password"]').val()
      };
      return Meteor.loginWithPassword(user.email, user.password, function(error) {
        if (error) {
          return alert(error.reason);
        }
      });
    }
  });
};

Template.Login.helpers({
  example: function() {}
});

Template.Login.events({
  'submit form': function(e, t) {
    return e.preventDefault();
  }
});
