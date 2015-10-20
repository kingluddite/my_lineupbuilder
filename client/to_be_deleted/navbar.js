// need access to these sessions on main nav
Template.Navbar.helpers({
  sGameId: function() {
    return Session.get('sGameId');
  },
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sRosterCreated: function() {
    return Session.get('sRosterCreated');
  },
  sGameNew: function() {
    return Session.get('sGameNew');
  }

});

// on logout clear all persistent sessions
// Meteor.logout(function(err) {
//   // callback
//   Session.clear();

// });
