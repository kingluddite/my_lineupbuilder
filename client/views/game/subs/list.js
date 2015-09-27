// when player dropped on 'subs' list
//  check if they exist in list
//  and if not, update their status to 'sub'
Template.SubList.rendered = function() {
  $("ul.subs").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {
      // get the player id (needed for collection update)
      var currentPlayerId = Session.get("sPlayerId");
      var currentGameId = Session.get("sGameId");
      // var playerStatus = Session.get('sPlayerStatus');
      // var reminderStatus = Session.get('sGameReminderStatus');
      // var listType = 'sub';
      // var message;

      // message = checkPlayer(playerStatus, reminderStatus, listType);

      // if (message) {
      //   addAlertClass(message, listType);
      // }


      Games.update(currentGameId, {
          $push: {
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
  cSubs: function() {
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // console.log(currentGame.subs);
    return currentGame.subs;
  }
});
