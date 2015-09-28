Template.NotPlayingList.rendered = function(evt, template) {

  $("ul.game-day-yes-roster").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {

      var currentPlayerId = Session.get("sPlayerId");
      var playerStatus = Session.get('sPlayerStatus');
      var reminderStatus = Session.get('sGameReminderStatus');
      var listType = 'yes';
      var message;

      //console.log("status:" + playerStatus + "\n reminder:" + reminderStatus + "\n" + listType);
      if (reminderStatus == 'yes') {
        console.log('already added');
      }
      message = checkPlayer(playerStatus, reminderStatus, listType);

      if (message) {
        addAlertClass(message, listType);
      }

      Players.update(currentPlayerId, {
          $set: {
            game_reminder: "yes"
          }
        },
        function(error) {
          if (error) {
            throwError(error.reason);
          }
        });
    }
  });

  $("ul.game-day-no-roster").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {

      var currentPlayerId = Session.get("sPlayerId");
      var playerStatus = Session.get('sPlayerStatus');
      var reminderStatus = Session.get('sGameReminderStatus');
      var listType = 'no';
      var message;
      //console.log("status:" + playerStatus + "\n reminder:" + reminderStatus + "\n" + listType);

      message = checkPlayer(playerStatus, reminderStatus, listType);

      if (message) {
        addAlertClass(message, listType);
      }

      Players.update(currentPlayerId, {
          $set: {
            game_reminder: 'no',
            status: 'none'
          }
        },
        function(error) {
          if (error) {
            throwError(error.reason);
          }
        });
    }
  });
};
