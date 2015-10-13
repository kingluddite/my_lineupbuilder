/*==================================
=            UI Helpers            =
==================================*/
/* helpers defined here can be reused all throughout our application!
*/

/*
* using moment library
* we display a date for each invite
* date invite requested and date invite approved/sent
* this helper takes a unix timestamp and splits it out into a human
*  readable string
* example: 1415983049 becomes Friday, November 14th, 2014
* we divide be 1000 because our db date is in milliseconds and
*  moment expect it to be in seconds
*/
/* use with
* {{epochToString <variable here>}}
*/
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
