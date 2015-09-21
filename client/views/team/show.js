Template.TeamShow.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cTeam: function() {
    if (Meteor.user()) {
      return Teams.findOne({
        _id: Session.get('sTeamId')
      });
    }
  },
  teamId: function() {
    return Session.get('sTeamId');
  }
});