var Future;

Future = Npm.require('fibers/future');

Meteor.methods({
  validateEmailAddress: function(address) {
    var validateEmail;
    // always check our data!
    check(address, String);
    validateEmail = new Future();
    // use http package and call kickbox
    // use their verify param and pass an email and our api key
    HTTP.call("GET", "https://api.kickbox.io/v1/verify", {
      params: {
        email: address,
        apikey: Meteor.settings.private.kickbox
      }
    }, function(error, response) {
      if (error) {
        return validateEmail["return"](error);
      } else {
        if (response.data.result === "invalid" || response.data.result === "unknown") {
          return validateEmail["return"]({
            error: "Sorry, your email was returned as invalid. Please try another address."
          });
        } else {
          return validateEmail["return"](true);
        }
      }
    });
    return validateEmail.wait();
  }
});
