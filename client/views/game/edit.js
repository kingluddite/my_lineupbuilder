Template.GameEdit.helpers({
  // if there is a team return false
  // so we can hide the add team form
  cGame: function() {
    if (Meteor.user()) {
      return Games.findOne({
        _id: Session.get('sGameId')
      });
    }
  },
  isHomeTeam: function() {
    return Games.findOne({
      homeTeam: 'on'
    }) === undefined ? false : 'checked'
  }


});

Template.GameEdit.events({

  'submit form#editGameForm': function(evt) {
    evt.preventDefault();

    var currentGameId = Session.get('sGameId');

    var gameProperties = {
      gameDate: $(evt.target).find('[name=gameDate]').val(),
      gameTime: $(evt.target).find('[name=gameTime]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      myFormation: $("select.formation-choice-select option:selected").val(),
      homeTeam: $(evt.target).find('[name=homeTeam]').val()
    };

    Games.update(currentGameId, {
      $set: gameProperties
    }, function(error, id) {
      if (error) {
        return throwError(error.reason);
      }
      Router.go('game.show', {
        _id: currentGameId
      });
    });
  }
});
