Template.StartingList.rendered = function(evt, template) {
  var currentPlayerId,
      currentGameId;

  $('ol.starting').droppable({
    activeClass: 'active',
    hoverClass: 'hover',
    
    drop: function(event, ui) {

      currentPlayerId = Session.get('sPlayerId');
      currentGameId = Session.get('sGameId');

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
    var currentGame,
        myStarters,
        arrWithPlayerNames,
        i,
        player;

    // get the doc for this game
    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // check if current game exists
    if (currentGame) {
      // grab all the subs
      myStarters = currentGame.starting;
      // create an empty array
      arrWithPlayerNames = [];
      // if there are subs
      if (myStarters) {
        // run this for loop through all the subs
        for (i = 0; i < myStarters.length; i++) {
          // grab the playerid for each sub
          player = Players.findOne({
            _id: myStarters[i]
          });
          // store the full name inside a variable
          // var playerFullName = player.fullName;
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
