Template.PositionNew.events({
  'focus input': function(evt) {
    // console.log(evt.target);
    $(evt.target).css('width', '300px');
    $(evt.target).css('border', '1px solid #000');
  },
  'blur input': function(evt) {
    $(evt.target).css('width', '50px');
    $(evt.target).css('border', 'none');
  }
});

Template.PositionNew.events({

  // when add team form is submitted
  //  grab the form data and pass it to the server
  'submit form#newPositionForm': function(evt) {
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
