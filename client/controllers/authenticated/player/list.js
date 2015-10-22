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
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sRosterComplete: function() {
    return Session.get('sRosterComplete');
  }
});

Template.PlayerList.events({
  'click .roster-complete': function(evt, template) {
    if (evt.target.checked) {
      // the coach is ready to submit their roster and checks
      //  roster complete checkbox
      //  how many players?
      var rosterCount = $('.player-roster-list li').length;
      if (rosterCount > 10) {
       // if at least 11 players, we are ready to procede  
       Bert.alert( 'Roster Completed. Now Create Your Game.', 'success', 'fixed-top', 'fa fa-users' );
       Session.setPersistent("sRosterComplete", true);
      } else {
        // not ready, uncheck box and inform coach to add at least a roster 
        //  total of 11 players
        Bert.alert({
          message: 'You only have ' + rosterCount + ' players and you need a minium of 11 players. Please add more players.',
          title: 'Roster Incomplete!',
          hideDelay: 3000,
          type: 'danger',
          style: 'fixed-top',
          icon: 'fa fa-users'
        });
        // uncheck box
        $('.roster-complete').attr('checked', false);
      }
    } else {
      Session.setPersistent("sRosterComplete", false);
    }
  },

  'click .remove': function(evt, template) {
    evt.preventDefault();

    var playerCount = Players.find().count();

    if (confirm("Delete this player?")) {
      Meteor.call('removePlayer', this._id, function(error, id) {
        if (error) {
          return throwError(error.reason);
        }
      })
      Bert.alert('Player Deleted', 'danger', 'growl-top-right');
      Session.set('sPlayerId', null);
    }
    if (playerCount <= 26) {
      $(".team-roster").show();
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
