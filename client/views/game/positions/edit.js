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

  //  grab the field position data form data 
  //   also add the playerId because we eventually
  //   want not just the starting position but also the
  //   the starting players in those positions
  //   we grab them all and store them in an object
  //   so we can easily pass them as one thing to the server
  //   just chose 'TBD' as a default value
  'submit form#editPositionForm': function(evt) {
    evt.preventDefault();

    var currentGameId = Session.get('sGameId');

    var playerPositions = {

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

    // we store all the positions in an array of objects
    var allGamePositions = {
      playerGameInfo: [
        playerPositions
      ]
    }

    // we update client side
    Games.update(currentGameId, {
      // pass all our position data to update collection
      $set: allGamePositions
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      // we keep track that we set the positions to update
      //  the global process
      Session.setPersistent('sPositionsSet', true);
      Router.go('GameShow', {
        _id: currentGameId
      });
    });
  }
});
