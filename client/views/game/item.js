// ref: http://stackoverflow.com/questions/27909787/using-meteor-sessions-to-toggle-templates
Template.GameItem.created = function() {
  this.showRoster = new ReactiveVar(false);
};
Template.GameItem.helpers({
  rvShowRoster: function() {
    return Template.instance().showRoster.get();
  },
  // how many players do we have on the roster?
  cPlayers: function() {
    return Players.find({
      teamId: Session.get('sTeamId')
    });
  },
  cGame: function() {
    return myGame = Games.findOne({
      _id: Session.get('sGameId')
    });
  },
  // need these sessions for this template
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sGameId: function() {
    return Session.get('sGameId');
  },
  sPositionsNamed: function() {
    return Session.get('sPositionsNamed');
  },
  cCurrentGame: function() {
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
  }
});

Template.GameItem.events({
  // show/hide roster
  'click .show-roster': function(evt, template) {
    var showRoster = template.showRoster.get();
    template.showRoster.set(!showRoster);
    if (showRoster) {
      $('.team-roster').toggle(400);
      return false;
    }
  }
});
