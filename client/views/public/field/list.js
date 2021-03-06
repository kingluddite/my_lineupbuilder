Template.FieldList.rendered = function() {
  $('.draggable').draggable();
  $('.droppable').droppable({
    drop: function(event, ui) {
      $(this)
        .addClass('ui-state-highlight')
        .find('div')
        .html('dropped');
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

        var playerDoc = Players.findOne({
          _id: starterId
        });
        var playerName = playerDoc.fullName;

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
          playerFullName: playerName,
          oldPlayerId: currPos.playerGameInfo[0][this.id].playerId,
          oldPlayerFullName: currPos.playerGameInfo[0][this.id].playerFullName
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
          // if the div has children don't append anything to DOM
          if ($('#' + playerContainer).children().length > 0) {
            return false;
          } else {
            $('#' + playerContainer).append("<span class='starter'>" + playerName + "</span>");
          }
        });
      }
    });
  }
  // needed to make sure data is loaded (also has if subready in template)
Template.StartingFieldList.onCreated(function() {
  this.subscribe('current-game');

});

Template.StartingFieldList.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {

    return Games.findOne({
      _id: Session.get('sGameId')
    });
  },
  sGameId: function() {
    return Session.get('sGameId');
  },
  cPlayerGameInfo: function() {
    var currentGame = Games.findOne({
      _id: Session.get('sGameId')
    });
    if (currentGame.playerGameInfo[0]) {  
      if (currentGame.playerGameInfo[0]) {
        var allPlayerGameInfo = currentGame.playerGameInfo[0];
        return allPlayerGameInfo;
      }
    } else {
      return false;
    }

  }
});
