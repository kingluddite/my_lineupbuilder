Template.NotPlayingList.rendered = function(evt, template) {
  $('ol.not-playing')
    .droppable({
      activeClass: 'active',
      hoverClass: 'hover',
      drop: function(evt, ui) {

        var currentPlayerId = Session.get('sPlayerId');
        var currentGameId = Session.get('sGameId');

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

Template.NotPlayingList.helpers({
  // who can't play game
  cNotPlaying: function(evt, template) {
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // make sure the doc result exists
    if (currentGame) {
      // grab all the players who are not playing
      var myNonPlayers = currentGame.notPlaying;
      // create an empty array
      var arrWithPlayerNames = [];
      // if there are players who can't play
      if (myNonPlayers) {
        // run this for loop through all the non players
        for (var i = 0; i < myNonPlayers.length; i++) {
          // grab the playerid for each player who can't play
          var player = Players.findOne({
            _id: myNonPlayers[i]
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

Template.NotPlayingList.events({
  'mousedown li ': function(evt, template) {
    Session.set('sPlayerId', this._id);
    // Session.set('sPlayerStatus', this.status);
    // Session.set('sGameReminderStatus', this.game_reminder);
  }
});
