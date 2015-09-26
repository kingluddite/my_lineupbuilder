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
  $(".starting-lineup div").droppable({
    activeClass: "active",
    hoverClass: "hover",
    drop: function(event, ui) {
      var currentGameId = Session.get('sGameId');
      var starterId = Session.get('sPlayerId');
      //   Players.update(currentPlayerId, {
      //       $set: {
      //         status: "none"
      //       }
      //     },
      //     function(error) {
      //       if (error) {
      //         alert(error.reason);
      //       }
      //     });
      var currPos = Games.findOne({
        _id: Session.get('sGameId')
      }, {
        playerGameInfo: 1
      });

      var playerContainer = this.id;

      var playerInfo = {
        playerDivNum: playerContainer,
        playerId: starterId,
        oldPlayerId: currPos.playerGameInfo[0][this.id].playerId
      }




      // var allGamePositions = {
      //       playerGameInfo: [
      //         playerPositions
      //       ]
      //     }


      Meteor.call('updateStarter', currentGameId, playerInfo, function(error, id) {
        if (error) {
          return alert(error.reason);
        }
      });





    }
  });
}

// $(this)
//   .addClass('ui-state-highlight')
//   .find("p")
//   .html("Dropped")
// $(this).find(".placeholder").remove();
// $("<li></li>").text(ui.draggable.text()).appendTo(this);


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
