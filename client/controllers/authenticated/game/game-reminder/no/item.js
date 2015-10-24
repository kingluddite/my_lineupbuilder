Template.NotPlayingItem.rendered = function(evt, template) {
  $('ol.not-playing li').draggable({
    revert: true,
    appendTo: 'body',
    helper: 'clone'
  });

};

Template.NotPlayingItem.events({
  'click .trash': function(evt, template) {
    var currentGame,
        myNonPlayers,
        notPlayingPlayerId;

    currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // here are all the subs
    myNonPlayers = currentGame.notPlaying;
    // console.log(mySubs);
    // use handlebars index to find array item we want to remove
    notPlayingPlayerId = evt.target.parentNode.parentNode.id;

    // with the current game id update that game
    // and use pull to find the subs array and remove the specific sub
    Games.update(Session.get('sGameId'), {
        $pull: {
          notPlaying: myNonPlayers[notPlayingPlayerId]
        }
      },
      function(error) {
        if (error) {
          return throwError(error.reason);
        }
      });
  }
});
