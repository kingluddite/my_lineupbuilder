// Make all subs draggable
Template.SubItem.rendered = function(evt, template) {
  $('ol.subs li').draggable({
    revert: true,
    appendTo: 'body',
    helper: 'clone'
  });
};


// change the status of the player to none
//  which removes them from the sub list
Template.SubItem.events({
  'click .trash': function(evt, template) {
    // addAlertClass('Removed', 'sub');

    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // here are all the subs
    var mySubs = currentGame.subs;
    // console.log(mySubs);
    // use handlebars index to find array item we want to remove
    var subPlayerId = evt.target.parentNode.id;

    // with the current game id update that game
    // and use pull to find the subs array and remove the specific sub
    Games.update(Session.get('sGameId'), {
        $pull: {
          subs: mySubs[subPlayerId]
        }
      },
      function(error) {
        if (error) {
          return throwError(error.reason);
        }
      });
  },
  'mousedown li': function(evt, template) {
    Session.set('sPlayerId', this._id);
  }
});
