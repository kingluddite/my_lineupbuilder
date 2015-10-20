// Accounts.ui.config({
//   passwordSignupFields: 'USERNAME_ONLY'
// });

/* we want to log out, clear all sessions and return user to home page */
Meteor.logout(function(error) {
  if (error) console.log("Error:" + error);
  Session.clearPersistent();
  // clear these sessions out when use logs out
  Session.clear('sTeamId');
  Session.clear('sGameId');
  Session.clear('sSeasonId');
  Session.clear('sLeagueId');
  Session.clear('sFormationChosen');
  Session.clear('sPositionsNamed');
  Session.clear('sRosterComplete');
  Session.clear('sRosterCreated');
  Session.clear('sTeamNew');
  Session.clear('sGameNew');
  Session.clear('sLeagueNew');
  Session.clear('sSeasonNew');
  Session.clear('sAddTeam');
  Session.clear('sAddGame');
  Session.clear('sAddLeague');
  Session.clear('sAddSeason');
  Router.go('Index');
});
