// Make all subs draggable
Template.SubItem.rendered = function(evt, template) {
  $("ul.subs li").draggable({
    revert: true,
    appendTo: "body",
    helper: "clone"
  });
};

// change the status of the player to none
//  which removes them from the sub list
Template.SubItem.events({
  'click .trash': function(evt, template) {
    addAlertClass('Removed', 'sub');
    Players.update(this._id, {
        $set: {
          status: "none"
        }
      },
      function(error) {
        if (error) {
          alert(error.reason);
        }
      });
  },
  'mousedown li': function(evt, template) {
    Session.set('sPlayerId', this._id);
    Session.set('sPlayerStatus', this.status);
    Session.set('sPlayerStatus', this.game_reminder);

  }
});
