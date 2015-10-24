// Make all subs draggable
Template.NoReplyItem.rendered = function(evt, template) {
  $('ol.no-reply li').draggable({
    revert: true,
    appendTo: 'body',
    helper: 'clone'
  });
};


// change the status of the player to none
//  which removes them from the sub list
Template.NoReplyItem.events({
  'click .trash': function(evt, template) {
    var currentGame,
        noReplies,
        noReplyId;

    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // here are all the subs
    noReplies = currentGame.noReplies;

    // use handlebars index to find array item we want to remove
    // i > a > div id="1"
    noReplyId = evt.target.parentNode.parentNode.id;

    // with the current game id update that game
    // and use pull to find the subs array and remove the specific sub
    Games.update(Session.get('sGameId'), {
        $pull: {
          noReplies: noReplies[noReplyId]
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
