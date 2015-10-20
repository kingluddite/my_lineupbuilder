// on page load create drop zones under the no reply ordered list
Template.NoReplyList.rendered = function() {
  $('ol.no-reply').droppable({
    activeClass: 'active',
    hoverClass: 'hover',
    drop: function(evt, ui) {
      var currentPlayerId = Session.get('sPlayerId');
      var currentGameId = Session.get('sGameId');

      // when player is dropped get the id of the game and update
      // the noReplies array of the game with the player id
      Games.update(currentGameId, {
          $addToSet: {
            noReplies: currentPlayerId
          }
        },
        function(error) {
          if (error) {
            return throwError(error.reason);
          }
        });
    }
  });
};

Template.NoReplyList.helpers({
  cNoReply: function(evt, template) {
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // make sure doc result exists
    if (currentGame) {
      // grab all players who did not reply
      var noReplies = currentGame.noReplies;
      // create an empty array
      var arrWithPlayerNames = [];
      // if there are subs
      if (noReplies) {
        // run this for loop through all the subs
        for (var i = 0; i < noReplies.length; i++) {
          // grab the playerid for each sub
          var player = Players.findOne({
            _id: noReplies[i]
          });

          // check to make sure the player doc result exists
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
