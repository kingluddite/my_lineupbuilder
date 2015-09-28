Template.NotPlayingItem.rendered = function(evt, template) {
  $("ul.game-day-yes-roster li").draggable({
    revert: true
  });

  $("ul.game-day-maybe-roster li").draggable({
    revert: true
  });

  $("ul.game-day-no-roster li").draggable({
    revert: true
  });

};

Template.NotPlayingItem.events({
  'click .trash': function(evt, template) {
    var gameReminderStatus = Session.get('sGameReminderStatus');
    if (gameReminderStatus == 'yes') {
      addAlertClass('Removed', 'yes');
    } else if (gameReminderStatus == 'maybe') {
      addAlertClass('Removed', 'maybe');
    } else {
      addAlertClass('Removed', 'no');
    }
    Players.update(this._id, {
        $set: {
          game_reminder: "none"
        }
      },
      function(error) {
        if (error) {
          throwError(error.reason);
        }
      });
  },
  'mousedown li': function(evt, template) {
    Session.set('sGameReminderStatus', this.game_reminder);
  }
});
