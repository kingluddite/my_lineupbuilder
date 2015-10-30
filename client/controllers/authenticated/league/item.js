Template.LeagueItem.helpers({
  isSelected: function (evt, template) {
    var team, league;
    
    // which team are we dealing with?
    team = Teams.findOne({_id: Session.get('sTeamId') });
    
    // use the leagueId of that team to search the leagues collection
    league = Leagues.findOne({_id: team.leagueId});
    // as we loop through all the leagues we check each leagueId
    // if the leagueId in the current iteration matches the actual leagueId
    //  of the team, we have a match
    if (this._id == team.leagueId) {
      // this will populate the html option with 'selected' so that value is chosen
      return 'selected';
    }
    
  }
});
