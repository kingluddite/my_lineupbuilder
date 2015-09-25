// when the trashcan icon is clicked, the player is deleted
var removePlayer = function() {
  Players.remove({
    _id: Session.get('sPlayerId')
  });
};

Template.PlayerList.helpers({
  // grab all the players and provide collection for roster template
  cPlayers: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the players the user created (so we know it's their
      //   team)
      return Players.find({}, {
        // sort them alphabetically
        sort: {
          fullName: 1
        }
      });
    } else {
      this.ready();
    }
  },
  sGameId: function() {
    return Session.get('sGameId');
  }
});

// coach completes his roster and lets us know
//  visually we just add a checkbox, muted text and a line-through
Template.PlayerList.events({
  'click .roster-complete': function(evt, tmpl) {
    if (evt.target.checked) {
      Session.setPersistent("sRosterComplete", true);
    } else {
      Session.setPersistent("sRosterComplete", false);
    }
  },
  'click .remove': function(evt, tmpl) {
    evt.preventDefault();

    var playerCount = Players.find().count();

    if (confirm("Delete this player?")) {
      Session.set('sPlayerId', this._id);
      removePlayer();
      Session.set('sPlayerId', null);
    }
    if (playerCount <= 26) {
      $("#teamRoster").show();
    }
  }
});

Template.PlayerPlainList.helpers({
  // grab all the players and provide collection for roster template
  cPlayers: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the players the user created (so we know it's their
      //   team)
      return Players.find();
    } else {
      this.ready();
    }
  }
});
