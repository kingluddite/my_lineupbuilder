Template.PlayerItem.rendered = function(evt, template) {
  $("ol.roster li").draggable({
    revert: true,
    appendTo: "body",
    helper: "clone"
  });
};

Template.PlayerItem.events({
  'mousedown li ': function(evt, template) {
    Session.set('sPlayerId', this._id);
    Session.set('sPlayerStatus', this.status);
    Session.set('sGameReminderStatus', this.game_reminder);
  }
});
