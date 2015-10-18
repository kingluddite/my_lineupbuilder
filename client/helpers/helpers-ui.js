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

/* Current Route
# Return an active class if the currentRoute session variable name
# (set in the appropriate file in /client/routes/) is equal to the name passed
# to the helper in the template.
*/

UI.registerHelper('currentRoute', function(route) {
  if (Session.equals('currentRoute', route)) {
    return 'active';
  } else {
    return '';
  }
});

// allows you to easily format JavaScript dates
UI.registerHelper('formatDate', function(datetime) {
  if (moment) {
    return moment(datetime).format('MMMM Do YYYY');
  } else {
    return datetime;
  }
});

UI.registerHelper('formatTime', function(datetime) {
  if (moment) {
    return moment(datetime).format('h:mm a');
  } else {
    return datetime;
  }
});

// Current User Email
// Return the current user's email address. This method helps us to obtain the
// user's email regardless of whether they're using an OAuth login or the
// accounts-password login (Meteor doesn't offer a native solution for this).

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
