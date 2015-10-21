// ref: http://stackoverflow.com/questions/27909787/using-meteor-sessions-to-toggle-templates
Template.GameItem.created = function() {
  this.showRoster = new ReactiveVar(false);
  this.showPositions = new ReactiveVar(false);
};
Template.GameItem.helpers({
  rvShowRoster: function() {
    return Template.instance().showRoster.get();
  },
  rvShowPositions: function() {
    return Template.instance().showPositions.get();
  },
  // how many players do we have on the roster?
  cPlayers: function() {
    return Players.find({
      teamId: Session.get('sTeamId')
    });
  },
  cGame: function() {
    return Games.findOne({
      _id: Session.get('sGameId')
    });
  },
  numStarters: function() {
    var myStarters = Games.findOne({
      _id: Session.get('sGameId')
    });
    // make sure myStarters exists
    if (myStarters) {
      // use global function to count objects
      return objectLength(myStarters.playerGameInfo[0]);
    }
  },
  totalPlayers: function() {
    var myStarters = Games.findOne({
      _id: Session.get('sGameId')
    });
    // make sure myStarters exists
    if (myStarters) {

      // use global function to count objects
      var numStarters = objectLength(myStarters.playerGameInfo[0]);
      // what is the length of the subs array?
      if (myStarters.subs) {
        var numSubs = myStarters.subs.length;
      }
      // add both to get total players for game
      var totalPlayers = numStarters + numSubs;
      return totalPlayers;
    } else {
      return false;
    }
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
  },
  'click .show-positions': function(evt, template) {
    var showPositions = template.showPositions.get();
    template.showPositions.set(!showPositions);
    if (showPositions) {
      $('.team-roster').toggle(400);
      return false;
    }
  }
});
