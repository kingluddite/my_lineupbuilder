Template.Breadcrumbs.helpers({
  sTeamId: function () {
    return Session.get('sTeamId');
  },
  sLeagueId: function () {
    return Session.get('sLeagueId');
  },
  sSeasonId: function() {
    return Session.get('sSeasonId');
  },
  sRosterComplete: function() {
    return Session.get('sRosterComplete');
  },
  sGameId: function() {
    return Session.get('sGameId');
  }
});
