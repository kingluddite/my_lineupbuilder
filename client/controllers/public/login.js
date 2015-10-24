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
        required: "Please provide an email.",
        email: "Is that a real email?"
      },
      password: {
        required: "Please provide a password."
      }
    },

    submitHandler: function() {
      var createOrSignIn, 
          user;

      createOrSignIn = Session.get('sCreateOrSignIn');
      user = {
        email: $('[name="emailAddress"]').val(),
        password: $('[name="password"]').val()
      };
      if (createOrSignIn === "create") {
        return Meteor.call('validateEmailAddress', user.email, function(error, response) {
          if (error) {
            return alert(error.reason);
          } else {
            if (response.error) {
              return alert(response.error);
            } else {
              return Accounts.createUser(user, function(error) {
                if (error) {
                  return alert(error.reason);
                } else {
                  $('#sign-in-with-email-modal').hide();
                  
                 Bert.alert('Account Created', 'success', 'growl-top-right');
                  return $('.modal-backdrop').hide();
                }
              });
            }
          }
        });
      } else {
        return Meteor.loginWithPassword(user.email, user.password, function(error) {
          if (error) {
            return alert(error.reason);
          } else {
            $('#sign-in-with-email-modal').hide();
                 Bert.alert('Successfully Signed In', 'success', 'growl-top-right');
            return $('.modal-backdrop').hide();
          }
        });
      }
    }
  });
};

Template.Login.events({

  'click .btn-create-account': function() {
    return Session.set('sCreateOrSignIn', 'create');
  },

  'click .btn-sign-in': function() {
    return Session.set('sCreateOrSignIn', 'signin');
  },

  'submit form': function(evt) {
    return evt.preventDefault();
  }
});
