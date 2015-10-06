// when player dropped on 'subs' list
//  check if they exist in list
//  and if not, update their status to 'sub'
Template.NoReplyList.rendered = function() {
  $("ol.no-reply").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {
      var currentPlayerId = Session.get("sPlayerId");
      var currentGameId = Session.get("sGameId");

      Games.update(currentGameId, {
          $addToSet: {
            noReplies: currentPlayerId
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

Template.NoReplyList.helpers({

  cSubs: function(evt, template) {
    // get the doc for this game
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // grab all the subs
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
        // store the full name inside a variable
        var playerFullName = player.fullName;
        // push each fullName inside the empty array
        arrWithPlayerNames.push(playerFullName);
      }

      return arrWithPlayerNames;
    }

  }

});
