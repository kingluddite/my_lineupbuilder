Template.SeasonItem.helpers({
  currentSeason: function (evt, template) {
    var team, season;

    team = Teams.findOne({_id: Session.get('sTeamId') });
    
    season = Seasons.findOne({_id: team.seasonId});
    if (season) {
      return season;
    } else {
      return false;
    }

  }
});
