Template.LeagueShow.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cLeague: function() {
    if (Meteor.user()) {
      return Leagues.findOne({
        teamId: Session.get('sTeamId')

      });
    }
  },

  sLeagueId: function() {
    return Session.get('sLeagueId');
  },

  sTeamId: function() {
    return Session.get('sTeamId');
  },

  sGameId: function() {
    return Session.get('sGameId');
  }

});
