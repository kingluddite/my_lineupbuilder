// when the trashcan icon is clicked, the player is deleted
var removePlayer = function() {
  Players.remove({
    _id: Session.get('sPlayerId')
  });
};

Template.PlayerList.rendered = function() {
  // when page loads check box if roster complete
  if (Session.get('sRosterComplete')) {
    $('.roster-complete').prop('checked', true);
  }

};

Template.PlayerList.helpers({
  // grab all the players and provide collection for roster template
  cPlayers: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the players the user created (so we know it's their
      //   team)
      return Players.find({
        teamId: Session.get('sTeamId')
      }, {
        // sort them alphabetically
        sort: {
          fullName: 1
        }
      });
    }
  },
  sGameId: function() {
    return Session.get('sGameId');
  },
  sRosterComplete: function() {
    return Session.get('sRosterComplete');
  }
});

// coach completes his roster and lets us know
//  visually we just add a checkbox, muted text and a line-through
Template.PlayerList.events({
  'click .roster-complete': function(evt, template) {
    if (evt.target.checked) {
      // validation here
      // if roster is not >= 11 alert coach
      Session.setPersistent("sRosterComplete", true);
    } else {
      Session.setPersistent("sRosterComplete", false);
    }
  },

  'click .remove': function(evt, template) {
    evt.preventDefault();

    var playerCount = Players.find().count();

    if (confirm("Delete this player?")) {
      Session.set('sPlayerId', this._id);
      removePlayer();
      Session.set('sPlayerId', null);
    }
    if (playerCount <= 26) {
      $(".team-roster").show();
    }
  },

  'click .help-text': function(evt, template) {
    $('.instructions').toggle(400);
    return false;
  }
});


Template.PlayerPlainList.helpers({
  // grab all the players and provide collection for roster template
  cPlayers: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the players the user created (so we know it's their
      //   team)
      return Players.find({
        teamId: Session.get('sTeamId')
      });
    } else {
      this.ready();
    }
  },
  sTeamId: function() {
    return Session.get('sTeamId');
  }
});


Template.PlayerGameReminderList.helpers({
  // grab all the players and provide collection for roster template
  cPlayers: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the players the user created (so we know it's their
      //   team)
      return Players.find({
        teamId: Session.get('sTeamId')
      }, {
        // sort them alphabetically
        sort: {
          fullName: 1
        }
      });
    }
  },
  sTeamId: function() {
    return Session.get('sTeamId');
  }
});

Template.StarterSubList.helpers({
  // grab all the players and provide collection for roster template
  cPlayers: function() {
    // only if the user is logged in
    if (Meteor.user()) {
      // grab all the players the user created (so we know it's their
      //   team)
      return Players.find({
        teamId: Session.get('sTeamId')
      }, {
        // sort them alphabetically
        sort: {
          fullName: 1
        }
      });
    }
  },
  sTeamId: function() {
    return Session.get('sTeamId');
  }
});