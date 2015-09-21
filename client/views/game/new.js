Template.GameAdd.rendered = function() {
  // $('#gameDatePicker').datepicker();
  this.$('.date-picker').datetimepicker();
  this.$('.time-picker').datetimepicker({
    format: 'LT'
  });
};

Template.GameAdd.helpers({
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

Template.GameAdd.events({

  'submit form#addGameInfoForm': function(evt) {
    evt.preventDefault();

    var game = {
      teamId: Session.get('sTeamId'),
      gameDate: $(evt.target).find('[name=gameDate]').val(),
      gameTime: $(evt.target).find('[name=gameTime]').val(),
      opponentName: $(evt.target).find('[name=opponentName]').val(),
      fieldName: $(evt.target).find('[name=fieldName]').val(),
      fieldUrl: $(evt.target).find('[name=fieldUrl]').val(),
      homeTeam: $(evt.target).find('[name=homeTeam]').val()
    };

    Meteor.call('addGame', game, function(error, id) {
      if (error) {
        return alert(error.reason);
      }
      Session.setPersistent('sGameId', id);
      $('.game-created').html('<i class="fa fa-check"></i> <span> Game Created</span>');
      $('.game-created span').css('text-decoration', 'line-through');
      $('.game-created').addClass('text-muted');
    });
  }
});
