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
      player02: {
        fieldPosition: $(evt.target).find('[name=player02]').val()
      },
      player03: {
        fieldPosition: $(evt.target).find('[name=player03]').val()
      },
      player04: {
        fieldPosition: $(evt.target).find('[name=player04]').val()
      },
      player05: {
        fieldPosition: $(evt.target).find('[name=player05]').val()
      },
      player06: {
        fieldPosition: $(evt.target).find('[name=player06]').val()
      },
      player07: {
        fieldPosition: $(evt.target).find('[name=player07]').val()
      },
      player08: {
        fieldPosition: $(evt.target).find('[name=player08]').val()
      },
      player09: {
        fieldPosition: $(evt.target).find('[name=player09]').val()
      },
      player09: {
        fieldPosition: $(evt.target).find('[name=player10]').val()
      },
      player10: {
        fieldPosition: $(evt.target).find('[name=player11]').val()
      }
    };

    var allGamePositions = {
      playerGameInfo: playerPositions,
      lastModified: new Date().getTime()
    }

    Games.update(currentGameId, {
      $set: allGamePositions
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Session.setPersistent('sPositionsSet', true);
      Router.go('game.show', {
        _id: currentGameId
      });
    });
  }
});
