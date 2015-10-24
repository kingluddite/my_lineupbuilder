Template.YesPlayingList.rendered = function(evt, template) {
  var currentPlayerId,
      currentGameId;
  $('ol.yes-playing').droppable({
    activeClass: 'active',
    hoverClass: 'hover',

    drop: function(event, ui) {
      currentPlayerId = Session.get('sPlayerId');
      currentGameId = Session.get('sGameId');

      Games.update(currentGameId, {
          $addToSet: {
            yesPlaying: currentPlayerId
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

Template.YesPlayingList.helpers({
  sGameId: function() {
    return Session.get('sGameId');
  },
  cYesPlaying: function(evt, template) {
    var currentGame,
        myYesPlayers,
        arrWithPlayerNames,
        i,
        player;

    // get the doc for this game
    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // make sure the doc result exists
    if (currentGame) {
      // grab all the players who can play
      myYesPlayers = currentGame.yesPlaying;
      // create an empty array
      arrWithPlayerNames = [];
      // if there are players who can play
      if (myYesPlayers) {
        // run this for loop through all players who can play
        for (i = 0; i < myYesPlayers.length; i++) {
          // grab the playerid for each player who can play
          player = Players.findOne({
            _id: myYesPlayers[i]
          });
          // make sure the doc result exists
          if (player) {
            // store the full name inside a variable
            //var playerFullName = player.fullName;
            // push each fullName inside the empty array
            //[original]
            // arrWithPlayerNames.push(playerFullName);
            arrWithPlayerNames.push(player);
          }
        }
        return arrWithPlayerNames;
      }
    }
  }
});

Template.YesPlayingList.events({
  'mousedown li ': function(evt, template) {
    Session.set('sPlayerId', this._id);
  }
});
