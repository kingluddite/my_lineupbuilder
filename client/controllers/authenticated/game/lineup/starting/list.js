Template.StartingList.rendered = function(evt, template) {
  $('ol.starting').droppable({
    activeClass: 'active',
    hoverClass: 'hover',
    drop: function(event, ui) {

      var currentPlayerId = Session.get('sPlayerId');
      var currentGameId = Session.get('sGameId');

      Games.update(currentGameId, {
          $addToSet: {
            starting: currentPlayerId
          }
        },
        function(error) {
          if (error) {
            alert(error.reason);
          }
        });
    }
  });
};

// find all players that have a status of 'sub'
Template.StartingList.helpers({

  cStarting: function(evt, template) {
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // check if current game exists
    if (currentGame) {
      // grab all the subs
      var myStarters = currentGame.starting;
      // create an empty array
      var arrWithPlayerNames = [];
      // if there are subs
      if (myStarters) {
        // run this for loop through all the subs
        for (var i = 0; i < myStarters.length; i++) {
          // grab the playerid for each sub
          var player = Players.findOne({
            _id: myStarters[i]
          });
          // store the full name inside a variable
          //var playerFullName = player.fullName;
          // push each fullName inside the empty array
          arrWithPlayerNames.push(player);
        }

        return arrWithPlayerNames;
      }
    } else {
      return false;
    }
}


});

Template.StartingList.events({
  'mousedown li ': function(evt, template) {
    Session.set('sPlayerId', this._id);
    // Session.set('sPlayerStatus', this.status);
    // Session.set('sGameReminderStatus', this.game_reminder);
  }
});

Template.StarterList.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  },
  sGameId: function() {
    return Session.get('sGameId');
  }
});
