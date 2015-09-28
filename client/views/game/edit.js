Template.GameEdit.rendered = function() {
  // $('#gameDatePicker').datepicker();
  this.$('.date-picker').datetimepicker();
  this.$('.time-picker').datetimepicker({
    format: 'LT'
  });

  // when template loads find the boolean value of homeTeam
  var currentGame = Games.findOne({
    _id: Session.get('sGameId')
  });
  // if true
  if (currentGame.homeTeam) {
    // check the box
    $('.home-team-chkbox').prop('checked', true);
  }

};

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
  sGameId: function() {
    return Session.get('sGameId')
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

    var gameProperties = {
      gameDate: $(evt.target).find('[name=gameDate]').val(),
      gameTime: $(evt.target).find('[name=gameTime]').val(),
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      seasonName: $(evt.target).find('[name=seasonName]').val(),
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
      Router.go('GameShow', {
        _id: currentGameId
      });
    });
  }
});
