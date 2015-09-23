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

// values of unchecked boxes do not get posted
// to get a true or false value entered into db
// we create the myFormationChoice variable
// and populate it with true or false if checked or unchecked
// then call this function when updating game db
// and true is entered for myFormation if checked
// and false is entered for myFormation if not checked
function isHomeChecked() {
  var myFormationChoice;

  if ($('.home-team-chkbox').prop('checked')) {
    myFormationChoice = true;
  } else {
    myFormationChoice = false;
  }
  return myFormationChoice;
}

Template.GameEdit.events({

  'submit form#editGameForm': function(evt) {
    evt.preventDefault();

    var currentGameId = Session.get('sGameId');
    console.log($(evt.target).find('[name=homeTeam]').val())

    var gameProperties = {
      gameDate: $(evt.target).find('[name=gameDate]').val(),
      gameTime: $(evt.target).find('[name=gameTime]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      myFormation: $("select.formation-choice-select option:selected").val(),
      homeTeam: isHomeChecked()
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
