function isHomeChecked() {
  var myFormationChoice;

  if ($('.home-team-chkbox').prop('checked')) {
    myFormationChoice = true;
  } else {
    myFormationChoice = false;
  }
  return myFormationChoice;
}

Template.GameNew.rendered = function() {
  // $('#gameDatePicker').datepicker();
  this.$('.date-picker').datetimepicker();
  this.$('.time-picker').datetimepicker({
    format: 'LT'
  });
};

Template.GameNew.helpers({
  checkIfGameExists: function() {
    if (Meteor.user()) {
      var game = Games.find().count();
      if (game > 0) {
        return true;
      } else {
        return false;
      }
    }
  }
});

Template.GameNew.events({

  'submit form#newGameForm': function(evt) {
    evt.preventDefault();

    var currentTeamId = Session.get('sTeamId');

    var game = {
      teamId: currentTeamId,
      gameDate: $(evt.target).find('[name=gameDate]').val(),
      gameTime: $(evt.target).find('[name=gameTime]').val(),
      leagueName: $(evt.target).find('[name=leagueName]').val(),
      seasonName: $(evt.target).find('[name=seasonName]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      homeTeam: isHomeChecked()
    };

    Meteor.call('newGame', game, function(error, id) {
      if (error) {
        throwError(error.reason);
      }
      Session.setPersistent('sGameId', id);
      $('.game-created').html('<i class="fa fa-check"></i> <span> Game Created</span>');
      $('.game-created span').css('text-decoration', 'line-through');
      $('.game-created').addClass('text-muted');
    });
  }
});
