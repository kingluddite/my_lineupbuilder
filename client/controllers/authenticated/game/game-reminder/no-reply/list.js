// on page load create drop zones under the no reply ordered list
Template.NoReplyList.rendered = function() {
  var currentPlayerId,
      currentGameId;

  $('ol.no-reply').droppable({
    activeClass: 'active',
    hoverClass: 'hover',

    drop: function(evt, ui) {
      currentPlayerId = Session.get('sPlayerId');
      currentGameId   = Session.get('sGameId');

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
    var currentGame,
        noReplies,
        arrWithPlayerNames,
        i,
        player,
        playerFullName;

    // get the doc for this game
    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // make sure doc result exists
    if (currentGame) {
      // grab all players who did not reply
      noReplies = currentGame.noReplies;
      // create an empty array
      arrWithPlayerNames = [];
      // if there are subs
      if (noReplies) {
        // run this for loop through all the subs
        for (i = 0; i < noReplies.length; i++) {
          // grab the playerid for each sub
          player = Players.findOne({
            _id: noReplies[i]
          });

          // check to make sure the player doc result exists
          if (player) {
            // store the full name inside a variable
            playerFullName = player.fullName;
            // push each fullName inside the empty array
            arrWithPlayerNames.push(playerFullName);
          }
        }
        return arrWithPlayerNames;
      }
    }
  }

});

Template.NoReplyList.events({
  'mousedown li ': function(evt, template) {
    Session.set('sPlayerId', this._id);
  }
});
