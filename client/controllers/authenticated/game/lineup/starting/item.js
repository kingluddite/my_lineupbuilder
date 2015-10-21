Template.StartingItem.rendered = function(evt, template) {
  $('ol.starting li').draggable({
    revert: true,
    appendTo: 'body',
    helper: 'clone'
  });

};

Template.StartingItem.events({
  'click .trash': function(evt, template) {
    // need to find the index of the playerId that is stored in an array
    var index;
    // which game are we on?
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // here are all starting players
    var myStartersAr = currentGame.starting;
    
    // loop through the array of player ids
    for (var i = 0; i < myStartersAr.length; i++) {
      // look for match
      if (myStartersAr[i].indexOf(this._id) === 0) {
        // when a match is found store the index of the match
        // this is the player we want to remove from the starting lineup
        index = i;
      }
    }

    // with the current game id update that game
    // and use pull to find the starters array and remove the specific starter
    // by their id
    Games.update(Session.get('sGameId'), {
        $pull: {
          // we now grab are array of playerIds and put in the index we found
          starting: myStartersAr[index]
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
