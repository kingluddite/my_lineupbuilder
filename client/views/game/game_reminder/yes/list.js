Template.YesPlayingList.rendered = function(evt, template) {

  $("ol.yes-playing").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {

      var currentPlayerId = Session.get("sPlayerId");
      var currentGameId = Session.get("sGameId");

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
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // make sure the doc result exists
    if (currentGame) {
      // grab all the players who can play
      var myYesPlayers = currentGame.yesPlaying;
      // create an empty array
      var arrWithPlayerNames = [];
      // if there are players who can play
      if (myYesPlayers) {
        // run this for loop through all players who can play
        for (var i = 0; i < myYesPlayers.length; i++) {
          // grab the playerid for each player who can play
          var player = Players.findOne({
            _id: myYesPlayers[i]
          });
          // make sure the doc result exists
          if (player) {
            // store the full name inside a variable
            var playerFullName = player.fullName;
            // push each fullName inside the empty array
            arrWithPlayerNames.push(playerFullName);
          }

        }

        return arrWithPlayerNames;
      }
    }
  }

});
