Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY'
});



// Accounts.onLogout(function() {
//   console.log('yo');
//   Session.clearPersistent();
// });


accountsUIBootstrap3.logoutCallback = function(error) {
  if (error) console.log("Error:" + error);
  Session.clearPersistent();
  // clear these sessions out when use logs out
  Session.clear('sTeamId');
  Session.clear('sGameId');
  Router.go('Home');
}


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
