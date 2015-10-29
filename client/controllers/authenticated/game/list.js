// REPAIR THIS BY MOVING IT SERVER SIDE
var removeGame = function() {
  Games.remove({
    _id: Session.get('sGameId')
  });
};

Template.GameList.helpers({
  // grab all the games for this team
  cGames: function() {
    // only if the user is logged in

      // grab all the teams the user created (so we know it's their
      //   team)
      return Games.find({
          teamId: Session.get('sTeamId')
      }, {
          sort: {
              gameDateTime: 1
          }
      });


  },
  // give template access to these sessions
  sGameId: function() {
    return Session.get('sGameId');
  },

  sAddGame: function() {
    return Session.get('sAddGame');
  },
  sGameNew: function() {
    return Session.get('sGameNew');
  }
});

Template.GameList.events({
  // when click on remove team is removed after
  // confirmation
  'click .remove': function(evt, template) {
    evt.preventDefault();

    if (confirm("Delete this game?")) {
      Session.set('sGameId', this._id);
      // MAKE THIS SERVER SIDE
      removeGame();
      Session.set('sGameId', null);
    }
  },
  'click .game-list a': function(evt, template) {
    Session.setPersistent('sGameId', this._id);
  },
  // add a new game button
  'click .new-game': function(evt, template) {
    // if coach needs to add a team we set this session to true
    // so he can see that form
    Session.setPersistent('sAddGame', true);
  }
});
