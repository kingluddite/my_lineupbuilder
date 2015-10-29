Template.LeagueItem.helpers({
  currentLeague: function (evt, template) {
    var team, league;

    team = Teams.findOne({_id: Session.get('sTeamId') });
    
    league = Leagues.findOne({_id: team.leagueId});
    if (league) {
      return league;
    } else {
      return false;
    }

  }
});
