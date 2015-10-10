// when player dropped on 'subs' list
//  check if they exist in list
//  and if not, update their status to 'sub'
Template.SubList.rendered = function() {
  $('ol.subs').droppable({
    activeClass: 'active',
    hoverClass: 'hover',
    drop: function(event, ui) {
      var currentPlayerId = Session.get('sPlayerId');
      var currentGameId = Session.get('sGameId');

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
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // grab all the subs
    var mySubs = currentGame.subs;
    // create an empty array
    var arrWithPlayerNames = [];
    // if there are subs
    if (mySubs) {
      // run this for loop through all the subs
      for (var i = 0; i < mySubs.length; i++) {
        // grab the playerid for each sub
        var player = Players.findOne({
          _id: mySubs[i]
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
