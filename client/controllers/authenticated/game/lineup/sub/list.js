// when player dropped on 'subs' list
//  check if they exist in list
//  and if not, update their status to 'sub'
Template.SubList.rendered = function() {
  var currentPlayerId,
      currentGameId;

  $('ol.subs').droppable({
    activeClass: 'active',
    hoverClass: 'hover',

    drop: function(evt, template) {
      currentPlayerId = Session.get('sPlayerId');
      currentGameId = Session.get('sGameId');

      Games.update(currentGameId, {
          $addToSet: {
            subs: currentPlayerId
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
Template.SubList.helpers({

  cSubs: function(evt, template) {
    var currentGame,
        mySubs,
        arrWithPlayerNames,
        i,
        player,
        playerFullName;

    // get the doc for this game
    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // check if current game exists
    if (currentGame) {
      // grab all the subs
      mySubs = currentGame.subs;
      // create an empty array
      arrWithPlayerNames = [];
      // if there are subs
      if (mySubs) {
        // run this for loop through all the subs
        for (i = 0; i < mySubs.length; i++) {
          // grab the playerid for each sub
          player = Players.findOne({
            _id: mySubs[i]
          });
          // store the full name inside a variable
          playerFullName = player.fullName;
          // push each fullName inside the empty array
          arrWithPlayerNames.push(playerFullName);
        }
        return arrWithPlayerNames;
      }
    } else {
      return false;
    }
  }

});
