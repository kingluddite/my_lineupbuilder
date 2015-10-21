Template.YesPlayingItem.rendered = function(evt, template) {
  $('ol.yes-playing li').draggable({
    revert: true,
    appendTo: 'body',
    helper: 'clone'
  });

};

Template.YesPlayingItem.events({
  'click .trash': function(evt, template) {
    // addAlertClass('Removed', 'sub');

    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    }, {
      fields: {
        yesPlaying: 1
      }
    });
    // here are all players who responded yes to the game reminder
    var myYesPlayers = currentGame.yesPlaying;

    // use handlebars index to find array item we want to remove
    var yesPlayingPlayerId = evt.target.parentNode.parentNode.id;

    // with the current game id update that game
    // and use pull to find the subs array and remove the specific sub
    Games.update(Session.get('sGameId'), {
        $pull: {
          yesPlaying: myYesPlayers[yesPlayingPlayerId]
        }
      },
      function(error) {
        if (error) {
          return throwError(error.reason);
        }
      });



  }
});


