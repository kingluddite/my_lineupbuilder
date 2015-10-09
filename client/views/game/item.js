Template.GameItem.helpers({
  // how many players do we have on the roster?
  cPlayers: function() {
    return Players.find({
      teamId: Session.get('sTeamId')
    }).count();
  },
  cGame: function() {
    return myGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    // console.log(myGame);
  },
  // need these sessions for this template
  sTeamId: function() {
    return Session.get('sTeamId');
  },
  sGameId: function() {
    return Session.get('sGameId');
  },
  sPositionsNamed: function() {
    return Session.get('sPositionsNamed');
  },
  cCurrentGame: function() {
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });

    // console.log(currentGame.)
  }
});
