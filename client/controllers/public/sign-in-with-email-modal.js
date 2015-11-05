Template.SignInWithEmailModal.rendered = function() {
  return $('#sign-in-with-email').validate({
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
          user,
          userId;

      createOrSignIn = Session.get('sCreateOrSignIn');
      user = {
        email: $('[name="emailAddress"]').val(),
        password: $('[name="password"]').val()
      };
      if (createOrSignIn === "create") {
        return Meteor.call('validateEmailAddress', user.email, function(error, response) {
          if (error) {
            Bert.alert(error.reason, 'danger');
          } else {
            if (response.error) {
              //return alert(response.error);
              Bert.alert(response.error, 'danger');
            } else {
              return Accounts.createUser(user, function(error) {
                if (error) {
                  //return alert(error.reason);
                  Bert.alert(error.reason, 'danger');
                } else {
                  // all good, let's create an account
                  $('#sign-in-with-email-modal').hide();
                  userId = Meteor.userId;
                  Bert.alert('Account Created', 'success', 'growl-top-right');
                  return $('.modal-backdrop').hide();
                  Meteor.call("initApiKey", userId);
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

Template.SignInWithEmailModal.events({

  'click .btn-create-account': function(evt, template) {
    return Session.set('sCreateOrSignIn', 'create');
  },

  'click .btn-sign-in': function(evt, template) {
    return Session.set('sCreateOrSignIn', 'signin');
  },

  'submit form': function(evt, template) {
    return evt.preventDefault();
  }
});
