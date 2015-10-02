Template.SeasonShow.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cSeason: function() {
    if (Meteor.user()) {
      return Seasons.findOne({
        teamId: Session.get('sTeamId')

      });
    }

  },
  sLeagueId: function() {
    return Session.get('sLeagueId');
  },
  sSeasonId: function() {
    return Session.get('sSeasonId');
  },
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sGameId: function() {
    return Session.get('sGameId');
  }

});
