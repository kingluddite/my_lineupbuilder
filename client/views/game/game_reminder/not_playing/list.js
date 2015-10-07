Template.NotPlayingList.rendered = function(evt, template) {

  $("ol.not-playing").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {

      var currentPlayerId = Session.get("sPlayerId");
      var currentGameId = Session.get("sGameId");

      Games.update(currentGameId, {
          $addToSet: {
            notPlaying: currentPlayerId
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
Template.NotPlayingList.helpers({

  cNotPlaying: function(evt, template) {
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // grab all the subs
    var myNonPlayers = currentGame.notPlaying;
    // create an empty array
    var arrWithPlayerNames = [];
    // if there are subs
    if (myNonPlayers) {
      // run this for loop through all the subs
      for (var i = 0; i < myNonPlayers.length; i++) {
        // grab the playerid for each sub
        var player = Players.findOne({
          _id: myNonPlayers[i]
        });
        // store the full name inside a variable
        var playerFullName = player.fullName;
        // push each fullName inside the empty array
        arrWithPlayerNames.push(playerFullName);
      }

      return arrWithPlayerNames;
    }

  }

});
