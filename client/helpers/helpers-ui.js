UI.registerHelper('epochToString', function(timestamp) {
  return moment.unix(timestamp / 1000).format("MMMM Do, YYYY");
});

/*
  Controller: Reset Password
  Template: /client/views/public/reset-password.html
 */
Template.ResetPassword.created = function() {};

UI.registerHelper('userIdentity', function(userId) {
  var getService, getUser, services;
  getUser = Meteor.users.findOne({
    _id: userId
  });
  if (getUser.emails) {
    return getUser.emails[0].address;
  } else if (getUser.services) {
    services = getUser.services;
    getService = (function() {
      switch (false) {
        case !services.facebook:
          return services.facebook.email;
        case !services.github:
          return services.github.email;
        case !services.google:
          return services.google.email;
        case !services.twitter:
          return services.twitter.screenName;
        default:
          return false;
      }
    })();
    return getService;
  } else {
    return getUser.profile.name;
  }
});
