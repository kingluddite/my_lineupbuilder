Template.SeasonItem.helpers({
  isSelected: function (evt, template) {
    var team, season;
    
    // which team are we dealing with?
    team = Teams.findOne({_id: Session.get('sTeamId') });
    
    // use the seasonId of that team to search the seasons collection
    season = Seasons.findOne({_id: team.seasonId});
    // as we loop through all the seasons we check each seasonId
    // if the seasonId in the current iteration matches the actual seasonId
    //  of the team, we have a match
    if (this._id == team.leagueId) {
      // this will populate the html select option with the 'selected'
      //  attribute so that the value is chosen when template loads
      return 'selected';
    } else {
      return false;
    }
  }
});
