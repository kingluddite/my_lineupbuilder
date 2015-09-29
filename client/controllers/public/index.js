Template.Index.rendered = function() {
  return $('#request-beta-invite').validate({
    rules: {
      emailAddress: {
        email: true,
        required: true
      }
    },
    messages: {
      emailAddress: {
        email: "Please use a valid email address.",
        required: "An email address is required to get your invite."
      }
    },
    submitHandler: function() {
      var invitee;
      invitee = {
        email: $('[name="emailAddress"]').val().toLowerCase(),
        invited: false,
        requested: (new Date()).getTime()
      };
      return Meteor.call('validateEmailAddress', invitee.email, function(error, response) {
        if (error) {
          return alert(error.reason);
        } else {
          if (response.error) {
            return alert(response.error);
          } else {
            return Meteor.call('addToInvitesList', invitee, function(error, response) {
              if (error) {
                return alert(error.reason);
              } else {
                return alert("Invite requested. We'll be in touch soon. Thanks for your interest in MyLineupBuilder");
              }
            });
          }
        }
      });
    }
  });
};

Template.Index.events({
  'submit form': function(evt) {
    return evt.preventDefault();
  },
  'click .btn-facebook': function() {
    return Meteor.loginWithFacebook({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  'click .btn-github': function() {
    return Meteor.loginWithGithub({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  'click .btn-google': function() {
    return Meteor.loginWithGoogle({
      requestPermissions: ['email']
    }, function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  },
  'click .btn-twitter': function() {
    return Meteor.loginWithTwitter(function(error) {
      if (error) {
        return console.log(error.reason);
      }
    });
  }


});
