Template.StartingItem.rendered = function(evt, template) {
  $("ul.starting li").draggable({
    revert: true,
    appendTo: "body",
    helper: "clone"
  });

};

Template.StartingItem.events({
  'click .trash': function(evt, template) {
    // addAlertClass('Removed', 'sub');

    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // here are all the subs
    var myStarters = currentGame.starting;
    // console.log(mySubs);
    // use handlebars index to find array item we want to remove
    var startingPlayerId = evt.target.parentNode.id;

    // with the current game id update that game
    // and use pull to find the subs array and remove the specific sub
    Games.update(Session.get('sGameId'), {
        $pull: {
          starting: myStarters[startingPlayerId]
        }
      },
      function(error) {
        if (error) {
          return throwError(error.reason);
        }
      });
  },
  'mousedown li': function(evt, template) {
    // Session.set('sGameReminderStatus', this.game_reminder);
  }
});
