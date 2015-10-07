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
  cYesPlaying: function(evt, template) {
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // grab all the subs
    var myYesPlayers = currentGame.yesPlaying;
    // create an empty array
    var arrWithPlayerNames = [];
    // if there are subs
    if (myYesPlayers) {
      // run this for loop through all the subs
      for (var i = 0; i < myYesPlayers.length; i++) {
        // grab the playerid for each sub
        var player = Players.findOne({
          _id: myYesPlayers[i]
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
