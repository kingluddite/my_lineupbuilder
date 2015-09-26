Template.FieldList.rendered = function() {
  $('.draggable').draggable();
  $('.droppable').droppable({
    drop: function(event, ui) {
      $(this)
        .addClass('ui-state-highlight')
        .find('p')
        .html('dropped');
      console.log(ui);
    }


  });
};

Template.FieldList.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  }
});

Template.StartingFieldList.rendered = function(evt, template) {
  // what items we want droppable on the field
  $(".starting-lineup div").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {
      // grab the current game id
      var currentGameId = Session.get('sGameId');
      // which player are we about to drop (their id)
      var starterId = Session.get('sPlayerId');

      // we need the current position in the div
      //  we are about to drop because on the server
      //  we need to update this div and the way we do that
      //  is we query by the value currently in this position
      //  (this is how you only show documents with specific properties)
      var currPos = Games.findOne({
        _id: Session.get('sGameId')
      }, {
        playerGameInfo: 1
      });

      // which div id are we dropping on?
      //  with this info we can dynamically create our server
      //  update of this div
      var playerContainer = this.id;

      // we need 1) that number of the player div we are altering
      //   by dropping on this div
      // we need 2) the playerId we are dropping
      // we grab from our collection cursor the current position name
      //  that we plan on overwriting
      var playerInfo = {
        playerDivNum: playerContainer,
        playerId: starterId,
        oldPlayerId: currPos.playerGameInfo[0][this.id].playerId
      }

      // because we are using the mongo $ (position query)
      // and had security problems doing this on the client
      //  we create a server method call and call the method
      //  pass our game id and the 3 properties we gathered in our
      //  playerInfo object
      Meteor.call('updateStarter', currentGameId, playerInfo, function(error, id) {
        if (error) {
          return alert(error.reason);
        }
      });
    }
  });
}

Template.StartingFieldList.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  }
});
