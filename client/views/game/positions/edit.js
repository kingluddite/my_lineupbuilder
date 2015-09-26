Template.PositionEdit.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  },
  gameId: function() {
    return Session.get('sGameId');
  }
});

Template.PositionEdit.events({

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit form#editPositionForm': function(evt) {
    evt.preventDefault();

    var currentGameId = Session.get('sGameId');

    var playerPositions = {
      //   "player02": [{
      //     "fieldPosition": $(evt.target).find('[name=player02]').val()
      //   }]
      // }
      player02: {
        fieldPosition: $(evt.target).find('[name=player02]').val(),
        playerId: "TBD"
      },
      player03: {
        fieldPosition: $(evt.target).find('[name=player03]').val(),
        playerId: "TBD"
      },
      player04: {
        fieldPosition: $(evt.target).find('[name=player04]').val(),
        playerId: "TBD"
      },
      player05: {
        fieldPosition: $(evt.target).find('[name=player05]').val(),
        playerId: "TBD"
      },
      player06: {
        fieldPosition: $(evt.target).find('[name=player06]').val(),
        playerId: "TBD"
      },
      player07: {
        fieldPosition: $(evt.target).find('[name=player07]').val(),
        playerId: "TBD"
      },
      player08: {
        fieldPosition: $(evt.target).find('[name=player08]').val(),
        playerId: "TBD"
      },
      player09: {
        fieldPosition: $(evt.target).find('[name=player09]').val(),
        playerId: "TBD"
      },
      player10: {
        fieldPosition: $(evt.target).find('[name=player10]').val(),
        playerId: "TBD"
      },
      player11: {
        fieldPosition: $(evt.target).find('[name=player11]').val(),
        playerId: "TBD"
      }
    };



    var allGamePositions = {
      playerGameInfo: [
        playerPositions
      ]
    }

    Games.update(currentGameId, {
      $set: allGamePositions
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Session.setPersistent('sPositionsSet', true);
      Router.go('GameShow', {
        _id: currentGameId
      });
    });
  }
});
