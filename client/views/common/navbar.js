// need access to these sessions on main nav
Template.Navbar.helpers({
  gameId: function() {
    return Session.get('sGameId');
  },
  teamId: function() {
    return Session.get('sTeamId');
  }
});

// on logout clear all persistent sessions
// Meteor.logout(function(err) {
      //   // callback
      //   Session.clear();

      // });

